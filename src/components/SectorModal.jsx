import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

const SectorModal = ({ isOpen, onClose, sector }) => {
  // Prevent scrolling on the body when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!sector) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl pointer-events-auto custom-scrollbar relative overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Background Image Layer */}
              {sector.modalImg && (
                <div className="absolute inset-0 z-0">
                  <img 
                    src={sector.modalImg} 
                    alt="" 
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950"></div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Gradient */}
              <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${sector.modalBg || 'from-brand-blue/20'} to-transparent pointer-events-none z-10`} />

              <div className="p-8 sm:p-10 relative z-10">
                {/* Sector Title */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                    <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Sector Insights</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl text-white font-medium mb-4 leading-tight">
                    {sector.title}
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed font-light">
                    {sector.description}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-blue" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {sector.benefits?.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* The Weber Edge */}
                  <div className="p-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 backdrop-blur-sm">
                    <h3 className="text-white text-lg font-medium mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-brand-blue" />
                      The Weber Edge
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">
                      {sector.theWeberEdge}
                    </p>
                  </div>

                  {/* Real-World Use Cases */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <h3 className="text-white text-lg font-medium mb-3">
                      Real-World Use Cases
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sector.useCases?.map((useCase, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-zinc-300 font-medium"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SectorModal;
