'use client';

import { useEffect, useMemo, useState } from 'react';
import { getProjects } from '@/services/supabase';
import ProjectCard from '@/components/Projects/ProjectCard';
import SegundaCTA from '@/components/cta/SegundaCTA/SegundaCTA';
import Footer from '@/components/footer/Footer';
import HeaderBg from '@/components/Header/HeaderBg';
import { heroProjectInfo } from '@/components/utils/heroInfo';
function toArrayMaybe(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') {
    // tenta JSON primeiro, depois CSV
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Normaliza um registro vindo do DB sem “perder” informação.
 * Inclui mapeamento seguro para long_description (e aliases).
 */
function normalizeRecord(rec = {}) {
  const nome =
    rec.name ?? rec.nome ?? rec.project_name ?? rec.title ?? 'Projeto sem nome';

  const url_image = rec.image ?? rec.url_image ?? rec.hero_image ?? '';

  const repositorio = rec.repository ?? rec.repositorio ?? rec.repo ?? '';

  const deploy = rec.deploy ?? rec.deploy_url ?? rec.link ?? '';

  // descrições
  const short_description =
    rec.short_description ?? rec.descricao_curta ?? rec.descricao ?? '';

  const medium_description =
    rec.medium_description ?? rec.descricao_media ?? '';

  const long_description =
    rec.long_description ??
    rec.descricao_longa ??
    rec.descricao_long ??
    rec.descricao_completa ??
    // fallback inteligente: se não houver long, tenta usar medium; senão short
    (medium_description || short_description || '');

  // tecnologias (aceita array, JSON string ou CSV)
  let tecnologias = rec.technologies ?? rec.tecnologias ?? rec.tech_stack ?? [];
  tecnologias = toArrayMaybe(tecnologias);

  return {
    id: rec.id ?? rec.slug ?? `${nome}-${deploy}` ?? Math.random(),
    nome,
    url_image,
    repositorio,
    deploy,
    tecnologias,
    // manter as três descrições disponíveis
    short_description,
    medium_description,
    long_description,
  };
}

export default function ProjetosPage() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados
  useEffect(() => {
    (async () => {
      try {
        const data = await getProjects();
        let list = Array.isArray(data) ? data : [];
        if (!list.length) {
          try {
            const resp = await fetch('/project.json');
            list = (resp.ok ? await resp.json() : []) ?? [];
            console.log('Fallback para project.json', list);
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

  // >>> FIXO DA PÁGINA USANDO DADOS DOS CARDS <<<

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="h-8 w-48 rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-80 rounded bg-white/10 animate-pulse" />
        <div className="h-6 w-64 rounded bg-white/10 animate-pulse" />
        <div className="h-40 w-full rounded-3xl bg-white/10 animate-pulse" />
      </main>
    );
  }
  const { title, description, btn } = heroProjectInfo[0] || {};

  return (
    <main className=" px-4 py-10 space-y-10">
      {/* Cabeçalho fixo alimentado pelos dados */}

      <HeaderBg
        title="Built with Code."
        highlight="Driven by"
        subtitle="Design."
        description="Explore how we turn ideas into functional, fast, and beautiful digital experiences."
        buttonText="See our Work"
        buttonLink="/about"
      />
      {/* Lista de cards */}
      <section className="space-y-8">
        {projetos.map((p, idx) => (
          <ProjectCard
            key={p.id || idx}
            nome={p.nome}
            url_image={p.url_image}
            long_description={p.long_description}
            repositorio={p.repositorio}
            deploy={p.deploy}
            tecnologias={p.tecnologias}
            reversed={idx % 2 === 1}
          />
        ))}
      </section>
      <SegundaCTA
        title="More than a website, a digital experience"
        subtitle="Strategic design combined with performance to win clients."
        buttonText="Talk to a specialist"
      />
      {/* Footer */}
      <Footer />
    </main>
  );
}
