'use client';

interface Source {
  title: string;
  content: string;
  url?: string;
  category?: string;
  relevance_score?: number | null;
}

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  sources: Source[];
}

export default function SourcesModal({ isOpen, onClose, sources }: SourcesModalProps) {
  if (!isOpen) return null;

  // 상위 5개만 표시
  const displaySources = sources.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 모달 */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[70vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-ewha-green to-ewha-green-sub text-white">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔗</span>
            <h2 className="text-base font-bold">참고 출처</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200"
            aria-label="닫기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 출처 리스트 */}
        <div className="overflow-y-auto p-4 space-y-3">
          {displaySources.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">출처 정보가 없습니다.</p>
            </div>
          ) : (
            displaySources.map((source, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-xl p-4 hover:border-ewha-green/30 transition-all duration-200"
              >
                {/* 카테고리 & 순서 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-ewha-green bg-ewha-green/10 px-2 py-1 rounded">
                    {source.category || '학사안내'}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    #{index + 1}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {source.title}
                </h3>

                {/* 내용 스니펫 */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                  {source.content}
                </p>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
