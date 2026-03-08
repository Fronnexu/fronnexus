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
      className="fixed z-40 top-[60px] right-4 sm:right-7 p-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-xl transition-all duration-300"
    >
      <nav>
        <ul className="divide-y divide-[var(--stroke-container-divider)]">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2.5 px-4 text-sm text-primary font-medium rounded-lg hover:bg-[rgba(139,92,246,0.08)] transition-colors"
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
