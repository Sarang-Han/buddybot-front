'use client';

import { useState } from 'react';

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
  // 학생 정보의 학년을 초기값으로 사용하되, 이후에는 자유롭게 변경 가능
  const [selectedGrade, setSelectedGrade] = useState(studentInfo?.grade || '1');

  const currentGuide = gradeGuides[selectedGrade];
  const isLocked = !studentInfo;

  return (
    <div className={`rounded-xl p-4 transition-all duration-300 ${
      isLocked 
        ? 'bg-gradient-to-br from-gray-50 to-gray-100/50 border border-dashed border-gray-300' 
        : 'bg-gradient-to-br from-white to-gray-50/50 border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-semibold flex items-center ${
          isLocked ? 'text-gray-400' : 'text-gray-800'
        }`}>
          학년별 맞춤 정보
        </h3>
        {!isLocked && (
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-2 py-1 text-xs border border-gray-300 rounded-md font-medium text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-ewha-green"
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
            맞춤 정보를 볼 수 있어요
          </p>
        </div>
      ) : (
        <>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{currentGuide.title}</h4>
            <div className="space-y-1">
              {currentGuide.items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onGuideClick(item)}
                  className="w-full text-left text-xs text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:scale-[1.02] px-3 py-2 rounded-md transition-all duration-200 flex items-center cursor-pointer border border-transparent hover:border-gray-200"
                >
                  <span className="mr-2 text-sm">✔️</span>
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
