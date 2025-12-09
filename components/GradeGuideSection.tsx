'use client';

import { useState, useEffect } from 'react';

interface GradeGuideSectionProps {
  onGuideClick: (guide: string) => void;
  studentInfo: { grade: string; major: string; semester: string } | null;
}

const gradeGuides: Record<string, { title: string; items: string[] }> = {
  '1': {
    title: '1학년 신입생이라면 이것부터!',
    items: [
      '나의 첫 수강신청 준비하기',
      '채플(훈련학점)이 무엇인가요?',
      '필수교양과 핵심교양 차이는?',
      '학기 중 꼭 챙겨야 할 일정 미리보기',
    ],
  },
  '2': {
    title: '2학년이라면 주목!',
    items: [
      '복수전공/부전공 고민된다면',
      '교환학생/방문학생 프로그램',
      '전공 선택의 기준과 팁',
      '학점 관리 전략',
    ],
  },
  '3': {
    title: '3학년, 본격 준비 시작!',
    items: [
      '취업 준비 로드맵',
      '인턴십 지원 전략',
      '졸업 요건 미리 체크하기',
      '자격증 및 어학 성적 준비',
    ],
  },
  '4': {
    title: '4학년, 졸업 준비 완성!',
    items: [
      '졸업 요건 최종 확인',
      '과정 이수 신청 방법',
      '졸업 논문/졸업시험 준비',
      '취업 최종 스퍼트',
    ],
  },
  '5+': {
    title: '5학년 이상, 마지막 점검!',
    items: [
      '졸업 요건 꼼꼼히 확인',
      '남은 학점 이수 계획',
      '복수전공/부전공 완성',
      '졸업 연기 신청 방법',
    ],
  },
};

export default function GradeGuideSection({ onGuideClick, studentInfo }: GradeGuideSectionProps) {
  const [selectedGrade, setSelectedGrade] = useState('1');

  // studentInfo가 있으면 해당 학년으로 자동 설정
  useEffect(() => {
    if (studentInfo?.grade) {
      setSelectedGrade(studentInfo.grade);
    }
  }, [studentInfo]);

  const currentGuide = gradeGuides[selectedGrade];
  const isLocked = !studentInfo;

  return (
    <div className={`rounded-xl p-4 shadow-md mb-4 transition-all ${
      isLocked 
        ? 'bg-gray-100 border-2 border-dashed border-gray-300' 
        : 'bg-gradient-to-br from-accent-mint/10 to-accent-blue/10'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-base font-bold flex items-center ${
          isLocked ? 'text-gray-400' : 'text-ewha-green'
        }`}>
          <span className="mr-2">👤</span>
          학년별 맞춤 정보
        </h3>
        {!isLocked && (
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-2 py-1 text-xs border-2 border-ewha-green rounded-lg font-medium text-ewha-green bg-white"
          >
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
            <option value="5+">5학년+</option>
          </select>
        )}
      </div>

      {isLocked ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-2">🔒</div>
          <p className="text-sm text-gray-500 font-medium">
            학생증을 작성하면<br />
            맞춤 가이드를 볼 수 있어요
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg p-3 mb-2">
            <h4 className="text-sm font-bold text-gray-800 mb-2">{currentGuide.title}</h4>
            <div className="space-y-1">
              {currentGuide.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onGuideClick(item)}
                  className="w-full text-left text-xs text-gray-700 hover:text-ewha-green hover:bg-bg-cream active:bg-ewha-green active:text-white px-2 py-1.5 rounded-lg transition-all active:scale-95 flex items-center cursor-pointer"
                >
                  <span className="mr-2 text-sm">✅</span>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
