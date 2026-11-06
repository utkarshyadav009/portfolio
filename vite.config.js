import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works under https://utkarshyadav009.github.io/portfolio/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "build" },
});
