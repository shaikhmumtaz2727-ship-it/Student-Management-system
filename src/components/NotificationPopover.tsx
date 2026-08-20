import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white border border-[#DADCE0] rounded-xl shadow-lg z-50 overflow-hidden animate-fadeIn">
      <div className="p-3.5 px-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#1A73E8]" />
          <span className="font-semibold text-sm text-[#181c20]">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-[#1A73E8] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-[#1A73E8] hover:underline font-medium"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-gray-500">
            No notifications available.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                notif.read ? 'bg-white hover:bg-gray-50' : 'bg-[#f1f4fa] hover:bg-[#ebeef4]'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {notif.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : notif.type === 'alert' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                ) : (
                  <Info className="w-4 h-4 text-[#1A73E8]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <p className="text-xs font-semibold text-[#181c20] truncate">{notif.title}</p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[#1A73E8] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{notif.message}</p>
                <span className="text-[11px] text-gray-400 mt-1 block">{notif.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
