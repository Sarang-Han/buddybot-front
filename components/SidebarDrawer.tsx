'use client';

import { useEffect } from 'react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearChat: () => void;
  onOpenFeedback: () => void;
}

const quickLinks = [
  { name: '유레카포탈', url: 'https://eportal.ewha.ac.kr' },
  { name: '마이유레카', url: 'https://eureka.ewha.ac.kr/eureka/my/main.do?LANG_CD=KO' },
  { name: '이화여대 공지사항', url: 'https://www.ewha.ac.kr/ewha/news/notice.do' },
  { name: '중앙도서관', url: 'https://lib.ewha.ac.kr/' },
  { name: '오늘의 학식', url: 'https://www.ewha.ac.kr/ewha/life/restaurant.do' },
  { name: '에브리타임', url: 'https://everytime.kr/' },
  { name: '이화이언', url: 'https://ewhaian.com/' },
  { name: '셔틀버스', url: 'https://www.ewha.ac.kr/ewha/intro/campus-map-bus.do#a' },
  { name: '열람실 현황', url: 'http://203.255.190.74/mobile/PA/status/room_status.php' },
];

export default function SidebarDrawer({ isOpen, onClose, onClearChat, onOpenFeedback }: SidebarDrawerProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // 바디 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[var(--ewha-green)]">메뉴</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="메뉴 닫기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* 빠른 링크 섹션 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3">빠른 링크</h3>
              <div className="space-y-1">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 hover:bg-[var(--bg-cream)] rounded-lg transition-colors group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-[var(--ewha-green)]">
                      {link.name}
                    </span>
                    <svg 
                      className="w-4 h-4 text-gray-400 group-hover:text-[var(--ewha-green)]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* 설정 섹션 */}
            <div className="mb-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  if (confirm('채팅 기록을 모두 삭제하시겠습니까?')) {
                    onClearChat();
                    onClose();
                  }
                }}
                className="w-full flex items-center p-3 hover:bg-red-50 rounded-lg transition-colors group text-left"
              >
                <svg 
                  className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-sm text-gray-700 group-hover:text-red-600">채팅 기록 초기화</span>
              </button>

              <button
                onClick={() => {
                  onOpenFeedback();
                  onClose();
                }}
                className="w-full flex items-center p-3 hover:bg-[var(--bg-cream)] rounded-lg transition-colors group text-left mt-1"
              >
                <svg 
                  className="w-5 h-5 mr-3 text-gray-500 group-hover:text-[var(--ewha-green)]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="text-sm text-gray-700 group-hover:text-[var(--ewha-green)]">피드백 보내기</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>버전 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
