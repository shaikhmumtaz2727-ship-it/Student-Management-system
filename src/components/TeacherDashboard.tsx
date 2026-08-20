import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  CheckSquare,
  FileEdit,
  Clock,
  Users,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { AttendanceModal } from './AttendanceModal';
import { MarksEntryModal } from './MarksEntryModal';

export const TeacherDashboard: React.FC = () => {
  const { currentUser, schedule, setActiveView } = useApp();
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState('Grade 10-A');
  const [selectedSubjectForAttendance, setSelectedSubjectForAttendance] = useState('Mathematics');

  const [selectedClassDetail, setSelectedClassDetail] = useState<{
    subject: string;
    classGrade: string;
    room: string;
    studentCount: number;
    time: string;
  } | null>(null);

  // Today's classes for Ms. Davis
  const teacherSchedule = schedule.filter((s) => s.teacherId === 'T-8901' || s.teacher.includes('Davis'));

  const handleOpenAttendanceForClass = (classGrade: string, subject: string) => {
    setSelectedClassForAttendance(classGrade);
    setSelectedSubjectForAttendance(subject);
    setIsAttendanceModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Faculty Portal • Term I Schedule
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A] tracking-tight">
            Academic Schedule for <span className="italic">{currentUser?.name || 'Ms. Davis'}</span>
          </h1>
        </div>

        <div className="text-xs font-mono text-black/80 bg-[#EDE9E1] px-3 py-1.5 rounded-xs border border-black/15 inline-flex items-center self-start md:self-auto shadow-2xs">
          <CalendarDays className="w-3.5 h-3.5 mr-2 text-[#1A1A1A]" />
          Session: October 24, 2024
        </div>
      </div>

      {/* Quick Actions (Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Mark Attendance Card */}
        <button
          type="button"
          onClick={() => handleOpenAttendanceForClass('Grade 10-A', 'Mathematics')}
          className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 flex flex-col items-center justify-center space-y-3 hover:shadow-md hover:border-black/30 transition-all group cursor-pointer text-center relative"
        >
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">ACTION 01</div>
          <div className="w-12 h-12 rounded-xs bg-[#EDE9E1] border border-black/15 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F4F1EA] transition-all duration-200">
            <CheckSquare className="w-5 h-5" />
          </div>
          <span className="font-serif text-lg font-bold text-[#1A1A1A]">Mark Attendance</span>
          <span className="text-[11px] uppercase tracking-wider text-black/50">Session Roster Verification</span>
        </button>

        {/* Enter Results Card */}
        <button
          type="button"
          onClick={() => setIsMarksModalOpen(true)}
          className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 flex flex-col items-center justify-center space-y-3 hover:shadow-md hover:border-black/30 transition-all group cursor-pointer text-center relative"
        >
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">ACTION 02</div>
          <div className="w-12 h-12 rounded-xs bg-[#EDE9E1] border border-black/15 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F4F1EA] transition-all duration-200">
            <FileEdit className="w-5 h-5" />
          </div>
          <span className="font-serif text-lg font-bold text-[#1A1A1A]">Enter Results</span>
          <span className="text-[11px] uppercase tracking-wider text-black/50">Record Assessment Scores</span>
        </button>

        {/* View Timetable Card */}
        <button
          type="button"
          onClick={() => setActiveView('timetable')}
          className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 flex flex-col items-center justify-center space-y-3 hover:shadow-md hover:border-black/30 transition-all group cursor-pointer text-center relative"
        >
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">ACTION 03</div>
          <div className="w-12 h-12 rounded-xs bg-[#EDE9E1] border border-black/15 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-[#F4F1EA] transition-all duration-200">
            <Clock className="w-5 h-5" />
          </div>
          <span className="font-serif text-lg font-bold text-[#1A1A1A]">View Timetable</span>
          <span className="text-[11px] uppercase tracking-wider text-black/50">Weekly Class Distribution</span>
        </button>
      </section>

      {/* Today's Classes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Today's Academic Sessions</h2>
            <span className="text-xs font-mono text-black/50">({teacherSchedule.length || 2} Sessions Scheduled)</span>
          </div>
          <button
            onClick={() => setActiveView('timetable')}
            className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:underline cursor-pointer"
          >
            Full Timetable →
          </button>
        </div>

        <div className="bg-[#FAF8F5] border border-black/15 rounded-sm overflow-hidden shadow-xs">
          {/* Mobile List View */}
          <div className="md:hidden divide-y divide-black/10">
            <div className="p-4 flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Grade 10-A Mathematics</h3>
                  <p className="text-xs text-black/60 flex items-center mt-1 font-mono">
                    <Clock className="w-3.5 h-3.5 mr-1 text-black/40" />
                    08:00 AM - 09:30 AM
                  </p>
                </div>
                <span className="bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs">
                  Upcoming
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-black/60 flex items-center">
                  <Users className="w-4 h-4 mr-1 text-black/40" />
                  32 Students
                </span>
                <button
                  onClick={() => handleOpenAttendanceForClass('Grade 10-A', 'Mathematics')}
                  className="text-[#1A1A1A] text-xs font-bold uppercase tracking-wider hover:underline"
                >
                  Mark Attendance →
                </button>
              </div>
            </div>

            <div className="p-4 flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Grade 11-B Advanced Calculus</h3>
                  <p className="text-xs text-black/60 flex items-center mt-1 font-mono">
                    <Clock className="w-3.5 h-3.5 mr-1 text-black/40" />
                    10:00 AM - 11:30 AM
                  </p>
                </div>
                <span className="bg-[#EDE9E1] text-black/80 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs border border-black/15">
                  Scheduled
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-black/60 flex items-center">
                  <Users className="w-4 h-4 mr-1 text-black/40" />
                  28 Students
                </span>
                <button
                  onClick={() =>
                    setSelectedClassDetail({
                      subject: 'Advanced Calculus',
                      classGrade: 'Grade 11-B',
                      room: 'Lab 2',
                      studentCount: 28,
                      time: '10:00 AM - 11:30 AM',
                    })
                  }
                  className="text-[#1A1A1A] text-xs font-bold uppercase tracking-wider hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-left">
            <thead className="bg-[#EDE9E1] border-b border-black/15">
              <tr>
                <th className="py-3 px-4 text-[10px] uppercase font-semibold text-black/70 tracking-widest">
                  Period Time
                </th>
                <th className="py-3 px-4 text-[10px] uppercase font-semibold text-black/70 tracking-widest">
                  Class & Subject
                </th>
                <th className="py-3 px-4 text-[10px] uppercase font-semibold text-black/70 tracking-widest">
                  Assigned Hall
                </th>
                <th className="py-3 px-4 text-[10px] uppercase font-semibold text-black/70 tracking-widest">
                  Enrolled Cohort
                </th>
                <th className="py-3 px-4 text-[10px] uppercase font-semibold text-black/70 tracking-widest">
                  Status
                </th>
                <th className="py-3 px-4 text-[10px] uppercase font-semibold text-black/70 tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 text-xs">
              <tr className="hover:bg-[#F4F1EA] transition-colors">
                <td className="py-4 px-4 font-mono text-xs font-bold text-[#1A1A1A]">
                  08:00 - 09:30
                </td>
                <td className="py-4 px-4">
                  <div className="font-serif font-bold text-sm text-[#1A1A1A]">Grade 10-A</div>
                  <div className="text-[11px] text-black/60">Mathematics (Period 1)</div>
                </td>
                <td className="py-4 px-4 text-black/80 font-mono">Room 302</td>
                <td className="py-4 px-4 text-black/80">
                  <div className="flex items-center text-xs font-mono">
                    <Users className="w-3.5 h-3.5 mr-1.5 text-black/50" />
                    32 Students
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase font-bold bg-[#1A1A1A] text-[#F4F1EA]">
                    Upcoming
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => handleOpenAttendanceForClass('Grade 10-A', 'Mathematics')}
                    className="bg-[#1A1A1A] text-[#F4F1EA] text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-xs hover:bg-black transition-colors cursor-pointer shadow-xs"
                  >
                    Mark Attendance
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-[#F4F1EA] transition-colors">
                <td className="py-4 px-4 font-mono text-xs font-bold text-[#1A1A1A]">
                  10:00 - 11:30
                </td>
                <td className="py-4 px-4">
                  <div className="font-serif font-bold text-sm text-[#1A1A1A]">Grade 11-B</div>
                  <div className="text-[11px] text-black/60">Advanced Calculus (Period 2)</div>
                </td>
                <td className="py-4 px-4 text-black/80 font-mono">Lab 2</td>
                <td className="py-4 px-4 text-black/80">
                  <div className="flex items-center text-xs font-mono">
                    <Users className="w-3.5 h-3.5 mr-1.5 text-black/50" />
                    28 Students
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase font-semibold bg-[#EDE9E1] border border-black/15 text-black/80">
                    Scheduled
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() =>
                      setSelectedClassDetail({
                        subject: 'Advanced Calculus',
                        classGrade: 'Grade 11-B',
                        room: 'Lab 2',
                        studentCount: 28,
                        time: '10:00 AM - 11:30 AM',
                      })
                    }
                    className="border border-black/20 text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-xs hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        targetClass={selectedClassForAttendance}
        targetSubject={selectedSubjectForAttendance}
      />

      {/* Marks Entry Modal */}
      <MarksEntryModal
        isOpen={isMarksModalOpen}
        onClose={() => setIsMarksModalOpen(false)}
      />

      {/* Class Details Modal */}
      {selectedClassDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-sm max-w-md w-full border border-black/20 shadow-2xl p-6">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">{selectedClassDetail.subject}</h3>
            <div className="space-y-2 text-xs text-black/70 mb-6 bg-[#EDE9E1] p-3 rounded-xs border border-black/10">
              <p><strong>Target Class:</strong> {selectedClassDetail.classGrade}</p>
              <p><strong>Hall Location:</strong> {selectedClassDetail.room}</p>
              <p><strong>Scheduled Time:</strong> {selectedClassDetail.time}</p>
              <p><strong>Cohort Size:</strong> {selectedClassDetail.studentCount} Students</p>
              <p><strong>Curriculum Module:</strong> Module 4 - Differential Equations</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedClassDetail(null)}
                className="px-3.5 py-2 border border-black/20 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-black/5"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const detail = selectedClassDetail;
                  setSelectedClassDetail(null);
                  handleOpenAttendanceForClass(detail.classGrade, detail.subject);
                }}
                className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-black"
              >
                Mark Attendance Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
