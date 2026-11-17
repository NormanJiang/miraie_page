import { defineConfig } from "vite";
import { contentPlugin } from "./scripts/content.mjs";
export default defineConfig({ plugins: [contentPlugin()] });
