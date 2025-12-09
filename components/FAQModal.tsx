'use client';

import { useState } from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionClick: (question: string) => void;
}

const popularQuestions = [
  {
    emoji: '💡',
    question: '채플 몇 번 빠져도 F 안 받아?',
    category: '채플',
  },
  {
    emoji: '💡',
    question: '복수전공 신청 언제야?',
    category: '전공',
  },
  {
    emoji: '💡',
    question: '토익 몇 점이면 영어인증 돼?',
    category: '졸업',
  },
  {
    emoji: '💡',
    question: '과정수료하면 졸업 못 해?',
    category: '졸업',
  },
  {
    emoji: '💡',
    question: '학점교류 신청 방법은?',
    category: '수강',
  },
  {
    emoji: '💡',
    question: '휴학은 언제까지 신청할 수 있어?',
    category: '휴학',
  },
  {
    emoji: '💡',
    question: '수강철회하면 성적에 표시돼?',
    category: '수강',
  },
  {
    emoji: '💡',
    question: '재수강하면 이전 성적은 어떻게 돼?',
    category: '성적',
  },
  {
    emoji: '💡',
    question: '전과 신청 조건은?',
    category: '전공',
  },
  {
    emoji: '💡',
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
        <div className="p-6 border-b sticky top-0 bg-white rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-ewha-green flex items-center">
              <span className="mr-2">🔥</span>
              자주 묻는 질문
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* 카테고리 필터 */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-ewha-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 질문 리스트 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredQuestions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(item.question)}
              className="w-full text-left bg-gradient-to-br from-bg-cream to-white border-2 border-gray-200 hover:border-ewha-green rounded-xl p-4 transition-all hover:shadow-lg active:scale-95"
            >
              <div className="flex items-start">
                <span className="text-xl mr-3">{item.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {item.question}
                  </p>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 하단 정보 */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            📊 실시간으로 학생들이 많이 물어보는 질문들이에요
          </p>
        </div>
      </div>
    </div>
  );
}
