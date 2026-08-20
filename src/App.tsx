import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './components/LoginScreen';
import { NavigationDrawer } from './components/NavigationDrawer';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TimetableView } from './components/TimetableView';
import { FeesView } from './components/FeesView';
import { AcademicCalendarView } from './components/AcademicCalendarView';
import { AuditBackupView } from './components/AuditBackupView';
import { ResourcesView } from './components/ResourcesView';
import { SettingsView } from './components/SettingsView';

const MainAppContent: React.FC = () => {
  const { currentUser, currentRole, activeView } = useApp();

  if (!currentUser) {
    return <LoginScreen />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        if (currentRole === 'student') return <StudentDashboard />;
        if (currentRole === 'teacher') return <TeacherDashboard />;
        return <AdminDashboard />;

      case 'timetable':
        return <TimetableView />;

      case 'fees':
        return <FeesView />;

      case 'calendar':
        return <AcademicCalendarView />;

      case 'results':
        return currentRole === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;

      case 'attendance':
        return currentRole === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;

      case 'reports':
        return <AdminDashboard />;

      case 'audit':
        return <AuditBackupView />;

      case 'resources':
        return <ResourcesView />;

      case 'settings':
        return <SettingsView />;

      default:
        if (currentRole === 'student') return <StudentDashboard />;
        if (currentRole === 'teacher') return <TeacherDashboard />;
        return <AdminDashboard />;
    }
  };

  return <NavigationDrawer>{renderActiveView()}</NavigationDrawer>;
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
