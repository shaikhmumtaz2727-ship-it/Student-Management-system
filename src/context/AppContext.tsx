import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  StudentRecord,
  TeacherRecord,
  ClassScheduleItem,
  ResultRecord,
  AttendanceRecord,
  FeeRecord,
  AppNotification,
  AuditLog,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_SCHEDULE,
  INITIAL_RESULTS,
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole | null;
  activeView: string;
  setActiveView: (view: string) => void;
  login: (role: UserRole) => void;
  loginAsAdmin: (email: string, pass: string, remember: boolean) => { success: boolean; error?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;

  // Data states
  students: StudentRecord[];
  teachers: TeacherRecord[];
  schedule: ClassScheduleItem[];
  results: ResultRecord[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  notifications: AppNotification[];
  auditLogs: AuditLog[];

  // Mutators
  addStudent: (student: Omit<StudentRecord, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<StudentRecord>) => void;
  deleteStudent: (id: string) => void;
  markAttendance: (records: Omit<AttendanceRecord, 'id'>[]) => void;
  addOrUpdateResult: (result: Omit<ResultRecord, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  triggerBackup: () => void;
  addFeePayment: (studentId: string, amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedLocal = localStorage.getItem('edumanage_user');
    if (savedLocal) {
      try {
        return JSON.parse(savedLocal);
      } catch (e) {
        // ignore
      }
    }
    const savedSession = sessionStorage.getItem('edumanage_user');
    if (savedSession) {
      try {
        return JSON.parse(savedSession);
      } catch (e) {
        // ignore
      }
    }
    return null; // Prompt for login on startup
  });

  const [activeView, setActiveView] = useState<string>('dashboard');

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('edumanage_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<TeacherRecord[]>(() => {
    const saved = localStorage.getItem('edumanage_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [schedule, setSchedule] = useState<ClassScheduleItem[]>(() => {
    const saved = localStorage.getItem('edumanage_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  const [results, setResults] = useState<ResultRecord[]>(() => {
    const saved = localStorage.getItem('edumanage_results');
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('edumanage_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [fees, setFees] = useState<FeeRecord[]>(() => {
    const saved = localStorage.getItem('edumanage_fees');
    return saved ? JSON.parse(saved) : INITIAL_FEES;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('edumanage_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('edumanage_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edumanage_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('edumanage_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('edumanage_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('edumanage_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('edumanage_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('edumanage_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const login = (role: UserRole) => {
    const user = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    localStorage.setItem('edumanage_user', JSON.stringify(user));
    setCurrentUser(user);
    setActiveView('dashboard');
  };

  const loginAsAdmin = (emailInput: string, passwordInput: string, remember: boolean) => {
    const trimmedEmail = emailInput.trim();
    const trimmedPassword = passwordInput.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    const isValidEmail =
      trimmedEmail.toLowerCase() === 'admin@edumanage.com' ||
      trimmedEmail.toLowerCase() === 'admin' ||
      trimmedEmail.toLowerCase() === 'admin@institution.edu';

    const isValidPassword = trimmedPassword === 'admin123';

    if (!isValidEmail || !isValidPassword) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const adminUser = INITIAL_USERS.find((u) => u.role === 'admin') || {
      id: 'user-admin',
      name: 'Dr. Arthur Vance',
      email: 'admin@edumanage.com',
      role: 'admin' as UserRole,
      department: 'Academic Affairs',
      avatarUrl: INITIAL_USERS[2]?.avatarUrl,
    };

    if (remember) {
      localStorage.setItem('edumanage_user', JSON.stringify(adminUser));
      localStorage.setItem('edumanage_remember_email', trimmedEmail);
      sessionStorage.removeItem('edumanage_user');
    } else {
      sessionStorage.setItem('edumanage_user', JSON.stringify(adminUser));
      localStorage.removeItem('edumanage_user');
    }

    setCurrentUser(adminUser);
    setActiveView('dashboard');

    // Add audit log
    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: adminUser.name,
      actorRole: 'admin',
      action: 'ADMIN_AUTHENTICATED',
      targetEntity: 'Admin Portal Session',
      details: 'Administrator successfully authenticated into Student Management System.',
    };
    setAuditLogs((prev) => [log, ...prev]);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('edumanage_user');
    sessionStorage.removeItem('edumanage_user');
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  const switchRole = (role: UserRole) => {
    const user = INITIAL_USERS.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
      setActiveView('dashboard');
    }
  };

  const addStudent = (studentData: Omit<StudentRecord, 'id'>) => {
    const newId = (2024000 + students.length + 1).toString();
    const newStudent: StudentRecord = {
      ...studentData,
      id: newId,
    };
    setStudents((prev) => [newStudent, ...prev]);

    // Add audit log
    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: currentUser?.name || 'Administrator',
      actorRole: currentUser?.role || 'admin',
      action: 'CREATE_STUDENT',
      targetEntity: `Student ID: ${newId}`,
      details: `Enrolled student ${newStudent.name} in ${newStudent.classGrade}.`,
    };
    setAuditLogs((prev) => [log, ...prev]);

    // Add notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Student Enrolled',
      message: `${newStudent.name} (${newStudent.classGrade}) added to institution roster.`,
      time: 'Just now',
      read: false,
      type: 'info',
      targetRole: 'all',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateStudent = (id: string, updates: Partial<StudentRecord>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: currentUser?.name || 'Administrator',
      actorRole: currentUser?.role || 'admin',
      action: 'UPDATE_STUDENT',
      targetEntity: `Student ID: ${id}`,
      details: `Updated record fields for student ID ${id}.`,
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const deleteStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: currentUser?.name || 'Administrator',
      actorRole: currentUser?.role || 'admin',
      action: 'DELETE_STUDENT',
      targetEntity: `Student ID: ${id}`,
      details: `Archived/deleted record for student ${student?.name || id}.`,
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const markAttendance = (records: Omit<AttendanceRecord, 'id'>[]) => {
    const newRecords: AttendanceRecord[] = records.map((r, i) => ({
      ...r,
      id: `att-${Date.now()}-${i}`,
    }));
    setAttendance((prev) => [...newRecords, ...prev]);

    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: currentUser?.name || 'Teacher',
      actorRole: currentUser?.role || 'teacher',
      action: 'RECORD_ATTENDANCE',
      targetEntity: records[0]?.classGrade || 'Class Session',
      details: `Recorded attendance for ${records.length} students.`,
    };
    setAuditLogs((prev) => [log, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Attendance Submitted',
      message: `Attendance recorded for ${records[0]?.classGrade} by ${currentUser?.name}.`,
      time: 'Just now',
      read: false,
      type: 'success',
      targetRole: 'all',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const addOrUpdateResult = (resultData: Omit<ResultRecord, 'id'>) => {
    const newResult: ResultRecord = {
      ...resultData,
      id: `res-${Date.now()}`,
    };
    setResults((prev) => [newResult, ...prev]);

    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: currentUser?.name || 'Teacher',
      actorRole: currentUser?.role || 'teacher',
      action: 'PUBLISH_RESULTS',
      targetEntity: `${resultData.subject} - ${resultData.assessment}`,
      details: `Entered score ${resultData.score}/${resultData.maxScore} (${resultData.gradeLetter}) for ${resultData.studentName}.`,
    };
    setAuditLogs((prev) => [log, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Assessment Results Published',
      message: `Results for ${resultData.subject} (${resultData.assessment}) are now available.`,
      time: 'Just now',
      read: false,
      type: 'info',
      targetRole: 'student',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const triggerBackup = () => {
    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: currentUser?.name || 'Administrator',
      actorRole: currentUser?.role || 'admin',
      action: 'DATABASE_BACKUP',
      targetEntity: 'Production MySQL Cluster',
      details: 'Full snapshot backup verified and archived (68.4 MB).',
    };
    setAuditLogs((prev) => [log, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Database Backup Completed',
      message: 'System recovery snapshot created successfully and verified.',
      time: 'Just now',
      read: false,
      type: 'success',
      targetRole: 'admin',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const addFeePayment = (studentId: string, amount: number) => {
    setFees((prev) =>
      prev.map((f) => {
        if (f.studentId === studentId && f.status !== 'Paid') {
          const newPaid = f.paidAmount + amount;
          const status = newPaid >= f.amount ? 'Paid' : 'Partial';
          return {
            ...f,
            paidAmount: newPaid,
            status,
            lastPaymentDate: new Date().toISOString().slice(0, 10),
          };
        }
        return f;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role || null,
        activeView,
        setActiveView,
        login,
        loginAsAdmin,
        logout,
        switchRole,
        students,
        teachers,
        schedule,
        results,
        attendance,
        fees,
        notifications,
        auditLogs,
        addStudent,
        updateStudent,
        deleteStudent,
        markAttendance,
        addOrUpdateResult,
        markNotificationRead,
        markAllNotificationsRead,
        triggerBackup,
        addFeePayment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
