'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
              <div className="text-sm text-gray-800 prose prose-sm max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-4 prose-headings:mb-2
                prose-p:text-gray-800 prose-p:my-2 prose-p:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-2 prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1
                prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1
                prose-li:text-gray-800 prose-li:my-1
                prose-code:text-ewha-green prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:p-3 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-a:text-ewha-green prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-ewha-green prose-blockquote:pl-4 prose-blockquote:italic
                [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.text}
                </ReactMarkdown>
              </div>
              <span className="text-xs mt-2 block text-gray-400">
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
