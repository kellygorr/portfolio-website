import { motionPalettes, type MotionPalette } from '../../src/styles/motionPalettes'

/**
 * Shared "Motion Theme" Storybook Controls-panel dropdown, reused across
 * every Blocks Latency story so there's one consistent select control
 * (not per-story color pickers, and not a separate "Themed" story
 * variant — the default story IS themed).
 */

export const motionThemeNames = motionPalettes.map((p) => p.name)

export const motionThemeArgType = {
	control: { type: 'select' as const },
	options: motionThemeNames,
	description: 'Motion color theme applied to this component',
	table: { defaultValue: { summary: 'Warm Sand' } },
}

/** Resolves a theme name (from args.motionTheme) to its palette. */
export const resolveMotionTheme = (themeName: string | undefined): MotionPalette | undefined => {
	if (!themeName) return undefined
	return motionPalettes.find((p) => p.name === themeName)
}

/** Converts a `#rrggbb` hex color to an `rgba()` string at the given alpha
 *  (0-1). Reserved for hover/press overlays only — every resting-state
 *  fill in this codebase uses a solid, undiluted palette token. */
export const hexToRgba = (hex: string, alpha: number): string => {
	const clean = hex.replace('#', '')
	const bigint = parseInt(clean, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Lightens a `#rrggbb` hex color by mixing it toward white by `amount`
 *  (0-1, e.g. 0.5 = 50% lighter). Returns an opaque `#rrggbb` hex string
 *  — a solid mixed color, not an alpha-blended token. */
export const lightenHex = (hex: string, amount: number): string => {
	const clean = hex.replace('#', '')
	const bigint = parseInt(clean, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	const mix = (channel: number) => Math.round(channel + (255 - channel) * amount)
	const toHex = (channel: number) => channel.toString(16).padStart(2, '0')
	return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`
}

/** Darkens a `#rrggbb` hex color by mixing it toward black by `amount`
 *  (0-1, e.g. 0.5 = 50% darker). Returns an opaque `#rrggbb` hex string.
 *  Used to push a palette's `darkestColor()` token (still a fairly light,
 *  warm accent in most of our 9 palettes) further toward true dark-mode
 *  contrast for full-bleed dark backgrounds, without needing a second
 *  hardcoded near-black color per palette. */
export const darkenHex = (hex: string, amount: number): string => {
	const clean = hex.replace('#', '')
	const bigint = parseInt(clean, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	const mix = (channel: number) => Math.round(channel * (1 - amount))
	const toHex = (channel: number) => channel.toString(16).padStart(2, '0')
	return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`
}

