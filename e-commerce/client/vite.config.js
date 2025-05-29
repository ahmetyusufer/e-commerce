import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      host: "localhost",
      port: parseInt(env.VITE_PORT) || 5173,
      strictPort: true,
      hmr: {
        protocol: "ws",
        host: "localhost",
        port: parseInt(env.VITE_PORT) || 5173,
      },
      proxy: {
        "/api": {
          target: "http://localhost:5050",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
