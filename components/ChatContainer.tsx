'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface StudentInfo {
  grade: string;
  major: string;
  semester: string;
}

interface ChatContainerProps {
  studentInfo: StudentInfo;
  onOpenFAQ: () => void;
}

const ChatContainer = forwardRef<
  { sendMessageFromParent: (msg: string) => void },
  ChatContainerProps
>(({ studentInfo, onOpenFAQ }, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! 신입생 도우미 챗봇입니다. 궁금한 점을 물어보세요! 😊',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="flex flex-col h-full">
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput 
        onSendMessage={sendMessage} 
        disabled={isLoading}
        onOpenFAQ={onOpenFAQ}
      />
    </div>
  );
});

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
