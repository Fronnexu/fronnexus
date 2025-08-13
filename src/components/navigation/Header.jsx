/**
 * @author gabrielvettorazzi
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '../modals/MobileMenu';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

const NAV_ITEMS = [
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Get in Touch', href: '/contact', isButton: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoPath = '/assets/icons/logo.svg';
  const navLinks = NAV_ITEMS.filter(item => !item.isButton);
  const contactButton = NAV_ITEMS.find(item => item.isButton);

  return (
    <header className="flex justify-center p-3 bg-background">
      <nav className="flex items-center justify-between w-full max-w-5xl px-6 pr-2 bg-gradient-radial-white rounded-4xl shadow-lg">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logoPath}
            alt="FRONNEXUS Logo"
            width={115}
            height={32}
            priority
          />
        </Link>

        {/* Itens de navegação para Desktop */}
        <div className="hidden lg:flex items-center justify-between w-full ml-10 ">
          <div className="flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-primary  transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/*Get in touch à direita */}
          {contactButton && (
            <Link
              href={contactButton.href}
              className=" text-primary px-5 py-2 bg-white shadow-lg font-sans rounded-full hover:bg-purple-50 transition-colors"
            >
              {contactButton.name}
            </Link>
          )}
        </div>

        {/* Botão mobile */}
        <button
          className="p-2 text-primary rounded-full hover:bg-gray-100 lg:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <IoCloseOutline size={24} />
          ) : (
            <FiMenu size={24} />
          )}
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