/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { QrCode, Monitor, AlertCircle, CameraIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onReady?: () => void;
}

export default function QRScanner({ onScan, onReady }: QRScannerProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    // We use a small delay to ensure the DOM element #reader is fully ready
    const timer = setTimeout(async () => {
      try {
        // Pre-check/Request permissions explicitly
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          // Stop the tracks immediately after permission is granted so the device isn't "busy"
          stream.getTracks().forEach(track => track.stop());
        }

        const html5QrCode = new Html5Qrcode("reader", {
          verbose: false,
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
        });
        html5QrCodeRef.current = html5QrCode;

        const config = { 
          fps: 10, 
          aspectRatio: 1.0,
          qrbox: { width: 250, height: 250 } 
        };

        // On mobile, we explicitly request the environment camera (back camera)
        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            // Stop scanning once code is found
            html5QrCode.stop().then(() => {
              onScan(decodedText);
            }).catch(err => {
              console.error("Failed to stop scanner", err);
              // Fallback: still report the scan even if stop fails
              onScan(decodedText);
            });
          },
          (errorMessage) => {
            // This callback is called for every frame where no QR code is found
            // We ignore these noise errors
          }
        );
        
        setIsInitializing(false);
        setError(null);
        if (onReady) onReady();
      } catch (err) {
        console.error("Scanner initialization failed:", err);
        if (err instanceof Error && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
          setError("Camera access blocked. Please grant permission in your browser or try opening the app in a new tab if you are using a mobile browser.");
        } else {
          setError("Camera access denied or device not found. Please ensure you have granted permission.");
        }
        setIsInitializing(false);
        if (onReady) onReady();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(err => console.error("Clean up stop failed", err));
      }
    };
  }, [onScan]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center h-10">
          {/* Header metadata removed as requested */}
        </div>

        <div className="aspect-square bg-slate-900 relative m-4 rounded-lg overflow-hidden group">
          <div id="reader" className="w-full h-full"></div>

          <AnimatePresence>
            {isInitializing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-slate-900 flex flex-col items-center justify-center gap-3"
              >
                <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">Readying Optics...</p>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-30 bg-slate-900/95 flex flex-col items-center justify-center p-8 text-center"
              >
                <AlertCircle className="text-red-500 mb-4" size={32} />
                <p className="text-white text-sm font-medium leading-relaxed">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 px-4 py-2 bg-slate-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-600"
                >
                  Reload Interface
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Scanning Frame Overlay */}
          {!isInitializing && !error && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
              <div className="w-[250px] h-[250px] border-2 border-indigo-400/30 rounded-lg relative">
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-indigo-500"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-indigo-500"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-indigo-500"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-indigo-500"></div>
                
                <motion.div 
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-indigo-400/80 shadow-[0_0_15px_rgba(129,140,248,0.8)]"
                />
              </div>
              <div className="absolute bottom-6 text-center">
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">Hardware Auth V4.0</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 text-center border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-6 px-4 leading-relaxed">
            Position the identification QR code within the frame to begin verification.
          </p>
          <div className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 rounded-lg border border-slate-100">
             <CameraIcon size={16} className="text-indigo-600" />
             <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">CAPTURE</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center gap-4">
        {/* Status labels removed as requested */}
      </div>
    </div>
  );
}
