import { TypographyStyles } from '@fluentui/react-components'

export type TypographyStylesExtended = {
	[K in keyof TypographyStyles]: React.CSSProperties
} & {
	display3: React.CSSProperties
	display2: React.CSSProperties
	displayPlus: React.CSSProperties
}

/***
 *  Mapping to Fluent UI tokens was an exercise in futility as they do not align well to either eBay or Material.
 *  Also, Fluent UI does not have tokens for letterSpacing so we have to use the typographyStyles anyway to make sure all styles are present.
 *  Below is an example of what the mapping would look like if we were to use tokens.
    fontSizeBase100: '10px', // caption2
	fontSizeBase200: '12px', // caption1
	fontSizeBase300: '14px', // body1/body2
	fontSizeBase400: '16px', // subtitle2/title3
	fontSizeBase500: '20px', // subtitle1/title2
	fontSizeBase600: '24px', // title1/largeTitle
	fontSizeHero'bold': '30px', // display3 // Fluent does not have an equivalent display3 style
	fontSizeHero800: '36px', // display2 // Fluent does not have an equivalent display2 style
	fontSizeHero900: '46px', // display
	fontSizeHero1000: '65px', // display+ // Fluent does not have an equivalent displayPlus style
 ****/

// eBay Typography Styles for makeStyles
export const typographyEbayStyles = {
	caption2: {
		fontSize: '10px',
		lineHeight: '12px',
		fontWeight: 'bold',
		letterSpacing: '0.5px',
		textTransform: 'uppercase' as const,
	},
	caption2Strong: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 400,
		letterSpacing: '0.7px',
	},
	caption1: {
		fontSize: '12px',
		lineHeight: '16px',
		fontWeight: 400,
	},
	caption1Strong: {
		fontSize: '12px',
		lineHeight: '16px',
		fontWeight: 'bold',
	},
	caption1Stronger: {
		fontSize: '12px',
		lineHeight: '16px',
		fontWeight: 'bold',
	},
	body2: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 400,
	},
	body1: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 400,
	},
	body1Strong: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 'bold',
	},
	body1Stronger: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 'bold',
	},
	subtitle2: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: 400,
	},
	subtitle2Stronger: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: 400,
	},
	subtitle1: {
		fontSize: '20px',
		lineHeight: '28px',
		fontWeight: 400,
	},
	title3: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: 'bold',
	},
	title2: {
		fontSize: '20px',
		lineHeight: '28px',
		fontWeight: 'bold',
	},
	title1: {
		fontSize: '24px',
		lineHeight: '32px',
		fontWeight: 'bold',
	},
	largeTitle: {
		fontSize: '24px',
		lineHeight: '32px',
		fontWeight: 'bold',
	},
	display3: {
		fontSize: '30px',
		lineHeight: '40px',
		fontWeight: 'bold',
		letterSpacing: '-0.6px',
	},
	display2: {
		fontSize: '36px',
		lineHeight: '46px',
		fontWeight: 'bold',
		letterSpacing: '-0.72px',
	},
	display: {
		fontSize: '46px',
		lineHeight: '56px',
		fontWeight: 'bold',
		letterSpacing: '-0.92px',
	},
	displayPlus: {
		fontSize: '65px',
		lineHeight: '65px',
		fontWeight: 'bold',
		letterSpacing: '-2.6px',
	},
} satisfies TypographyStylesExtended
