import { defineConfig , loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
  
// https://vite.dev/config/
export default ({ mode }) => {
  // Load env from project root
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react(),  tailwindcss(),],
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL),
      "import.meta.env.VITE_SUPABASE_ANON": JSON.stringify(env.VITE_SUPABASE_ANON),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};