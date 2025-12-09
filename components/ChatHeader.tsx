interface ChatHeaderProps {
  onOpenFAQ: () => void;
}

export default function ChatHeader({ onOpenFAQ }: ChatHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-ewha-green to-ewha-green-sub text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">이화여자대학교 챗봇 🧸</h1>
        
        <div className="flex items-center space-x-2">
          {/* FAQ 버튼 */}
          <button
            onClick={onOpenFAQ}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
          
          {/* 메뉴 버튼 */}
          <button
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
        </div>
      </div>
    </header>
  );
}
