import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
const LANG = process.env.LANG_GC || "fr";
export default defineConfig({
  define: { __LANG__: JSON.stringify(LANG) },
  plugins: [svelte(), viteSingleFile()],
  build: { assetsInlineLimit: 100000000, outDir: `dist/${LANG}` }
});
