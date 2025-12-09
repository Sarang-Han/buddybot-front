import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-ewha-green to-ewha-green-sub text-white p-6 rounded-2xl shadow-lg mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white p-1">
          <Image
            src="/bear.jpeg"
            alt="버디 곰"
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">안녕, 난 버디야! 🐻</h1>
          <p className="text-sm text-green-100">이화 신입생 도우미 챗봇</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed">
        학사 일정부터 수강신청, 졸업 요건까지<br />
        궁금한 건 뭐든지 물어봐! 내가 도와줄게 😊
      </p>
    </section>
  );
}
