'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '../modals/MobileMenu';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Get in Touch', href: '/contact', isButton: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-center p-3 z-50 relative">
      <nav
        className="flex items-center w-full max-w-5xl px-6 pr-2 
                   rounded-4xl shadow-lg 
                   bg-white/8 backdrop-blur-md 
                   border border-white/20"
      >
        {/* Logo à esquerda */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/icons/logo.svg"
            alt="FRONNEXUS Logo"
            width={115}
            height={32}
            priority
          />
        </Link>

        {/* Itens + botão à direita */}
        <div className="hidden lg:flex items-center gap-8 ml-auto">
          {NAV_ITEMS.filter((item) => !item.isButton).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-primary transition-colors 
                         hover:text-purple-400 focus-visible:text-purple-400 focus:outline-none"
            >
              {item.name}
            </Link>
          ))}

          {NAV_ITEMS.filter((item) => item.isButton).map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              className="text-t-dark-btn px-5 py-2 bg-white shadow-lg font-sans rounded-full hover:bg-purple-50 transition-colors"
            >
              {btn.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="p-2 text-primary rounded-full hover:bg-gray-100 lg:hidden ml-auto"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <IoCloseOutline size={24} /> : <FiMenu size={24} />}
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
