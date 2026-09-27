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
