'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjects } from '../../services/supabase';
import Popup from '../../components/Popup/Popup.jsx';
import ScrollReveal from '../utils/ScrollReveal';

function asArray(technologies) {
  if (Array.isArray(technologies)) return technologies;
  if (typeof technologies === 'string')
    return technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  return [];
}

export default function HomeProjectInfo() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Could not load projects from the database.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[rgba(139,92,246,0.04)] blur-[120px]" />
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-6xl mx-auto mb-8">
          <div className="rounded-xl border border-amber-300/50 bg-amber-50/10 px-4 py-3 text-amber-200 text-sm">
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-[var(--surface-subtle)] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] text-[#a78bfa] mb-4">
                Our Work
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Real Projects, Real Impact
              </h2>
              <p className="mt-4 text-primary-70 max-w-2xl mx-auto text-base leading-relaxed">
                Explore some of our recent work — where design, development, and
                strategy come together to solve real problems.
              </p>
              <div className="mt-6 h-0.5 w-16 mx-auto bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#7c3aed] rounded-full" />
            </div>
          </ScrollReveal>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, idx) => {
              const key = p?.id ?? p?.uuid ?? idx;
              const techs = asArray(p?.technologies);
              return (
                <ScrollReveal key={key} delay={idx * 100}>
                  <div className="glass-card group rounded-2xl overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="overflow-hidden h-52">
                      <img
                        src={
                          p?.image ||
                          'https://images.unsplash.com/photo-1498654077810-12f23ce4c6b7?q=80&w=1200&auto=format&fit=crop'
                        }
                        alt={p?.name || 'Project image'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-primary group-hover:text-[#8b5cf6] transition-colors">
                        {p?.name || 'Project'}
                      </h3>
                      <p className="mt-2 text-sm text-primary-70 leading-relaxed flex-1">
                        {p?.short_description || 'No description available.'}
                      </p>

                      {/* Tech tags */}
                      {techs.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {techs.slice(0, 4).map((t, i) => (
                            <span
                              key={`${key}-tech-${i}`}
                              className="px-2 py-0.5 rounded-full text-[11px] font-medium border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary-70"
                            >
                              {t}
                            </span>
                          ))}
                          {techs.length > 4 && (
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary-70">
                              +{techs.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-5 flex items-center gap-3">
                        {p?.deploy && (
                          <Link
                            href={p.deploy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-[#8b5cf6] hover:text-[#7c3aed] transition-colors"
                          >
                            Visit site &rarr;
                          </Link>
                        )}
                        <button
                          onClick={() => setSelected(p)}
                          className="text-sm font-medium text-primary-70 hover:text-primary transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* View all */}
          <ScrollReveal delay={200}>
            <div className="mt-16 flex justify-center">
              <Link
                href="/projects"
                className="btn-shine inline-flex items-center gap-2 rounded-xl bg-[var(--surface-subtle)] border border-[var(--stroke-container-divider)] px-6 py-3 text-sm font-semibold text-primary hover:border-[rgba(139,92,246,0.3)] transition-all"
              >
                View all projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          {/* Popup */}
          <Popup
            open={!!selected}
            onClose={() => setSelected(null)}
            project={selected}
          />
        </div>
      )}
    </section>
  );
}
