import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, User, Bell, Shield, Save, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentUser } = useApp();
  const [saved, setSaved] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans max-w-3xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            System Preferences • Registry (05)
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            Institutional & Account Configuration
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details */}
        <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-4 border-b border-black/10 pb-5">
            <img
              src={currentUser?.avatarUrl}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-xs object-cover border border-black/20"
            />
            <div>
              <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">{currentUser?.name}</h3>
              <p className="text-xs text-black/60 font-mono">{currentUser?.email}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#EDE9E1] border border-black/15 text-black/80 rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider">
                {currentUser?.role} Credential
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="font-semibold text-black/70 block mb-1 uppercase text-[10px] tracking-wider">
                Display Legal Name
              </label>
              <input
                type="text"
                defaultValue={currentUser?.name}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-black/20 rounded-xs outline-hidden focus:border-black font-sans text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-black/70 block mb-1 uppercase text-[10px] tracking-wider">
                Primary Registered Address
              </label>
              <input
                type="email"
                defaultValue={currentUser?.email}
                disabled
                className="w-full px-3 py-2 border border-black/15 rounded-xs bg-[#EDE9E1] text-black/50 font-sans text-xs"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
            <Bell className="w-4 h-4 text-black/60" />
            Institutional Dispatch & Alerts
          </h3>
          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between text-xs cursor-pointer p-2 hover:bg-[#EDE9E1] rounded-xs transition-colors">
              <span className="text-black/80 font-serif">Electronic transcripts & assessment publication notifications</span>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 accent-black rounded-xs"
              />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer p-2 hover:bg-[#EDE9E1] rounded-xs transition-colors">
              <span className="text-black/80 font-serif">Urgent campus dispatch & emergency bulletin messages</span>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                className="w-4 h-4 accent-black rounded-xs"
              />
            </label>
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-[#EDE9E1] border border-black/20 text-[#1A1A1A] text-xs font-mono rounded-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Preferences committed to institutional registry.</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1A1A1A] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider font-semibold rounded-xs hover:bg-black transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Commit Changes
          </button>
        </div>
      </form>
    </div>
  );
};
