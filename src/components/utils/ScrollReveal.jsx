'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollReveal — wraps children in a scroll-triggered CSS animation.
 *
 * @param {'up'|'left'|'right'|'scale'} direction  Animation direction
 * @param {number} delay                           Extra delay in ms
 * @param {number} threshold                       IntersectionObserver threshold
 * @param {boolean} once                           Animate only once
 * @param {string} className                       Extra classes
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches;
    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('visible');
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const animClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[direction] || 'reveal';

  return (
    <Tag
      ref={ref}
      className={`${animClass} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
