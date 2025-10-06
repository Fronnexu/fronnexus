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

    // Compatibilidade com navegadores antigos
    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else mq.addListener(handleChange);

    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener('change', handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);

  return isDark;
}

function iconPath(name, isDark) {
  return `/assets/icons/${name}${isDark ? 'Dark' : ''}.svg`;
}

export default function Footer() {
  const isDark = usePrefersDark();

  return (
    <footer className="p-6 w-full bg-background">
      <div className="flex justify-between items-center w-full md:w-auto md:order-1">
        {/* Logo */}
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo da empresa"
          width={150}
          height={150}
          className="mb-4 md:mb-0 h-auto w-auto"
          priority
        />

        {/* Social icons */}
        <div className="flex gap-3">
          <Link href="#" target="_blank" aria-label="Instagram">
            <Image
              src={iconPath('instagram', isDark)}
              alt="Instagram"
              width={24}
              height={24}
              className="size-6 hover:opacity-80 transition-opacity"
            />
          </Link>

          <Link href="#" target="_blank" aria-label="WhatsApp">
            <Image
              src={iconPath('whatsapp', isDark)}
              alt="WhatsApp"
              width={24}
              height={24}
              className="size-6 hover:opacity-80 transition-opacity"
            />
          </Link>

          <Link href="#" target="_blank" aria-label="LinkedIn">
            <Image
              src={iconPath('linkedin', isDark)}
              alt="LinkedIn"
              width={24}
              height={24}
              className="size-6 hover:opacity-80 transition-opacity"
            />
          </Link>

          <Link href="#" target="_blank" aria-label="Facebook">
            <Image
              src={iconPath('facebook', isDark)}
              alt="Facebook"
              width={24}
              height={24}
              className="size-6 hover:opacity-80 transition-opacity"
            />
          </Link>

          <Link href="#" target="_blank" aria-label="GitHub">
            <Image
              src={iconPath('github', isDark)}
              alt="GitHub"
              width={24}
              height={24}
              className="size-6 hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>

      {/* Navegação e créditos */}
      <div className="flex flex-col md:justify-between md:flex-row md:items-center md:gap-6 mt-6 md:mt-0 md:order-2">
        <div className="mt-6 md:mt-0 text-sm text-primary md:ml-6 order-2 md:order-1">
          © {new Date().getFullYear()} FromNexus. All rights reserved.
        </div>

        <nav className="order-1 md:order-2">
          <ul className="space-y-2 ml-4 gap-2.5 md:flex md:space-y-0 md:space-x-6">
            <li>
              <Link
                href="/"
                className="text-primary p-2 md:p-0 hover:text-purple-500 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-primary p-2 md:p-0 hover:text-purple-500 transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-primary p-2 md:p-0 hover:text-purple-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-primary p-2 md:p-0 hover:text-purple-500 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-primary p-2 md:p-0 hover:text-purple-500 transition-colors"
              >
                Get in Touch
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
