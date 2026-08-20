import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Clock,
  BookOpen,
  Settings,
  GraduationCap,
  Bell,
  Award,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Users,
  Database,
  FileBarChart2,
  CheckSquare,
} from 'lucide-react';
import { NotificationPopover } from './NotificationPopover';

export const NavigationDrawer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, currentRole, activeView, setActiveView, logout, switchRole, notifications } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  // Sidebar items based on role
  const getNavItems = () => {
    if (currentRole === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
        { id: 'fees', label: 'Fee Status', icon: CreditCard },
        { id: 'timetable', label: 'Timetable', icon: Clock },
        { id: 'resources', label: 'Resources', icon: BookOpen },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else if (currentRole === 'teacher') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'timetable', label: 'Timetable', icon: Clock },
        { id: 'results', label: 'Enter Results', icon: Award },
        { id: 'attendance', label: 'Mark Attendance', icon: CheckSquare },
        { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else {
      // Admin
      return [
        { id: 'dashboard', label: 'Student Administration', icon: LayoutDashboard },
        { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
        { id: 'fees', label: 'Fee Status', icon: CreditCard },
        { id: 'timetable', label: 'Timetable', icon: Clock },
        { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart2 },
        { id: 'audit', label: 'Backup & Audit', icon: Database },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="bg-[#F4F1EA] text-[#1A1A1A] min-h-screen flex flex-col md:flex-row antialiased font-sans selection:bg-[#1A1A1A] selection:text-[#F4F1EA]">
      {/* Navigation Drawer (Desktop Sidebar) */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 z-40 h-full w-72 border-r border-black/10 bg-[#EDE9E1] py-5">
        {/* Branding & Profile Header */}
        <div className="px-6 pb-5 border-b border-black/10 mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-sm bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center font-serif text-lg font-bold">
                E.
              </span>
              <div>
                <h1 className="font-serif text-xl font-bold tracking-tight text-[#1A1A1A] leading-none">EduManage</h1>
                <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-black/60 block mt-0.5">
                  Academic Nexus
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 border border-black/20 rounded-xs text-black/70">
              v2.4
            </span>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-black/10">
            <img
              className="w-10 h-10 rounded-sm object-cover border border-black/20 shadow-xs"
              src={currentUser?.avatarUrl}
              alt={currentUser?.name}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-serif font-bold text-[#1A1A1A] truncate">{currentUser?.name}</p>
              {currentRole === 'student' && (
                <p className="text-[11px] text-black/60 truncate font-mono">ID: {currentUser?.studentId || '2024001'}</p>
              )}
              {currentRole === 'teacher' && (
                <p className="text-[11px] text-black/60 truncate font-mono">ID: {currentUser?.teacherId || 'T-8901'}</p>
              )}
              {currentRole === 'admin' && (
                <p className="text-[11px] text-black/60 truncate font-mono">System Administrator</p>
              )}
            </div>
          </div>
        </div>

        {/* Role Switcher Pill in Sidebar */}
        <div className="px-5 mb-4">
          <div className="bg-[#E5E2D9] p-1 rounded-sm border border-black/10 flex text-xs">
            <button
              onClick={() => switchRole('student')}
              className={`flex-1 py-1 text-center text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-all ${
                currentRole === 'student'
                  ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => switchRole('teacher')}
              className={`flex-1 py-1 text-center text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-all ${
                currentRole === 'teacher'
                  ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              Faculty
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`flex-1 py-1 text-center text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-all ${
                currentRole === 'admin'
                  ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-4">
          <div className="px-2 py-1 text-[9px] uppercase tracking-[0.25em] font-bold text-black/40">
            Navigation Index
          </div>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center justify-between px-3.5 py-2 rounded-sm text-xs font-medium transition-all text-left w-full cursor-pointer ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#F4F1EA] shadow-xs font-semibold'
                    : 'text-black/70 hover:bg-black/5 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F4F1EA]' : 'text-black/60'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <span className={`text-[10px] font-mono ${isActive ? 'text-white/60' : 'text-black/30'}`}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}

          <div className="mt-auto pt-4 border-t border-black/10">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-red-800 hover:bg-red-500/10 rounded-sm w-full transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="uppercase tracking-wider">Log Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-[#EDE9E1]/90 backdrop-blur-md border-b border-black/10 flex justify-between items-center px-4 md:px-8 h-15 w-full shadow-xs">
          <div className="flex items-center gap-3">
            <img
              className="w-8 h-8 rounded-sm object-cover md:hidden cursor-pointer border border-black/20"
              src={currentUser?.avatarUrl}
              alt={currentUser?.name}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#1A1A1A] tracking-tight">EduManage</span>
              <span className="text-black/40 font-serif italic text-sm">/</span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-black/70">
                {currentRole}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Quick Role Switcher for Top header */}
            <div className="hidden sm:flex items-center gap-1 bg-[#E5E2D9] p-1 rounded-sm border border-black/10 text-xs mr-1">
              <button
                onClick={() => switchRole('student')}
                className={`px-2.5 py-0.5 rounded-xs text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  currentRole === 'student' ? 'bg-[#1A1A1A] text-[#F4F1EA]' : 'text-black/60 hover:text-black'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => switchRole('teacher')}
                className={`px-2.5 py-0.5 rounded-xs text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  currentRole === 'teacher' ? 'bg-[#1A1A1A] text-[#F4F1EA]' : 'text-black/60 hover:text-black'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2.5 py-0.5 rounded-xs text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  currentRole === 'admin' ? 'bg-[#1A1A1A] text-[#F4F1EA]' : 'text-black/60 hover:text-black'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-sm text-black/70 hover:bg-black/5 border border-black/10 transition-colors relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full" />
              )}
            </button>

            <NotificationPopover isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

            {/* Profile trigger */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-sm hover:bg-black/5 border border-black/10 transition-colors"
              >
                <img
                  className="w-7 h-7 rounded-sm object-cover border border-black/15"
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.name}
                />
                <ChevronDown className="w-3.5 h-3.5 text-black/60 hidden sm:block" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-11 w-56 bg-[#FAF8F5] border border-black/15 rounded-sm shadow-xl z-50 p-2 text-xs animate-fadeIn">
                  <div className="px-3 py-2 border-b border-black/10 mb-1">
                    <p className="font-serif font-bold text-sm text-[#1A1A1A] truncate">{currentUser?.name}</p>
                    <p className="text-black/60 truncate font-mono text-[11px]">{currentUser?.email}</p>
                    <span className="inline-block mt-1 bg-[#1A1A1A] text-[#F4F1EA] font-semibold px-2 py-0.5 rounded-xs text-[9px] uppercase tracking-wider">
                      {currentUser?.role}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveView('settings');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-black/80 hover:bg-black/5 rounded-xs flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-black/60" />
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-red-700 hover:bg-red-500/10 rounded-xs flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-[#F4F1EA] max-w-7xl mx-auto w-full pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-15 bg-[#EDE9E1] border-t border-black/15 px-2 z-40 shadow-lg">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-sm transition-all ${
            activeView === 'dashboard'
              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold'
              : 'text-black/60 hover:text-black'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveView(currentRole === 'teacher' ? 'attendance' : 'calendar')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-sm transition-colors ${
            activeView === 'attendance' || activeView === 'calendar'
              ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold'
              : 'text-black/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Attendance</span>
        </button>

        <button
          onClick={() => setActiveView('results')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-sm transition-colors ${
            activeView === 'results' ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold' : 'text-black/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Results</span>
        </button>

        <button
          onClick={() => setActiveView('settings')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-sm transition-colors ${
            activeView === 'settings' ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold' : 'text-black/60'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
};
