import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-ewha-green to-ewha-green-sub text-white p-4 rounded-xl shadow-lg mb-4">
      <div className="flex items-center space-x-3">
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white p-0.5 flex-shrink-0">
          <Image
            src="/bear.jpeg"
            alt="버디 곰"
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold mb-0.5">안녕, 난 버디야! 🐻</h1>
          <p className="text-xs text-green-100 leading-relaxed">
            학사 일정부터 수강신청, 졸업 요건까지<br />
            궁금한 건 뭐든지 물어봐!
          </p>
        </div>
      </div>
    </section>
  );
}
