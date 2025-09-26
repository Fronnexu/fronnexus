'use client';
import { useEffect, useState } from 'react';
import { getProjects } from '@/services/supabase'; // ou caminho relativo ../../services/supabase
import ProjectCard from '@/components/Projects/ProjectCard';

export default function ProjetosPage() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      setProjetos(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="animate-pulse h-40 rounded-3xl bg-white/10" />
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {projetos.map((p, idx) => (
        <ProjectCard key={p.id} project={p} reversed={idx % 2 === 1} />
      ))}
    </main>
  );
}
