import Image from 'next/image';

interface ChatHeaderProps {
  onOpenFAQ: () => void;
  onOpenDrawer: () => void;
}

export default function ChatHeader({ onOpenFAQ, onOpenDrawer }: ChatHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-ewha-green to-ewha-green-sub text-white p-4 shadow-md">
      <div className="flex items-center justify-between relative">
        {/* 왼쪽: 메뉴 버튼 */}
        <button
          onClick={onOpenDrawer}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
          aria-label="메뉴"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        
        {/* 중앙: 로고와 제목 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full pointer-events-none">
          <div className="flex items-center gap-2">
            <Image 
              src="/symbol.PNG" 
              alt="이화여대 심볼" 
              width={24} 
              height={24}
              className="object-contain"
              priority
            />
            <h1 className="text-lg font-semibold">이화여자대학교 챗봇</h1>
          </div>
        </div>
        
        {/* 오른쪽: FAQ 버튼 */}
        <button
          onClick={onOpenFAQ}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
          aria-label="자주 묻는 질문"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
