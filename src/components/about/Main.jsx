// components/about/Main.jsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getWorkers } from '../../services/supabase';
import { Briefcase, Code2, Github, Instagram, Linkedin } from "lucide-react";




function AgencyCard() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 
                     flex flex-col md:flex-row-reverse md:w-7xl md:mx-auto m-4">
      <div className="md:w-1/2 justify-center flex items-center pt-6">
        <img
          src="/assets/image/logosymbol_1x1_high_quality.png"
          alt="A"
          className="h-60 object-cover md:rounded-r-2xl md:rounded-l-none"
        />
      </div>

      <div className="p-6 md:w-1/2 flex flex-col justify-center"> 
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm border-1 text-gray-700 font-medium">
          <Briefcase size={16} className="mr-1" />
          AGENCY
        </span>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">FRONEXUS</h2>
        <p className="flex items-center text-gray-600 text-sm mt-1">
          <Code2 size={16} className="mr-1" />
          Tech Agency
        </p>
        <div className="mt-3 text-gray-700 text-sm leading-relaxed">
          <h3 className="font-semibold mb-1">About the Agency</h3>
          <p>
            We are a digital agency specialized in front-end development, design, data analysis, and QA. 
            Our mission is to deliver high-quality, custom solutions that help businesses thrive in a digital-first world. 
            We believe in remote work, borderless collaboration, and clear communication. 
            Operating globally, our team is multicultural, adaptable, and focused on precision — 
            always delivering pixel-perfect results with high performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <a href="#" className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
            <Github size={16} /> GitHub
          </a>
          <a href="#" className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="#" className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>
    </div>
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
        console.error('Erro ao carregar workers:', error?.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-primary">
        <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-3" />
        <p>Loading team...</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-16 py-12">
      <AgencyCard />
     {people.map((p, idx) => (
        <article
          key={p.id ?? `${p.name}-${idx}`}
          className={[
            'flex flex-col md:flex-row items-center gap-8',
            idx % 2 === 1 ? 'md:flex-row-reverse' : '',
            'border border-white/10 rounded-3xl shadow-lg p-6 md:p-10 mx-4 md:mx-16',
            ' md:backdrop-blur-md',
            'content-visibility-auto contain-intrinsic-size-[600px]',
          ].join(' ')}
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-md">
              <Image
                src={p.image || '/placeholder.svg'}
                alt={p.alt || p.name || 'Profile'}
                width={800}
                height={600}
                priority={idx === 0}
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 480px"
                className="h-[400px] w-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-left space-y-4">
            {p.role ? (
              <span className="inline-block px-4 py-1 rounded-xl bg-purple-100/10 border border-purple-300/20 text-purple-300 text-sm font-medium">
                {p.role}
              </span>
            ) : null}

            <h2 className="text-2xl font-bold text-white">{p.name}</h2>
            {p.title ? (
              <p className="text-sm text-purple-200 font-medium">{p.title}</p>
            ) : null}

            {p.description ? (
              <p className="text-primary/90 text-sm leading-relaxed">
                {p.description}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3 mt-4">
              {p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-purple-100/10 hover:bg-purple-400/10 border border-purple-400/20 text-white text-sm transition"
                >
                  GitHub
                </a>
              ) : null}
              {p.linkedin ? (
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-purple-100/10 hover:bg-purple-400/10 border border-purple-400/20 text-white text-sm transition"
                >
                  LinkedIn
                </a>
              ) : null}
              {p.instagram ? (
                <a
                  href={p.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-purple-100/10 hover:bg-purple-400/10 border border-purple-400/20 text-white text-sm transition"
                >
                  Instagram
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
  */
 return (
    <section className="flex flex-col gap-16 py-12">
      <AgencyCard />
      </section>
 );
}
