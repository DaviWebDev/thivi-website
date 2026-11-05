import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const programs = defineCollection({
  loader: glob({ base: "./src/content/programs", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      bg: image(),
    }),
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.date(),
      image: image(),
      imageAlt: z.string(),
    }),
});

export const collections = { programs, news };
