'use client';

import { useState, useRef } from 'react';
import ChatContainer from '@/components/ChatContainer';
import FAQModal from '@/components/FAQModal';

export default function Home() {
  const [showFAQ, setShowFAQ] = useState(false);
  const chatContainerRef = useRef<{ sendMessageFromParent: (msg: string) => void } | null>(null);

  const handleQuickQuery = (query: string) => {
    // 채팅창으로 메시지 전송
    if (chatContainerRef.current) {
      chatContainerRef.current.sendMessageFromParent(query);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-cream to-white">
      {/* 모바일 화면 비율로 프레임 설정 (375x812 - iPhone X 기준) */}
      <div className="w-full h-screen max-w-md mx-auto bg-gradient-to-b from-white to-gray-50/50 shadow-2xl shadow-emerald-900/20 flex flex-col overflow-hidden backdrop-blur-sm">
        <ChatContainer 
          ref={chatContainerRef}
          onOpenFAQ={() => setShowFAQ(true)}
        />
      </div>

      {/* FAQ 모달 */}
      <FAQModal 
        isOpen={showFAQ} 
        onClose={() => setShowFAQ(false)}
        onQuestionClick={handleQuickQuery}
      />
    </main>
  );
}
