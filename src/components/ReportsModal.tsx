import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileBarChart2, Download, CheckCircle2, FileText } from 'lucide-react';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportsModal: React.FC<ReportsModalProps> = ({ isOpen, onClose }) => {
  const { students, attendance, results, fees } = useApp();

  const [reportType, setReportType] = useState<'roster' | 'attendance' | 'grades' | 'fees'>('roster');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    let reportTitle = '';
    let reportBody = '';

    if (reportType === 'roster') {
      reportTitle = 'STUDENT ENROLLMENT ROSTER';
      const filtered =
        selectedClass === 'All Classes'
          ? students
          : students.filter((s) => s.classGrade === selectedClass);
      reportBody = `Total Students: ${filtered.length}\nGenerated: ${new Date().toLocaleString()}\n\nID\tName\tClass\tStatus\tAttendance\tGPA\tGuardian Phone\n` +
        filtered
          .map(
            (s) =>
              `${s.id}\t${s.name}\t${s.classGrade}\t${s.status}\t${s.attendanceRate}%\t${s.gpa}\t${s.guardianPhone}`
          )
          .join('\n');
    } else if (reportType === 'attendance') {
      reportTitle = 'INSTITUTIONAL ATTENDANCE SUMMARY';
      reportBody = `Generated: ${new Date().toLocaleString()}\n\nDate\tStudent\tClass\tSession\tStatus\tRecorded By\n` +
        attendance
          .map(
            (a) =>
              `${a.date}\t${a.studentName} (${a.studentId})\t${a.classGrade}\t${a.sessionName}\t${a.status}\t${a.recordedBy}`
          )
          .join('\n');
    } else if (reportType === 'grades') {
      reportTitle = 'ACADEMIC MARKS & GRADE AUDIT';
      reportBody = `Generated: ${new Date().toLocaleString()}\n\nStudent\tClass\tSubject\tAssessment\tScore\tGrade\n` +
        results
          .map(
            (r) =>
              `${r.studentName} (${r.studentId})\t${r.classGrade}\t${r.subject}\t${r.assessment}\t${r.score}/${r.maxScore}\t${r.gradeLetter}`
          )
          .join('\n');
    } else {
      reportTitle = 'FEE COLLECTION & DUES REPORT';
      reportBody = `Generated: ${new Date().toLocaleString()}\n\nStudent\tFee Item\tDue Date\tTotal Due\tPaid\tStatus\n` +
        fees
          .map(
            (f) =>
              `${f.studentName} (${f.studentId})\t${f.feeType}\t${f.dueDate}\t₹${f.amount.toLocaleString('en-IN')}\t₹${f.paidAmount.toLocaleString('en-IN')}\t${f.status}`
          )
          .join('\n');
    }

    const fullContent = `==========================================================
EDUMANAGE INSTITUTIONAL REPORT
${reportTitle}
==========================================================\n\n${reportBody}\n\n==========================================================
Academic Nexus SIS - Confidential Institutional Data`;

    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EduManage_${reportType.toUpperCase()}_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-sm max-w-lg w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1A1A1A]">
            <FileBarChart2 className="w-4 h-4" />
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Institutional Dossiers & Reports</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs text-black/50 hover:text-black hover:bg-black/5 cursor-pointer font-mono"
          >
            ✕
          </button>
        </div>

        {/* Configuration */}
        <div className="p-6 space-y-4 text-xs text-black/70 font-sans">
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-2">
              Select Report Type
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setReportType('roster')}
                className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                  reportType === 'roster'
                    ? 'border-black bg-[#EDE9E1] text-[#1A1A1A] font-bold shadow-xs'
                    : 'border-black/15 hover:bg-[#EDE9E1]/50 bg-[#FAF8F5]'
                }`}
              >
                <p className="text-xs font-serif font-bold text-[#1A1A1A]">Student Roster</p>
                <p className="text-[10px] text-black/50 font-mono mt-0.5 uppercase">Demographics & GPA</p>
              </button>

              <button
                type="button"
                onClick={() => setReportType('attendance')}
                className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                  reportType === 'attendance'
                    ? 'border-black bg-[#EDE9E1] text-[#1A1A1A] font-bold shadow-xs'
                    : 'border-black/15 hover:bg-[#EDE9E1]/50 bg-[#FAF8F5]'
                }`}
              >
                <p className="text-xs font-serif font-bold text-[#1A1A1A]">Attendance Log</p>
                <p className="text-[10px] text-black/50 font-mono mt-0.5 uppercase">Session presence</p>
              </button>

              <button
                type="button"
                onClick={() => setReportType('grades')}
                className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                  reportType === 'grades'
                    ? 'border-black bg-[#EDE9E1] text-[#1A1A1A] font-bold shadow-xs'
                    : 'border-black/15 hover:bg-[#EDE9E1]/50 bg-[#FAF8F5]'
                }`}
              >
                <p className="text-xs font-serif font-bold text-[#1A1A1A]">Assessment Results</p>
                <p className="text-[10px] text-black/50 font-mono mt-0.5 uppercase">Marks & grades</p>
              </button>

              <button
                type="button"
                onClick={() => setReportType('fees')}
                className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                  reportType === 'fees'
                    ? 'border-black bg-[#EDE9E1] text-[#1A1A1A] font-bold shadow-xs'
                    : 'border-black/15 hover:bg-[#EDE9E1]/50 bg-[#FAF8F5]'
                }`}
              >
                <p className="text-xs font-serif font-bold text-[#1A1A1A]">Fee Collection</p>
                <p className="text-[10px] text-black/50 font-mono mt-0.5 uppercase">Dues & ledger</p>
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
              Target Cohort Filter
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-black/20 rounded-xs text-xs font-mono uppercase bg-[#FAF8F5] outline-hidden focus:border-black cursor-pointer"
            >
              <option>All Classes</option>
              <option>Grade 10-A</option>
              <option>Grade 11-B</option>
              <option>Grade 11-C</option>
              <option>Grade 12-A</option>
              <option>Grade 12-B</option>
            </select>
          </div>

          <div className="p-3.5 bg-[#EDE9E1]/60 rounded-xs border border-black/15 text-xs">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] mb-1">
              Format Specification
            </p>
            <p className="text-black/70 leading-relaxed font-sans text-xs">
              Standard Tab-Delimited text output compatible with Microsoft Excel, Google Sheets, and institutional auditing archives.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-black/70 hover:bg-black/5 rounded-xs transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleExport}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1A1A1A] text-[#F4F1EA] rounded-xs hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Downloaded!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Generate Dossier
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
