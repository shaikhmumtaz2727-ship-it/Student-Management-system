import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Award,
  Hourglass,
  ArrowRight,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentUser, results, attendance, schedule, setActiveView } = useApp();
  const [showFullResults, setShowFullResults] = useState(false);
  const [showAttendanceDetails, setShowAttendanceDetails] = useState(false);

  // Student specific results (for Alex)
  const studentResults = results.filter((r) => r.studentId === '2024001');
  const recentResults = studentResults.slice(0, 3);

  // Next class from schedule
  const nextClass = schedule[2] || schedule[0]; // Advanced Physics

  const handleDownloadTranscript = () => {
    const content = `EDUMANAGE ACADEMIC TRANSCRIPT
====================================
Student: ${currentUser?.name || 'Alex Mercer'}
Student ID: ${currentUser?.studentId || '2024001'}
Grade/Section: ${currentUser?.grade || 'Grade 10-A'}
Academic Year: 2024-2025
Cumulative GPA: 3.85 / 4.0
Attendance Rate: 94.2% (On Track)

ASSESSMENT RECORDS:
${studentResults
  .map(
    (r) =>
      `- [${r.date}] ${r.subject} (${r.assessment}): ${r.score}/${r.maxScore} (Grade: ${r.gradeLetter})`
  )
  .join('\n')}

====================================
Issued by: Office of Academic Records
Digital Verification Stamp: #EM-2024-9981`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Academic_Transcript_${currentUser?.studentId || '2024001'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Student Overview • Index (01)
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A] tracking-tight">
            Welcome back, <span className="italic">{currentUser?.name?.split(' ')[0] || 'Alex'}</span>.
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono px-2.5 py-1 bg-[#EDE9E1] border border-black/15 rounded-xs text-black/80">
            Term I — Academic Year 2024–25
          </span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance Card (Primary Metric) */}
        <div
          onClick={() => setShowAttendanceDetails(true)}
          className="bg-[#FAF8F5] rounded-sm border border-black/15 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 col-span-1 md:col-span-2 shadow-xs cursor-pointer group relative"
        >
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">01 / ATTENDANCE</div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#1A1A1A]" />
              <h3 className="text-[11px] font-semibold text-black/70 uppercase tracking-widest">
                Cumulative Attendance
              </h3>
            </div>
            <span className="bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Optimal Status
            </span>
          </div>

          <div className="flex items-baseline gap-4 mt-auto">
            <span className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A]">94.2%</span>
            <span className="text-xs text-black/60 font-medium uppercase tracking-wider">Year-to-Date Ratio</span>
          </div>

          <div className="w-full bg-[#E5E2D9] rounded-none h-1.5 mt-5 overflow-hidden">
            <div
              className="bg-[#1A1A1A] h-1.5 transition-all duration-1000 ease-out"
              style={{ width: '94.2%' }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-black/60 pt-1">
            <span>Institutional Baseline: 80.0%</span>
            <span className="text-[#1A1A1A] group-hover:underline flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider">
              Inspect Log <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Next Class Card */}
        <div
          onClick={() => setActiveView('timetable')}
          className="bg-[#FAF8F5] rounded-sm border border-black/15 p-6 flex flex-col hover:shadow-md transition-all duration-200 shadow-xs relative overflow-hidden cursor-pointer group"
        >
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">02 / SCHEDULE</div>

          <div className="flex items-center gap-2 mb-6 relative z-10">
            <Clock className="w-4 h-4 text-[#1A1A1A]" />
            <h3 className="text-[11px] font-semibold text-black/70 uppercase tracking-widest">
              Upcoming Lecture
            </h3>
          </div>

          <div className="relative z-10 mt-auto">
            <p className="font-serif text-2xl font-bold text-[#1A1A1A] leading-snug">{nextClass.subject}</p>
            <p className="text-xs text-black/70 mt-1">{nextClass.room} • {nextClass.teacher}</p>
            <div className="inline-flex items-center gap-1.5 bg-[#EDE9E1] border border-black/15 text-[#1A1A1A] px-2.5 py-1 rounded-xs mt-4 text-[10px] uppercase font-mono tracking-wider font-semibold">
              <Hourglass className="w-3 h-3 text-[#1A1A1A]" />
              <span>Convenes in 15m</span>
            </div>
          </div>
        </div>

        {/* Recent Results Card */}
        <div className="bg-[#FAF8F5] rounded-sm border border-black/15 p-6 flex flex-col col-span-1 md:col-span-3 shadow-xs">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-black/10">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#1A1A1A]" />
              <h3 className="text-xs font-semibold text-black/80 uppercase tracking-widest">
                Recent Assessments & Academic Marks
              </h3>
            </div>
            <button
              onClick={() => setShowFullResults(true)}
              className="text-xs font-semibold text-[#1A1A1A] hover:underline cursor-pointer uppercase tracking-wider"
            >
              Examine Full Record →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EDE9E1] border-b border-black/10">
                  <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-black/70 font-semibold">Subject</th>
                  <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-black/70 font-semibold">Assessment</th>
                  <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-black/70 font-semibold">Session Date</th>
                  <th className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-black/70 font-semibold text-right">Score Recorded</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#1A1A1A]">
                {recentResults.map((res) => (
                  <tr
                    key={res.id}
                    className="border-b border-black/10 hover:bg-[#F4F1EA] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-serif text-sm font-bold">{res.subject}</td>
                    <td className="py-3.5 px-4 text-black/70">{res.assessment}</td>
                    <td className="py-3.5 px-4 text-black/70 font-mono text-[11px]">{res.date}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-sm">
                      {res.score} <span className="text-black/40 font-normal text-xs">/ {res.maxScore}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Results Modal */}
      {showFullResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-sm max-w-2xl w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-black/15 bg-[#EDE9E1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-xs bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center font-serif text-xs font-bold">
                  E.
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Academic Performance & Report Card</h3>
              </div>
              <button
                onClick={() => setShowFullResults(false)}
                className="text-black/60 hover:text-black text-sm font-mono"
              >
                [CLOSE]
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-[#EDE9E1] rounded-xs border border-black/10 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-black/60 font-semibold">Cumulative GPA</p>
                  <p className="font-serif text-3xl font-bold text-[#1A1A1A]">3.85</p>
                </div>
                <div className="p-3 bg-[#EDE9E1] rounded-xs border border-black/10 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-black/60 font-semibold">Cohort Rank</p>
                  <p className="font-serif text-3xl font-bold text-[#1A1A1A]">4 <span className="text-base font-normal text-black/50">/ 32</span></p>
                </div>
                <div className="p-3 bg-[#EDE9E1] rounded-xs border border-black/10 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-black/60 font-semibold">Assessments Passed</p>
                  <p className="font-serif text-3xl font-bold text-[#1A1A1A]">100%</p>
                </div>
              </div>

              {/* Complete table */}
              <div className="border border-black/15 rounded-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EDE9E1] border-b border-black/15">
                    <tr>
                      <th className="py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold text-black/70">Subject</th>
                      <th className="py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold text-black/70">Assessment</th>
                      <th className="py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold text-black/70">Date</th>
                      <th className="py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold text-center">Grade</th>
                      <th className="py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {studentResults.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F4F1EA]">
                        <td className="py-3 px-4 font-serif font-bold text-sm text-[#1A1A1A]">{r.subject}</td>
                        <td className="py-3 px-4 text-black/70">{r.assessment}</td>
                        <td className="py-3 px-4 text-black/60 font-mono text-[11px]">{r.date}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs font-mono font-bold text-xs">
                            {r.gradeLetter}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold">
                          {r.score}/{r.maxScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-black/15 bg-[#EDE9E1] flex justify-between items-center">
              <button
                onClick={handleDownloadTranscript}
                className="px-3.5 py-2 bg-[#FAF8F5] border border-black/20 hover:bg-black/5 rounded-xs text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-[#1A1A1A]"
              >
                <Download className="w-3.5 h-3.5" />
                Download Formal Transcript (.txt)
              </button>
              <button
                onClick={() => setShowFullResults(false)}
                className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-xs uppercase tracking-wider font-semibold hover:bg-black"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Detail Modal */}
      {showAttendanceDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-sm max-w-xl w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-black/15 bg-[#EDE9E1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#1A1A1A]" />
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Attendance Record Details</h3>
              </div>
              <button
                onClick={() => setShowAttendanceDetails(false)}
                className="text-black/60 hover:text-black text-sm font-mono"
              >
                [CLOSE]
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#EDE9E1] rounded-xs border border-black/10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-black/60 font-semibold">Cumulative Rate</p>
                  <p className="font-serif text-3xl font-bold text-[#1A1A1A]">94.2%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-black/60 font-semibold">Institutional Standing</p>
                  <p className="text-xs font-mono font-bold uppercase text-emerald-800">Compliant & Exemplary</p>
                </div>
              </div>

              <h4 className="text-[11px] font-bold text-black/70 uppercase tracking-widest">
                Recent Session Attendance Logs
              </h4>

              <div className="border border-black/15 rounded-xs overflow-hidden divide-y divide-black/10 text-xs">
                <div className="p-3 flex items-center justify-between hover:bg-[#F4F1EA]">
                  <div>
                    <p className="font-serif font-bold text-sm text-[#1A1A1A]">Mathematics Session</p>
                    <p className="text-[11px] text-black/60 font-mono">Oct 24, 2024 • Recorded by Ms. Davis</p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] font-mono uppercase tracking-wider">
                    Present
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-[#F4F1EA]">
                  <div>
                    <p className="font-serif font-bold text-sm text-[#1A1A1A]">Advanced Physics Lab</p>
                    <p className="text-[11px] text-black/60 font-mono">Oct 23, 2024 • Recorded by Dr. Smith</p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] font-mono uppercase tracking-wider">
                    Present
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-[#F4F1EA]">
                  <div>
                    <p className="font-serif font-bold text-sm text-[#1A1A1A]">English Literature</p>
                    <p className="text-[11px] text-black/60 font-mono">Oct 22, 2024 • Recorded by Prof. Harper</p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] font-mono uppercase tracking-wider">
                    Present
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between hover:bg-[#F4F1EA]">
                  <div>
                    <p className="font-serif font-bold text-sm text-[#1A1A1A]">Chemistry Workshop</p>
                    <p className="text-[11px] text-black/60 font-mono">Oct 19, 2024 • Recorded by Dr. Vance</p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] font-mono uppercase tracking-wider">
                    Present
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-black/15 bg-[#EDE9E1] flex justify-end">
              <button
                onClick={() => setShowAttendanceDetails(false)}
                className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-black"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
