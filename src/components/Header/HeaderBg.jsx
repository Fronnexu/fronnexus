'use client';

import Link from 'next/link';

export default function HeaderBg({
  title = '',
  highlight = '',
  subtitle = '',
  description = '',
  buttonText = '',
  buttonLink = '',
}) {
  return (
    <section className="relative -mt-20 w-full min-h-screen flex items-center isolate overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-20 bg-background" />

      {/* Floating orbs */}
      <div
        className="absolute -z-10 top-[10%] left-[15%] w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] animate-float-1"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />
      <div
        className="absolute -z-10 top-[30%] right-[10%] w-[400px] h-[400px] rounded-full opacity-20 blur-[80px] animate-float-2"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
      />
      <div
        className="absolute -z-10 bottom-[10%] left-[40%] w-[350px] h-[350px] rounded-full opacity-25 blur-[90px] animate-float-3"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent -z-10" />

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-hero-text mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.1)] text-[#a78bfa]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
              Digital Agency
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl leading-[1.08]">
            <span className="animate-hero-text block">{title}</span>
            {highlight && (
              <span className="animate-hero-text-delay-1 block bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
            {subtitle && (
              <span className="animate-hero-text-delay-2 block">{subtitle}</span>
            )}
          </h1>

          <p className="animate-hero-text-delay-2 mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-primary-70 leading-relaxed">
            {description}
          </p>

          <div className="animate-hero-text-delay-3 mt-8 flex flex-wrap gap-4">
            <Link
              href={buttonLink}
              className="btn-shine inline-flex items-center gap-2 rounded-xl
                bg-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white
                shadow-lg shadow-[rgba(139,92,246,0.25)]
                transition-all duration-300
                hover:bg-[#7c3aed] hover:shadow-[rgba(139,92,246,0.4)] hover:scale-[1.02]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2"
            >
              {buttonText}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
