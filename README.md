# 신입생 도우미 RAG 챗봇 - 프론트엔드
Next.js 기반 신입생을 위한 RAG 챗봇 프론트엔드입니다.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 확인하고 FastAPI 백엔드 URL을 설정하세요:

```env
FASTAPI_URL=http://localhost:8000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## FastAPI 백엔드 연동

### 백엔드 실행 (Docker)

FastAPI 백엔드를 도커로 실행:

```bash
# 백엔드 디렉토리에서
docker-compose up -d
```

### API 엔드포인트

프론트엔드는 다음 엔드포인트를 호출합니다:

- `POST /chat` - 사용자 메시지를 받아 AI 응답 반환

예상 요청 형식:
```json
{
  "message": "사용자 질문"
}
```

예상 응답 형식:
```json
{
  "response": "AI 응답"
}
```

## 프로젝트 구조

```
buddybot-front/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # FastAPI 프록시 API
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 메인 페이지
│   └── globals.css           # 전역 스타일
├── components/
│   ├── ChatContainer.tsx     # 채팅 컨테이너 (상태 관리)
│   ├── ChatHeader.tsx        # 헤더 컴포넌트
│   ├── ChatMessages.tsx      # 메시지 목록
│   └── ChatInput.tsx         # 입력 컴포넌트
└── .env.local               # 환경 변수
```

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: 모바일 최적화 (max-width: 448px)