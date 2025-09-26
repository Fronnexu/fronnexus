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
        'rounded-3xl border border-color-stroke-container-divider shadow-lg bg-background/5 backdrop-blur',
        'overflow-hidden',
        // altura fixa do card
        'h-[535px]',
        // layout desktop alternando
        'md:grid md:grid-cols-12 md:items-stretch',
        reversed ? 'md:[&>div:first-child]:order-2' : '',
      ].join(' ')}
    >
      {/* imagem */}
      <div className="md:col-span-6 h-full">
        <div className="h-full p-[10px]">
          <img
            src={url_image}
            alt={nome}
            className="h-[515px] w-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* conteúdo */}
      <div
        className={[
          'md:col-span-6 bg-gradient-to-b from-color-gradient-border-white to-transparent',
          'h-full overflow-auto',
          'p-5 md:p-7',
        ].join(' ')}
      >
        {/* top bar */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-xl border border-color-stroke-container-divider bg-color-secundary">
            <span className="i-lucide-layout-grid"></span>
            {tecnologias.length} componentes
          </span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          {nome}
        </h3>

        <div className="mt-2 text-sm text-primary-70 flex items-center gap-2">
          <span className="i-lucide-sparkles animate-pulse" />
          <span>Tech Stack</span>
        </div>

        {/* tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tecnologias.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full border border-color-stroke-container-divider bg-color-secundary text-foreground"
            >
              {t.toLowerCase()}
            </span>
          ))}
        </div>

        {/* seção descrição */}
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-70">
              Project name
            </p>
            <p className="text-sm text-foreground">{nome}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-primary-70">
              Challenges
            </p>
            <p className="text-sm text-foreground">{descricao}</p>
          </div>
        </div>

        {/* ações */}
        <div className="mt-6 flex flex-wrap gap-3">
          {repositorio && (
            <a
              href={repositorio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-color-stroke-container-divider bg-color-secundary hover:bg-color-primary-70 transition text-foreground"
            >
              <span className="i-lucide-code-2" /> Code
            </a>
          )}
          {deploy && (
            <a
              href={deploy}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-emerald-300/30 bg-gradient-fill-blue hover:opacity-80 transition text-t-light-btn"
            >
              <span className="i-lucide-globe" /> Website
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
