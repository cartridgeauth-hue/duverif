/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  onReset: () => void;
  scannedValue: string;
}

export default function ErrorMessage({ onReset, scannedValue }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-6 border border-red-200 shadow-inner">
          <AlertTriangle size={32} />
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-red-900 uppercase tracking-tight">Error 455: Invalid Checksum</h3>
            <p className="text-sm text-red-700 leading-relaxed font-medium mt-1">
              The certificate provided could not be verified.
            </p>
          </div>

          <button
            onClick={onReset}
            className="w-full mt-4 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            RE-INITIALIZE SCANNER
          </button>
        </div>
      </div>
    </motion.div>
  );
}

