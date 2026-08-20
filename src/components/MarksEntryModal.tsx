import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { ResultRecord } from '../types';

interface MarksEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarksEntryModal: React.FC<MarksEntryModalProps> = ({ isOpen, onClose }) => {
  const { students, addOrUpdateResult } = useApp();

  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [assessmentName, setAssessmentName] = useState('Chapter 4 Test: Polynomials');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().slice(0, 10));
  const [maxMarks, setMaxMarks] = useState(100);

  const classStudents = students.filter((s) => s.classGrade === selectedClass);

  const [scores, setScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    classStudents.forEach((s) => {
      initial[s.id] = 85;
    });
    return initial;
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const calculateGradeLetter = (score: number, max: number): string => {
    const pct = (score / max) * 100;
    if (pct >= 95) return 'A+';
    if (pct >= 90) return 'A';
    if (pct >= 85) return 'B+';
    if (pct >= 80) return 'B';
    if (pct >= 75) return 'C+';
    if (pct >= 70) return 'C';
    if (pct >= 60) return 'D';
    return 'F';
  };

  const handleScoreChange = (studentId: string, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setScores((prev) => ({ ...prev, [studentId]: 0 }));
      return;
    }
    if (num < 0 || num > maxMarks) {
      setError(`Score must be between 0 and ${maxMarks}.`);
      return;
    }
    setError('');
    setScores((prev) => ({ ...prev, [studentId]: num }));
  };

  const handlePublishAll = () => {
    if (!assessmentName.trim()) {
      setError('Please provide an assessment title.');
      return;
    }

    classStudents.forEach((s) => {
      const score = scores[s.id] ?? 80;
      const gradeLetter = calculateGradeLetter(score, maxMarks);
      addOrUpdateResult({
        studentId: s.id,
        studentName: s.name,
        classGrade: selectedClass,
        subject: selectedSubject,
        assessment: assessmentName,
        date: assessmentDate,
        score,
        maxScore: maxMarks,
        gradeLetter,
        published: true,
      });
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-sm max-w-2xl w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1A1A1A]">
            <Award className="w-4 h-4" />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Assessment Evaluation & Grading</h3>
              <p className="text-[10px] font-mono text-black/60 uppercase tracking-wider">Evaluation Ledger & Automated Scale</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs text-black/50 hover:text-black hover:bg-black/5 cursor-pointer font-mono"
          >
            ✕
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="p-6 pb-4 border-b border-black/10 bg-[#EDE9E1]/50 space-y-3 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Class Cohort
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-1.5 border border-black/20 rounded-xs text-xs font-mono uppercase bg-[#FAF8F5] outline-hidden focus:border-black cursor-pointer"
              >
                <option>Grade 10-A</option>
                <option>Grade 11-B</option>
                <option>Grade 11-C</option>
                <option>Grade 12-A</option>
                <option>Grade 12-B</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Discipline / Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-1.5 border border-black/20 rounded-xs text-xs bg-[#FAF8F5] outline-hidden focus:border-black cursor-pointer"
              >
                <option>Mathematics</option>
                <option>Advanced Calculus</option>
                <option>Advanced Physics</option>
                <option>English Literature</option>
                <option>Chemistry</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Maximum Score
              </label>
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value) || 100)}
                className="w-full px-3 py-1.5 border border-black/20 rounded-xs text-xs font-mono bg-[#FAF8F5] outline-hidden focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Assessment Title
              </label>
              <input
                type="text"
                value={assessmentName}
                onChange={(e) => setAssessmentName(e.target.value)}
                placeholder="e.g. Unit 3 Quiz / Midterm"
                className="w-full px-3 py-1.5 border border-black/20 rounded-xs text-xs bg-[#FAF8F5] outline-hidden focus:border-black"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Assessment Date
              </label>
              <input
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-black/20 rounded-xs text-xs font-mono bg-[#FAF8F5] outline-hidden focus:border-black"
              />
            </div>
          </div>

          {error && (
            <div className="p-2 bg-[#EDE9E1] border border-black/20 text-[#1A1A1A] font-mono text-xs rounded-xs flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              {error}
            </div>
          )}
        </div>

        {/* Student Marks List */}
        <div className="p-6 overflow-y-auto max-h-96 divide-y divide-black/10">
          {classStudents.map((student) => {
            const currentScore = scores[student.id] ?? 85;
            const letter = calculateGradeLetter(currentScore, maxMarks);
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

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max={maxMarks}
                      value={currentScore}
                      onChange={(e) => handleScoreChange(student.id, e.target.value)}
                      className="w-18 px-2 py-1 text-right font-mono text-xs border border-black/20 rounded-xs bg-[#FAF8F5] focus:border-black outline-hidden font-bold"
                    />
                    <span className="text-[10px] text-black/50 font-mono">/ {maxMarks}</span>
                  </div>

                  <span
                    className="w-10 text-center py-0.5 rounded-xs text-[10px] font-mono font-bold bg-[#EDE9E1] border border-black/15 text-black/80 uppercase"
                  >
                    {letter}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/15 bg-[#EDE9E1] flex items-center justify-between font-mono">
          <p className="text-[10px] uppercase text-black/60 tracking-wider">
            Evaluation Rule: 4.0 Standard Scale
          </p>
          <div className="flex gap-3 font-sans">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-black/70 hover:bg-black/5 rounded-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePublishAll}
              disabled={success}
              className="px-5 py-2 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1A1A1A] text-[#F4F1EA] rounded-xs hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Published!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save & Publish
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
