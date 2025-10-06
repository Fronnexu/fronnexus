'use client';

export default function ProjectCard({
  nome,
  url_image,
  repositorio,
  deploy,
  long_description,
  tecnologias = [],
  reversed = false,
}) {
  return (
    <article
      className={[
        'rounded-3xl border border-color-stroke-container-divider shadow-lg bg-background/5 backdrop-blur',
        'overflow-hidden',
        'h-[535px]',
        'md:grid md:grid-cols-12 md:items-stretch',
        reversed ? 'md:[&>div:first-child]:order-2' : '',
      ].join(' ')}
    >
      {/* imagem */}
      <div className="md:col-span-6 h-full relative overflow-hidden">
        <div className="h-full w-full p-[10px]">
          <div className="h-[515px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100/30 to-purple-300/10 flex items-center justify-center">
            <img
              src={url_image || '/placeholder.svg'}
              alt={nome || 'Projeto'}
              className="h-full w-full object-cover object-center rounded-2xl transition-transform duration-700 ease-in-out hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* conteúdo */}
      <div
        className={[
          'md:col-span-6 bg-gradient-to-b from-color-gradient-border-white to-transparent',
          'h-full overflow-auto scroll-purple', // usa a scrollbar roxa estilizada
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
          {nome || 'Projeto sem nome'}
        </h3>

        <div className="mt-2 text-sm text-primary-70 flex items-center gap-2">
          <span className="i-lucide-sparkles animate-pulse" />
          <span>Tech Stack</span>
        </div>

        {/* tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tecnologias.length > 0 ? (
            tecnologias.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full border border-color-stroke-container-divider bg-color-secundary text-foreground"
              >
                {String(t).toLowerCase()}
              </span>
            ))
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full border border-color-stroke-container-divider bg-color-secundary text-foreground">
              n/a
            </span>
          )}
        </div>

        {/* seção descrição */}
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-70">
              Project name
            </p>
            <p className="text-sm text-foreground">{nome || '—'}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-primary-70">
              Challenges
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {long_description || 'Descrição não disponível.'}
            </p>
          </div>
        </div>

        {/* ações */}
        <div className="mt-6 flex flex-wrap gap-3">
          {repositorio ? (
            <a
              href={repositorio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-color-stroke-container-divider bg-color-secundary hover:bg-color-primary-70 transition text-foreground"
            >
              <span className="i-lucide-code-2" /> Code
            </a>
          ) : null}

          {deploy ? (
            <a
              href={deploy}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-gradient-to-r from-indigo-50 to-pink-50 text-sm font-medium text-t-dark-btn hover:from-indigo-100 hover:to-pink-100 transition"
            >
              <span className="i-lucide-globe" /> Website
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
