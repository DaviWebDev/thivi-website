import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  build: {
    inlineStylesheets: "always",
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "frame-src https://www.google.com",
      ],
      styleDirective: {
        resources: [{ resource: "'unsafe-inline'", kind: "attribute" }],
      },
    },
  },
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Poppins",
      cssVariable: "--poppins",
      fallbacks: ["Arial", "Roboto"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Poppin-VF.woff2"],
            weight: "400 800",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "AvertaDemoPE",
      cssVariable: "--averta-demo-pe",
      fallbacks: ["Arial", "sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/AvertaDemoPE-400.woff2"],
            weight: 400,
            style: "normal",
          },
        ],
      },
    },
  ],
  site: process.env.SITE_URL || "http://localhost:4321",
  integrations: [icon(), sitemap()],
});
