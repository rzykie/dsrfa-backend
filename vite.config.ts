import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
          charts: ["recharts"],
          icons: ["lucide-react"],
        },
      },
    },
    target: "esnext",
    minify: "esbuild",
  },
  preview: {
    port: 4173,
    host: true,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "lucide-react",
      "recharts",
      "framer-motion",
      "react-hook-form",
    ],
  },
});
