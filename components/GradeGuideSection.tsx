'use client';

import { useState } from 'react';

interface GradeGuideProps {
  onGuideClick: (guide: string) => void;
}

const gradeGuides: Record<string, { title: string; items: string[] }> = {
  '1': {
    title: '1학년 신입생이라면 이것부터!',
    items: [
      '나의 첫 수강신청 준비하기',
      '나의 첫 기숙사 입사 준비',
      '학교생활 필수 세팅 (SW지원, 시설, 학생활동 등)',
      '교내 커뮤니티 100% 활용하기 (에브리타임, 이화이언)',
      '채플(훈련학점)이 무엇인가요?',
      '필수교양과 핵심교양 차이는?',
      '학기 중 꼭 챙겨야 할 일정 미리보기',
    ],
  },
  '2': {
    title: '2학년이라면 주목!',
    items: [
      '복수전공/부전공 고민된다면',
      '교환학생/방문학생 프로그램 알아보기',
      '전공 선택의 기준과 팁',
      '학점 관리 전략',
      '진로 탐색 시작하기',
      '대외활동과 공모전 참여하기',
    ],
  },
  '3': {
    title: '3학년, 본격 준비 시작!',
    items: [
      '취업 준비 로드맵',
      '인턴십 지원 전략',
      '대학원 진학 고민',
      '졸업 요건 미리 체크하기',
      '자격증 및 어학 성적 준비',
      '포트폴리오 만들기',
    ],
  },
  '4': {
    title: '4학년, 졸업 준비 완성!',
    items: [
      '졸업 요건 최종 확인',
      '과정 이수 신청 방법',
      '졸업 논문/졸업시험 준비',
      '취업 최종 스퍼트',
      '학위수여식 안내',
      '졸업 후 진로 설계',
    ],
  },
  '5+': {
    title: '5학년 이상, 마지막 점검!',
    items: [
      '졸업 요건 꼼꼼히 확인',
      '남은 학점 이수 계획',
      '복수전공/부전공 완성',
      '졸업 연기 신청 방법',
      '학사 일정 놓치지 않기',
    ],
  },
};

export default function GradeGuideSection({ onGuideClick }: GradeGuideProps) {
  const [selectedGrade, setSelectedGrade] = useState('1');

  const currentGuide = gradeGuides[selectedGrade];

  return (
    <div className="bg-gradient-to-br from-accent-mint/10 to-accent-blue/10 rounded-2xl p-6 shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-ewha-green">👤 학년별 맞춤 정보</h3>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="px-3 py-1 text-sm border-2 border-ewha-green rounded-lg font-medium text-ewha-green bg-white"
        >
          <option value="1">1학년</option>
          <option value="2">2학년</option>
          <option value="3">3학년</option>
          <option value="4">4학년</option>
          <option value="5+">5학년 이상</option>
        </select>
      </div>

      <div className="bg-white rounded-xl p-4 mb-3">
        <h4 className="font-bold text-gray-800 mb-3">{currentGuide.title}</h4>
        <div className="space-y-2">
          {currentGuide.items.map((item, index) => (
            <button
              key={index}
              onClick={() => onGuideClick(item)}
              className="w-full text-left text-sm text-gray-700 hover:text-ewha-green hover:bg-bg-cream px-3 py-2 rounded-lg transition-colors flex items-center"
            >
              <span className="mr-2">✅</span>
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onGuideClick(`${selectedGrade}학년 가이드 전체 내용`)}
        className="w-full bg-ewha-green text-white py-2 rounded-lg font-medium hover:bg-ewha-green-sub transition-colors"
      >
        💡 학년별 가이드 전체보기
      </button>
    </div>
  );
}
