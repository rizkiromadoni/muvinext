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
