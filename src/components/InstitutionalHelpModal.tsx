import React from 'react';
import { HelpCircle, X, Mail, Phone, BookOpen, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface InstitutionalHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstitutionalHelpModal: React.FC<InstitutionalHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-sm max-w-lg w-full border border-black/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/15 flex items-center justify-between bg-[#EDE9E1]">
          <div className="flex items-center gap-2 text-[#1A1A1A]">
            <HelpCircle className="w-4 h-4" />
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Institutional Guidance & Protocols</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xs text-black/50 hover:text-black hover:bg-black/5 cursor-pointer font-mono"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-black/70 font-sans">
          <div>
            <h4 className="font-serif font-bold text-[#1A1A1A] text-lg mb-1">Academic Nexus SIS Directive</h4>
            <p className="leading-relaxed text-xs">
              EduManage serves as the authoritative academic ledger for accredited institutions. For credential recovery, role authorization changes, or institutional onboarding, liaise directly with your campus registrar.
            </p>
          </div>

          {/* Quick Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3 bg-[#EDE9E1]/60 border border-black/15 rounded-xs">
              <div className="flex items-center gap-2 font-bold text-[#1A1A1A] text-xs mb-1">
                <Mail className="w-3.5 h-3.5 text-black/70" />
                IT Helpdesk
              </div>
              <p className="text-[11px] text-black/70">support@institution.edu</p>
              <p className="text-[10px] text-black/50 mt-1 uppercase">Mon-Fri: 08:00 - 18:00</p>
            </div>

            <div className="p-3 bg-[#EDE9E1]/60 border border-black/15 rounded-xs">
              <div className="flex items-center gap-2 font-bold text-[#1A1A1A] text-xs mb-1">
                <Phone className="w-3.5 h-3.5 text-black/70" />
                Registrar Office
              </div>
              <p className="text-[11px] text-black/70">+1 (800) 555-4321</p>
              <p className="text-[10px] text-black/50 mt-1 uppercase">Hall of Administration 101</p>
            </div>
          </div>

          {/* User Guides */}
          <div>
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-black/70" />
              Role Authority Guidelines
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-black/80 shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1A1A]">Students:</strong> Access attendance journals, assessment marks, timetable schedules, and fee receipts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-black/80 shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1A1A]">Teachers:</strong> Record daily attendance rosters, enter assessment marks with automated grading, and inspect syllabi.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-black/80 shrink-0 mt-0.5" />
                <span><strong className="text-[#1A1A1A]">Administrators:</strong> Govern student enrollments, faculty allocations, institutional dossiers, and ledger backups.</span>
              </li>
            </ul>
          </div>

          {/* Security note */}
          <div className="p-3 bg-[#EDE9E1] border border-black/15 rounded-xs text-xs text-black/80 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-black/70 shrink-0 mt-0.5" />
            <span className="font-mono text-[11px]">Strict compliance directive: Never disclose institutional tokens or passwords. All administrative mutations are recorded in the immutable audit ledger.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-black/15 bg-[#EDE9E1] flex justify-end font-mono">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
