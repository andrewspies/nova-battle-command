import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5178,
  },
  build: {
    target: "modules",
    outDir: "dist",
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [],
});
