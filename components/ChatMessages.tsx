'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { Message } from './ChatContainer';
import SourcesModal from './SourcesModal';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedSources, setSelectedSources] = useState<Message['sources']>([]);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleOpenSources = (sources: Message['sources']) => {
    setSelectedSources(sources);
    setIsSourcesModalOpen(true);
  };

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
            <div className="w-full pr-4 py-3 transition-all duration-200">
              <div className="flex items-start gap-4">
                {/* 프로필 이미지 */}
                <div className="flex-shrink-0">
                  <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-ewha-green/30 shadow-sm">
                    <Image
                      src="/bear.jpeg"
                      alt="BuddyBot"
                      width={36}
                      height={36}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                {/* 메시지 내용 */}
                <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-800 prose prose-sm max-w-none
                prose-p:text-gray-800 prose-p:my-2 prose-p:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-2 prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1
                prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1
                prose-li:text-gray-800 prose-li:my-1
                prose-code:text-ewha-green prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-normal
                prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:p-3 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-a:text-ewha-green prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-ewha-green/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
                prose-hr:border-gray-200 prose-hr:my-4
                [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => <h1 className="text-xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b-2 border-ewha-green/20">{children}</h1>,
                    h2: ({children}) => <h2 className="text-lg font-bold text-ewha-green mt-5 mb-2">{children}</h2>,
                    h3: ({children}) => <h3 className="text-base font-bold text-gray-900 mt-4 mb-2">{children}</h3>,
                    h4: ({children}) => <h4 className="text-sm font-semibold text-gray-800 mt-3 mb-1">{children}</h4>,
                    p: ({children}) => <p className="my-2">{children}</p>,
                    br: () => <br className="my-1" />,
                    ul: ({children}) => <ul className="list-disc list-outside pl-6 my-3 space-y-1.5">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-outside pl-6 my-3 space-y-1.5">{children}</ol>,
                    li: ({children}) => <li className="text-gray-800 leading-relaxed">{children}</li>,
                    table: ({children}) => (
                      <div className="overflow-x-auto my-4 rounded-lg border border-gray-300">
                        <table className="min-w-full border-collapse">{children}</table>
                      </div>
                    ),
                    thead: ({children}) => <thead className="bg-gray-100">{children}</thead>,
                    tbody: ({children}) => <tbody>{children}</tbody>,
                    tr: ({children}) => <tr className="border-b border-gray-300">{children}</tr>,
                    th: ({children}) => (
                      <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900 text-xs">
                        {children}
                      </th>
                    ),
                    td: ({children}) => (
                      <td className="border border-gray-300 px-3 py-2 text-gray-800 text-xs">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
              
              {/* 출처 버튼 */}
              {message.sources && message.sources.length > 0 && (
                <button
                  onClick={() => handleOpenSources(message.sources!)}
                  className="inline-flex items-center space-x-1.5 mt-3 px-3 py-1.5 text-xs font-medium text-ewha-green bg-ewha-green/5 hover:bg-ewha-green/10 rounded-lg transition-colors border border-ewha-green/20"
                >
                  <span>🔗</span>
                  <span>출처 보기</span>
                  <span className="text-[10px] bg-ewha-green/20 px-1.5 py-0.5 rounded">
                    {message.sources.length}
                  </span>
                </button>
              )}
              
              <span className="text-xs mt-2 block text-gray-400">
                {message.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="w-full animate-fade-in">
          <div className="pr-4 py-3">
            <div className="flex items-start gap-1.5">
              {/* 로딩 시 프로필 이미지 */}
              <div className="flex-shrink-0">
                <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-ewha-green/30 shadow-sm">
                  <Image
                    src="/bear.jpeg"
                    alt="BuddyBot"
                    width={36}
                    height={36}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              
              {/* 개선된 로딩 인디케이터 */}
              <div className="flex items-center gap-1 py-2">
                <div className="typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />

      {/* 출처 모달 */}
      <SourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
        sources={selectedSources || []}
      />
    </div>
  );
}
