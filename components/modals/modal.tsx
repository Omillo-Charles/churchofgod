"use client";

import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-[400px]",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] w-full h-full min-h-screen flex items-center justify-center bg-black/85 backdrop-blur-xl px-4 py-8 overflow-y-auto animate-in fade-in duration-500"
    >
      <div
        className={`w-full ${maxWidth} rounded-[24px] sm:rounded-[32px] bg-[#090b11] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 duration-400`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-1 h-5 sm:h-6 rounded-full bg-sky-500/50" />
            <div>
              <h3 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-[0.2em] sm:tracking-[0.25em] leading-none">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[9px] sm:text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1 sm:mt-1.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-4 sm:h-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-1 sm:pt-2">{children}</div>
      </div>
    </div>
  );
}
