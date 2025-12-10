import { NextRequest, NextResponse } from 'next/server';

// FastAPI 백엔드 URL (환경 변수로 관리 권장)
const FASTAPI_URL = process.env.FASTAPI_URL || 'https://astralfinance-buddybot.hf.space';

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
    const requestBody = {
      session_id: `session_${Date.now()}`,
      message: message,
      user_grade: studentInfo?.grade ? parseInt(studentInfo.grade) : 0,
      user_major: studentInfo?.major || '',
    };

    console.log('백엔드 요청:', FASTAPI_URL, requestBody);

    // FastAPI 백엔드로 요청 전송 (타임아웃 60초)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(`${FASTAPI_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('백엔드 응답 상태:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('백엔드 에러:', errorText);
      throw new Error(`FastAPI 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log('백엔드 응답 데이터:', data);

    return NextResponse.json({
      response: data.answer || data.response || data.message,
      sources: data.sources || [],
    });
  } catch (error) {
    console.error('Chat API 오류:', error);
    
    // 에러 상세 정보
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    const errorCause = error instanceof Error && 'cause' in error ? String(error.cause) : '';
    
    console.error('에러 원인:', errorCause);
    
    return NextResponse.json(
      {
        response: `현재 백엔드 서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.\n\n(${errorMessage})`,
        sources: [],
      },
      { status: 500 }
    );
  }
}
