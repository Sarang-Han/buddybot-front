import { NextRequest, NextResponse } from 'next/server';

// FastAPI 백엔드 URL (환경 변수로 관리 권장)
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, studentInfo } = body;

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      );
    }

    // 백엔드 API 스펙에 맞게 요청 본문 구성
    const requestBody: any = {
      session_id: `session_${Date.now()}`,
      message: message,
      user_grade: studentInfo?.grade ? parseInt(studentInfo.grade) : 0,
      user_major: studentInfo?.major || '',
    };

    // FastAPI 백엔드로 요청 전송
    const response = await fetch(`${FASTAPI_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`FastAPI 오류: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      response: data.answer || data.response || data.message,
      sources: data.sources || [],
    });
  } catch (error) {
    console.error('Chat API 오류:', error);
    
    // 개발 중 임시 응답
    return NextResponse.json(
      {
        response: '현재 백엔드 서버와 연결할 수 없습니다. FastAPI 서버가 실행 중인지 확인해주세요.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}
