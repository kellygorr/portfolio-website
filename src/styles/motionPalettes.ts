/**
 * Motion palettes — the single source of truth for every color palette used
 * across the motion-demo Storybook stories (Blocks Latency palette swatches,
 * the Design Playground palette comparisons, and any mockup that wants to
 * show off a palette). Add a new palette here once and it will show up
 * everywhere it's referenced — no need to hunt down and update duplicated
 * hex values in multiple story files.
 */

export interface MotionPalette {
	/** Display name shown in Storybook, e.g. "Warm Sand (Lime)". */
	name: string
	description: string
	/** Card/demo background color this palette is presented on. */
	background: string
	/** 5 colors fed directly into <Blocks colors={...} />. The 5th is always
	 *  a duplicate of the 3rd (colors[2]), matching the Blocks component's
	 *  block layout. */
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
		colors: ['#e9d7b8', '#e8a668', '#c9765a', '#e0a695', '#c9765a'],
		swatchNames: ['Cream', 'Sand', 'Amber', 'Clay', 'Rose'],
	},
	{
		name: 'Golden Hour',
		description: 'Warmer, more saturated gold/orange lean.',
		background: '#fbf3dc',
		colors: ['#f0dcae', '#f2a94e', '#cf6d4e', '#eab3a3', '#cf6d4e'],
		swatchNames: ['Cream', 'Wheat', 'Marigold', 'Rust', 'Blush'],
	},
	{
		name: 'Dusty Rose',
		description: 'Cooler, dustier, more pink-leaning.',
		background: '#fdf8f1',
		colors: ['#e4d4bd', '#dfa878', '#c17a63', '#d9a8a0', '#c17a63'],
		swatchNames: ['Ivory', 'Oat', 'Apricot', 'Terracotta', 'Dusty Pink'],
	},
	{
		name: 'Warm Sand (Lime)',
		description: 'Warm Sand base, bright lime accent ramp with a teal accent.',
		background: '#f7f2e3',
		colors: ['#e9d7b8', '#c4d97a', '#a3c93f', '#4f9e7c', '#a3c93f'],
		swatchNames: ['Cream', 'Sand', 'Lime', 'Chartreuse', 'Teal Lime'],
	},
	{
		name: 'Golden Hour (Lime)',
		description: 'Golden Hour base, bright lime accent ramp with a teal accent.',
		background: '#fbf3dc',
		colors: ['#f0dcae', '#c9de85', '#aad147', '#56a67f', '#aad147'],
		swatchNames: ['Cream', 'Wheat', 'Lime', 'Chartreuse', 'Teal Lime'],
	},
	{
		name: 'Dusty Rose (Lime)',
		description: 'Dusty Rose base, bright lime accent ramp with a teal accent.',
		background: '#fdf8f1',
		colors: ['#e4d4bd', '#c0d47e', '#9fc544', '#4a9575', '#9fc544'],
		swatchNames: ['Ivory', 'Oat', 'Lime', 'Chartreuse', 'Teal Lime'],
	},
	{
		name: 'Warm Sand (Beige)',
		description: 'Warm Sand base, light beige accent ramp.',
		background: '#f7f2e3',
		colors: ['#e9d7b8', '#d4b896', '#b8905f', '#b06a3e', '#b8905f'],
		swatchNames: ['Cream', 'Sand', 'Beige', 'Camel', 'Clay'],
	},
	{
		name: 'Golden Hour (Beige)',
		description: 'Golden Hour base, light beige accent ramp.',
		background: '#fbf3dc',
		colors: ['#f0dcae', '#dcbe9a', '#c19765', '#bc7443', '#c19765'],
		swatchNames: ['Cream', 'Wheat', 'Beige', 'Camel', 'Clay'],
	},
	{
		name: 'Dusty Rose (Beige)',
		description: 'Dusty Rose base, light beige accent ramp.',
		background: '#fdf8f1',
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

/** Convenience lookup by exact palette name, e.g. motionPalette('Warm Sand'). */
export const motionPalette = (name: string): MotionPalette => {
	const found = motionPalettes.find((p) => p.name === name)
	if (!found) {
		throw new Error(`Unknown motion palette: ${name}`)
	}
	return found
}
