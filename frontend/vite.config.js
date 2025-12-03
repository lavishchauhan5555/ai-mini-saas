import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default ({ mode }) => {
  // Load .env, .env.development, .env.production
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    // Optional: expose env if needed for debugging (not required)
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  });
};
