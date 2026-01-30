
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

declare var Deno: any;

const PORT = parseInt(Deno.env.get("PORT") || "8080");
const COMPILED_DIR = "./compiled";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".json": "application/json; charset=utf-8",
};

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let path = url.pathname;

  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  // Archivos con extensión
  if (path.includes(".")) {
    try {
      const content = await Deno.readFile(`${COMPILED_DIR}${path}`);
      const ext = path.substring(path.lastIndexOf("."));
      return new Response(content, { headers: { "content-type": MIME_TYPES[ext] || "application/octet-stream" } });
    } catch { return new Response("Not Found", { status: 404 }); }
  }

  // Ruteo de idiomas
  try {
    const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    const lang = langMatch ? langMatch[1] : null;
    const supported = ['en', 'pt', 'jp', 'de', 'zh', 'ar'];
    
    let indexPath = `${COMPILED_DIR}/index.html`;
    if (lang && supported.includes(lang)) indexPath = `${COMPILED_DIR}/${lang}/index.html`;

    const content = await Deno.readFile(indexPath);
    return new Response(content, { headers: { "content-type": "text/html" } });
  } catch {
    const content = await Deno.readFile(`${COMPILED_DIR}/index.html`);
    return new Response(content, { headers: { "content-type": "text/html" } });
  }
}

Deno.serve({ port: PORT, hostname: "0.0.0.0" }, handleRequest);
