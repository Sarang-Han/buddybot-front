'use client';

import { useState } from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionClick: (question: string) => void;
}

const popularQuestions = [
  {
    question: '채플 몇 번 빠져도 F 안 받아?',
    category: '채플',
  },
  {
    question: '복수전공 신청 언제야?',
    category: '전공',
  },
  {
    question: '토익 몇 점이면 영어인증 돼?',
    category: '졸업',
  },
  {
    question: '과정수료하면 졸업 못 해?',
    category: '졸업',
  },
  {
    question: '학점교류 신청 방법은?',
    category: '수강',
  },
  {
    question: '휴학은 언제까지 신청할 수 있어?',
    category: '휴학',
  },
  {
    question: '수강철회하면 성적에 표시돼?',
    category: '수강',
  },
  {
    question: '재수강하면 이전 성적은 어떻게 돼?',
    category: '성적',
  },
  {
    question: '전과 신청 조건은?',
    category: '전공',
  },
  {
    question: '졸업 학점 총 몇 점이야?',
    category: '졸업',
  },
];

export default function FAQModal({ isOpen, onClose, onQuestionClick }: FAQModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  if (!isOpen) return null;

  const categories = ['전체', ...Array.from(new Set(popularQuestions.map(q => q.category)))];
  
  const filteredQuestions = selectedCategory === '전체' 
    ? popularQuestions 
    : popularQuestions.filter(q => q.category === selectedCategory);

  const handleQuestionClick = (question: string) => {
    onQuestionClick(question);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl animate-slide-up max-h-[80vh] flex flex-col">
        {/* 헤더 */}
        <div className="p-5 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              자주 묻는 질문
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 카테고리 필터 */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-ewha-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 질문 리스트 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-6">
          {filteredQuestions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(item.question)}
              className="w-full text-left bg-white border border-gray-200 hover:border-ewha-green rounded-lg p-3.5 transition-all hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-gray-800 flex-1">
                  {item.question}
                </p>
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded flex-shrink-0">
                  {item.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
