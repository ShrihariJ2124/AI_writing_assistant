import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    transformer: "postcss" // Disable lightningcss processor
  },
  build: {
    cssMinify: false // Disable lightningcss minifier
  }
});
