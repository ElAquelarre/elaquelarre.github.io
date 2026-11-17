import { getCollection, type CollectionEntry } from 'astro:content';

export type Evento = CollectionEntry<'eventos'>;

/** Eventos publicados, del más reciente al más viejo. */
export async function eventosPublicados(): Promise<Evento[]> {
  const todos = await getCollection('eventos', (e) => !e.data.borrador);
  return todos.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

/** «Jun 2026»: en la web solo se muestra mes y año. */
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
export function mesAnio(d: Date): string {
  return `${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function dondeFue(e: Evento): string {
  return [e.data.lugar, e.data.ciudad].filter(Boolean).join(', ');
}
