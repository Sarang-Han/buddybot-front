'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import HeroSection from './HeroSection';
import StudentInfoCard from './StudentInfoCard';
import GradeGuideSection from './GradeGuideSection';
import SidebarDrawer from './SidebarDrawer';
import FeedbackModal from './FeedbackModal';

export interface Source {
  title: string;
  content: string;
  url?: string;
  category?: string;
  relevance_score?: number | null;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sources?: Source[];
}

interface StudentInfo {
  grade: string;
  major: string;
  semester: string;
}

interface ChatContainerProps {
  onOpenFAQ: () => void;
}

const ChatContainer = forwardRef<
  { sendMessageFromParent: (msg: string) => void },
  ChatContainerProps
>(({ onOpenFAQ }, ref) => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 학생 정보 불러오기
  useEffect(() => {
    const savedInfo = localStorage.getItem('studentInfo');
    if (savedInfo) {
      try {
        setStudentInfo(JSON.parse(savedInfo));
      } catch (error) {
        console.error('학생 정보 불러오기 실패:', error);
      }
    }
  }, []);

  const handleInfoComplete = (info: StudentInfo) => {
    setStudentInfo(info);
  };

  const handleInfoReset = () => {
    setStudentInfo(null);
  };

  const handleGuideClick = (query: string) => {
    sendMessage(query);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  // 부모 컴포넌트에서 메시지 전송 가능하도록
  useImperativeHandle(ref, () => ({
    sendMessageFromParent: (msg: string) => {
      sendMessage(msg);
    },
  }));

  const sendMessage = async (text: string) => {
    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // FastAPI 백엔드 연동 (학생 정보 포함)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text,
          studentInfo,
        }),
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();

      // 봇 응답 추가
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || '죄송합니다. 답변을 생성할 수 없습니다.',
        sender: 'bot',
        timestamp: new Date(),
        sources: data.sources || [],
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      // 임시 응답 (개발 중)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '현재 백엔드 연결 중입니다. 잠시만 기다려주세요!',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <ChatHeader 
        onOpenFAQ={onOpenFAQ}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onClearChat={handleClearChat}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
      <div className="flex-1 overflow-y-auto bg-bg-cream">
        {/* 고정 레이아웃 - 모든 섹션이 항상 표시됨 */}
        <div className="p-4 space-y-4">
          <HeroSection />
          <StudentInfoCard 
            onInfoComplete={handleInfoComplete}
            onInfoReset={handleInfoReset}
            studentInfo={studentInfo}
          />
          <GradeGuideSection 
            onGuideClick={handleGuideClick}
            studentInfo={studentInfo}
          />
        </div>
        
        {/* 채팅 메시지 영역 */}
        {messages.length > 0 && (
          <div className="px-4 pb-4">
            <div className="border-t-2 border-gray-300 pt-4 mb-2">
              <div className="flex items-center justify-center mb-3">
                <span className="bg-ewha-green text-white text-xs px-3 py-1 rounded-full font-medium">
                  💬 채팅 시작
                </span>
              </div>
              <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
          </div>
        )}
      </div>
      <ChatInput 
        onSendMessage={sendMessage} 
        disabled={isLoading || !studentInfo}
        onOpenFAQ={onOpenFAQ}
        studentInfo={studentInfo}
      />
    </div>
  );
});

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
