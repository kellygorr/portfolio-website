export const NeutralColors = {
	black: 'rgba(0,0,0,1)',
	gray95: 'rgba(0,0,0,0.95)',
	gray85: 'rgba(0,0,0,0.85)',
	gray81: 'rgba(0,0,0,0.81)',
	gray11: 'rgba(0,0,0,0.11)',
	warmNeutral: '#f9f9f6',
	warmNeutralDark: '#292826',
	neutral40: 'rgb(127,127,127, 0.40)',
	neutral10: 'rgb(127,127,127, 0.10)',
	white15: 'rgba(255,255,255,0.15)',
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

export const themeLight: Theme = {
	accent: NeutralColors.black,
	neutral: NeutralColors.gray11,
	text: NeutralColors.gray81,
	textNegative: NeutralColors.white,
	background: NeutralColors.warmNeutral,
	thumbnail: NeutralColors.neutral10,
	sidebarText: NeutralColors.white,
	sidebarBackground: NeutralColors.gray95,
	footerText: NeutralColors.white,
	footerBackground: NeutralColors.gray95,
	footerBackgroundSecondary: NeutralColors.white15,
	gradient1: AccentColors.darkPink,
	gradient2: AccentColors.darkPurple,
}

export const themeDark: Theme = {
	accent: NeutralColors.white,
	neutral: NeutralColors.gray11,
	text: NeutralColors.white,
	textNegative: NeutralColors.gray81,
	background: NeutralColors.warmNeutralDark,
	thumbnail: NeutralColors.neutral10,
	sidebarText: NeutralColors.gray85,
	sidebarBackground: NeutralColors.white,
	footerText: NeutralColors.white,
	footerBackground: NeutralColors.gray95,
	footerBackgroundSecondary: NeutralColors.white15,
	gradient1: AccentColors.lightPink,
	gradient2: AccentColors.lightOrange,
}
