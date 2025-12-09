'use client';

import { useState } from 'react';
import Image from 'next/image';

interface StudentInfo {
  grade: string;
  major: string;
  semester: string;
}

interface StudentInfoCardProps {
  onInfoComplete: (info: StudentInfo) => void;
  onInfoReset: () => void;
  studentInfo: StudentInfo | null;
  isCompact?: boolean;
}

// 학기 -> 학년 계산 헬퍼
const getGradeFromSemester = (semester: string): string => {
  const sem = parseInt(semester);
  if (sem === 0) return '1';
  if (sem <= 2) return '1';
  if (sem <= 4) return '2';
  if (sem <= 6) return '3';
  if (sem <= 8) return '4';
  return '5+';
};

// 학기 표시 헬퍼
const getSemesterLabel = (semester: string): string => {
  const sem = parseInt(semester);
  if (sem === 0) return '0학기 (신입생)';
  const grade = Math.ceil(sem / 2);
  return `${semester}학기 (${grade}학년)`;
};

export default function StudentInfoCard({ onInfoComplete, onInfoReset, studentInfo }: StudentInfoCardProps) {
  const [semester, setSemester] = useState('');
  const [major, setMajor] = useState('');

  const handleSubmit = () => {
    if (semester && major) {
      const grade = getGradeFromSemester(semester);
      const info = { grade, major, semester };
      onInfoComplete(info);
      
      // localStorage에 저장
      localStorage.setItem('studentInfo', JSON.stringify(info));
    }
  };

  const handleEdit = () => {
    // localStorage 삭제
    localStorage.removeItem('studentInfo');
    onInfoReset();
  };

  const isComplete = semester && major;

  // 정보 입력 완료 후 축소된 뷰
  if (studentInfo) {
    return (
      <div className="bg-gradient-to-br from-ewha-green via-ewha-green to-ewha-green-sub text-white rounded-xl p-3 mb-3 relative overflow-hidden">
        {/* 배경 로고 워터마크 */}
        <div className="absolute -right-3 -bottom-6 opacity-10 pointer-events-none">
          <Image 
            src="/symbol.PNG" 
            alt="이화여대 심볼" 
            width={130} 
            height={130}
            className="object-contain"
          />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2 flex-1">
            <div className="text-sm">
              <span className="font-bold">{getSemesterLabel(studentInfo.semester)}</span>
              <span className="mx-1">•</span>
              <span>{studentInfo.major}</span>
            </div>
          </div>
          <button
            onClick={handleEdit}
            className="text-xs bg-white/20 hover:bg-white/30 hover:scale-105 px-2.5 py-1 rounded-md transition-all duration-200 flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <span>수정</span>
          </button>
        </div>
      </div>
    );
  }

  // 정보 입력 전 컴팩트 뷰
  return (
    <div className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-xl p-4 mb-3">
      <div className="flex items-center mb-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 flex items-center">
            <span className="mr-1.5">🎓</span>
            미니 학생증
          </h2>
          <p className="text-xs text-gray-500">정보를 입력하면 채팅을 입력할 수 있어요</p>
        </div>
      </div>

      <div className="space-y-2">
        {/* 이수 학기 선택 */}
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-ewha-green/50 focus:border-ewha-green shadow-sm transition-all duration-200"
        >
          <option value="">이수 완료한 학기를 선택하세요</option>
          <option value="0">0학기 (신입생)</option>
          <option value="1">1학기 (1학년)</option>
          <option value="2">2학기 (1학년)</option>
          <option value="3">3학기 (2학년)</option>
          <option value="4">4학기 (2학년)</option>
          <option value="5">5학기 (3학년)</option>
          <option value="6">6학기 (3학년)</option>
          <option value="7">7학기 (4학년)</option>
          <option value="8">8학기 (4학년)</option>
          <option value="9">9학기 이상</option>
        </select>

        {/* 전공 입력 */}
        <input
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="전공 (예: 컴퓨터공학과)"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-ewha-green/50 focus:border-ewha-green transition-all duration-200"
        />

        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full py-2.5 text-sm rounded-lg font-medium transition-all duration-200 ${
            isComplete
              ? 'bg-gradient-to-r from-ewha-green to-ewha-green-sub text-white hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isComplete ? '✨ 저장하기' : '모두 입력해주세요'}
        </button>
      </div>
    </div>
  );
}
