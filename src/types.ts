export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  studentId?: string;
  teacherId?: string;
  grade?: string;
  department?: string;
}

export interface StudentRecord {
  id: string; // e.g. "2024001"
  name: string;
  email: string;
  classGrade: string; // e.g. "Grade 10-A"
  status: 'Active' | 'On Leave' | 'Suspended';
  attendanceRate: number; // percentage, e.g. 94.2
  gpa: number; // e.g. 3.85
  guardianName: string;
  guardianPhone: string;
  enrollmentDate: string;
  avatarUrl: string;
}

export interface TeacherRecord {
  id: string; // e.g. "T-8901"
  name: string;
  email: string;
  department: string;
  subjects: string[];
  assignedClasses: string[];
  avatarUrl: string;
}

export interface ClassScheduleItem {
  id: string;
  subject: string;
  classGrade: string;
  room: string;
  teacher: string;
  teacherId: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  studentCount: number;
  status: 'Upcoming' | 'Scheduled' | 'Completed' | 'In Progress';
}

export interface ResultRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  subject: string;
  assessment: string;
  date: string;
  score: number;
  maxScore: number;
  gradeLetter: string;
  published: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  sessionName: string;
  recordedBy: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidAmount: number;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  lastPaymentDate?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
  targetRole?: UserRole | 'all';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  targetEntity: string;
  details: string;
}
