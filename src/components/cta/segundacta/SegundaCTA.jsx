'use client';

import Link from 'next/link';
import ScrollReveal from '../../utils/ScrollReveal';

export default function CTASection({
  title = "Let's Create Something\nAmazing Together",
  subtitle = 'From strategy to launch, our team is ready to help you build a digital presence that stands out and delivers real results.',
  buttonText = 'Contact Us',
  buttonHref = '/contact',
  actions,
}) {
  const titleLines = Array.isArray(title) ? title : String(title).split('\n');

  return (
    <section className="relative my-16 w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(139,92,246,0.04)] via-[rgba(139,92,246,0.08)] to-[rgba(139,92,246,0.04)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(139,92,246,0.06)] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20">
        <ScrollReveal>
          <h2 className="text-primary font-extrabold tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl">
            {titleLines[0]}
            {titleLines.length > 1 && (
              <>
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
                  {titleLines.slice(1).join(' ')}
                </span>
              </>
            )}
          </h2>
        </ScrollReveal>

        {subtitle && (
          <ScrollReveal delay={100}>
            <p className="mt-4 text-primary-70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal delay={200}>
          <div className="mt-8">
            {actions ? (
              actions
            ) : (
              <Link
                href={buttonHref}
                className="btn-shine inline-flex items-center gap-2 rounded-xl
                  bg-[#8b5cf6] px-6 py-3 text-sm font-semibold text-white
                  shadow-lg shadow-[rgba(139,92,246,0.25)]
                  transition-all duration-300
                  hover:bg-[#7c3aed] hover:shadow-[rgba(139,92,246,0.4)] hover:scale-[1.02]"
              >
                {buttonText}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
