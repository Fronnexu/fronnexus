'use client';

import { useState, useMemo } from 'react';
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
  const pathname = usePathname();

  const { links, cta } = useMemo(() => {
    const links = NAV_ITEMS.filter((i) => !i.isButton);
    const cta = NAV_ITEMS.find((i) => i.isButton) || null;
    return { links, cta };
  }, []);

  const isActive = (href) => {
    // destaca exatamente a rota ou prefixo para páginas internas (/projects/slug)
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header
      className="
        sticky top-4 z-50 flex justify-center px-4
      "
    >
      <nav
        role="navigation"
        aria-label="Primary"
        className="
          relative flex items-center w-full max-w-6xl gap-3
          px-4 sm:px-6 py-2.5
          rounded-3xl shadow-lg
          bg-white/10 backdrop-blur-xl
          border border-white/20
        "
      >
        {/* Glow sutil */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10" />

        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-xl"
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
        <div className="hidden lg:flex items-center gap-7 ml-auto">
          {links.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'font-sans text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-md px-1.5 py-1',
                  active
                    ? 'text-purple-500'
                    : 'text-primary hover:text-purple-400',
                ].join(' ')}
                aria-current={active ? 'page' : undefined}
              >
                {item.name}
              </Link>
            );
          })}

          {cta && (
            <Link
              href={cta.href}
              className="
                inline-flex items-center text-sm font-medium
                px-5 py-2 rounded-full
                bg-white text-t-dark-btn shadow-lg
                hover:bg-purple-50
                focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400
                transition-colors
              "
            >
              {cta.name}
            </Link>
          )}
        </div>

        {/* Toggle mobile */}
        <button
          className="
            lg:hidden ml-auto p-2 rounded-full
            text-primary hover:bg-white/20
            focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400
          "
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
