'use client';

import { useState } from 'react';

interface StudentInfo {
  grade: string;
  major: string;
  semester: string;
}

interface StudentInfoCardProps {
  onInfoComplete: (info: StudentInfo) => void;
}

export default function StudentInfoCard({ onInfoComplete }: StudentInfoCardProps) {
  const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = () => {
    if (grade && major && semester) {
      onInfoComplete({ grade, major, semester });
    }
  };

  const isComplete = grade && major && semester;

  return (
    <div className="bg-white border-2 border-ewha-green rounded-2xl p-6 shadow-md mb-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-ewha-green rounded-full flex items-center justify-center text-white text-xl mr-3">
          🎓
        </div>
        <div>
          <h2 className="text-lg font-bold text-ewha-green">미니 학생증</h2>
          <p className="text-xs text-gray-600">채팅 시작 전 정보를 입력해주세요</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* 학년 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            학년 <span className="text-red-500">*</span>
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ewha-green focus:border-transparent"
          >
            <option value="">선택하세요</option>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
            <option value="5+">5학년 이상</option>
          </select>
        </div>

        {/* 전공 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            전공 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="예: 컴퓨터공학과"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ewha-green focus:border-transparent"
          />
        </div>

        {/* 이수 학기 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이수 학기 <span className="text-red-500">*</span>
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ewha-green focus:border-transparent"
          >
            <option value="">선택하세요</option>
            <option value="1">1학기</option>
            <option value="2">2학기</option>
            <option value="3">3학기</option>
            <option value="4">4학기</option>
            <option value="5">5학기</option>
            <option value="6">6학기</option>
            <option value="7">7학기</option>
            <option value="8">8학기 이상</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isComplete
              ? 'bg-ewha-green text-white hover:bg-ewha-green-sub'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isComplete ? '정보 저장하고 시작하기' : '모든 항목을 입력해주세요'}
        </button>
      </div>
    </div>
  );
}
