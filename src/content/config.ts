import { defineCollection } from "astro:content";

const pages = defineCollection({
  type: "content",
  // Schema will be automatically inferred from frontmatter
});

export const collections = {
  pages,
};
