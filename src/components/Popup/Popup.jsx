// components/Popup/Popup.jsx
'use client';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

export default function Popup({ open, onClose, project }) {
  const closeBtnRef = useRef(null);

  const onEsc = useCallback((e) => e.key === 'Escape' && onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    // foco inicial no botão fechar (acessibilidade)
    closeBtnRef.current?.focus?.();
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onEsc]);

  if (!open || !project) return null;

  const {
    name,
    long_description,
    image,
    deploy,
    technologies,
    medium_description = [],
  } = project;

  const techArray = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'string'
    ? technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={name || 'Project details'}
      onClick={onClose}
    >
      {/* Backdrop com leve granulado */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(173,70,255,0.18),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(80,120,255,0.18),transparent_60%)] bg-black/50 backdrop-blur-sm" />

      {/* Card em vidro */}
      <div
        className="relative z-[61] w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Borda/shine sutil */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <h3 className="text-base md:text-lg font-semibold text-white/90 tracking-[-0.01em]">
            {name}
          </h3>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 md:p-7 space-y-8">
          {/* Top: capa + ações */}
          <div className="grid grid-cols-1 md:grid-cols-[180px,1fr] gap-5 md:gap-6 items-start">
            {/* Capa */}
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <img
                src={
                  image ||
                  'https://images.unsplash.com/photo-1498654077810-12f23ce4c6b7?q=80&w=1200&auto=format&fit=crop'
                }
                alt={name}
                className="w-full h-40 md:h-[180px] object-cover"
                loading="lazy"
              />
            </div>

            {/* Ações + meta */}
            <div className="flex flex-col gap-4">
              {deploy && (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-sm font-medium text-white/90 hover:bg-white/15 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition"
                  >
                    Open deploy
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Tecnologias */}
              {techArray.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60 mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techArray.map((t, i) => (
                      <span
                        key={`popup-tech-${i}`}
                        className="px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Descrição longa */}
          {long_description && (
            <div>
              <p className="text-xs uppercase tracking-wide text-white/60 mb-2">
                Full Description
              </p>
              <div className="prose prose-invert max-w-none">
                <p className="text-sm leading-relaxed text-white/90 whitespace-pre-line">
                  {medium_description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer shine */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </div>
  );
}
