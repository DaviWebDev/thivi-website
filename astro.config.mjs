import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
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
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Poppins-400.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/Poppins-600.woff2"],
            weight: 600,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/Poppins-700.woff2"],
            weight: 700,
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "AvertaDemoPE",
      cssVariable: "--averta-demo-pe",
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
});
