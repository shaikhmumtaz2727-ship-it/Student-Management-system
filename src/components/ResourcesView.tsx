import React from 'react';
import { BookOpen, Download, FileText, ExternalLink, CheckCircle } from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const resources = [
    {
      title: 'Advanced Physics Syllabus & Laboratory Manual',
      course: 'Physics 101',
      author: 'Dr. Edward Smith',
      date: 'Aug 28, 2024',
      size: '4.2 MB PDF',
    },
    {
      title: 'Mathematics Grade 10 Comprehensive Problem Set',
      course: 'Algebra & Geometry',
      author: 'Ms. Clara Davis',
      date: 'Sep 10, 2024',
      size: '2.8 MB PDF',
    },
    {
      title: 'English Literature Study Guide: Hamlet by Shakespeare',
      course: 'English Lit 10-A',
      author: 'Prof. Helen Harper',
      date: 'Oct 02, 2024',
      size: '1.5 MB PDF',
    },
    {
      title: 'Chemistry Organic Reactions Chart & Lab Safety Protocol',
      course: 'Chemistry Lab',
      author: 'Dr. Arthur Vance',
      date: 'Sep 15, 2024',
      size: '3.1 MB PDF',
    },
  ];

  const handleDownload = (res: any) => {
    const text = `RESOURCE DOCUMENT: ${res.title}\nCourse: ${res.course}\nAuthor: ${res.author}\nDate: ${res.date}\nInstitutional Repository: Academic Nexus SIS\n\n[Content verified for Academic Session 2024-2025]`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Bibliographic Repository • Archive (04)
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            Academic Resources & Courseware
          </h1>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono px-3 py-1.5 bg-[#EDE9E1] border border-black/15 rounded-xs text-black/80">
            Open Scholarly Access
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resources.map((res, i) => (
          <div
            key={i}
            className="bg-[#FAF8F5] border border-black/15 rounded-sm p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all relative group"
          >
            <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">
              DOC 0{i + 1}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-[#EDE9E1] border border-black/15 text-black/80 rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider">
                  {res.course}
                </span>
                <span className="text-[10px] text-black/50 font-mono">{res.size}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A] mb-2 leading-snug">{res.title}</h3>
              <p className="text-xs text-black/60 font-mono">
                Scholarly Author: {res.author} • {res.date}
              </p>
            </div>

            <div className="pt-4 mt-5 border-t border-black/10 flex justify-end">
              <button
                onClick={() => handleDownload(res)}
                className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 hover:bg-black transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Download Document
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
