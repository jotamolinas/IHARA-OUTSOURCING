

/**
 * Ihara Outsourcing - Universal Build Script (WASM)
 * Solución definitiva para rutas en GitHub Actions
 */

import * as esbuild from "https://deno.land/x/esbuild@v0.20.2/wasm.js";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@0.11.0";

async function build() {
  console.log("🚀 Iniciando construcción universal...");
  
  try {
    // Inicializar esbuild WASM
    await esbuild.initialize({
      wasmURL: "https://deno.land/x/esbuild@v0.20.2/esbuild.wasm",
      worker: false,
    });

    // Creamos la carpeta de salida si no existe
    try {
      // @ts-ignore
      await Deno.mkdir("compiled", { recursive: true });
    } catch {}

    // Resolvemos las URLs de los archivos de forma dinámica
    // Esto evita el error de "file:///index.tsx" no encontrado
    const importMapURL = new URL("./deno.json", import.meta.url).href;

    await esbuild.build({
      plugins: [...denoPlugins({
        importMapURL: importMapURL,
        loader: "native",
      })],
      // Usamos la ruta relativa al directorio actual
      entryPoints: ["./index.tsx"],
      outfile: "./compiled/index.js",
      bundle: true,
      format: "esm",
      minify: true,
      jsx: "automatic",
      jsxImportSource: "react",
      // Forzamos a esbuild a reconocer el directorio actual como raíz
      // @ts-ignore
      absWorkingDir: Deno.cwd(),
    });

    console.log("✅ Build completado exitosamente en ./compiled/index.js");
  } catch (e) {
    console.error("❌ Error durante el build:", e);
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
