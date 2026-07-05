import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || "https://rvlanjewar.in";
  const robotsTxt = [
    "# Allow search engine crawlers",
    "User-agent: *",
    "Allow: /",
    "",
    "# Keep API routes out of search results",
    "Disallow: /api/",
    "",
    `Sitemap: ${siteUrl}/sitemap-index.xml`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
