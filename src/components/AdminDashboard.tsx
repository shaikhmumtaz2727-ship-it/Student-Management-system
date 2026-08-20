import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentRecord, TeacherRecord } from '../types';
import {
  TrendingUp,
  BarChart2,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Users,
  GraduationCap,
  CreditCard,
  Database,
  Award,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  Layers,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { AddStudentModal } from './AddStudentModal';
import { StudentDetailModal } from './StudentDetailModal';
import { ReportsModal } from './ReportsModal';

export const AdminDashboard: React.FC = () => {
  const { students, teachers, fees, auditLogs, triggerBackup, deleteStudent } = useApp();

  const [activeTab, setActiveTab] = useState<'students' | 'faculty' | 'analytics' | 'finance' | 'audit'>('students');

  // Search & Filters for Students
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFiltersPopover, setShowFiltersPopover] = useState(false);

  // Modals
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentRecord | null>(null);
  const [activeMenuStudentId, setActiveMenuStudentId] = useState<string | null>(null);

  // Backup state
  const [backupTriggered, setBackupTriggered] = useState(false);

  // Reminder state
  const [reminderSentStudentId, setReminderSentStudentId] = useState<string | null>(null);

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      classFilter === 'All Classes' ||
      (classFilter === 'Grade 10' && s.classGrade.startsWith('Grade 10')) ||
      (classFilter === 'Grade 11' && s.classGrade.startsWith('Grade 11')) ||
      (classFilter === 'Grade 12' && s.classGrade.startsWith('Grade 12')) ||
      s.classGrade === classFilter;

    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE) || 1;
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Calculate metrics
  const avgAttendance = (
    students.reduce((acc, s) => acc + s.attendanceRate, 0) / (students.length || 1)
  ).toFixed(1);

  const avgGPA = (
    students.reduce((acc, s) => acc + s.gpa, 0) / (students.length || 1)
  ).toFixed(2);

  const totalCollectedFees = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalInvoicedFees = fees.reduce((acc, f) => acc + f.amount, 0);
  const feeRealization = totalInvoicedFees > 0 ? Math.round((totalCollectedFees / totalInvoicedFees) * 100) : 100;

  const handleSnapshot = () => {
    triggerBackup();
    setBackupTriggered(true);
    setTimeout(() => setBackupTriggered(false), 3000);
  };

  const handleSendFeeReminder = (studentId: string) => {
    setReminderSentStudentId(studentId);
    setTimeout(() => setReminderSentStudentId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Institutional Registry • Administration Control Center
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A] tracking-tight">
            Administrative Governance & Operations
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSnapshot}
            className="text-xs font-mono uppercase tracking-wider px-3.5 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs text-[#1A1A1A] hover:bg-black/5 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {backupTriggered ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Snapshot Verified
              </>
            ) : (
              <>
                <Database className="w-3.5 h-3.5 text-black/60" />
                Backup Snapshot
              </>
            )}
          </button>
          <span className="text-xs font-mono px-3 py-2 bg-[#EDE9E1] border border-black/15 rounded-xs text-black/80">
            AY 2024–25 • Term II
          </span>
        </div>
      </div>

      {/* Bento Grid High-Level Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Scholars */}
        <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 flex flex-col justify-between shadow-xs relative">
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">METRIC 01</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-black/60" />
              <p className="text-[10px] font-mono font-bold text-black/60 uppercase tracking-widest">
                Enrolled Scholars
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {(1248 + students.length - 7).toLocaleString()}
            </h2>
          </div>
          <div className="mt-3 flex items-center justify-between text-black/70 font-mono text-[11px] pt-2 border-t border-black/10">
            <span>Active: {students.filter((s) => s.status === 'Active').length + 1240}</span>
            <span className="text-emerald-700 font-bold">+24 matriculated</span>
          </div>
        </div>

        {/* Metric 2: Faculty & Departments */}
        <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 flex flex-col justify-between shadow-xs relative">
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">METRIC 02</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-black/60" />
              <p className="text-[10px] font-mono font-bold text-black/60 uppercase tracking-widest">
                Faculty & Staff
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {teachers.length + 42}
            </h2>
          </div>
          <div className="mt-3 flex items-center justify-between text-black/70 font-mono text-[11px] pt-2 border-t border-black/10">
            <span>6 Academic Depts</span>
            <span className="text-black/60">100% Assigned</span>
          </div>
        </div>

        {/* Metric 3: Fee Realization */}
        <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 flex flex-col justify-between shadow-xs relative">
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">METRIC 03</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-black/60" />
              <p className="text-[10px] font-mono font-bold text-black/60 uppercase tracking-widest">
                Fee Collection Rate
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {feeRealization}%
            </h2>
          </div>
          <div className="mt-3 flex items-center justify-between text-black/70 font-mono text-[11px] pt-2 border-t border-black/10">
            <span>₹{totalCollectedFees.toLocaleString('en-IN')} Collected</span>
            <span className="text-amber-700 font-semibold">₹{(totalInvoicedFees - totalCollectedFees).toLocaleString('en-IN')} Due</span>
          </div>
        </div>

        {/* Metric 4: Institutional GPA & Attendance */}
        <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 flex flex-col justify-between shadow-xs relative">
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">METRIC 04</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-black/60" />
              <p className="text-[10px] font-mono font-bold text-black/60 uppercase tracking-widest">
                Academic Vitality
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {avgGPA} <span className="text-lg font-normal text-black/50 font-mono">GPA</span>
            </h2>
          </div>
          <div className="mt-3 flex items-center justify-between text-black/70 font-mono text-[11px] pt-2 border-t border-black/10">
            <span>Attd Rate: {avgAttendance}%</span>
            <span className="text-emerald-700 font-semibold">Exemplary</span>
          </div>
        </div>
      </div>

      {/* Admin Sub-Navigation Tabs */}
      <div className="border-b border-black/15 bg-[#EDE9E1] p-1.5 rounded-sm flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'students'
              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-bold shadow-xs'
              : 'text-black/70 hover:text-black hover:bg-black/5'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>01. Student Roster ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('faculty')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'faculty'
              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-bold shadow-xs'
              : 'text-black/70 hover:text-black hover:bg-black/5'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>02. Faculty Directorate ({teachers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-bold shadow-xs'
              : 'text-black/70 hover:text-black hover:bg-black/5'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>03. Cohort Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'finance'
              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-bold shadow-xs'
              : 'text-black/70 hover:text-black hover:bg-black/5'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>04. Financial Ledger</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-bold shadow-xs'
              : 'text-black/70 hover:text-black hover:bg-black/5'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>05. Audit Trail ({auditLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Student Roster & Matriculation */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">Student Scholar Directory</h3>
              <p className="text-xs text-black/60">
                Official institutional roster, enrollment status, academic GPA, and student contact dossier.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsReportsOpen(true)}
                className="bg-[#EDE9E1] text-[#1A1A1A] border border-black/20 text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-xs hover:bg-black/5 transition-colors flex items-center gap-2 cursor-pointer flex-1 sm:flex-initial"
              >
                <BarChart2 className="w-4 h-4 text-[#1A1A1A]" />
                Export Dossier
              </button>
              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="bg-[#1A1A1A] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded-xs hover:bg-black transition-colors flex items-center gap-2 shadow-xs cursor-pointer flex-1 sm:flex-initial"
              >
                <UserPlus className="w-4 h-4" />
                Matriculate Scholar
              </button>
            </div>
          </div>

          {/* Data Section */}
          <div className="bg-[#FAF8F5] border border-black/15 rounded-sm overflow-hidden flex flex-col shadow-xs">
            {/* Toolbar */}
            <div className="p-4 border-b border-black/15 bg-[#EDE9E1] flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by scholar name, email, or registry ID..."
                  className="w-full pl-9 pr-4 h-10 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs outline-hidden focus:border-black transition-all"
                />
              </div>

              <div className="flex gap-3 w-full md:w-auto relative">
                <select
                  value={classFilter}
                  onChange={(e) => {
                    setClassFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 bg-[#FAF8F5] border border-black/20 rounded-xs px-3 text-xs uppercase font-mono tracking-wider outline-hidden focus:border-black flex-1 md:flex-none cursor-pointer"
                >
                  <option>All Classes</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                  <option>Grade 10-A</option>
                  <option>Grade 11-B</option>
                  <option>Grade 11-C</option>
                  <option>Grade 12-A</option>
                  <option>Grade 12-B</option>
                </select>

                <button
                  onClick={() => setShowFiltersPopover(!showFiltersPopover)}
                  className="h-10 px-4 bg-[#FAF8F5] border border-black/20 rounded-xs flex items-center gap-2 hover:bg-black/5 transition-colors text-xs font-semibold uppercase tracking-wider text-black/80 cursor-pointer font-mono"
                >
                  <Filter className="w-3.5 h-3.5 text-black/60" />
                  <span>Status: {statusFilter}</span>
                </button>

                {showFiltersPopover && (
                  <div className="absolute right-0 top-12 w-56 bg-[#FAF8F5] border border-black/20 rounded-xs shadow-xl z-20 p-3 text-xs animate-fadeIn">
                    <p className="font-serif font-bold text-[#1A1A1A] mb-2 uppercase text-[10px] tracking-wider">
                      Status Filter
                    </p>
                    <div className="space-y-1 font-mono">
                      {['All', 'Active', 'On Leave'].map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            setStatusFilter(st);
                            setShowFiltersPopover(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xs text-xs ${
                            statusFilter === st
                              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold'
                              : 'hover:bg-[#EDE9E1] text-black/80'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dense Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EDE9E1] border-b border-black/15">
                    <th className="p-3.5 pl-6 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">ID</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Scholar Name</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Cohort</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">GPA</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Attendance</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Status</th>
                    <th className="p-3.5 pr-6 text-[10px] uppercase font-semibold text-black/70 tracking-widest text-right font-mono">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-[#1A1A1A]">
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-black/50 text-xs italic font-serif">
                        No matching student records found in registry.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-black/10 hover:bg-[#F4F1EA] transition-colors"
                      >
                        <td className="p-3.5 pl-6 font-mono text-black/60 font-medium">{student.id}</td>
                        <td className="p-3.5 font-serif font-bold text-sm text-[#1A1A1A]">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={student.avatarUrl}
                              alt={student.name}
                              className="w-7 h-7 rounded-xs object-cover border border-black/20"
                            />
                            <div>
                              <span>{student.name}</span>
                              <span className="block text-[10px] text-black/50 font-mono font-normal">
                                {student.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-black/80 font-mono">{student.classGrade}</td>
                        <td className="p-3.5 font-mono font-bold text-black/90">{student.gpa.toFixed(2)}</td>
                        <td className="p-3.5 font-mono">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#EDE9E1] rounded-full overflow-hidden border border-black/10">
                              <div
                                className="h-full bg-[#1A1A1A]"
                                style={{ width: `${Math.min(100, student.attendanceRate)}%` }}
                              />
                            </div>
                            <span className="text-[11px]">{student.attendanceRate}%</span>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase tracking-wider font-semibold ${
                              student.status === 'Active'
                                ? 'bg-[#1A1A1A] text-[#F4F1EA]'
                                : 'bg-[#EDE9E1] text-black/70 border border-black/15'
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="p-3.5 pr-6 text-right relative">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedStudentForModal(student)}
                              className="p-1.5 text-black/70 hover:text-black hover:bg-black/5 rounded-xs cursor-pointer"
                              title="View & Edit Record"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Archive/delete record for ${student.name}?`)) {
                                  deleteStudent(student.id);
                                }
                              }}
                              className="p-1.5 text-black/40 hover:text-red-700 hover:bg-black/5 rounded-xs cursor-pointer"
                              title="Archive Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-black/15 bg-[#EDE9E1] flex items-center justify-between text-xs text-black/70 font-mono">
              <span>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}-
                {Math.min(currentPage * PAGE_SIZE, filteredStudents.length)} of{' '}
                {filteredStudents.length} Active Records
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-xs border border-black/20 bg-[#FAF8F5] text-black/70 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-xs border border-black/20 bg-[#FAF8F5] text-[#1A1A1A] hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Faculty & Department Directorate */}
      {activeTab === 'faculty' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-2">
            <div>
              <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">Faculty Directorate & Staff Directory</h3>
              <p className="text-xs text-black/60">
                Departmental chairs, active professorships, teaching loads, and subject assignments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher.avatarUrl}
                        alt={teacher.name}
                        className="w-11 h-11 rounded-xs object-cover border border-black/20"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#1A1A1A]">{teacher.name}</h4>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-black/50">
                          {teacher.id} • {teacher.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs pt-3 border-t border-black/10 font-sans">
                    <div className="flex items-center gap-2 text-black/70">
                      <Mail className="w-3.5 h-3.5 text-black/40" />
                      <span className="font-mono text-[11px]">{teacher.email}</span>
                    </div>

                    <div className="mt-3">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-black/50 mb-1">
                        Instructional Disciplines
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map((sub) => (
                          <span
                            key={sub}
                            className="px-2 py-0.5 bg-[#EDE9E1] border border-black/15 text-black/80 rounded-xs text-[10px] font-mono"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-black/50 mb-1">
                        Assigned Cohorts
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {teacher.assignedClasses.map((cls) => (
                          <span
                            key={cls}
                            className="px-2 py-0.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] font-mono"
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-800 font-semibold text-[10px] uppercase">Active Instruction</span>
                  <span className="text-black/50 text-[10px]">18 Contact Hrs/Wk</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Academic Analytics & Cohort Benchmarks */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">Academic Performance & Cohort Benchmarks</h3>
            <p className="text-xs text-black/60">
              Cross-cohort GPA comparisons, subject retention trends, and attendance correlations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Grade 10 Benchmark */}
            <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black/70">Cohort Grade 10</span>
                <span className="text-xs font-mono bg-[#EDE9E1] border border-black/15 px-2 py-0.5 rounded-xs">3.82 GPA</span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-1">94.6% Avg Attendance</h4>
              <p className="text-xs text-black/60 mb-4">420 Enrolled Scholars • Mathematics & Sciences lead performance index.</p>
              <div className="w-full bg-[#EDE9E1] h-2 rounded-full overflow-hidden border border-black/10">
                <div className="bg-[#1A1A1A] h-full" style={{ width: '94.6%' }}></div>
              </div>
            </div>

            {/* Grade 11 Benchmark */}
            <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black/70">Cohort Grade 11</span>
                <span className="text-xs font-mono bg-[#EDE9E1] border border-black/15 px-2 py-0.5 rounded-xs">3.90 GPA</span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-1">96.8% Avg Attendance</h4>
              <p className="text-xs text-black/60 mb-4">395 Enrolled Scholars • Advanced Placement cohort shows 98% pass rate.</p>
              <div className="w-full bg-[#EDE9E1] h-2 rounded-full overflow-hidden border border-black/10">
                <div className="bg-[#1A1A1A] h-full" style={{ width: '96.8%' }}></div>
              </div>
            </div>

            {/* Grade 12 Benchmark */}
            <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black/70">Cohort Grade 12</span>
                <span className="text-xs font-mono bg-[#EDE9E1] border border-black/15 px-2 py-0.5 rounded-xs">3.58 GPA</span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-1">90.9% Avg Attendance</h4>
              <p className="text-xs text-black/60 mb-4">433 Graduating Candidates • University entrance preparation in progress.</p>
              <div className="w-full bg-[#EDE9E1] h-2 rounded-full overflow-hidden border border-black/10">
                <div className="bg-[#1A1A1A] h-full" style={{ width: '90.9%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Financial Governance & Fee Ledger */}
      {activeTab === 'finance' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">Institutional Bursary & Fee Governance</h3>
              <p className="text-xs text-black/60">
                Track receivables, outstanding dues, and issue institutional reminders.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-black/15 rounded-sm overflow-hidden shadow-xs">
            <div className="p-4 bg-[#EDE9E1] border-b border-black/15 flex items-center justify-between">
              <h4 className="font-serif font-bold text-lg text-[#1A1A1A]">Student Tuition & Fee Ledger</h4>
              <span className="font-mono text-xs font-semibold text-black/70">
                Collection Ratio: {feeRealization}%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#EDE9E1] border-b border-black/15">
                  <tr>
                    <th className="p-3.5 pl-6 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Scholar</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Fee Category</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Invoiced</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Paid</th>
                    <th className="p-3.5 text-[10px] uppercase font-semibold text-black/70 tracking-widest font-mono">Status</th>
                    <th className="p-3.5 pr-6 text-[10px] uppercase font-semibold text-black/70 tracking-widest text-right font-mono">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 text-xs">
                  {fees.map((fee) => (
                    <tr key={fee.id} className="hover:bg-[#F4F1EA] transition-colors">
                      <td className="p-3.5 pl-6 font-serif font-bold text-sm text-[#1A1A1A]">
                        {fee.studentName}
                        <span className="block text-[10px] font-mono font-normal text-black/50">
                          {fee.classGrade} • ID: {fee.studentId}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-black/80">{fee.feeType}</td>
                      <td className="p-3.5 font-mono font-bold text-black/90">₹{fee.amount.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 font-mono text-emerald-800 font-bold">₹{fee.paidAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase tracking-wider font-semibold ${
                            fee.status === 'Paid'
                              ? 'bg-[#1A1A1A] text-[#F4F1EA]'
                              : fee.status === 'Partial'
                              ? 'bg-[#EDE9E1] text-amber-900 border border-black/15'
                              : 'bg-red-100 text-red-900 border border-red-200'
                          }`}
                        >
                          {fee.status}
                        </span>
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        {fee.status !== 'Paid' ? (
                          <button
                            onClick={() => handleSendFeeReminder(fee.studentId)}
                            className="px-2.5 py-1 bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-mono uppercase tracking-wider rounded-xs hover:bg-black transition-colors cursor-pointer"
                          >
                            {reminderSentStudentId === fee.studentId ? 'Dispatched!' : 'Send Notice'}
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-emerald-800 font-semibold">Cleared</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Audit & Security Ledger */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">Immutable Security & Activity Audit</h3>
              <p className="text-xs text-black/60">
                Cryptographically signed ledger of administrative mutations, grading actions, and backups.
              </p>
            </div>
            <button
              onClick={handleSnapshot}
              className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider rounded-xs hover:bg-black transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Database className="w-3.5 h-3.5 text-white" />
              Capture System Snapshot
            </button>
          </div>

          <div className="bg-[#FAF8F5] border border-black/15 rounded-sm overflow-hidden shadow-xs">
            <div className="p-4 bg-[#EDE9E1] border-b border-black/15">
              <h4 className="font-serif font-bold text-lg text-[#1A1A1A]">Recent Activity Stream</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#EDE9E1] border-b border-black/15 font-mono text-[10px] uppercase tracking-widest text-black/70">
                  <tr>
                    <th className="p-3.5 pl-6">Timestamp</th>
                    <th className="p-3.5">Actor</th>
                    <th className="p-3.5">Action Code</th>
                    <th className="p-3.5">Target Entity</th>
                    <th className="p-3.5 pr-6">Mutation Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 font-sans">
                  {auditLogs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="hover:bg-[#F4F1EA] transition-colors">
                      <td className="p-3.5 pl-6 font-mono text-[11px] text-black/60">{log.timestamp}</td>
                      <td className="p-3.5 font-serif font-bold text-sm text-[#1A1A1A]">
                        {log.actor}
                        <span className="block text-[10px] text-black/50 font-mono font-normal uppercase">{log.actorRole}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#EDE9E1] text-black/80 border border-black/15 rounded-xs">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-black/80">{log.targetEntity}</td>
                      <td className="p-3.5 pr-6 text-black/70 max-w-sm truncate text-xs">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} />
      <StudentDetailModal
        student={selectedStudentForModal}
        isOpen={!!selectedStudentForModal}
        onClose={() => setSelectedStudentForModal(null)}
      />
      <ReportsModal isOpen={isReportsOpen} onClose={() => setIsReportsOpen(false)} />
    </div>
  );
};
