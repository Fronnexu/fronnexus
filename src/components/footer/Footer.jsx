'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function usePrefersDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    setIsDark(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else mq.addListener(handleChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);
  return isDark;
}

function iconPath(name, isDark) {
  return `/assets/icons/${name}${isDark ? 'Dark' : ''}.svg`;
}

const FOOTER_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Get in Touch', href: '/contact' },
];

const SOCIAL = [
  { name: 'github', label: 'GitHub', href: 'https://github.com/Fronnexu' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/fronnexus' },
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/fronnexus' },
];

export default function Footer() {
  const isDark = usePrefersDark();

  return (
    <footer className="border-t border-[var(--stroke-container-divider)] bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand */}
          <div>
            <Image
              src="/assets/icons/logo.svg"
              alt="Fronnexus Logo"
              width={130}
              height={36}
              className="h-auto w-auto mb-4"
              priority
            />
            <p className="text-sm text-primary-70 max-w-xs leading-relaxed">
              We are a global digital agency crafting high-performance websites, apps,
              and data-driven solutions. From concept to launch, Fronnexus turns your
              ideas into seamless digital experiences that drive real business growth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-primary-70 mb-4 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary hover:text-[#8b5cf6] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-primary-70 mb-4 font-semibold">
              Connect With Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] flex items-center justify-center hover:border-[rgba(139,92,246,0.3)] hover:bg-[rgba(139,92,246,0.05)] transition-all"
                >
                  <Image
                    src={iconPath(s.name, isDark)}
                    alt={s.label}
                    width={18}
                    height={18}
                    className="size-[18px]"
                  />
                </Link>
              ))}
            </div>
            <p className="text-xs text-primary-70 mt-4 leading-relaxed">
              Follow us for updates on new projects, design tips, and behind-the-scenes content.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--stroke-container-divider)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-70">
            &copy; {new Date().getFullYear()} Fronnexus. All rights reserved.
          </p>
          <Link
            href="/terms/responsability"
            className="text-xs text-primary-70 hover:text-[#8b5cf6] transition-colors"
          >
            Terms &amp; Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
