'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getProjects } from '../../services/supabase';
import Popup from '../../components/Popup/Popup.jsx';
import { Plasma } from '../Animation/Plasma.jsx';

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
  const sectionRef = useRef(null);
  const [bgHeight, setBgHeight] = useState(0);

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

  // ajusta o Plasma à altura real da seção
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => setBgHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [loading, projects.length]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative mt-20 border-amber-200 lg:mt-28 px-4 md:px-10 py-20 overflow-hidden"
    >
      {/* 🔮 Plasma de fundo */}
      <div
        className="absolute left-0 top-0 -z-10 w-full pointer-events-none"
        style={{ height: bgHeight || '100%' }}
        aria-hidden="true"
      >
        <div className="w-full h-full">
          <Plasma
            color="#AD46FF"
            speed={0.6}
            direction="forward"
            scale={1.2}
            opacity={0.6}
            mouseInteractive={true}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 text-sm">
            {error}
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-3xl" />
          <div className="h-64 bg-gray-200 rounded-3xl" />
          <div className="h-64 bg-gray-200 rounded-3xl" />
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight drop-shadow-sm">
              Real Projects, Real Impact!
            </h1>
            <h2 className="mt-4 text-lg md:text-xl text-primary-70 max-w-3xl mx-auto leading-relaxed">
              Explore some of our recent work — where design, development, and
              strategy come together to solve real problems and elevate user
              experiences.
            </h2>
            <div className="mt-6 h-1 w-20 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
          </div>

          {/* Cards */}
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            {projects.map((p, idx) => {
              const key = p?.id ?? p?.uuid ?? idx;
              const techs = asArray(p?.technologies);
              return (
                <div
                  key={key}
                  className="group rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                >
                  {/* Imagem */}
                  <div className="overflow-hidden rounded-t-3xl">
                    <img
                      src={
                        p?.image ||
                        'https://images.unsplash.com/photo-1498654077810-12f23ce4c6b7?q=80&w=1200&auto=format&fit=crop'
                      }
                      alt={p?.name || 'Project image'}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {p?.name || 'Project'}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600">
                      {p?.short_description || 'No description available.'}
                    </p>

                    {/* Tecnologias */}
                    {techs.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {techs.map((t, i) => (
                          <span
                            key={`${key}-tech-${i}`}
                            className="px-2.5 py-1 rounded-full border text-xs text-gray-700 bg-gray-50/60 backdrop-blur-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Ações */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                      {p?.deploy && (
                        <Link
                          href={p.deploy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                        >
                          View project
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Link>
                      )}

                      <button
                        onClick={() => setSelected(p)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-gradient-to-r from-indigo-50 to-pink-50 text-sm font-medium text-t-dark-btn hover:from-indigo-100 hover:to-pink-100 transition"
                      >
                        View details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🔗 Botão para página de projetos */}
          <div className="mt-20 flex justify-center relative z-10">
            <Link
              href="/projects"
              className="text-t-dark-btn inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white shadow-lg font-sans transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:shadow-xl hover:-translate-y-0.5"
            >
              View all projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

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
