/**
 * Persists each homepage DemoThumbnail's stop/start toggle to
 * localStorage, keyed per-project, so pause/play choices survive
 * navigation, refreshes, and future visits.
 */
const STORAGE_KEY_PREFIX = 'demoThumbnailStopped:'

export const getStoredStopped = (id: string): boolean | undefined => {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY_PREFIX + id)
		if (raw === null) return undefined
		return raw === 'true'
	} catch {
		return undefined
	}
}

export const setStoredStopped = (id: string, stopped: boolean): void => {
	try {
		window.localStorage.setItem(STORAGE_KEY_PREFIX + id, String(stopped))
	} catch {
		// Ignore — e.g. private browsing / storage disabled / quota
		// exceeded. Worst case, the choice just doesn't persist.
	}
}
