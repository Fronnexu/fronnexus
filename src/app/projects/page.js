'use client';

import { useEffect, useMemo, useState } from 'react';
import { getProjects } from '../../services/supabase';
import ProjectCard from '../../components/projects/ProjectCard';
import SegundaCTA from '../../components/cta/segundacta/SegundaCTA';
import HeaderBg from '../../components/Header/HeaderBg';
import ScrollReveal from '../../components/utils/ScrollReveal';

function toArrayMaybe(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return v.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function normalizeRecord(rec = {}) {
  const nome =
    rec.name ?? rec.nome ?? rec.project_name ?? rec.title ?? 'Unnamed Project';
  const url_image = rec.image ?? rec.url_image ?? rec.hero_image ?? '';
  const repositorio = rec.repository ?? rec.repositorio ?? rec.repo ?? '';
  const deploy = rec.deploy ?? rec.deploy_url ?? rec.link ?? '';
  const short_description =
    rec.short_description ?? rec.descricao_curta ?? rec.descricao ?? '';
  const medium_description =
    rec.medium_description ?? rec.descricao_media ?? '';
  const long_description =
    rec.long_description ??
    rec.descricao_longa ??
    rec.descricao_long ??
    rec.descricao_completa ??
    (medium_description || short_description || '');
  let tecnologias = rec.technologies ?? rec.tecnologias ?? rec.tech_stack ?? [];
  tecnologias = toArrayMaybe(tecnologias);

  return {
    id: rec.id ?? rec.slug ?? `${nome}-${deploy}` ?? Math.random(),
    nome,
    url_image,
    repositorio,
    deploy,
    tecnologias,
    short_description,
    medium_description,
    long_description,
  };
}

export default function ProjectsPage() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProjects();
        let list = Array.isArray(data) ? data : [];
        if (!list.length) {
          try {
            const resp = await fetch('/project.json');
            list = (resp.ok ? await resp.json() : []) ?? [];
          } catch {}
        }
        setProjetos(list.map(normalizeRecord));
      } catch {
        setProjetos([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-2xl bg-[var(--surface-subtle)] animate-pulse" />
        ))}
      </main>
    );
  }

  return (
    <main className="space-y-10">
      <HeaderBg
        title="Built with Code."
        highlight="Driven by"
        subtitle="Design."
        description="Every project we deliver combines clean architecture, thoughtful design, and measurable results. Explore our portfolio to see how we've helped clients across industries transform their digital presence and achieve real growth."
        buttonText="About Our Process"
        buttonLink="/about"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 pb-10">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Featured Work</h2>
            <p className="mt-2 text-primary-70 text-sm max-w-xl mx-auto">
              A curated selection of projects showcasing our expertise in front-end development,
              full-stack architecture, and data-driven design.
            </p>
          </div>
        </ScrollReveal>

        {projetos.map((p, idx) => (
          <ScrollReveal key={p.id || idx} delay={idx * 80}>
            <ProjectCard
              nome={p.nome}
              url_image={p.url_image}
              long_description={p.long_description}
              repositorio={p.repositorio}
              deploy={p.deploy}
              tecnologias={p.tecnologias}
              reversed={idx % 2 === 1}
            />
          </ScrollReveal>
        ))}
      </section>

      <SegundaCTA
        title="Have a project in mind?"
        subtitle="Let's discuss how we can bring it to life with strategy, design, and code."
        buttonText="Start a Conversation"
      />
    </main>
  );
}
