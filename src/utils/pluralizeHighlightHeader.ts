import { HighlightName } from '../data/IProject'

/**
 * Highlight headers that are written with a generic "(s)" suffix (e.g.
 * "Designer(s)") so one data file can label either a single person or a
 * list of people without the author having to choose a header variant
 * up front. This looks fine for a true list ("Designer(s): Ben
 * Truelove, Damien Aistrope") but reads oddly for a single name
 * ("Designer(s): Kelly Gorr") — see `pluralizeHighlightHeader`, which
 * strips the "(s)" at render time whenever a highlight's own body
 * resolves to exactly one person/team.
 */
const PLURALIZABLE_HEADERS: (HighlightName | string)[] = [
	HighlightName.Designer,
	HighlightName.Content_Designer,
	HighlightName.Engineer,
	HighlightName.Motion_Designer,
]

/**
 * Counts how many distinct people/teams a highlight's body names, so
 * `pluralizeHighlightHeader` can decide singular vs. plural. Content in
 * parentheses is stripped first (e.g. "(XLEi App and database)",
 * "(Overlays)") since it's a qualifier on one entity, not a list of
 * additional entities — leaving it in would cause a false-positive
 * split on words like "and" inside the parenthetical.
 */
const countEntities = (body: string): number => {
	const withoutParens = body.replace(/\([^)]*\)/g, '')
	const parts = withoutParens
		.split(/,|&| and /i)
		.map((part) => part.trim())
		.filter(Boolean)
	return parts.length || 1
}

/**
 * Returns `header` as-is unless it's one of the generic "(s)" headers
 * AND `body` resolves to a single person/team, in which case the
 * "(s)" is dropped (e.g. "Designer(s)" -> "Designer"). Used by
 * Section.tsx when rendering a Highlight's header.
 */
export const pluralizeHighlightHeader = (header: HighlightName | string, body?: string): HighlightName | string => {
	if (!body || !PLURALIZABLE_HEADERS.includes(header)) return header
	return countEntities(body) > 1 ? header : (header as string).replace('(s)', '')
}
