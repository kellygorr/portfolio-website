import { neutralThemeBases, ACTIVE_SITE_THEME_KEY } from './neutralThemes'
import { motionPalette } from './motionPalettes'

export const NeutralColors = {
	black: 'rgba(0,0,0,1)',
	gray95: 'rgba(0,0,0,0.95)',
	gray87: 'rgba(0,0,0,0.87)',
	gray85: 'rgba(0,0,0,0.85)',
	gray81: 'rgba(0,0,0,0.81)',
	gray55: 'rgba(0,0,0,0.55)',
	gray11: 'rgba(0,0,0,0.11)',
	warmNeutral: '#fefcfb',
	warmNeutralDark: '#292826',
	neutral40: 'rgb(127,127,127, 0.40)',
	neutral10: 'rgb(127,127,127, 0.10)',
	white15: 'rgba(255,255,255,0.15)',
	white55: 'rgba(255,255,255,0.55)',
	white: 'rgba(255,255,255,1)',
}

export const AccentColors = {
	red: '#eb2f1b',
	darkPink: '#cb006e',
	lightPink: '#FF8FCD',
	darkOrange: '#ff9d00',
	lightOrange: '#FFA238',
	lightPurple: '#BCAAF3',
	lighterPurple: '#DFE4FB',
	midPurple: '#6d52f4',
	darkPurple: '#2a1177',
	white: '#ffffff',
}

export interface Theme {
	accent: string
	neutral: string
	text: string
	subtitleText: string
	textNegative: string
	background: string
	thumbnail: string
	sidebarText: string
	sidebarBackground: string
	footerText: string
	footerBackground: string
	footerBackgroundSecondary: string
	gradient1: string
	gradient2: string
}

/**
 * The site's light-mode neutral colors (background/text/subtitle/accent/
 * thumbnail/footer) all come from the active preset in
 * src/styles/neutralThemes.ts — swap ACTIVE_SITE_THEME_KEY there to change
 * every color at once. gradient1/gradient2 stay defined here since the
 * animated name-hover gradient is intentionally independent of the neutral
 * theme choice.
 */
const activeNeutral = neutralThemeBases[ACTIVE_SITE_THEME_KEY]

// The last two (darkest) Warm Sand accent tokens. Used for both light and
// dark mode — intentionally independent of light/dark and the neutral
// theme choice.
const warmSand = motionPalette('Warm Sand')
const siteGradient1 = warmSand.colors[2]
const siteGradient2 = warmSand.colors[3]

export const themeLight: Theme = {
	accent: activeNeutral.accent,
	neutral: NeutralColors.gray11,
	text: activeNeutral.text,
	subtitleText: activeNeutral.subtitleText,
	textNegative: NeutralColors.white,
	background: activeNeutral.background,
	thumbnail: activeNeutral.thumbnail,
	sidebarText: NeutralColors.white,
	sidebarBackground: activeNeutral.darkFooterBackground,
	footerText: activeNeutral.darkFooterText,
	footerBackground: activeNeutral.darkFooterBackground,
	footerBackgroundSecondary: NeutralColors.white15,
	gradient1: siteGradient1,
	gradient2: siteGradient2,
}

export const themeDark: Theme = {
	accent: NeutralColors.white,
	neutral: NeutralColors.gray11,
	text: NeutralColors.white,
	subtitleText: NeutralColors.white55,
	textNegative: NeutralColors.gray81,
	background: NeutralColors.warmNeutralDark,
	thumbnail: NeutralColors.neutral10,
	sidebarText: NeutralColors.gray85,
	sidebarBackground: NeutralColors.white,
	footerText: NeutralColors.white,
	footerBackground: NeutralColors.gray95,
	footerBackgroundSecondary: NeutralColors.white,
	gradient1: siteGradient1,
	gradient2: siteGradient2,
}
