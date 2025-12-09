'use client';

import { useEffect, useState } from 'react';

interface AcademicEvent {
  title: string;
  startDate: string;
  endDate: string;
  eventType: string;
}

export default function ImportantAlertBanner() {
  const [events, setEvents] = useState<AcademicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/data/academic_calendar.csv');
        const csvText = await response.text();
        
        // CSV 파싱
        const lines = csvText.split('\n').slice(1); // 헤더 제외
        const today = new Date();
        const sevenDaysLater = new Date(today);
        sevenDaysLater.setDate(today.getDate() + 7);
        
        const relevantEvents: AcademicEvent[] = [];
        
        lines.forEach(line => {
          if (!line.trim()) return;
          
          const columns = line.split(',');
          const startDate = new Date(columns[1]);
          const title = columns[5];
          const eventType = columns[4];
          
          // 오늘부터 7일 이내 이벤트만 필터링
          if (startDate >= today && startDate <= sevenDaysLater) {
            relevantEvents.push({
              title,
              startDate: columns[1],
              endDate: columns[2],
              eventType,
            });
          }
        });
        
        setEvents(relevantEvents.slice(0, 3)); // 최대 3개만 표시
        setLoading(false);
      } catch (error) {
        console.error('학사일정 불러오기 실패:', error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-accent-coral to-accent-yellow-green text-white rounded-xl p-4 shadow-md mb-4 animate-pulse">
        <div className="h-5 bg-white/30 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-white/20 rounded w-full"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gradient-to-r from-accent-blue to-accent-mint text-white rounded-xl p-4 shadow-md mb-4">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">💡</span>
          <h3 className="text-sm font-bold">버디의 한마디</h3>
        </div>
        <p className="text-xs leading-relaxed">
          현재 다가오는 중요 일정이 없어요.<br />
          편안한 학기를 보내고 있네요! 😊
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-accent-coral to-accent-yellow-green text-white rounded-xl p-4 shadow-md mb-4">
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">🔥</span>
        <h3 className="text-base font-bold">지금 꼭 확인해야 할 중요 일정들!</h3>
      </div>
      
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="bg-white/20 rounded-lg p-2.5">
            <div className="text-xs font-semibold mb-0.5">
              📅 {new Date(event.startDate).toLocaleDateString('ko-KR', { 
                month: 'long', 
                day: 'numeric' 
              })}
              {event.startDate !== event.endDate && 
                ` - ${new Date(event.endDate).toLocaleDateString('ko-KR', { 
                  month: 'long', 
                  day: 'numeric' 
                })}`
              }
            </div>
            <div className="text-sm font-medium">• {event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
