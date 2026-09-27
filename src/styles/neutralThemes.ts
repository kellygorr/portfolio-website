/**
 * Neutral homepage themes — the single source of truth for every restrained
 * black/white/grey color theme explored in the Design Playground (and the
 * one currently applied to the real site: `classicMono`).
 *
 * Add a new base theme to `neutralThemeBases` and it automatically gets a
 * "Dark" and "Light" footer variant via `neutralThemes`, and is available to
 * both the real site's theme (`src/styles/theme.ts`) and every Storybook
 * mockup that imports from here — no more hunting down duplicated hex
 * values across story files when a color needs to change.
 *
 * To change which neutral theme the real site uses, update
 * `ACTIVE_SITE_THEME_KEY` below and `src/styles/theme.ts` picks it up
 * automatically.
 */

export interface NeutralThemeBase {
	label: string
	description: string
	/** Page background. */
	background: string
	/** Primary body/heading text color. */
	text: string
	/** Dimmed color for secondary text (e.g. the "UX Engineer + Designer" subtitle). */
	subtitleText: string
	/** Single quiet accent used only for hover states (underline, border) — never a fill. */
	accent: string
	/** Placeholder background for project thumbnails. */
	thumbnail: string
	/** Solid dark footer background (the site's current default footer treatment). */
	darkFooterBackground: string
	/** Footer text color to pair with darkFooterBackground. */
	darkFooterText: string
	/** Solid light footer background (matches this theme's thumbnail placeholder tone). */
	lightFooterBackground: string
}

export type FooterStyle = 'dark' | 'light'

export interface NeutralTheme extends NeutralThemeBase {
	footerStyle: FooterStyle
	footerBackground: string
	footerText: string
}

export const neutralThemeBases: Record<string, NeutralThemeBase> = {
	classicMono: {
		label: 'Classic Mono',
		description: 'The current site as-is: pure black and white, no accent color at all.',
		background: '#fefcfb',
		text: 'rgba(0,0,0,0.87)',
		subtitleText: 'rgba(0,0,0,0.55)',
		accent: '#000000',
		thumbnail: 'rgba(127,127,127,0.10)',
		darkFooterBackground: 'rgba(0,0,0,0.95)',
		darkFooterText: '#ffffff',
		lightFooterBackground: '#f1f0ef',
	},
	warmInk: {
		label: 'Warm Ink',
		description: 'Warm paper-white background, soft black ink text, a barely-there rust underline on hover.',
		background: '#faf7f2',
		text: 'rgba(20,15,10,0.88)',
		subtitleText: 'rgba(20,15,10,0.5)',
		accent: '#8a5a42',
		thumbnail: 'rgba(90,60,40,0.07)',
		darkFooterBackground: '#211a15',
		darkFooterText: '#f3ede4',
		lightFooterBackground: '#efeae4',
	},
	softStone: {
		label: 'Soft Stone',
		description: 'Warm stone-grey background, deep brown-black text, a quiet taupe hover accent.',
		background: '#f2efe9',
		text: 'rgba(28,24,20,0.88)',
		subtitleText: 'rgba(28,24,20,0.5)',
		accent: '#7a6a58',
		thumbnail: 'rgba(90,78,64,0.08)',
		darkFooterBackground: '#2a251f',
		darkFooterText: '#f2efe9',
		lightFooterBackground: '#e6e2db',
	},
	boneAndCharcoal: {
		label: 'Bone & Charcoal',
		description: 'Bone-white background, charcoal text, footer in a dark warm charcoal instead of pure black.',
		background: '#f8f6f2',
		text: 'rgba(30,28,26,0.88)',
		subtitleText: 'rgba(30,28,26,0.5)',
		accent: '#6b6259',
		thumbnail: 'rgba(107,98,89,0.08)',
		darkFooterBackground: '#33302c',
		darkFooterText: '#f8f6f2',
		lightFooterBackground: '#edeae6',
	},
}

/** Which base theme the real site currently uses (src/styles/theme.ts reads this). */
export const ACTIVE_SITE_THEME_KEY: keyof typeof neutralThemeBases = 'classicMono'

const footerStyleLabel: Record<FooterStyle, string> = {
	dark: 'Dark Footer',
	light: 'Light Footer',
}

const buildNeutralTheme = (base: NeutralThemeBase, footerStyle: FooterStyle): NeutralTheme => ({
	...base,
	label: `${base.label} (${footerStyleLabel[footerStyle]})`,
	footerStyle,
	footerBackground: footerStyle === 'dark' ? base.darkFooterBackground : base.lightFooterBackground,
	footerText: footerStyle === 'dark' ? base.darkFooterText : base.text,
})

/**
 * Every base theme × footer style combination, keyed as `${baseKey}Dark` /
 * `${baseKey}Light` (e.g. `classicMonoDark`, `warmInkLight`).
 */
export const neutralThemes: Record<string, NeutralTheme> = Object.fromEntries(
	Object.entries(neutralThemeBases).flatMap(([key, base]) => [
		[`${key}Dark`, buildNeutralTheme(base, 'dark')],
		[`${key}Light`, buildNeutralTheme(base, 'light')],
	])
)
