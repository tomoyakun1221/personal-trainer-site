import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// GitHub Actions では GITHUB_PAGES が別用途で設定されるため VITE_ プレフィックスを使用
const base = process.env.VITE_BASE_PATH || "/";
export default defineConfig({
    plugins: [react()],
    base,
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
