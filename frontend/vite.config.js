import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const isGitHubPages = process.env.GITHUB_PAGES === "true";
export default defineConfig({
    plugins: [react()],
    base: isGitHubPages ? "/personal-trainer-site/" : "/",
    build: {
        outDir: "dist",
        sourcemap: false,
    },
    server: {
        host: true,
        port: 5173,
        proxy: {
            "/api": {
                target: process.env.VITE_API_PROXY || "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
