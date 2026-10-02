import { randomSubset } from '../utils/randomSubset'

/**
 * Motion palettes — the single source of truth for every color palette used
 * across the motion-demo Storybook stories (Blocks Latency palette swatches,
 * the Design Playground palette comparisons, and any mockup that wants to
 * show off a palette). Add a new palette here once and it will show up
 * everywhere it's referenced — no need to hunt down and update duplicated
 * hex values in multiple story files.
 *
 * Each palette is really just 5 tokens (background, token2..token5) — a
 * base/background color plus 4 accent colors — so any of the 9 palettes
 * below can be swapped onto a motion component as one unit via
 * motionThemeTokens(). The background token is the card/demo backdrop
 * only — it's never used as a motion element color, so motion elements
 * always draw from the 4 accent tokens (token2..token5).
 * These are entirely separate from the site's light/dark UI theme
 * (src/styles/neutralThemes.ts / src/styles/theme.ts) — motion palettes
 * never participate in the main site's light/dark mode toggle.
 */

export interface MotionThemeTokens {
	/** Base/background color the motion demo is shown on. Never used as a
	 *  motion element color — motion elements draw from token2..token5. */
	background: string
	/** Lightest accent color. */
	token2: string
	token3: string
	token4: string
	/** Deepest/last accent color in the ramp. */
	token5: string
}

export interface MotionPalette {
	/** Display name shown in Storybook, e.g. "Warm Sand (Lime)". */
	name: string
	description: string
	/** Card/demo background color this palette is presented on. */
	background: string
	/** Secondary background — a plain white surface used for elements
	 *  that need to visually pop off the card/demo background (e.g. a
	 *  small labeled control), while still counting as a theme token
	 *  rather than a hardcoded color sprinkled into story files. White
	 *  for all 9 palettes today. */
	background2: string
	/** Text color that reads legibly against this palette's darkest token
	 *  (colors[3]) — used e.g. by the Storybook "recreated for portfolio"
	 *  badge when its background is set to darkestColor(palette). White
	 *  for all 9 palettes, since every darkestColor is dark enough for
	 *  white text to stay legible. */
	text: string
	/** Full dark-mode background — a deliberately hand-tuned dark tone
	 *  (deeper/more saturated than `darkestColor(palette)`, which is a
	 *  palette's 4th *accent* token and reads too mid-tone for a true
	 *  dark-mode canvas). Derived per-palette from a fixed HSL transform
	 *  against Warm Sand's hand-picked `#5a3028`, so every palette gets a
	 *  perceptually consistent, comparably dark background instead of a
	 *  single hardcoded hex reused everywhere. Used by full-bleed
	 *  dark-mode demos (e.g. Motion Tokens/Durations, Motion Tokens/
	 *  Easings) as the page background — kept separate from `colors[3]`
	 *  so darkestColor() and every accent-token-driven demo elsewhere in
	 *  the app are completely unaffected by this. */
	backgroundDark: string
	/** Dark text color for use on a LIGHT badge/chip background (the
	 *  inverse of `text`, which is for a dark badge background) — e.g. the
	 *  "recreated for portfolio" badge flips to a light chip with this as
	 *  its text color on the full-bleed dark-mode demos, so the badge
	 *  still stands out against a dark canvas instead of disappearing.
	 *  Same computed value as `backgroundDark` — one hand-tuned dark tone
	 *  per palette, used as a background in one context and as text in
	 *  the other. */
	textDark: string
	/** 5 colors, ordered light to dark. Used everywhere — swatches,
	 *  motionThemeTokens, darkestColor, and fed directly into
	 *  <Blocks colors={...} />. The 5th is always a duplicate of the 3rd
	 *  (colors[2]). */
	colors: [string, string, string, string, string]
	/** Human-readable names for [background, colors[0], colors[1], colors[2], colors[3]] —
	 *  used by swatch-only displays (e.g. Palettes.stories.tsx). */
	swatchNames: [string, string, string, string, string]
}

export const motionPalettes: MotionPalette[] = [
	{
		name: 'Warm Sand',
		description: 'Soft, muted, more neutral-leaning warm palette.',
		background: '#f7f2e3',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#5a3028',
		textDark: '#5a3028',
		colors: ['#e9d7b8', '#e0a695', '#e8a668', '#c9765a', '#e8a668'],
		swatchNames: ['Cream', 'Sand', 'Rose', 'Amber', 'Clay'],
	},
	{
		name: 'Golden Hour',
		description: 'Warmer, more saturated gold/orange lean.',
		background: '#fbf3dc',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#5b2c24',
		textDark: '#5b2c24',
		colors: ['#f0dcae', '#eab3a3', '#f2a94e', '#cf6d4e', '#f2a94e'],
		swatchNames: ['Cream', 'Wheat', 'Blush', 'Marigold', 'Rust'],
	},
	{
		name: 'Dusty Rose',
		description: 'Cooler, dustier, more pink-leaning.',
		background: '#fdf8f1',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#57322c',
		textDark: '#57322c',
		colors: ['#e4d4bd', '#d9a8a0', '#dfa878', '#c17a63', '#dfa878'],
		swatchNames: ['Ivory', 'Oat', 'Dusty Pink', 'Apricot', 'Terracotta'],
	},
	{
		name: 'Warm Sand (Lime)',
		description: 'Warm Sand base, muted olive/sage green ramp with a blue-teal accent.',
		background: '#f7f2e3',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#294333',
		textDark: '#294333',
		colors: ['#e9d7b8', '#b9cf6a', '#4f9fb3', '#3f8b6b', '#4f9fb3'],
		swatchNames: ['Cream', 'Sand', 'Sage', 'Blue Teal', 'Forest'],
	},
	{
		name: 'Golden Hour (Lime)',
		description: 'Golden Hour base, brighter chartreuse/yellow-green ramp with a blue-teal accent.',
		background: '#fbf3dc',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#354822',
		textDark: '#354822',
		colors: ['#f0dcae', '#d9e760', '#5288e1', '#6fae4e', '#5288e1'],
		swatchNames: ['Cream', 'Wheat', 'Lemon Lime', 'Blue Teal', 'Leaf'],
	},
	{
		name: 'Dusty Rose (Lime)',
		description: 'Dusty Rose base, cooler mint/green ramp with a blue accent.',
		background: '#fdf8f1',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#214139',
		textDark: '#214139',
		colors: ['#e4d4bd', '#9fd3a2', '#2f7fb3', '#2d8d78', '#2f7fb3'],
		swatchNames: ['Ivory', 'Oat', 'Mint', 'Blue', 'Teal'],
	},
	{
		name: 'Warm Sand (Beige)',
		description: 'Warm Sand base, neutral sand/taupe accent ramp.',
		background: '#f7f2e3',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#3f2c23',
		textDark: '#3f2c23',
		colors: ['#e9d7b8', '#cfb28e', '#a9825b', '#8a573c', '#a9825b'],
		swatchNames: ['Cream', 'Sand', 'Taupe', 'Saddle', 'Umber'],
	},
	{
		name: 'Golden Hour (Beige)',
		description: 'Golden Hour base, warm caramel/golden brown accent ramp.',
		background: '#fbf3dc',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#4c2d1d',
		textDark: '#4c2d1d',
		colors: ['#f0dcae', '#e3b36e', '#c8843d', '#a85d2f', '#c8843d'],
		swatchNames: ['Cream', 'Wheat', 'Caramel', 'Copper', 'Burnt Sienna'],
	},
	{
		name: 'Dusty Rose (Beige)',
		description: 'Dusty Rose base, rosy cocoa/tan accent ramp.',
		background: '#fdf8f1',
		background2: '#fff',
		text: '#fff',
		backgroundDark: '#412822',
		textDark: '#412822',
		colors: ['#e4d4bd', '#c8a08f', '#a77764', '#7d4d42', '#a77764'],
		swatchNames: ['Ivory', 'Oat', 'Rose Taupe', 'Cocoa', 'Mahogany'],
	},
]

/**
 * Type-safe union of every valid palette name, derived directly from
 * `motionPalettes` (add a palette above and this type updates itself —
 * no separate list to keep in sync). Use this instead of a raw `string`
 * anywhere a palette name is passed around (e.g. `MotionDemoProps.theme`)
 * so a typo is a compile error and callers get autocomplete, instead of
 * only failing at runtime inside `motionPalette()`.
 */
export type MotionPaletteName = (typeof motionPalettes)[number]['name']

/**
 * Discoverable, importable constants for every palette name — lets
 * callers write `MotionPaletteNames.WarmSand` instead of retyping the
 * string `'Warm Sand'`, so the name is autocompleted and refactor-safe
 * (rename here, every usage updates). Purely a convenience layer over
 * the same string literals in `MotionPaletteName`.
 */
export const MotionPaletteNames = {
	WarmSand: 'Warm Sand',
	GoldenHour: 'Golden Hour',
	DustyRose: 'Dusty Rose',
	WarmSandLime: 'Warm Sand (Lime)',
	GoldenHourLime: 'Golden Hour (Lime)',
	DustyRoseLime: 'Dusty Rose (Lime)',
	WarmSandBeige: 'Warm Sand (Beige)',
	GoldenHourBeige: 'Golden Hour (Beige)',
	DustyRoseBeige: 'Dusty Rose (Beige)',
} as const satisfies Record<string, MotionPaletteName>

/**
 * Returns `count` distinct palette names in random order (no repeats,
 * up to the total number of palettes available). Used to give each demo
 * on a page a different, randomized-per-page-load theme, matching the
 * "each demo gets its own palette" convention without hand-picking which
 * one goes where.
 */
export const randomMotionPaletteNames = (count: number): MotionPaletteName[] =>
	randomSubset(
		motionPalettes.map((p) => p.name),
		count
	)

/** Derives the 5 named swatches [background, colors[0], colors[1], colors[2], colors[3]] for a palette. */
export const paletteSwatches = (palette: MotionPalette): { name: string; hex: string }[] => [
	{ name: palette.swatchNames[0], hex: palette.background },
	{ name: palette.swatchNames[1], hex: palette.colors[0] },
	{ name: palette.swatchNames[2], hex: palette.colors[1] },
	{ name: palette.swatchNames[3], hex: palette.colors[2] },
	{ name: palette.swatchNames[4], hex: palette.colors[3] },
]

/**
 * The last unique color in the palette's ramp (colors[3] / token5). All 9
 * palettes are ordered light to dark, so this is always the darkest step —
 * colors[4] just duplicates colors[2] for the Blocks component's 5-block
 * layout and isn't a distinct step in the ramp.
 */
export const darkestColor = (palette: MotionPalette): string => palette.colors[3]

/**
 * Reduces a palette down to its 5 core tokens (background + 4 accent
 * colors), for swapping a whole palette onto a motion component as one
 * unit rather than reaching into `.background`/`.colors` individually.
 */
export const motionThemeTokens = (palette: MotionPalette): MotionThemeTokens => ({
	background: palette.background,
	token2: palette.colors[0],
	token3: palette.colors[1],
	token4: palette.colors[2],
	token5: palette.colors[3],
})

/** Convenience lookup by exact palette name, e.g. motionPalette('Warm Sand'). */
export const motionPalette = (name: MotionPaletteName): MotionPalette => {
	const found = motionPalettes.find((p) => p.name === name)
	if (!found) {
		throw new Error(`Unknown motion palette: ${name}`)
	}
	return found
}
