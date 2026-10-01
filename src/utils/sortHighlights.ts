import { HIGHLIGHT_ORDER } from '../data/IProject'
import type { IHighlight } from '../data/IProject'

/**
 * Sorts highlights into the canonical HIGHLIGHT_ORDER (see IProject.ts)
 * regardless of the order they were authored in the project data file.
 * Unrecognized headers (custom strings, or a HighlightName not yet
 * added to HIGHLIGHT_ORDER) sort after every recognized one, preserving
 * their original relative order (stable sort) rather than being lost.
 */
export const sortHighlights = (highlights: IHighlight[]): IHighlight[] =>
	[...highlights]
		.map((highlight, index) => ({ highlight, index }))
		.sort((a, b) => {
			const aRank = HIGHLIGHT_ORDER.indexOf(a.highlight.header)
			const bRank = HIGHLIGHT_ORDER.indexOf(b.highlight.header)
			const aPos = aRank === -1 ? HIGHLIGHT_ORDER.length : aRank
			const bPos = bRank === -1 ? HIGHLIGHT_ORDER.length : bRank
			return aPos - bPos || a.index - b.index
		})
		.map(({ highlight }) => highlight)
