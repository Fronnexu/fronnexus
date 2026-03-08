'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getWorkers } from '../../services/supabase';
import ScrollReveal from '../utils/ScrollReveal';

function AgencyCard() {
  return (
    <ScrollReveal>
      <div className="glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row-reverse md:max-w-4xl md:mx-auto">
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <img
            src="/assets/image/logosymbol_1x1_high_quality.png"
            alt="Fronnexus Logo"
            className="h-48 md:h-60 object-contain"
          />
        </div>

        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] text-[#a78bfa] w-fit mb-3">
            About Us
          </span>
          <h2 className="text-2xl font-bold text-primary">Fronnexus</h2>
          <p className="text-sm text-[#8b5cf6] font-medium mt-1">Digital Agency &mdash; Global Operations</p>
          <p className="mt-4 text-sm text-primary-70 leading-relaxed">
            Fronnexus is a digital agency founded on the belief that great technology
            should be accessible to every business. We specialize in front-end development,
            UI/UX design, data analysis, and quality assurance &mdash; delivering end-to-end
            solutions that help companies establish a powerful online presence.
          </p>
          <p className="mt-3 text-sm text-primary-70 leading-relaxed">
            Our multicultural team operates globally, bringing diverse perspectives to every
            project. We work with startups launching their first product and established
            businesses looking to modernize their digital experience. Precision, creativity,
            and measurable results define everything we do.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <a
              href="https://github.com/Fronnexu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-xs font-medium text-primary hover:border-[rgba(139,92,246,0.3)] transition-all"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/company/fronnexus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-xs font-medium text-primary hover:border-[rgba(139,92,246,0.3)] transition-all"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/fronnexus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-xs font-medium text-primary hover:border-[rgba(139,92,246,0.3)] transition-all"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function TeamMemberCard({ person, index }) {
  const reversed = index % 2 === 1;
  return (
    <ScrollReveal delay={index * 100}>
      <article
        className={`glass-card rounded-2xl overflow-hidden flex flex-col ${
          reversed ? 'md:flex-row-reverse' : 'md:flex-row'
        } md:max-w-4xl md:mx-auto`}
      >
        <div className="md:w-1/2">
          <Image
            src={person.image || '/placeholder.svg'}
            alt={person.alt || person.name || 'Team member'}
            width={800}
            height={600}
            priority={index === 0}
            sizes="(max-width:768px) 100vw, 480px"
            className="h-72 md:h-full w-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          {person.role && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] text-[#a78bfa] w-fit mb-3">
              {person.role}
            </span>
          )}
          <h3 className="text-xl font-bold text-primary">{person.name}</h3>
          {person.title && (
            <p className="text-sm text-[#8b5cf6] font-medium mt-1">{person.title}</p>
          )}
          {person.description && (
            <p className="mt-3 text-sm text-primary-70 leading-relaxed">
              {person.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-5">
            {person.github && (
              <a href={person.github} target="_blank" rel="noreferrer"
                className="px-3 py-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-xs font-medium text-primary hover:border-[rgba(139,92,246,0.3)] transition-all">
                GitHub
              </a>
            )}
            {person.linkedin && (
              <a href={person.linkedin} target="_blank" rel="noreferrer"
                className="px-3 py-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-xs font-medium text-primary hover:border-[rgba(139,92,246,0.3)] transition-all">
                LinkedIn
              </a>
            )}
            {person.instagram && (
              <a href={person.instagram} target="_blank" rel="noreferrer"
                className="px-3 py-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-xs font-medium text-primary hover:border-[rgba(139,92,246,0.3)] transition-all">
                Instagram
              </a>
            )}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function Main() {
  /*
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getWorkers();
        if (mounted) setPeople(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading workers:', error?.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-primary">
        <div className="w-10 h-10 border-4 border-[#8b5cf6] border-t-transparent rounded-full animate-spin mb-3" />
        <p>Loading team...</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-12 py-12 px-4">
      <AgencyCard />
      {people.map((p, idx) => (
        <TeamMemberCard key={p.id ?? `${p.name}-${idx}`} person={p} index={idx} />
      ))}
    </section>
  );
  */
  return (
    <section className="flex flex-col gap-12 py-12 px-4">
      <AgencyCard />
    </section>
  );
}
