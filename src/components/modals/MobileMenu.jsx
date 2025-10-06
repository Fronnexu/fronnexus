'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function MobileMenu({ isOpen, onClose, navItems }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-40 top-[60px] right-7 p-4 justify-center bg-gradient-radial-white rounded-xl shadow-2xl transition-all duration-400 ease-in-out transform scale-100 opacity-100"
    >
      <nav className="flex">
        <ul className="divide-y divide-[var(--stroke-container-divider)]">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2 px-2 text-base text-primary font-sans rounded-lg transition-colors"
                onClick={onClose}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
