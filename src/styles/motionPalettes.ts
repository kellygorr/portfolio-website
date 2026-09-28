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
		colors: ['#e9d7b8', '#e0a695', '#e8a668', '#c9765a', '#e8a668'],
		swatchNames: ['Cream', 'Sand', 'Rose', 'Amber', 'Clay'],
	},
	{
		name: 'Golden Hour',
		description: 'Warmer, more saturated gold/orange lean.',
		background: '#fbf3dc',
		background2: '#fff',
		text: '#fff',
		colors: ['#f0dcae', '#eab3a3', '#f2a94e', '#cf6d4e', '#f2a94e'],
		swatchNames: ['Cream', 'Wheat', 'Blush', 'Marigold', 'Rust'],
	},
	{
		name: 'Dusty Rose',
		description: 'Cooler, dustier, more pink-leaning.',
		background: '#fdf8f1',
		background2: '#fff',
		text: '#fff',
		colors: ['#e4d4bd', '#d9a8a0', '#dfa878', '#c17a63', '#dfa878'],
		swatchNames: ['Ivory', 'Oat', 'Dusty Pink', 'Apricot', 'Terracotta'],
	},
	{
		name: 'Warm Sand (Lime)',
		description: 'Warm Sand base, bright lime accent ramp with a teal accent.',
		background: '#f7f2e3',
		background2: '#fff',
		text: '#fff',
		colors: ['#e9d7b8', '#c4d97a', '#a3c93f', '#4f9e7c', '#a3c93f'],
		swatchNames: ['Cream', 'Sand', 'Lime', 'Chartreuse', 'Teal Lime'],
	},
	{
		name: 'Golden Hour (Lime)',
		description: 'Golden Hour base, bright lime accent ramp with a teal accent.',
		background: '#fbf3dc',
		background2: '#fff',
		text: '#fff',
		colors: ['#f0dcae', '#c9de85', '#aad147', '#56a67f', '#aad147'],
		swatchNames: ['Cream', 'Wheat', 'Lime', 'Chartreuse', 'Teal Lime'],
	},
	{
		name: 'Dusty Rose (Lime)',
		description: 'Dusty Rose base, bright lime accent ramp with a teal accent.',
		background: '#fdf8f1',
		background2: '#fff',
		text: '#fff',
		colors: ['#e4d4bd', '#c0d47e', '#9fc544', '#4a9575', '#9fc544'],
		swatchNames: ['Ivory', 'Oat', 'Lime', 'Chartreuse', 'Teal Lime'],
	},
	{
		name: 'Warm Sand (Beige)',
		description: 'Warm Sand base, light beige accent ramp.',
		background: '#f7f2e3',
		background2: '#fff',
		text: '#fff',
		colors: ['#e9d7b8', '#d4b896', '#b8905f', '#b06a3e', '#b8905f'],
		swatchNames: ['Cream', 'Sand', 'Beige', 'Camel', 'Clay'],
	},
	{
		name: 'Golden Hour (Beige)',
		description: 'Golden Hour base, light beige accent ramp.',
		background: '#fbf3dc',
		background2: '#fff',
		text: '#fff',
		colors: ['#f0dcae', '#dcbe9a', '#c19765', '#bc7443', '#c19765'],
		swatchNames: ['Cream', 'Wheat', 'Beige', 'Camel', 'Clay'],
	},
	{
		name: 'Dusty Rose (Beige)',
		description: 'Dusty Rose base, light beige accent ramp.',
		background: '#fdf8f1',
		background2: '#fff',
		text: '#fff',
		colors: ['#e4d4bd', '#d6bb98', '#b99461', '#b3703f', '#b99461'],
		swatchNames: ['Ivory', 'Oat', 'Beige', 'Camel', 'Clay'],
	},
]

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
export const motionPalette = (name: string): MotionPalette => {
	const found = motionPalettes.find((p) => p.name === name)
	if (!found) {
		throw new Error(`Unknown motion palette: ${name}`)
	}
	return found
}
