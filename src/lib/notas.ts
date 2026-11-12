import { getCollection, type CollectionEntry } from 'astro:content';

export type Nota = CollectionEntry<'notas'>;
export type Autora = CollectionEntry<'autoras'>;

/** Notas publicadas (sin borradores), de la más nueva a la más vieja. */
export async function notasPublicadas(): Promise<Nota[]> {
  const todas = await getCollection('notas', (n) => !n.data.borrador);
  return todas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

/** Busca la autora a partir del valor que guarda Pages CMS (ruta o nombre de archivo). */
export async function autoraDe(nota: Nota): Promise<Autora | undefined> {
  const ref = nota.data.autora;
  if (!ref) return undefined;
  const id = ref.split('/').pop()!.replace(/\.md$/, '');
  const autoras = await getCollection('autoras');
  return autoras.find((a) => a.id === id);
}

export function fechaBonita(d: Date): string {
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function iniciales(nombre: string): string {
  return nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('');
}
