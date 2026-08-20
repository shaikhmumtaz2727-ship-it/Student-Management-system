import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentRecord } from '../types';
import { User, Phone, Mail, Calendar, Award, CheckSquare, Trash2, Edit, Save, CheckCircle2 } from 'lucide-react';

interface StudentDetailModalProps {
  student: StudentRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const { updateStudent, deleteStudent, results, attendance } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(student?.name || '');
  const [editedClass, setEditedClass] = useState(student?.classGrade || '');
  const [editedStatus, setEditedStatus] = useState(student?.status || 'Active');
  const [editedPhone, setEditedPhone] = useState(student?.guardianPhone || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen || !student) return null;

  const studentResults = results.filter((r) => r.studentId === student.id);
  const studentAttendance = attendance.filter((a) => a.studentId === student.id);

  const handleSaveEdits = () => {
    updateStudent(student.id, {
      name: editedName,
      classGrade: editedClass,
      status: editedStatus as 'Active' | 'On Leave' | 'Suspended',
      guardianPhone: editedPhone,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsEditing(false);
    }, 800);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to archive student record ${student.name} (${student.id})?`)) {
      deleteStudent(student.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-sm max-w-xl w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-11 h-11 rounded-xs object-cover border border-black/20"
            />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">{student.name}</h3>
              <p className="text-[10px] font-mono text-black/60 uppercase tracking-wider">
                ID: {student.id} • {student.classGrade}
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-black/70 font-sans">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#EDE9E1]/60 rounded-xs border border-black/15 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-black/60 font-semibold">Attendance</p>
              <p className="font-serif text-xl font-bold text-[#1A1A1A]">{student.attendanceRate}%</p>
            </div>
            <div className="p-3 bg-[#EDE9E1]/60 rounded-xs border border-black/15 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-black/60 font-semibold">Current GPA</p>
              <p className="font-serif text-xl font-bold text-[#1A1A1A]">{student.gpa.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-[#EDE9E1]/60 rounded-xs border border-black/15 text-center">
              <p className="text-[10px] font-mono uppercase tracking-wider text-black/60 font-semibold">Status</p>
              <span
                className="inline-block mt-1 px-2.5 py-0.5 rounded-xs font-mono text-[10px] font-bold uppercase tracking-wider bg-[#EDE9E1] border border-black/15 text-[#1A1A1A]"
              >
                {student.status}
              </span>
            </div>
          </div>

          {/* Details Form or Read View */}
          {isEditing ? (
            <div className="space-y-3 p-4 bg-[#EDE9E1]/40 border border-black/15 rounded-xs">
              <h4 className="font-serif font-bold text-[#1A1A1A] text-sm">Edit Scholar Record</h4>
              <div>
                <label className="block mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-black/70">Full Legal Name</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-black/20 rounded-xs bg-[#FAF8F5] text-xs outline-hidden focus:border-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-black/70">Class</label>
                  <select
                    value={editedClass}
                    onChange={(e) => setEditedClass(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-black/20 rounded-xs bg-[#FAF8F5] text-xs font-mono uppercase outline-hidden focus:border-black cursor-pointer"
                  >
                    <option>Grade 10-A</option>
                    <option>Grade 10-B</option>
                    <option>Grade 11-A</option>
                    <option>Grade 11-C</option>
                    <option>Grade 12-A</option>
                    <option>Grade 12-B</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-black/70">Status</label>
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 border border-black/20 rounded-xs bg-[#FAF8F5] text-xs font-mono uppercase outline-hidden focus:border-black cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-black/70">Guardian Phone</label>
                <input
                  type="text"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-black/20 rounded-xs bg-[#FAF8F5] text-xs font-mono outline-hidden focus:border-black"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-[#EDE9E1] rounded-xs text-[10px] uppercase font-bold text-black/70 hover:bg-black/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdits}
                  className="px-3 py-1 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] uppercase font-bold flex items-center gap-1 hover:bg-black cursor-pointer"
                >
                  {saved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-black/15 rounded-xs p-4 space-y-2.5 bg-[#FAF8F5]">
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="text-black/60 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-black/40" /> Academic Email:
                </span>
                <span className="font-mono text-xs text-[#1A1A1A]">{student.email}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="text-black/60 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-black/40" /> Guardian:
                </span>
                <span className="font-medium text-[#1A1A1A]">{student.guardianName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="text-black/60 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-black/40" /> Emergency Phone:
                </span>
                <span className="font-mono text-xs text-[#1A1A1A]">{student.guardianPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black/60 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-black/40" /> Enrollment Date:
                </span>
                <span className="font-mono text-xs text-[#1A1A1A]">{student.enrollmentDate}</span>
              </div>
            </div>
          )}

          {/* Academic Records */}
          <div>
            <h4 className="font-mono font-bold text-[#1A1A1A] uppercase tracking-widest mb-2 text-[10px]">
              Recent Exam Marks
            </h4>
            {studentResults.length === 0 ? (
              <p className="text-black/40 text-xs italic font-serif">No exam records recorded yet.</p>
            ) : (
              <div className="border border-black/15 rounded-xs divide-y divide-black/10 overflow-hidden">
                {studentResults.slice(0, 3).map((r) => (
                  <div key={r.id} className="p-3 flex items-center justify-between bg-[#FAF8F5] hover:bg-[#F4F1EA] transition-colors">
                    <div>
                      <p className="font-serif font-bold text-xs text-[#1A1A1A]">{r.subject}</p>
                      <p className="text-[10px] text-black/50 font-mono">{r.assessment} • {r.date}</p>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#1A1A1A]">
                      {r.score}/{r.maxScore} ({r.gradeLetter})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="text-black/60 hover:text-black text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            Archive Record
          </button>
          <div className="flex gap-3 font-mono">
            {!isEditing && (
              <button
                onClick={() => {
                  setEditedName(student.name);
                  setEditedClass(student.classGrade);
                  setEditedStatus(student.status);
                  setEditedPhone(student.guardianPhone);
                  setIsEditing(true);
                }}
                className="px-3.5 py-1.5 bg-[#FAF8F5] border border-black/20 hover:bg-black/5 rounded-xs text-xs uppercase tracking-wider font-semibold flex items-center gap-1 text-[#1A1A1A] cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-1.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
