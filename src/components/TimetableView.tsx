import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, User, Calendar, BookOpen } from 'lucide-react';

export const TimetableView: React.FC = () => {
  const { schedule, currentRole, currentUser } = useApp();
  const [selectedDay, setSelectedDay] = useState('Tuesday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSchedule = schedule.filter((s) => {
    if (currentRole === 'teacher') {
      return s.teacherId === 'T-8901' || s.teacher.includes('Davis');
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Curriculum Structure • Schedule (03)
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            Academic Timetable & Lecture Roster
          </h1>
        </div>

        {/* Day selector pills */}
        <div className="flex items-center gap-1 bg-[#EDE9E1] p-1 rounded-xs border border-black/15 shadow-2xs self-start md:self-auto">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                selectedDay === d
                  ? 'bg-[#1A1A1A] text-[#F4F1EA] font-bold shadow-2xs'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
              }`}
            >
              {d.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule timeline cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchedule.map((item, idx) => (
          <div
            key={item.id}
            className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
          >
            <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">
              PERIOD 0{idx + 1}
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1A1A1A] bg-[#EDE9E1] px-2.5 py-1 rounded-xs border border-black/15">
                  <Clock className="w-3.5 h-3.5" />
                  {item.startTime} - {item.endTime}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-xs ${
                    item.status === 'Upcoming'
                      ? 'bg-[#1A1A1A] text-[#F4F1EA]'
                      : 'bg-[#EDE9E1] text-black/70 border border-black/15'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-[#1A1A1A] mb-1">{item.subject}</h3>
              <p className="text-xs text-black/60 font-mono font-medium">{item.classGrade}</p>
            </div>

            <div className="pt-4 mt-5 border-t border-black/10 flex items-center justify-between text-xs text-black/70 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-black/40" />
                {item.room}
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#1A1A1A]">
                <User className="w-3.5 h-3.5 text-black/40" />
                {item.teacher}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
