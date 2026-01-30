

/**
 * Ihara Outsourcing - Custom Build Script
 * Uses esbuild + deno loader for stable bundling
 */

import * as esbuild from "https://deno.land/x/esbuild@v0.20.2/mod.js";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@0.11.0";

async function build() {
  console.log("🚀 Iniciando construcción de Ihara Outsourcing...");
  
  try {
    // Asegurar que la carpeta compiled existe
    // @ts-ignore: Deno global is available in Deno runtime
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

    console.log("✅ Bundle generado en compiled/index.js");
  } catch (e) {
    console.error("❌ Error durante el bundling:", e);
    // @ts-ignore: Deno global is available in Deno runtime
    Deno.exit(1);
  } finally {
    esbuild.stop();
  }
}

// @ts-ignore: import.meta.main is a Deno extension
if (import.meta.main) {
  build();
}
