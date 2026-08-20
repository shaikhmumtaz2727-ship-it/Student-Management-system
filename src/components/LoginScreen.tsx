import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HERO_BACKGROUND_IMAGE } from '../data/mockData';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  HelpCircle,
  Landmark,
  Shield,
  GraduationCap,
} from 'lucide-react';
import { InstitutionalHelpModal } from './InstitutionalHelpModal';

export const LoginScreen: React.FC = () => {
  const { loginAsAdmin } = useApp();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Validation & Error States
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal States
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Load remembered email on mount if available
  useEffect(() => {
    const savedEmail = localStorage.getItem('edumanage_remember_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Clear errors on field typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage('');
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
    if (fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  // Quick auto-fill helper for demo evaluation
  const handleAutoFillDemo = () => {
    setEmail('admin@edumanage.com');
    setPassword('admin123');
    setErrorMessage('');
    setFieldErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const errors: { email?: string; password?: string } = {};

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail && !trimmedPassword) {
      setErrorMessage('Please enter both email and password.');
      setFieldErrors({
        email: 'Email / Username is required',
        password: 'Password is required',
      });
      return;
    }

    if (!trimmedEmail) {
      errors.email = 'Please enter your email or username.';
    }

    if (!trimmedPassword) {
      errors.password = 'Please enter your password.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (errors.email && errors.password) {
        setErrorMessage('Please enter both email and password.');
      } else {
        setErrorMessage(errors.email || errors.password || '');
      }
      return;
    }

    setIsSubmitting(true);

    // Call loginAsAdmin from context
    const result = loginAsAdmin(trimmedEmail, trimmedPassword, rememberMe);

    if (!result.success) {
      setIsSubmitting(false);
      setErrorMessage(result.error || 'Invalid email or password.');
      setFieldErrors({
        email: 'Invalid credentials',
        password: 'Invalid credentials',
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] flex flex-col justify-between overflow-x-hidden font-sans text-[#1A1A1A]">
      {/* 1. Full-screen subtle realistic university/college campus background */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-12 filter saturate-60"
        style={{ backgroundImage: `url('${HERO_BACKGROUND_IMAGE}')` }}
      />
      {/* Soft warm overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#FAF7F2]/90 via-[#F6F1E7]/85 to-[#FAF7F2]/90" />

      {/* 2. Top-Left Decorative Gold Curved Lines (SVG) */}
      <svg
        className="absolute top-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 pointer-events-none opacity-40 text-[#C5A059]"
        viewBox="0 0 350 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -50,180 Q 80,180 180,80 T 180,-50"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M -30,220 Q 110,220 220,110 T 220,-30"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M -10,260 Q 140,260 260,140 T 260,-10"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* 3. Bottom-Right Decorative Gold Curved Lines (SVG) */}
      <svg
        className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 pointer-events-none opacity-40 text-[#C5A059]"
        viewBox="0 0 350 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 400,170 Q 270,170 170,270 T 170,400"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 380,130 Q 240,130 130,240 T 130,380"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M 360,90 Q 210,90 90,210 T 90,360"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* 4. Subtle Dotted Pattern Near Top (SVG) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-25">
        <svg width="240" height="24" viewBox="0 0 240 24" fill="none">
          <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#B8934A" />
          </pattern>
          <rect width="240" height="24" fill="url(#dotPattern)" />
        </svg>
      </div>

      {/* Main Container - Centered Two-Section Layout */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT SECTION ================= */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-center px-4 sm:px-6 py-4 animate-fadeIn">
            {/* Small university/education emblem */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6B1D2F] to-[#4A1521] text-[#FAF7F2] flex items-center justify-center shadow-md border-2 border-[#C5A059]">
                <GraduationCap className="w-8 h-8 text-[#FAF7F2]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center shadow-xs">
                <Landmark className="w-3.5 h-3.5 text-[#6B1D2F]" />
              </div>
            </div>

            {/* Heading: "STUDENT MANAGEMENT SYSTEM" in dark maroon serif */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#581825] tracking-tight leading-[1.15] uppercase">
              STUDENT<br />
              MANAGEMENT<br />
              SYSTEM
            </h1>

            {/* Small gold building icon with thin gold horizontal lines on both sides */}
            <div className="my-5 flex items-center justify-center gap-3 w-full max-w-xs text-[#C5A059]">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A059]" />
              <div className="flex items-center gap-1">
                <Landmark className="w-4 h-4 text-[#B8934A]" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A059]" />
            </div>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-[#4A4A4A] max-w-xs sm:max-w-sm font-normal leading-relaxed">
              A complete solution for managing students, faculty, attendance, exams and more.
            </p>

            {/* Academic Accents */}
            <div className="mt-8 flex items-center gap-3 text-[11px] font-mono text-[#7A6B58] bg-[#F2ECE1]/80 px-4 py-1.5 rounded-full border border-[#E3D9C8]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Academic Session 2024–2025</span>
              <span>•</span>
              <span>v2.4 Pro</span>
            </div>
          </div>

          {/* ================= RIGHT SECTION (LOGIN CARD) ================= */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(40,25,20,0.08)] border border-[#EBE4D8] p-6 sm:p-9 md:p-10 relative animate-fadeIn">
              
              {/* Top of Login Card: University-style shield/education logo */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-b from-[#6B1D2F] to-[#4A1521] text-[#FAF7F2] flex items-center justify-center shadow-sm border border-[#C5A059]/40 mb-3">
                  <Shield className="w-6 h-6 text-[#FAF7F2]" />
                </div>

                {/* "EduManage": "Edu" in dark navy/black and "Manage" in dark maroon */}
                <div className="flex items-center justify-center font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                  <span className="text-[#0F172A]">Edu</span>
                  <span className="text-[#6B1D2F]">Manage</span>
                </div>

                {/* "Student Management System" in smaller clean sans-serif dark gray */}
                <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide mt-1">
                  Student Management System
                </p>

                {/* Thin gold horizontal divider with small diamond decoration */}
                <div className="mt-4 mb-2 flex items-center justify-center gap-3 w-full max-w-[200px] text-[#C5A059]">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A059]" />
                  <span className="text-[10px] text-[#B8934A] transform rotate-45 inline-block">◆</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A059]" />
                </div>
              </div>

              {/* Login Heading */}
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6B1D2F] tracking-tight">
                  Admin Login
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Sign in to access the Student Management System
                </p>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2.5 font-medium animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* EMAIL / USERNAME FIELD */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor="admin-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Email / Username
                    </label>
                    {fieldErrors.email && (
                      <span className="text-[11px] text-red-600 font-medium">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                  <div
                    className={`relative flex items-center rounded-xl bg-white border transition-all shadow-xs ${
                      fieldErrors.email
                        ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200'
                        : 'border-gray-200 hover:border-gray-300 focus-within:border-[#6B1D2F] focus-within:ring-2 focus-within:ring-[#6B1D2F]/10'
                    }`}
                  >
                    <Mail className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
                    <input
                      id="admin-email"
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter email or username"
                      autoComplete="username"
                      className="w-full h-11 pl-10 pr-4 bg-transparent border-none outline-hidden text-sm text-gray-800 placeholder:text-gray-400 rounded-xl"
                    />
                  </div>
                </div>

                {/* PASSWORD FIELD */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Password
                    </label>
                    {fieldErrors.password && (
                      <span className="text-[11px] text-red-600 font-medium">
                        {fieldErrors.password}
                      </span>
                    )}
                  </div>
                  <div
                    className={`relative flex items-center rounded-xl bg-white border transition-all shadow-xs ${
                      fieldErrors.password
                        ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200'
                        : 'border-gray-200 hover:border-gray-300 focus-within:border-[#6B1D2F] focus-within:ring-2 focus-within:ring-[#6B1D2F]/10'
                    }`}
                  >
                    <Lock className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="w-full h-11 pl-10 pr-11 bg-transparent border-none outline-hidden text-sm text-gray-800 placeholder:text-gray-400 rounded-xl"
                    />
                    <button
                      type="button"
                      id="togglePasswordVisibilityBtn"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* REMEMBER ME AND FORGOT PASSWORD */}
                <div className="flex items-center justify-between pt-1">
                  <label
                    htmlFor="rememberMe"
                    className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-600 hover:text-gray-900"
                  >
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md border-gray-300 text-[#6B1D2F] focus:ring-[#6B1D2F]/20 cursor-pointer accent-[#6B1D2F]"
                    />
                    <span>Remember Me</span>
                  </label>

                  <button
                    type="button"
                    id="forgotPasswordLink"
                    onClick={() => {
                      setForgotEmail(email || 'admin@edumanage.com');
                      setIsForgotOpen(true);
                    }}
                    className="text-xs font-semibold text-[#6B1D2F] hover:text-[#501221] hover:underline cursor-pointer transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  id="adminLoginSubmitBtn"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#6B1D2F] hover:bg-[#541423] text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </form>

              {/* DEMO CREDENTIALS BOX */}
              <div className="mt-5">
                {/* Small "OR" Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-gray-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                    OR
                  </span>
                  <div className="border-t border-gray-200 w-full" />
                </div>

                {/* Information Box with light cream/gold border */}
                <div className="bg-[#FAF7F0] border border-[#E5D7B7] rounded-xl p-3.5 sm:p-4 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 font-serif font-bold text-[#581825] text-sm">
                      <KeyRound className="w-3.5 h-3.5 text-[#B8934A]" />
                      <span>Demo Credentials</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFillDemo}
                      className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#581825] bg-white border border-[#D5C29E] px-2.5 py-1 rounded-md hover:bg-[#581825] hover:text-white transition-all cursor-pointer shadow-2xs"
                      title="Click to automatically fill demo admin credentials"
                    >
                      Fill Credentials
                    </button>
                  </div>

                  <div className="space-y-1 font-sans text-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium">Email:</span>
                      <code className="font-mono text-[11px] font-semibold bg-white/80 px-2 py-0.5 rounded border border-[#E5D7B7] text-[#581825]">
                        admin@edumanage.com
                      </code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium">Password:</span>
                      <code className="font-mono text-[11px] font-semibold bg-white/80 px-2 py-0.5 rounded border border-[#E5D7B7] text-[#581825]">
                        admin123
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Link */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Institutional Help & Documentation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 py-4 text-center text-xs text-gray-500 font-sans border-t border-[#EBE4D8]/60">
        © 2025 EduManage. All rights reserved.
      </footer>

      {/* Institutional Help Modal */}
      <InstitutionalHelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-2xl max-w-sm w-full p-6 border border-[#EBE4D8] shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-5 h-5 text-[#6B1D2F]" />
              <h3 className="font-serif text-lg font-bold text-[#581825]">Reset Admin Password</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Enter your administrator email address to receive password reset instructions.
            </p>
            {forgotSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl mb-4 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Password reset link has been dispatched to {forgotEmail || 'admin@edumanage.com'}.
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mb-1.5">
                  Administrator Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 bg-white rounded-xl text-xs outline-hidden focus:border-[#6B1D2F] font-mono"
                  placeholder="admin@edumanage.com"
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsForgotOpen(false);
                  setForgotSent(false);
                }}
                className="px-3.5 py-2 text-xs text-gray-600 hover:bg-black/5 rounded-xl cursor-pointer"
              >
                {forgotSent ? 'Close' : 'Cancel'}
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="px-4 py-2 text-xs bg-[#6B1D2F] text-white rounded-xl hover:bg-[#541423] font-semibold cursor-pointer"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
