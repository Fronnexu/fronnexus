'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '../modals/MobileMenu';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Get in Touch', href: '/contact', isButton: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { links, cta } = useMemo(() => {
    const links = NAV_ITEMS.filter((i) => !i.isButton);
    const cta = NAV_ITEMS.find((i) => i.isButton) || null;
    return { links, cta };
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <nav
        role="navigation"
        aria-label="Primary"
        className={[
          'relative flex items-center w-full max-w-5xl gap-3',
          'px-4 sm:px-6 py-2.5',
          'rounded-2xl transition-all duration-300',
          scrolled
            ? 'bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg shadow-[var(--glass-shadow)]'
            : 'bg-transparent border border-transparent',
        ].join(' ')}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded-xl"
        >
          <Image
            src="/assets/icons/logo.svg"
            alt="FRONNEXUS Logo"
            width={115}
            height={32}
            className="h-auto w-auto"
            priority
          />
        </Link>

        {/* Links desktop */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {links.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'relative text-sm px-3 py-2 rounded-lg transition-all duration-200',
                  active
                    ? 'text-[#8b5cf6] font-medium'
                    : 'text-primary hover:text-[#8b5cf6] hover:bg-[var(--surface-subtle)]',
                ].join(' ')}
                aria-current={active ? 'page' : undefined}
              >
                {item.name}
                {active && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[#8b5cf6]" />
                )}
              </Link>
            );
          })}

          {cta && (
            <Link
              href={cta.href}
              className="btn-shine ml-3 inline-flex items-center text-sm font-medium
                px-5 py-2 rounded-xl
                bg-[#8b5cf6] text-white shadow-md shadow-[rgba(139,92,246,0.2)]
                hover:bg-[#7c3aed] hover:shadow-lg hover:shadow-[rgba(139,92,246,0.3)]
                transition-all duration-200"
            >
              {cta.name}
            </Link>
          )}
        </div>

        {/* Toggle mobile */}
        <button
          className="lg:hidden ml-auto p-2 rounded-xl text-primary hover:bg-[var(--surface-subtle)] transition-colors"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <IoCloseOutline size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
      />
    </header>
  );
}
