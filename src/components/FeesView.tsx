import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle2, AlertCircle, Download, IndianRupee, Receipt } from 'lucide-react';

export const FeesView: React.FC = () => {
  const { fees, currentRole, addFeePayment } = useApp();
  const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState(false);

  const studentFees = currentRole === 'student' ? fees.filter((f) => f.studentId === '2024001') : fees;

  const totalAmount = studentFees.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = studentFees.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const outstanding = totalAmount - totalPaid;

  const handlePay = (studentId: string, amount: number) => {
    addFeePayment(studentId, amount);
    setPaySuccess(true);
    setTimeout(() => {
      setPaySuccess(false);
    }, 1500);
  };

  const handleDownloadReceipt = (fee: any) => {
    const content = `EDUMANAGE OFFICIAL FEE RECEIPT
====================================
Receipt Ref: #REC-${fee.id.toUpperCase()}-${Date.now().toString().slice(-4)}
Date: ${new Date().toLocaleDateString()}
Student: ${fee.studentName} (ID: ${fee.studentId})
Class: ${fee.classGrade}

Item: ${fee.feeType}
Total Billed: ₹${fee.amount.toLocaleString('en-IN')}
Amount Paid: ₹${fee.paidAmount.toLocaleString('en-IN')}
Status: ${fee.status.toUpperCase()}
Due Date: ${fee.dueDate}

====================================
Thank you for your payment.
Academic Nexus Financial Services`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fee_Receipt_${fee.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-black/50 mb-1">
            Bursar's Office • Financial Ledger
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1A1A1A]">
            Tuition & Academic Fees
          </h1>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono px-3 py-1.5 bg-[#EDE9E1] border border-black/15 rounded-xs text-black/80">
            Fiscal Period 2024–25
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-[#FAF8F5] rounded-sm border border-black/15 shadow-xs relative">
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">STAT 01</div>
          <p className="text-[10px] font-semibold text-black/60 uppercase tracking-widest">Total Assessed Billed</p>
          <p className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-2">₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-6 bg-[#FAF8F5] rounded-sm border border-black/15 shadow-xs relative">
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">STAT 02</div>
          <p className="text-[10px] font-semibold text-black/60 uppercase tracking-widest">Remitted to Date</p>
          <p className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-2">₹{totalPaid.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-6 bg-[#FAF8F5] rounded-sm border border-black/15 shadow-xs relative">
          <div className="absolute top-3 right-4 text-[9px] font-mono text-black/30">STAT 03</div>
          <p className="text-[10px] font-semibold text-black/60 uppercase tracking-widest">Outstanding Balance</p>
          <p className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-2">₹{outstanding.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {paySuccess && (
        <div className="p-3 bg-[#EDE9E1] border border-black/20 text-[#1A1A1A] text-xs font-mono rounded-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Payment transaction processed and verified in ledger.</span>
        </div>
      )}

      {/* Fee Records Table */}
      <div className="bg-[#FAF8F5] border border-black/15 rounded-sm overflow-hidden shadow-xs">
        <div className="p-4 bg-[#EDE9E1] border-b border-black/15 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Itemized Institutional Fee Ledger</h3>
          <span className="text-[10px] font-mono text-black/50 uppercase">Active Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EDE9E1] border-b border-black/15">
              <tr>
                {currentRole !== 'student' && (
                  <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Student Scholar</th>
                )}
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Fee Category</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Due Date</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Assessed</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Remitted</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70">Status</th>
                <th className="py-3 px-4 font-semibold text-[10px] uppercase tracking-widest text-black/70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {studentFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-[#F4F1EA] transition-colors">
                  {currentRole !== 'student' && (
                    <td className="py-3.5 px-4 font-serif font-bold text-sm text-[#1A1A1A]">
                      {fee.studentName}
                      <span className="block text-[10px] text-black/50 font-mono font-normal">ID: {fee.studentId}</span>
                    </td>
                  )}
                  <td className="py-3.5 px-4 font-serif font-bold text-sm text-[#1A1A1A]">{fee.feeType}</td>
                  <td className="py-3.5 px-4 text-black/70 font-mono text-[11px]">{fee.dueDate}</td>
                  <td className="py-3.5 px-4 font-mono font-bold">₹{fee.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 font-mono font-bold">₹{fee.paidAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        fee.status === 'Paid'
                          ? 'bg-[#1A1A1A] text-[#F4F1EA]'
                          : fee.status === 'Partial'
                          ? 'bg-[#EDE9E1] text-black/80 border border-black/15'
                          : 'bg-[#EDE9E1] text-black/80 border border-black/25'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownloadReceipt(fee)}
                        title="Download Receipt"
                        className="p-1.5 hover:bg-[#EDE9E1] rounded-xs text-black/70 hover:text-black cursor-pointer border border-transparent hover:border-black/15"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
                      {fee.status !== 'Paid' && (
                        <button
                          onClick={() => handlePay(fee.studentId, fee.amount - fee.paidAmount)}
                          className="px-3 py-1 bg-[#1A1A1A] text-[#F4F1EA] rounded-xs text-[10px] font-mono uppercase tracking-wider font-semibold hover:bg-black cursor-pointer shadow-xs"
                        >
                          Remit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
