import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Las notas y las autoras se editan desde Pages CMS (ver .pages.yml).

const autoras = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/autoras' }),
  schema: z.object({
    nombre: z.string(),
    usuario: z.string().optional().nullable(),
    rol: z.string().optional().nullable(),
    foto: z.string().optional().nullable(),
  }),
});

const notas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notas' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    categoria: z.string().optional().nullable(),
    // Pages CMS guarda la ruta del archivo de la autora (p. ej. "src/content/autoras/alejandra.md")
    autora: z.string().optional().nullable(),
    portada: z.string().optional().nullable(),
    resumen: z.string().optional().nullable(),
    borrador: z.boolean().optional().default(false),
  }),
});

// Eventos, torneos y activaciones: alimentan el álbum de «Lo que hemos hecho» y cada uno tiene su página.
const eventos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventos' }),
  schema: z.object({
    nombre: z.string(),
    fecha: z.coerce.date(),
    tipo: z.enum(['Evento', 'Torneo', 'Activación', 'Contenido']),
    lugar: z.string().optional().nullable(),
    ciudad: z.string().optional().nullable(),
    resumen: z.string().optional().nullable(),
    portada: z.string().optional().nullable(),
    fotos: z.array(z.string()).optional().nullable(),
    destacado: z.boolean().optional().default(false),
    borrador: z.boolean().optional().default(false),
  }),
});

export const collections = { autoras, notas, eventos };
