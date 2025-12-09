'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface AcademicEvent {
  title: string;
  startDate: string;
  endDate: string;
  eventType: string;
}

export default function HeroSection() {
  const [events, setEvents] = useState<AcademicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/data/academic_calendar.csv');
        const csvText = await response.text();
        
        const lines = csvText.split('\n').slice(1);
        const today = new Date();
        const sevenDaysLater = new Date(today);
        sevenDaysLater.setDate(today.getDate() + 14); // 일정 2주까지
        
        const relevantEvents: AcademicEvent[] = [];
        
        lines.forEach(line => {
          if (!line.trim()) return;
          
          const columns = line.split(',');
          const startDate = new Date(columns[1]);
          const title = columns[5];
          const eventType = columns[4];
          
          if (startDate >= today && startDate <= sevenDaysLater) {
            relevantEvents.push({
              title,
              startDate: columns[1],
              endDate: columns[2],
              eventType,
            });
          }
        });
        
        setEvents(relevantEvents.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('학사일정 불러오기 실패:', error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      {/* Buddy 소개 */}
      <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-gray-100">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src="/bear.jpeg"
            alt="버디 곰"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-gray-800 mb-0.5">안녕, 난 버디야! 🐻</h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            학교 공식 정보부터 대학 생활 꿀팁까지, 뭐든지 물어봐!<br />
            (챗봇 답변은 참고용이며, 공식 정보와 다를 수 있어요.)
          </p>
        </div>
      </div>

      {/* 중요 일정 */}
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-full"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <span className="text-base mr-1.5">💡</span>
            <h3 className="text-xs font-semibold text-gray-700">버디의 한마디</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            현재 다가오는 중요 일정이 없어요. 편안한 학기를 보내고 있네요! 😊
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-2">
            <span className="text-base mr-1.5">🔥</span>
            <h3 className="text-sm font-bold text-gray-800">중요 일정</h3>
          </div>
          
          <div className="space-y-2">
            {events.map((event, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-xs font-medium text-gray-700 mb-0.5">
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
                <div className="text-xs text-gray-600">{event.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
