export function normalizeScore(score: number | null | undefined): number {
  return typeof score === "number" ? Math.floor(score / 2) : 0;
}
