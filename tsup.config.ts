import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"], // don’t bundle React
  loader: {
    ".ts": "ts",
    ".tsx": "tsx" // ✅ Ensures tsx files are handled correctly
  }
});