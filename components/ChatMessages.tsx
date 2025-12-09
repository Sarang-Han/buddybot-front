'use client';

import { useEffect, useRef } from 'react';
import { Message } from './ChatContainer';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`animate-fade-in ${
            message.sender === 'user' 
              ? 'flex justify-end' 
              : 'w-full'
          }`}
        >
          {message.sender === 'user' ? (
            <div className="max-w-[75%] rounded-2xl px-4 py-2.5 transition-all duration-200 bg-gradient-to-br from-ewha-green to-ewha-green-sub text-white rounded-br-sm">
              <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
              <span className="text-xs mt-1 block text-green-100">
                {message.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ) : (
            <div className="w-full px-4 py-3 transition-all duration-200">
              <p className="text-sm whitespace-pre-wrap break-words text-gray-800">{message.text}</p>
              <span className="text-xs mt-1 block text-gray-400">
                {message.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="w-full animate-fade-in">
          <div className="px-4 py-3">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-ewha-green to-accent-mint rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-accent-mint to-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-accent-blue to-ewha-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
