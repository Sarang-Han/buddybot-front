'use client';

import { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [category, setCategory] = useState<'버그' | '개선사항' | '기타'>('개선사항');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert('피드백 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyN3dzvjDVdL5wj6O4Anpcpa4P0qOEQ_tSSdKYp4yYarL5_xlOiM7VrdGv4LvxYxYHZtw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          feedback,
          timestamp: new Date().toISOString(),
        }),
      });

      alert('소중한 피드백 감사합니다! 💚');
      setFeedback('');
      setCategory('개선사항');
      onClose();
    } catch (error) {
      console.error('피드백 전송 실패:', error);
      alert('피드백 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[var(--ewha-green)]">피드백 보내기</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <div className="flex gap-2">
              {(['버그', '개선사항', '기타'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-[var(--ewha-green)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              피드백 내용
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="버디봇을 사용하면서 불편했던 점이나 개선되었으면 하는 점을 자유롭게 작성해주세요."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--ewha-green)] focus:border-transparent"
              disabled={isSubmitting}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {feedback.length} / 500자
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !feedback.trim()}
            className="w-full py-3 bg-[var(--ewha-green)] text-white font-medium rounded-lg hover:bg-[var(--ewha-green-sub)] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '전송 중...' : '피드백 보내기'}
          </button>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center">
            보내주신 피드백은 버디봇 개선에 소중하게 활용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
