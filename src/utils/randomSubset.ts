/**
 * Returns a new array containing `count` distinct, randomly-ordered
 * items from `items` (no repeats, capped at `items.length`). Uses a
 * Fisher-Yates shuffle so every permutation is equally likely.
 */
export const randomSubset = <T>(items: T[], count: number): T[] => {
	const shuffled = [...items]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled.slice(0, count)
}
