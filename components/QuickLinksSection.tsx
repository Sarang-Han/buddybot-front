const quickLinks = [
  {
    emoji: '🌐',
    label: '이화포탈',
    url: 'https://portal.ewha.ac.kr',
  },
  {
    emoji: '📋',
    label: '학사일정',
    url: 'https://www.ewha.ac.kr/ewha/plaza/schedule.do',
  },
  {
    emoji: '📚',
    label: '수강신청',
    url: 'https://eureka.ewha.ac.kr',
  },
  {
    emoji: '📞',
    label: '학적팀 문의',
    url: 'https://www.ewha.ac.kr/ewha/contact/index.do',
  },
];

export default function QuickLinksSection() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
      <h3 className="text-lg font-bold text-ewha-green mb-4 flex items-center">
        <span className="mr-2">🔗</span>
        자주 가는 곳
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gradient-to-br from-bg-cream to-white border-2 border-gray-200 hover:border-ewha-green rounded-xl p-4 transition-all hover:shadow-lg active:scale-95"
          >
            <span className="text-2xl mr-2">{link.emoji}</span>
            <span className="text-sm font-medium text-gray-800">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
