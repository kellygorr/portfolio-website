/**
 * Tracks which homepage thumbnails have already fade-in revealed,
 * per-project (keyed by `data.header`). In-memory only — resets on
 * hard reload, survives SPA remounts.
 */
const revealedIds = new Set<string>()

export const hasRevealed = (id: string): boolean => revealedIds.has(id)

export const markRevealed = (id: string): void => {
	revealedIds.add(id)
}
