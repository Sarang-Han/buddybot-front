import ChatContainer from "@/components/ChatContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 모바일 화면 비율로 프레임 설정 (375x812 - iPhone X 기준) */}
      <div className="w-full h-screen max-w-md mx-auto bg-white shadow-2xl flex flex-col">
        <ChatContainer />
      </div>
    </main>
  );
}
