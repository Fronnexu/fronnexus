'use client';

import { useEffect, useMemo, useState } from 'react';
import { getProjects } from '@/services/supabase';
import ProjectCard from '@/components/Projects/ProjectCard';
import SegundaCTA from '@/components/cta/SegundaCTA/SegundaCTA';
import Footer from '@/components/footer/Footer';

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
  const headerData = useMemo(() => {
    const total = projetos.length;
    const names = projetos.map((p) => p.nome).filter(Boolean);
    const techSet = new Set();
    projetos.forEach((p) =>
      (p.tecnologias || []).forEach((t) => techSet.add(String(t))),
    );
    const techs = Array.from(techSet).sort((a, b) => a.localeCompare(b));
    return {
      title: 'Projetos',
      subtitle:
        total > 0
          ? `Exibindo ${total} projeto${total > 1 ? 's' : ''}.`
          : 'Nenhum projeto encontrado.',
      names,
      techs,
      totalTechs: techs.length,
    };
  }, [projetos]);

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

  return (
    <main className=" px-4 py-10 space-y-10">
      {/* Cabeçalho fixo alimentado pelos dados */}
      <header className="space-y-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {headerData.title}
          </h1>
          <p className="text-primary-70">{headerData.subtitle}</p>
        </div>

        {/* Nomes dos projetos */}
        {headerData.names.length > 0 && (
          <div className="text-sm text-primary-70/90">
            <span className="i-lucide-layout-grid inline-block mr-2" />
            <span className="font-medium">Projetos:</span>{' '}
            {headerData.names.join(' · ')}
          </div>
        )}

        {/* Tech stack agregada */}
        <div>
          <div className="mt-1 text-sm text-primary-70 flex items-center gap-2">
            <span className="i-lucide-sparkles" />
            <span>Tech Stack ({headerData.totalTechs})</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {headerData.techs.length > 0 ? (
              headerData.techs.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full border border-color-stroke-container-divider bg-color-secundary text-foreground"
                >
                  {t.toLowerCase()}
                </span>
              ))
            ) : (
              <span className="text-xs px-2.5 py-1 rounded-full border border-color-stroke-container-divider bg-color-secundary text-foreground">
                n/a
              </span>
            )}
          </div>
        </div>
      </header>

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
