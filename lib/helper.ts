export function convertRatingToStarFill(rating: number): number {
  return Math.max(0, Math.min(100, (1 - rating / 10) * 100));
}
