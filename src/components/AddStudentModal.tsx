import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserPlus, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose }) => {
  const { addStudent } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [classGrade, setClassGrade] = useState('Grade 10-A');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [status, setStatus] = useState<'Active' | 'On Leave'>('Active');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Student full name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('A valid institutional email address is required.');
      return;
    }

    addStudent({
      name: name.trim(),
      email: email.trim(),
      classGrade,
      status,
      attendanceRate: 100.0,
      gpa: 4.0,
      guardianName: guardianName.trim() || 'Parent/Guardian',
      guardianPhone: guardianPhone.trim() || '+1 (555) 000-0000',
      enrollmentDate: new Date().toISOString().slice(0, 10),
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setEmail('');
      setGuardianName('');
      setGuardianPhone('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-sm max-w-lg w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/15 bg-[#EDE9E1] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1A1A1A]">
            <UserPlus className="w-4 h-4" />
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Matriculate & Enroll Scholar</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs text-black/50 hover:text-black hover:bg-black/5 cursor-pointer font-mono"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto font-sans">
          {error && (
            <div className="p-2.5 bg-[#EDE9E1] border border-black/20 text-[#1A1A1A] font-mono text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Maya Lin"
                required
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs outline-hidden focus:border-black"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Institutional Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="e.g. maya.lin@institution.edu"
                required
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs outline-hidden focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Assigned Class / Grade
              </label>
              <select
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs font-mono uppercase outline-hidden focus:border-black cursor-pointer"
              >
                <option>Grade 10-A</option>
                <option>Grade 10-B</option>
                <option>Grade 11-A</option>
                <option>Grade 11-B</option>
                <option>Grade 11-C</option>
                <option>Grade 12-A</option>
                <option>Grade 12-B</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                Enrollment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Active' | 'On Leave')}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs font-mono uppercase outline-hidden focus:border-black cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-black/10">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-black/50 mb-3">
              Guardian & Emergency Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                  Guardian Legal Name
                </label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="e.g. Jonathan Lin"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs outline-hidden focus:border-black"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/70 block mb-1">
                  Guardian Telephone
                </label>
                <input
                  type="text"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 019-2834"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs outline-hidden focus:border-black font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-black/15 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-black/70 hover:bg-black/5 rounded-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={success}
              className="px-5 py-2 text-xs font-mono uppercase tracking-wider font-semibold bg-[#1A1A1A] text-[#F4F1EA] rounded-xs hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Matriculated!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
