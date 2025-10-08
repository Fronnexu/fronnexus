// components/about/Skills.jsx
'use client';

import { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';

export default function Skills() {
  const skills = [
    { name: 'Tailwind', icon: <Code2 size={20} /> },
    { name: 'Figma', icon: <Code2 size={20} /> },
    { name: 'React', icon: <Code2 size={20} /> },
    { name: 'Next.js', icon: <Code2 size={20} /> },
    { name: 'Node.js', icon: <Code2 size={20} /> },
  ];

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(!!m?.matches);
    update();
    m?.addEventListener?.('change', update);
    return () => m?.removeEventListener?.('change', update);
  }, []);

  const list = [...skills, ...skills, ...skills];

  return (
    <section className="relative w-full bg-background p-4 overflow-hidden">
      <div
        className={[
          'flex gap-20 whitespace-nowrap',
          reduced ? '' : 'animate-marquee',
        ].join(' ')}
        style={{ willChange: reduced ? 'auto' : 'transform' }}
      >
        {list.map((skill, index) => {
          const repeat = index >= skills.length;
          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-2 text-lg font-medium text-primary"
              aria-hidden={repeat ? 'true' : 'false'}
            >
              {skill.icon} {skill.name}
            </div>
          );
        })}
      </div>
    </section>
  );
}
