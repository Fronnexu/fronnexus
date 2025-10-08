import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function getProjects() {
  const { data, error } = await supabase.from('project').select('*');
  if (error) {
    console.error('Erro ao buscar projetos:', error.message);
    return [];
  }
  return data;
}
export async function getWorkers() {
  const { data, error } = await supabase.from('workers').select('*');
  if (error) {
    console.error('Erro ao buscar projetos:', error.message);
    return [];
  }
  return data;
}
