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
        'glass-card rounded-2xl overflow-hidden',
        'md:grid md:grid-cols-12 md:items-stretch',
        reversed ? 'md:[&>div:first-child]:order-2' : '',
      ].join(' ')}
    >
      {/* Image */}
      <div className="md:col-span-6 relative overflow-hidden">
        <div className="h-64 md:h-full w-full">
          <img
            src={url_image || '/placeholder.svg'}
            alt={nome || 'Project'}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-center">
        {/* Tech count badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary-70">
            {tecnologias.length} technologies
          </span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-primary">
          {nome || 'Unnamed Project'}
        </h3>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tecnologias.length > 0 ? (
            tecnologias.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary-70"
              >
                {String(t).toLowerCase()}
              </span>
            ))
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary-70">
              n/a
            </span>
          )}
        </div>

        {/* Description */}
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-70 mb-1">
              About
            </p>
            <p className="text-sm text-primary leading-relaxed">
              {long_description || 'Description not available.'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {repositorio && (
            <a
              href={repositorio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary hover:border-[rgba(139,92,246,0.3)] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Code
            </a>
          )}

          {deploy && (
            <a
              href={deploy}
              target="_blank"
              rel="noreferrer"
              className="btn-shine inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8b5cf6] text-sm font-medium text-white shadow-lg shadow-[rgba(139,92,246,0.2)] hover:bg-[#7c3aed] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
              Website
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
