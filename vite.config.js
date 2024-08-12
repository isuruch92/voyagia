import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  define: {
    "process.env.LOCATIONQ_API_KEY": JSON.stringify(
      process.env.LOCATIONQ_API_KEY
    ),
  },
});
