import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckSquare, Check, X, Clock, AlertCircle, Save, CheckCircle2 } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetClass?: string;
  targetSubject?: string;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  targetClass = 'Grade 10-A',
  targetSubject = 'Mathematics',
}) => {
  const { students, currentUser, markAttendance } = useApp();

  const classStudents = students.filter((s) => s.classGrade === targetClass);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [session, setSession] = useState(targetSubject);
  const [statuses, setStatuses] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>(() => {
    const initial: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    classStudents.forEach((s) => {
      initial[s.id] = 'Present';
    });
    return initial;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: 'Present' | 'Absent' | 'Late') => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    classStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setStatuses(updated);
  };

  const handleSave = () => {
    const records: Omit<AttendanceRecord, 'id'>[] = classStudents.map((s) => ({
      studentId: s.id,
      studentName: s.name,
      classGrade: s.classGrade,
      date,
      status: statuses[s.id] || 'Present',
      sessionName: session,
      recordedBy: currentUser?.name || 'Faculty',
    }));

    markAttendance(records);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const presentCount = Object.values(statuses).filter((s) => s === 'Present').length;
  const absentCount = Object.values(statuses).filter((s) => s === 'Absent').length;
  const lateCount = Object.values(statuses).filter((s) => s === 'Late').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-sm max-w-2xl w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#1A1A1A]" />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Record Class Attendance</h3>
              <p className="text-[10px] font-mono text-black/60 uppercase tracking-wider">
                {targetClass} • {targetSubject}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs text-black/50 hover:text-black hover:bg-black/5 cursor-pointer font-mono"
          >
            ✕
          </button>
        </div>

        {/* Controls & Quick Batch */}
        <div className="p-6 pb-4 border-b border-black/10 bg-[#EDE9E1]/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Session Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-black/20 rounded-xs text-xs font-mono bg-[#FAF8F5] outline-hidden focus:border-black"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Session / Subject
              </label>
              <input
                type="text"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-full px-3 py-1.5 border border-black/20 rounded-xs text-xs bg-[#FAF8F5] outline-hidden focus:border-black"
              />
            </div>
          </div>

          {/* Quick Stats & Batch buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-black/10">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-[#1A1A1A] font-bold">Present: {presentCount}</span>
              <span className="text-black/60">Absent: {absentCount}</span>
              <span className="text-black/60">Late: {lateCount}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-black/50 text-[10px] uppercase">Batch:</span>
              <button
                type="button"
                onClick={() => handleMarkAll('Present')}
                className="px-2.5 py-1 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] uppercase font-bold hover:bg-black cursor-pointer"
              >
                All Present
              </button>
              <button
                type="button"
                onClick={() => handleMarkAll('Absent')}
                className="px-2.5 py-1 bg-[#EDE9E1] border border-black/20 text-black/80 rounded-xs text-[10px] uppercase font-bold hover:bg-black/5 cursor-pointer"
              >
                All Absent
              </button>
            </div>
          </div>
        </div>

        {/* Student Roster */}
        <div className="p-6 overflow-y-auto max-h-96 divide-y divide-black/10">
          {classStudents.length === 0 ? (
            <div className="text-center py-8 text-xs font-serif italic text-black/50">
              No students enrolled in {targetClass}.
            </div>
          ) : (
            classStudents.map((student) => {
              const currentStatus = statuses[student.id] || 'Present';
              return (
                <div
                  key={student.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-[#F4F1EA] px-3 rounded-xs transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      className="w-8 h-8 rounded-xs object-cover border border-black/20"
                      src={student.avatarUrl}
                      alt={student.name}
                    />
                    <div className="truncate">
                      <p className="font-serif font-bold text-sm text-[#1A1A1A] truncate">{student.name}</p>
                      <p className="text-[10px] text-black/50 font-mono">ID: {student.id}</p>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] uppercase">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Present')}
                      className={`px-3 py-1 font-semibold rounded-xs transition-all cursor-pointer ${
                        currentStatus === 'Present'
                          ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs'
                          : 'bg-[#EDE9E1] text-black/70 hover:bg-black/10'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Late')}
                      className={`px-3 py-1 font-semibold rounded-xs transition-all cursor-pointer ${
                        currentStatus === 'Late'
                          ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs'
                          : 'bg-[#EDE9E1] text-black/70 hover:bg-black/10'
                      }`}
                    >
                      Late
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Absent')}
                      className={`px-3 py-1 font-semibold rounded-xs transition-all cursor-pointer ${
                        currentStatus === 'Absent'
                          ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs'
                          : 'bg-[#EDE9E1] text-black/70 hover:bg-black/10'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <div className="text-xs font-mono text-black/60">
            Recorded by: <span className="font-bold text-[#1A1A1A]">{currentUser?.name}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-black/70 hover:bg-black/5 rounded-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={savedSuccess}
              className="px-5 py-2 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1A1A1A] text-[#F4F1EA] rounded-xs hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Recorded!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Submit Attendance
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
