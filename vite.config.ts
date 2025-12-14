import { defineConfig, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }: ConfigEnv) => {

  const isDev = mode === "development";

  return {
    root: ".",
    plugins: [
      react(),
      tailwindcss(),
      ...(isDev ? [mkcert()] : [])
    ],

    resolve: {
      alias: {
        "@": "/src"
      }
    },

    server: isDev
      ? {
          host: "localhost",
          port: 5173,
          https: {
            // mkcert se encarga de generar los certificados,
            // por eso podemos dejar el objeto vacío.
          }
        }
      : undefined
  };
});

