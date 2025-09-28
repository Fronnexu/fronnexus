'use client';
{
  /*   modifique os estilos do apartir da linha 38 */
}
import { useEffect, useState } from 'react';
import { getProjects } from '@/services/supabase';

export default function HomeProjectInfo() {
  const [loading, setLoading] = useState(true);
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const data = await getProjects(); // pega do banco
      setProjetos(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="mt-10 lg:mt-12">
      {loading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"></div>
      ) : (
        <div>
          {/* tambem preciso que estilize esta div abaixo linha 29 */}
          <div>
            <h1>Real Projects, Real Impact!</h1>
            <h2>
              Explore some of our recent work — where design, development, and
              strategy come together to solve real problems and elevate user
              experiences.
            </h2>
          </div>
          <div className="grid gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projetos.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-gray-200 shadow-lg hover:-translate-y-1 transition-transform duration-200 bg-white"
              >
                {/* Imagem */}
                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={p.url_image}
                    alt={p.nome}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.nome}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{p.descricao}</p>

                  {/* Botão */}
                  <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 transition">
                    Ver detalhes
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
