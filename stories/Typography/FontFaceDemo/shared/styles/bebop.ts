import { TypographyStylesExtended } from './ebay'

// Utility function to convert pixels to rem (base font size: 16px for Typography section)
export const convertToRemBase16 = (pixels: number): string => `${pixels / 16}rem`

// Utility function to convert pixels to rem (base font size: 10px)
export const convertToRemBase10 = (pixels: number): string => `${pixels / 10}rem`

// Utility function to round to nearest 4
export const roundToNearest4 = (x: number): number => 4 * Math.round(x / 4)

// Utility function to convert rem values to px for display
export const convertToPx = (remValue: string | number): string => {
	// Handle both string ("2.75rem") and number (2.75) inputs
	const numericValue = typeof remValue === 'string' ? parseFloat(remValue.replace('rem', '')) : remValue

	if (isNaN(numericValue)) return ''
	// Convert to px (assuming 16px base font size)
	const pxValue = numericValue * 16
	return `(${pxValue}px)`
}

// Bebop Typography Styles for makeStyles (using rem values with 16px base)
export const typographyBebopStyles = {
	caption2: {
		// Small 2
		fontSize: convertToRemBase16(10),
		lineHeight: convertToRemBase16(14),
		fontWeight: 400,
	},
	caption2Strong: {
		// Small 2 Strong (not in Bebop spec)
		fontSize: convertToRemBase16(10),
		lineHeight: convertToRemBase16(14),
		fontWeight: 400,
	},
	caption1: {
		// Small
		fontSize: convertToRemBase16(12),
		lineHeight: convertToRemBase16(16),
		fontWeight: 400,
	},
	caption1Strong: {
		// Small Strong (not in Bebop spec)
		fontSize: convertToRemBase16(12),
		lineHeight: convertToRemBase16(16),
		fontWeight: 400,
	},
	caption1Stronger: {
		// Small Stronger (not in Bebop spec)
		fontSize: convertToRemBase16(12),
		lineHeight: convertToRemBase16(16),
		fontWeight: 400,
	},
	body2: {
		// Paragraph 2
		fontSize: convertToRemBase16(14),
		lineHeight: convertToRemBase16(20),
		fontWeight: 400,
	},
	body1: {
		// Paragraph
		fontSize: convertToRemBase16(16),
		lineHeight: convertToRemBase16(24),
		fontWeight: 400,
	},
	body1Strong: {
		// Heading 6
		fontSize: convertToRemBase16(16),
		lineHeight: convertToRemBase16(22),
		fontWeight: 600,
	},
	body1Stronger: {
		// Heading 6 Stronger (not in Bebop spec)
		fontSize: convertToRemBase16(16),
		lineHeight: convertToRemBase16(22),
		fontWeight: 400,
	},
	subtitle2: {
		// Heading 5 (not in Bebop spec but similar to subtitle1)
		fontSize: convertToRemBase16(20),
		lineHeight: convertToRemBase16(32),
		fontWeight: 600,
	},
	subtitle2Stronger: {
		// Heading 5 Stronger (not in Bebop spec)
		fontSize: convertToRemBase16(20),
		lineHeight: convertToRemBase16(32),
		fontWeight: 600,
	},
	subtitle1: {
		// Heading 5
		fontSize: convertToRemBase16(20),
		lineHeight: convertToRemBase16(32),
		fontWeight: 600,
	},
	title3: {
		// Heading 4
		fontSize: convertToRemBase16(28),
		lineHeight: convertToRemBase16(40),
		fontWeight: 600,
	},
	title2: {
		// Heading 3
		fontSize: convertToRemBase16(36),
		lineHeight: convertToRemBase16(48),
		fontWeight: 600,
	},
	title1: {
		// Heading 2
		fontSize: convertToRemBase16(48),
		lineHeight: convertToRemBase16(68),
		fontWeight: 600,
	},
	largeTitle: {
		// Heading 2 (not in Bebop spec)
		fontSize: convertToRemBase16(48),
		lineHeight: convertToRemBase16(68),
		fontWeight: 600,
	},
	display3: {
		// Heading 1 (not in Bebop spec)
		fontSize: convertToRemBase16(60),
		lineHeight: convertToRemBase16(84),
		fontWeight: 600,
	},
	display2: {
		// Heading 1 (not in Bebop spec)
		fontSize: convertToRemBase16(60),
		lineHeight: convertToRemBase16(84),
		fontWeight: 600,
	},
	display: {
		// Heading 1
		fontSize: convertToRemBase16(60),
		lineHeight: convertToRemBase16(84),
		fontWeight: 600,
	},
	displayPlus: {
		// Heading 1+ (not in Bebop spec)
		fontSize: convertToRemBase16(60),
		lineHeight: convertToRemBase16(84),
		fontWeight: 600,
	},
} satisfies TypographyStylesExtended

export const typographyBebopStyles2 = {
	small2: {
		fontSize: convertToRemBase16(10),
		lineHeight: convertToRemBase16(14),
		fontWeight: 400,
	},
	small1: {
		fontSize: convertToRemBase16(12),
		lineHeight: convertToRemBase16(16),
		fontWeight: 400,
	},
	paragraph2: {
		fontSize: convertToRemBase16(14),
		lineHeight: convertToRemBase16(24),
		fontWeight: 400,
	},
	paragraph1: {
		fontSize: convertToRemBase16(16),
		lineHeight: convertToRemBase16(28),
		fontWeight: 400,
	},
	heading6: {
		fontSize: convertToRemBase16(20),
		lineHeight: convertToRemBase16(28),
		fontWeight: 600,
	},
	heading5: {
		fontSize: convertToRemBase16(24),
		lineHeight: convertToRemBase16(32),
		fontWeight: 600,
	},

	heading4: {
		fontSize: convertToRemBase16(28),
		lineHeight: convertToRemBase16(40),
		fontWeight: 600,
	},
	heading3: {
		fontSize: convertToRemBase16(32),
		lineHeight: convertToRemBase16(44),
		fontWeight: 600,
	},
	heading2: {
		fontSize: convertToRemBase16(40),
		lineHeight: convertToRemBase16(48),
		fontWeight: 600,
	},
	heading1: {
		fontSize: convertToRemBase16(56),
		lineHeight: convertToRemBase16(68),
		fontWeight: 600,
	},
} satisfies TypographyStylesBebop

export type TypographyStylesBebop = {
	heading1: React.CSSProperties
	heading2: React.CSSProperties
	heading3: React.CSSProperties
	heading4: React.CSSProperties
	heading5: React.CSSProperties
	heading6: React.CSSProperties
	paragraph1: React.CSSProperties
	paragraph2: React.CSSProperties
	small1: React.CSSProperties
	small2: React.CSSProperties
}

export const typographyStylesFunctional = {
	Display1: {
		fontSize: convertToRemBase10(56),
		lineHeight: convertToRemBase10(roundToNearest4(56 * 1.6)),
		fontWeight: 600,
		letterSpacing: convertToRemBase10(-1),
	},
	Display2: {
		fontSize: convertToRemBase10(40),
		lineHeight: convertToRemBase10(roundToNearest4(40 * 1.6)),
		fontWeight: 600,
		letterSpacing: convertToRemBase10(-1),
	},
	Title1: {
		fontSize: convertToRemBase10(32),
		lineHeight: convertToRemBase10(roundToNearest4(32 * 1.6)),
		fontWeight: 600,
	},
	Title2: {
		fontSize: convertToRemBase10(28),
		lineHeight: convertToRemBase10(roundToNearest4(28 * 1.6)),
		fontWeight: 600,
	},
	Title3: {
		fontSize: convertToRemBase10(24),
		lineHeight: convertToRemBase10(roundToNearest4(24 * 1.6)),
		fontWeight: 600,
	},
	Title4: {
		fontSize: convertToRemBase10(24),
		lineHeight: convertToRemBase10(roundToNearest4(24 * 1.6)),
		fontWeight: 600,
	},
	Base: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(roundToNearest4(16 * 1.6)),
		fontWeight: 400,
	},
	Body2: {
		fontSize: convertToRemBase10(14),
		lineHeight: convertToRemBase10(roundToNearest4(14 * 1.6)),
		fontWeight: 400,
	},
	Caption1: {
		fontSize: convertToRemBase10(12),
		lineHeight: convertToRemBase10(roundToNearest4(12 * 1.6)),
		fontWeight: 400,
	},
	Caption2: {
		fontSize: convertToRemBase10(10),
		lineHeight: convertToRemBase10(roundToNearest4(10 * 1.6)),
		fontWeight: 400,
	},
} satisfies TypographyStylesFunctional

export const typographyStylesContent = {
	Display1: {
		fontSize: convertToRemBase10(56),
		lineHeight: convertToRemBase10(roundToNearest4(56 * 1.6)),
		fontWeight: 600,
		letterSpacing: convertToRemBase10(-2),
		fontFamily: 'Aptos',
	},
	Display2: {
		fontSize: convertToRemBase10(40),
		lineHeight: convertToRemBase10(roundToNearest4(40 * 1.6)),
		fontWeight: 600,
		letterSpacing: convertToRemBase10(-2),
		fontFamily: 'Aptos',
	},
	Heading1: {
		fontSize: convertToRemBase10(32),
		lineHeight: convertToRemBase10(roundToNearest4(32 * 1.6)),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	Heading2: {
		fontSize: convertToRemBase10(28),
		lineHeight: convertToRemBase10(roundToNearest4(28 * 1.6)),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	Heading3: {
		fontSize: convertToRemBase10(24),
		lineHeight: convertToRemBase10(roundToNearest4(24 * 1.6)),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	Heading4: {
		fontSize: convertToRemBase10(20),
		lineHeight: convertToRemBase10(roundToNearest4(20 * 1.6)),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	Base: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(roundToNearest4(16 * 1.6)),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
} satisfies TypographyStylesContent

export type TypographyStylesFunctional = {
	Display1: React.CSSProperties
	Display2: React.CSSProperties
	Title1: React.CSSProperties
	Title2: React.CSSProperties
	Title3: React.CSSProperties
	Title4: React.CSSProperties
	Base: React.CSSProperties
	Body2: React.CSSProperties
	Caption1: React.CSSProperties
	Caption2: React.CSSProperties
}
export type TypographyStylesContent = {
	Display1: React.CSSProperties
	Display2: React.CSSProperties
	Heading1: React.CSSProperties
	Heading2: React.CSSProperties
	Heading3: React.CSSProperties
	Heading4: React.CSSProperties
	Base: React.CSSProperties
}

export const typographyStylesFunctional2 = {
	DisplayDefault: {
		fontSize: convertToRemBase10(68),
		lineHeight: convertToRemBase10(80),
		fontWeight: 600,
		letterSpacing: convertToRemBase10(-2),
	},
	PageTitleDefault: {
		fontSize: convertToRemBase10(40),
		lineHeight: convertToRemBase10(48),
		fontWeight: 600,
	},
	TitleSmall: {
		fontSize: convertToRemBase10(24),
		lineHeight: convertToRemBase10(28),
		fontWeight: 600,
	},
	TitleMedium: {
		fontSize: convertToRemBase10(28),
		lineHeight: convertToRemBase10(32),
		fontWeight: 600,
	},
	TitleLarge: {
		fontSize: convertToRemBase10(32),
		lineHeight: convertToRemBase10(40),
		fontWeight: 600,
	},
	SubtitleSmall: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 600,
	},
	SubtitleDefault: {
		fontSize: convertToRemBase10(20),
		lineHeight: convertToRemBase10(28),
		fontWeight: 600,
	},
	ParagraphDefault: {
		fontSize: convertToRemBase10(14),
		lineHeight: convertToRemBase10(20),
		fontWeight: 400,
	},
	ParagraphDefaultStrong: {
		fontSize: convertToRemBase10(14),
		lineHeight: convertToRemBase10(20),
		fontWeight: 600,
	},
	ParagraphLarge: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 400,
	},
	ParagraphLargeStrong: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 600,
	},
	LabelSmallRest: {
		fontSize: convertToRemBase10(12),
		lineHeight: convertToRemBase10(16),
		fontWeight: 400,
	},
	LabelSmallSelected: {
		fontSize: convertToRemBase10(12),
		lineHeight: convertToRemBase10(16),
		fontWeight: 600,
	},
	LabelDefaultRest: {
		fontSize: convertToRemBase10(14),
		lineHeight: convertToRemBase10(20),
		fontWeight: 400,
	},
	LabelDefaultSelected: {
		fontSize: convertToRemBase10(14),
		lineHeight: convertToRemBase10(20),
		fontWeight: 600,
	},
	LabelLargeRest: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 400,
	},
	LabelLargeSelected: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 600,
	},
	CaptionSmall: {
		fontSize: convertToRemBase10(10),
		lineHeight: convertToRemBase10(14),
		fontWeight: 400,
	},
	CaptionSmallStrong: {
		fontSize: convertToRemBase10(10),
		lineHeight: convertToRemBase10(14),
		fontWeight: 600,
	},
	CaptionDefault: {
		fontSize: convertToRemBase10(12),
		lineHeight: convertToRemBase10(16),
		fontWeight: 400,
	},
	CaptionDefaultStrong: {
		fontSize: convertToRemBase10(12),
		lineHeight: convertToRemBase10(16),
		fontWeight: 600,
	},
} satisfies TypographyStylesFunctional2

export const typographyStylesContent2 = {
	DisplaySmall: {
		fontSize: convertToRemBase10(28),
		lineHeight: convertToRemBase10(40),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	DisplayMedium: {
		fontSize: convertToRemBase10(36),
		lineHeight: convertToRemBase10(52),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	DisplayLarge: {
		fontSize: convertToRemBase10(56),
		lineHeight: convertToRemBase10(80),
		fontWeight: 600,
		letterSpacing: convertToRemBase10(-2),
		fontFamily: 'Aptos',
	},
	PageHeaderDefault: {
		fontSize: convertToRemBase10(36),
		lineHeight: convertToRemBase10(44),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	H1: {
		fontSize: convertToRemBase10(32),
		lineHeight: convertToRemBase10(40),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	H2: {
		fontSize: convertToRemBase10(28),
		lineHeight: convertToRemBase10(32),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	H3: {
		fontSize: convertToRemBase10(24),
		lineHeight: convertToRemBase10(28),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	H4: {
		fontSize: convertToRemBase10(20),
		lineHeight: convertToRemBase10(24),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	SubtitleDefault: {
		fontSize: convertToRemBase10(14),
		lineHeight: convertToRemBase10(20),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	ParagraphDefault: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(28),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	ParagraphDefaultStrong: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(28),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	ParagraphLarge: {
		fontSize: convertToRemBase10(20),
		lineHeight: convertToRemBase10(32),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	ParagraphLargeStrong: {
		fontSize: convertToRemBase10(20),
		lineHeight: convertToRemBase10(32),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	CaptionSmall: {
		fontSize: convertToRemBase10(10),
		lineHeight: convertToRemBase10(14),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	CaptionSmallStrong: {
		fontSize: convertToRemBase10(10),
		lineHeight: convertToRemBase10(14),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	CaptionDefault: {
		fontSize: convertToRemBase10(12),
		lineHeight: convertToRemBase10(16),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	CaptionDefaultStrong: {
		fontSize: convertToRemBase10(12),
		lineHeight: convertToRemBase10(16),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	TableDefault: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 400,
		fontFamily: 'Aptos',
	},
	TableStrong: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 600,
		fontFamily: 'Aptos',
	},
	CodeDefault: {
		fontSize: convertToRemBase10(16),
		lineHeight: convertToRemBase10(24),
		fontWeight: 400,
		fontFamily: 'Consolas, Monaco, "Courier New", monospace',
	},
} satisfies TypographyStylesContent2

export type TypographyStylesFunctional2 = {
	DisplayDefault: React.CSSProperties
	PageTitleDefault: React.CSSProperties
	TitleSmall: React.CSSProperties
	TitleMedium: React.CSSProperties
	TitleLarge: React.CSSProperties
	SubtitleSmall: React.CSSProperties
	SubtitleDefault: React.CSSProperties
	ParagraphDefault: React.CSSProperties
	ParagraphDefaultStrong: React.CSSProperties
	ParagraphLarge: React.CSSProperties
	ParagraphLargeStrong: React.CSSProperties
	LabelSmallRest: React.CSSProperties
	LabelSmallSelected: React.CSSProperties
	LabelDefaultRest: React.CSSProperties
	LabelDefaultSelected: React.CSSProperties
	LabelLargeRest: React.CSSProperties
	LabelLargeSelected: React.CSSProperties
	CaptionSmall: React.CSSProperties
	CaptionSmallStrong: React.CSSProperties
	CaptionDefault: React.CSSProperties
	CaptionDefaultStrong: React.CSSProperties
}
export type TypographyStylesContent2 = {
	DisplaySmall: React.CSSProperties
	DisplayMedium: React.CSSProperties
	DisplayLarge: React.CSSProperties
	PageHeaderDefault: React.CSSProperties
	H1: React.CSSProperties
	H2: React.CSSProperties
	H3: React.CSSProperties
	H4: React.CSSProperties
	SubtitleDefault: React.CSSProperties
	ParagraphDefault: React.CSSProperties
	ParagraphDefaultStrong: React.CSSProperties
	ParagraphLarge: React.CSSProperties
	ParagraphLargeStrong: React.CSSProperties
	CaptionSmall: React.CSSProperties
	CaptionSmallStrong: React.CSSProperties
	CaptionDefault: React.CSSProperties
	CaptionDefaultStrong: React.CSSProperties
	TableDefault: React.CSSProperties
	TableStrong: React.CSSProperties
	CodeDefault: React.CSSProperties
}
