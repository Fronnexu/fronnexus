'use client';

import { useEffect, useState } from 'react';

const SKILLS = [
  'Tailwind CSS',
  'Figma',
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Supabase',
  'Git',
];

export default function Skills() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(!!m?.matches);
    update();
    m?.addEventListener?.('change', update);
    return () => m?.removeEventListener?.('change', update);
  }, []);

  const list = [...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <section className="relative w-full py-6 overflow-hidden border-y border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)]">
      <div
        className={`flex gap-12 whitespace-nowrap ${reduced ? '' : 'animate-marquee'}`}
        style={{ willChange: reduced ? 'auto' : 'transform' }}
      >
        {list.map((skill, index) => {
          const isRepeat = index >= SKILLS.length;
          return (
            <div
              key={`${skill}-${index}`}
              className="flex items-center gap-2.5 text-sm font-medium text-primary-70"
              aria-hidden={isRepeat ? 'true' : 'false'}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              {skill}
            </div>
          );
        })}
      </div>
    </section>
  );
}
