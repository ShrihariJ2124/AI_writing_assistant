import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    // Disable lightningcss processor (Vercel fails without this)
    transformer: "postcss"
  },
  build: {
    // Disable lightningcss minifier
    cssMinify: false
  }
});
