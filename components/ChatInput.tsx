'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  onOpenFAQ: () => void;
  studentInfo: { grade: string; major: string; semester: string } | null;
}

export default function ChatInput({ onSendMessage, disabled, studentInfo }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholder = studentInfo 
    ? "메시지를 입력하세요..."
    : "먼저 위에서 학생 정보를 입력해주세요";

  return (
    <div className="border-t border-gray-300 bg-white px-3 py-2">
      <div className="relative flex items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-full border border-gray-200 pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ewha-green)] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
          style={{
            maxHeight: '80px',
            minHeight: '40px',
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="absolute right-1.5 bg-[var(--ewha-green)] text-white rounded-full p-2 hover:bg-[var(--ewha-green-sub)] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          aria-label="메시지 보내기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
