
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

declare var Deno: any;

const baseUrl = "https://www.iharaoutsourcing.com";
const lastMod = new Date().toISOString().split('T')[0];
const languages = ['es', 'en', 'pt', 'jp', 'de', 'zh', 'ar'];

const generateSitemap = () => {
  let urls = '';
  languages.forEach(lang => {
    const langPath = lang === 'es' ? '' : `/${lang}`;
    urls += `
  <url>
    <loc>${baseUrl}${langPath}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${lang === 'es' ? '1.0' : '0.9'}</priority>
  </url>
  <url>
    <loc>${baseUrl}${langPath}/services</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}${langPath}/insights</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.7</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
};

async function generate() {
  try {
    const sitemap = generateSitemap();
    try { await Deno.mkdir("compiled", { recursive: true }); } catch (e) {}
    await Deno.writeTextFile("compiled/sitemap.xml", sitemap);
    console.log("✅ Sitemap generado en /compiled/sitemap.xml");
  } catch (error) {
    console.error("❌ Error generando sitemap:", error);
  }
}

generate();
