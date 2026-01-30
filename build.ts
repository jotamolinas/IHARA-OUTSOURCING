
/**
 * Ihara Outsourcing - Universal Build Script (WASM)
 * Solves "Exec format error" in CI/CD environments
 */

import * as esbuild from "https://deno.land/x/esbuild@v0.20.2/wasm.js";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@0.11.0";

async function build() {
  console.log("🚀 Iniciando construcción universal (WASM)...");
  
  try {
    // Inicializar esbuild WASM
    await esbuild.initialize({
      wasmURL: "https://deno.land/x/esbuild@v0.20.2/esbuild.wasm",
      worker: false,
    });

    // Asegurar que la carpeta compiled existe
    // @ts-ignore
    try { await Deno.mkdir("compiled", { recursive: true }); } catch {}

    await esbuild.build({
      plugins: [...denoPlugins({
        importMapURL: new URL("./deno.json", import.meta.url).href,
      })],
      entryPoints: ["./index.tsx"],
      outfile: "./compiled/index.js",
      bundle: true,
      format: "esm",
      minify: true,
      jsx: "automatic",
      jsxImportSource: "react",
    });

    console.log("✅ Proyecto empaquetado con éxito.");
  } catch (e) {
    console.error("❌ Error crítico en el build:", e);
    // @ts-ignore
    Deno.exit(1);
  } finally {
    esbuild.stop();
  }
}

// @ts-ignore
if (import.meta.main) {
  build();
}
