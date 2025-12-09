'use client';

import { useState, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import StudentInfoCard from '@/components/StudentInfoCard';
import ImportantAlertBanner from '@/components/ImportantAlertBanner';
import GradeGuideSection from '@/components/GradeGuideSection';
import ChatContainer from '@/components/ChatContainer';
import FAQModal from '@/components/FAQModal';

interface StudentInfo {
  grade: string;
  major: string;
  semester: string;
}

export default function Home() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const chatContainerRef = useRef<{ sendMessageFromParent: (msg: string) => void } | null>(null);

  const handleInfoComplete = (info: StudentInfo) => {
    setStudentInfo(info);
  };

  const handleQuickQuery = (query: string) => {
    // 채팅창으로 스크롤 + 메시지 전송
    if (chatContainerRef.current) {
      chatContainerRef.current.sendMessageFromParent(query);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-cream to-white">
      {/* 모바일 화면 비율로 프레임 설정 (375x812 - iPhone X 기준) */}
      <div className="w-full h-screen max-w-md mx-auto bg-bg-cream shadow-2xl flex flex-col overflow-hidden">
        {!studentInfo ? (
          /* 학생 정보 입력 전 - 스크롤 가능한 소개 페이지 */
          <div className="flex-1 overflow-y-auto p-6">
            <HeroSection />
            <StudentInfoCard onInfoComplete={handleInfoComplete} />
            <ImportantAlertBanner />
            <GradeGuideSection onGuideClick={handleQuickQuery} />
          </div>
        ) : (
          /* 학생 정보 입력 후 - 채팅 인터페이스 */
          <ChatContainer 
            ref={chatContainerRef}
            studentInfo={studentInfo}
            onOpenFAQ={() => setShowFAQ(true)}
          />
        )}
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
