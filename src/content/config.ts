import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  // Schema will be automatically inferred from frontmatter
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    order: z.number().optional(),
  }),
});

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  pages,
  docs,
  components,
};
