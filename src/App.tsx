/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import QRScanner from "./components/QRScanner";
import CandidateProfile from "./components/CandidateProfile";
import ErrorMessage from "./components/ErrorMessage";
import { motion, AnimatePresence } from "motion/react";

const VALID_CHECKSUM = "DU8849354";

type AppState = "SCANNING" | "DETAILS" | "ERROR";

export default function App() {
  const [state, setState] = useState<AppState>("SCANNING");
  const [scannedValue, setScannedValue] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleScan = (value: string) => {
    setScannedValue(value);
    if (value.trim() === VALID_CHECKSUM) {
      setState("DETAILS");
    } else {
      setState("ERROR");
    }
  };

  const resetState = () => {
    setState("SCANNING");
    setScannedValue("");
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight uppercase">Certificate Verification System</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold leading-none">System Status</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online
            </span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <span className="text-sm text-slate-500 font-medium italic hidden md:block">Terminal ID: 8873-A</span>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto z-10 flex items-start md:items-center justify-center">
        <div className="w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {state === "SCANNING" && (
              <motion.div
                key="scanner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <QRScanner 
                  onScan={handleScan} 
                  onReady={() => {
                    // Only hide initial loader once; future navigations back to scan 
                    // will maintain the internal scanner loader
                    setIsInitialLoading(false);
                  }} 
                />
              </motion.div>
            )}

            {state === "DETAILS" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <CandidateProfile onReset={resetState} />
              </motion.div>
            )}

            {state === "ERROR" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ErrorMessage onReset={resetState} scannedValue={scannedValue} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="min-h-[3rem] h-auto md:h-12 bg-white border-t border-slate-200 px-4 md:px-8 py-3 md:py-0 flex items-center justify-center shrink-0 z-20">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold font-mono text-center">
          DU Certificate Verification System version 889.9.10
        </p>
      </footer>

      {/* Initial Landing Loader */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center"
          >
            <div className="flex gap-2 justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                  className="w-3 h-3 bg-indigo-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


