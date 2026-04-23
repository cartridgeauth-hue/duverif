/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";


interface CandidateProfileProps {
  onReset: () => void;
}

export default function CandidateProfile({ onReset }: CandidateProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto my-8 md:my-0"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden leading-relaxed">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Candidate Identification Card</h2>
            <p className="text-sm text-slate-400 mt-1">
              Reference ID: <span className="font-mono font-bold text-indigo-600">DU8849354</span>
            </p>
          </div>
          <div className="bg-emerald-100/80 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 size={12} strokeWidth={3} />
            VERIFIED MATCH
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ISSUED TO</label>
              <p className="text-xl font-bold text-slate-800">Abhishek Das</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">COURSE</label>
              <p className="text-xl font-bold text-slate-800">B. Sc. (Hons) Computer Science</p>
            </div>
            
            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">DIVISION</label>
              <p className="text-xl font-bold text-slate-800">First Class</p>
            </div>
          </div>

          <div className="space-y-8 md:border-l md:border-slate-100 md:pl-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Department</label>
              <p className="text-slate-800 font-bold text-lg">Science Department</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ISSUED ON</label>
              <p className="text-slate-800 font-medium font-mono text-sm leading-none bg-slate-50 border border-slate-100 p-2 rounded inline-block">13-03-2026 17:48:08</p>
            </div>
            
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={14} className="text-slate-400" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Cryptographic Signature</label>
              </div>
              <p className="text-[10px] font-mono break-all text-slate-500 leading-relaxed font-medium">
                SHA256: 8a92f89c629d7e41b2e119d01d44f
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto flex flex-col md:flex-row gap-4">
          <button 
            onClick={onReset}
            className="flex-1 py-3.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            BACK TO SCAN PAGE
          </button>
        </div>
      </div>
    </motion.div>
  );
}


