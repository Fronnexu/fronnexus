'use client';
export default function ProjectCard({ project, reversed = false }) {
  const {
    nome,
    url_image,
    descricao,
    repositorio,
    deploy,
    tecnologias = [],
  } = project || {};

  return (
    <article
      className={[
        // container
        'rounded-3xl border border-white/10 shadow-lg bg-white/5 backdrop-blur',
        'overflow-hidden',
        // desktop layout alternando
        'md:grid md:grid-cols-12 md:items-stretch',
        reversed ? 'md:[&>div:first-child]:order-2' : '',
      ].join(' ')}
    >
      {/* imagem */}
      <div className="md:col-span-6">
        <div className="h-56 md:h-full overflow-hidden">
          <img
            src={url_image}
            alt={nome}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* conteúdo */}
      <div className="md:col-span-6 p-5 md:p-7 bg-gradient-to-b from-white/10 to-white/0">
        {/* top bar */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-xl border border-white/20 bg-white/10">
            <span className="i-lucide-layout-grid"></span>
            {tecnologias.length} componentes
          </span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight">{nome}</h3>

        <div className="mt-2 text-sm text-white/70 flex items-center gap-2">
          <span className="i-lucide-sparkles animate-pulse" />
          <span>Tech Stack</span>
        </div>

        {/* tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tecnologias.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full border border-white/20 bg-white/10"
            >
              {t.toLowerCase()}
            </span>
          ))}
        </div>

        {/* seção descrição */}
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">
              Project name
            </p>
            <p className="text-sm text-white/80">{nome}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">
              Challenges
            </p>
            <p className="text-sm text-white/80">{descricao}</p>
          </div>
        </div>

        {/* ações */}
        <div className="mt-6 flex flex-wrap gap-3">
          {repositorio && (
            <a
              href={repositorio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition"
            >
              <span className="i-lucide-code-2" /> Code
            </a>
          )}
          {deploy && (
            <a
              href={deploy}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-emerald-300/30 bg-emerald-400/10 hover:bg-emerald-400/20 transition"
            >
              <span className="i-lucide-globe" /> Website
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
