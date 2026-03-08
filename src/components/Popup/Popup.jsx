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
    medium_description = '',
  } = project;

  const techArray = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'string'
    ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={name || 'Project details'}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-[61] w-full max-w-3xl rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--stroke-container-divider)]">
          <h3 className="text-base md:text-lg font-semibold text-primary tracking-tight">
            {name}
          </h3>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 rounded-xl text-primary-70 hover:text-primary hover:bg-[var(--surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(139,92,246,0.4)] transition"
            aria-label="Close"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 md:p-7 space-y-6">
          {/* Image + Actions */}
          <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-5 items-start">
            <div className="overflow-hidden rounded-xl border border-[var(--stroke-container-divider)]">
              <img
                src={
                  image ||
                  'https://images.unsplash.com/photo-1498654077810-12f23ce4c6b7?q=80&w=1200&auto=format&fit=crop'
                }
                alt={name}
                className="w-full h-40 md:h-[200px] object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col gap-4">
              {deploy && (
                <Link
                  href={deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8b5cf6] text-sm font-medium text-white shadow-lg shadow-[rgba(139,92,246,0.2)] hover:bg-[#7c3aed] transition-all w-fit"
                >
                  Open project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}

              {techArray.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-primary-70 mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techArray.map((t, i) => (
                      <span
                        key={`popup-tech-${i}`}
                        className="px-2.5 py-1 rounded-full border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-xs font-medium text-primary-70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {(long_description || medium_description) && (
            <>
              <div className="h-px w-full bg-[var(--stroke-container-divider)]" />
              <div>
                <p className="text-xs uppercase tracking-wide text-primary-70 mb-2">
                  Description
                </p>
                <p className="text-sm leading-relaxed text-primary whitespace-pre-line">
                  {medium_description || long_description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
