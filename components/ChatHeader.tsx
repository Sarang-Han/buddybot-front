export default function ChatHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">신입생 도우미</h1>
            <p className="text-xs text-blue-100">AI 챗봇</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs">온라인</span>
        </div>
      </div>
    </header>
  );
}
