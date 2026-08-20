import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Database, ShieldCheck, Download, CheckCircle2, Search, RefreshCw, Lock } from 'lucide-react';

export const AuditBackupView: React.FC = () => {
  const { auditLogs, triggerBackup } = useApp();
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBackup = () => {
    triggerBackup();
    setBackupSuccess(true);
    setTimeout(() => {
      setBackupSuccess(false);
    }, 2000);
  };

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Data Integrity & Provenance • Audit (06)
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            System Backup & Audit Trail
          </h1>
        </div>

        <button
          onClick={handleBackup}
          disabled={backupSuccess}
          className="px-5 py-2.5 bg-[#1A1A1A] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider font-semibold rounded-xs hover:bg-black transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start md:self-auto"
        >
          {backupSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Snapshot Verified!
            </>
          ) : (
            <>
              <Database className="w-4 h-4" />
              Generate Database Snapshot
            </>
          )}
        </button>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 bg-[#FAF8F5] rounded-sm border border-black/15 shadow-xs flex items-center gap-4 relative">
          <div className="p-3 bg-[#EDE9E1] border border-black/15 text-black/80 rounded-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-mono text-black/60 font-semibold">Database Integrity</p>
            <p className="font-serif text-lg font-bold text-[#1A1A1A]">Encrypted & Verified</p>
          </div>
        </div>

        <div className="p-5 bg-[#FAF8F5] rounded-sm border border-black/15 shadow-xs flex items-center gap-4 relative">
          <div className="p-3 bg-[#EDE9E1] border border-black/15 text-black/80 rounded-xs">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-mono text-black/60 font-semibold">Latest Snapshot</p>
            <p className="font-serif text-lg font-bold text-[#1A1A1A]">68.4 MB (Signed)</p>
          </div>
        </div>

        <div className="p-5 bg-[#FAF8F5] rounded-sm border border-black/15 shadow-xs flex items-center gap-4 relative">
          <div className="p-3 bg-[#EDE9E1] border border-black/15 text-black/80 rounded-xs">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-mono text-black/60 font-semibold">Audit Provenance</p>
            <p className="font-serif text-lg font-bold text-[#1A1A1A]">Immutable Trail</p>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#FAF8F5] border border-black/15 rounded-sm overflow-hidden shadow-xs">
        <div className="p-4 bg-[#EDE9E1] border-b border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Activity & Security Ledger</h3>
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit trail..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-black/20 rounded-xs text-xs outline-hidden focus:border-black font-sans"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EDE9E1] border-b border-black/15">
              <tr>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Timestamp</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Actor</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Action</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Target Entity</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F4F1EA] transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-black/60">{log.timestamp}</td>
                  <td className="py-3 px-4 font-serif font-bold text-sm text-[#1A1A1A]">
                    {log.actor}
                    <span className="block text-[10px] text-black/50 font-mono font-normal uppercase">{log.actorRole}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#EDE9E1] text-black/80 border border-black/15 rounded-xs">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-black/80">{log.targetEntity}</td>
                  <td className="py-3 px-4 text-black/70 max-w-xs truncate font-sans text-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
