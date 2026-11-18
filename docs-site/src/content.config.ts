import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // Questions shown by <Faq /> on the page and sent as FAQPage structured data by Head.astro.
        // Answers may use [text](url) links; the structured data keeps the text and the URL.
        faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
      }),
    }),
  }),
};
