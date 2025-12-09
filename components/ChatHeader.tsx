import Image from 'next/image';

export default function ChatHeader() {
  return (
    <header className="bg-gradient-to-r from-ewha-green to-ewha-green-sub text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/bear.jpeg"
              alt="버디"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold">버디 🐻</h1>
            <p className="text-xs text-green-100">이화 신입생 도우미</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent-yellow-green rounded-full animate-pulse"></div>
          <span className="text-xs">온라인</span>
        </div>
      </div>
    </header>
  );
}
