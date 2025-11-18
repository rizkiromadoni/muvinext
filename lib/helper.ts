export function convertRatingToStarFill(rating: number): number {
  return Math.max(0, Math.min(100, (1 - rating / 10) * 100));
}

export function formatReadableDate(date: string | Date) {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    year: "numeric",   // 2025
    month: "long",     // October
    day: "numeric",    // 23
    hour: "2-digit",   // 02 PM
    minute: "2-digit",
    second: "2-digit",
    hour12: false,      // 12-hour format, ubah ke false kalau mau 24 jam
  });
}

export function buildSitemapIndex(
  sitemaps: { url: string; lastModified: string | undefined }[]
) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  for (const sitemap of sitemaps) {
    xml += "<sitemap>";
    xml += `<loc>${sitemap.url}</loc>`;
    xml += sitemap.lastModified
      ? `<lastmod>${sitemap.lastModified}</lastmod>`
      : "";
    xml += "</sitemap>";
  }

  xml += "</sitemapindex>";
  return xml;
}
