'use client';

interface CategoryCardProps {
  onCategoryClick: (category: string) => void;
}

const categories = [
  {
    emoji: '📅',
    title: '일정',
    subtitle: '학사일정\n채플',
    query: '학사 일정과 채플 관련 정보를 알려줘',
  },
  {
    emoji: '📝',
    title: '수강',
    subtitle: '수강신청\n정정/철회',
    query: '수강신청과 정정/철회 방법을 알려줘',
  },
  {
    emoji: '🎓',
    title: '졸업',
    subtitle: '졸업요건\n학점',
    query: '졸업 요건과 필요 학점을 알려줘',
  },
  {
    emoji: '🏫',
    title: '전공',
    subtitle: '복수/부전\n전과',
    query: '복수전공, 부전공, 전과에 대해 알려줘',
  },
  {
    emoji: '📊',
    title: '성적',
    subtitle: '학점계산\n재수강',
    query: '학점 계산과 재수강 방법을 알려줘',
  },
  {
    emoji: '💳',
    title: '휴학',
    subtitle: '휴학/복학\n자퇴',
    query: '휴학과 복학 절차를 알려줘',
  },
];

export default function CategoryCards({ onCategoryClick }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
      <h3 className="text-lg font-bold text-ewha-green mb-4">
        내가 이런 것들을 잘 알아! 🐻
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategoryClick(category.query)}
            className="bg-gradient-to-br from-bg-cream to-white border-2 border-gray-200 hover:border-ewha-green rounded-xl p-4 transition-all hover:shadow-lg active:scale-95"
          >
            <div className="text-3xl mb-2">{category.emoji}</div>
            <div className="text-sm font-bold text-gray-800 mb-1">
              {category.title}
            </div>
            <div className="text-xs text-gray-600 whitespace-pre-line leading-tight">
              {category.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
