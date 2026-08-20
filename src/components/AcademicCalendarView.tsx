import React from 'react';
import { Calendar, Clock, MapPin, Tag, Flag } from 'lucide-react';

export const AcademicCalendarView: React.FC = () => {
  const events = [
    {
      date: 'Oct 24, 2024',
      title: 'Grade 10 Mathematics Assessment & Unit Test',
      type: 'Exam',
      time: '08:00 AM - 09:30 AM',
      location: 'Hall A / Room 302',
    },
    {
      date: 'Nov 02, 2024',
      title: 'Fall Midterm Assessment Period Commences',
      type: 'Academic',
      time: '09:00 AM Daily',
      location: 'Campus-wide',
    },
    {
      date: 'Nov 15, 2024',
      title: 'Parent-Teacher Academic Conference',
      type: 'Assembly',
      time: '01:00 PM - 05:00 PM',
      location: 'Main Auditorium',
    },
    {
      date: 'Nov 28 - Nov 29, 2024',
      title: 'Thanksgiving & Institutional Recess',
      type: 'Recess',
      time: 'Campus Closed',
      location: 'All Faculties',
    },
    {
      date: 'Dec 12 - Dec 18, 2024',
      title: 'Fall Semester Final Comprehensive Examinations',
      type: 'Finals',
      time: 'Formal Exam Sessions',
      location: 'Examination Halls',
    },
    {
      date: 'Dec 22, 2024',
      title: 'End of Fall Term & Official Grade Publication',
      type: 'Milestone',
      time: '12:00 PM Publication',
      location: 'Registrar Portal',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Institutional Agenda • Academic Term I
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            Official Academic Calendar
          </h1>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono px-3 py-1.5 bg-[#EDE9E1] border border-black/15 rounded-xs text-black/80">
            Fall / Winter 2024–2025
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {events.map((evt, idx) => (
          <div
            key={idx}
            className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
          >
            <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">
              EVENT 0{idx + 1}
            </div>

            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider">
                  {evt.date}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-xs bg-[#EDE9E1] border border-black/15 text-black/80">
                {evt.type}
              </span>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-4 leading-snug">
              {evt.title}
            </h3>

            <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs text-black/60 font-mono">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1.5 text-black/40" />
                {evt.time}
              </span>
              <span className="text-black/50 text-[11px]">
                {evt.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
