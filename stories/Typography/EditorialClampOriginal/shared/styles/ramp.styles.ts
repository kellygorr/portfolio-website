import { makeStyles, typographyStyles } from '@fluentui/react-components'
import { typographyEbayStyles } from './ebay'
import { typographyMaterialStyles } from './material'
import {
	typographyBebopStyles,
	typographyBebopStyles2,
	typographyStylesFunctional,
	typographyStylesContent,
	typographyStylesFunctional2,
	typographyStylesContent2,
} from './bebop'

// Fluent UI typography styles
export const useFluentStyles = makeStyles({
	caption2: typographyStyles.caption2,
	caption2Strong: typographyStyles.caption2Strong,
	caption1: typographyStyles.caption1,
	caption1Strong: typographyStyles.caption1Strong,
	caption1Stronger: typographyStyles.caption1Stronger,
	body2: typographyStyles.body2,
	body1: typographyStyles.body1,
	body1Strong: typographyStyles.body1Strong,
	body1Stronger: typographyStyles.body1Stronger,
	subtitle2: typographyStyles.subtitle2,
	subtitle2Stronger: typographyStyles.subtitle2Stronger,
	subtitle1: typographyStyles.subtitle1,
	title3: typographyStyles.title3,
	title2: typographyStyles.title2,
	title1: typographyStyles.title1,
	largeTitle: typographyStyles.largeTitle,
	display3: typographyStyles.display, // no display 3 in ramp
	display2: typographyStyles.display, // no display 2 in ramp
	display: typographyStyles.display,
	displayPlus: typographyStyles.display, // no display+ in ramp
})

// Bebop typography styles
export const useBebopStyles = makeStyles({
	caption2: typographyBebopStyles.caption2,
	caption2Strong: typographyBebopStyles.caption2Strong, // no caption2Strong in ramp
	caption1: typographyBebopStyles.caption1,
	caption1Strong: typographyBebopStyles.caption1Strong, // no caption1Strong in ramp
	caption1Stronger: typographyBebopStyles.caption1Stronger, // no caption1Stronger in ramp
	body2: typographyBebopStyles.body2,
	body1: typographyBebopStyles.body1,
	body1Strong: typographyBebopStyles.body1Strong,
	body1Stronger: typographyBebopStyles.body1Stronger, // no body1Stronger in ramp
	subtitle2: typographyBebopStyles.subtitle2, // no subtitle2 in ramp
	subtitle2Stronger: typographyBebopStyles.subtitle2Stronger, // no subtitle2Stronger in ramp
	subtitle1: typographyBebopStyles.subtitle1,
	title3: typographyBebopStyles.title3,
	title2: typographyBebopStyles.title2,
	title1: typographyBebopStyles.title1,
	largeTitle: typographyBebopStyles.largeTitle, // no largeTitle in ramp
	display3: typographyBebopStyles.display3, // no display3 in ramp
	display2: typographyBebopStyles.display2, // no display2 in ramp
	display: typographyBebopStyles.display,
	displayPlus: typographyBebopStyles.displayPlus, // no displayPlus in ramp
})

export const useBebopStyles2 = makeStyles({
	small1: typographyBebopStyles2.small1,
	small2: typographyBebopStyles2.small2,
	paragraph1: typographyBebopStyles2.paragraph1,
	paragraph2: typographyBebopStyles2.paragraph2,
	heading6: typographyBebopStyles2.heading6,
	heading5: typographyBebopStyles2.heading5,
	heading4: typographyBebopStyles2.heading4,
	heading3: typographyBebopStyles2.heading3,
	heading2: typographyBebopStyles2.heading2,
	heading1: typographyBebopStyles2.heading1,
})

export const useFunctionalStyles = makeStyles({
	Display1: typographyStylesFunctional.Display1,
	Display2: typographyStylesFunctional.Display2,
	Title1: typographyStylesFunctional.Title1,
	Title2: typographyStylesFunctional.Title2,
	Title3: typographyStylesFunctional.Title3,
	Title4: typographyStylesFunctional.Title4,
	Base: typographyStylesFunctional.Base,
	Body2: typographyStylesFunctional.Body2,
	Caption1: typographyStylesFunctional.Caption1,
	Caption2: typographyStylesFunctional.Caption2,
})

export const useContentStyles = makeStyles({
	Display1: typographyStylesContent.Display1,
	Display2: typographyStylesContent.Display2,
	Heading1: typographyStylesContent.Heading1,
	Heading2: typographyStylesContent.Heading2,
	Heading3: typographyStylesContent.Heading3,
	Heading4: typographyStylesContent.Heading4,
	Base: typographyStylesContent.Base,
})

export const useFunctionalStyles2 = makeStyles({
	TitleSmall: typographyStylesFunctional2.TitleSmall,
	TitleMedium: typographyStylesFunctional2.TitleMedium,
	TitleLarge: typographyStylesFunctional2.TitleLarge,
	SubtitleDefault: typographyStylesFunctional2.SubtitleDefault,
	ParagraphDefault: typographyStylesFunctional2.ParagraphDefault,
	ParagraphLarge: typographyStylesFunctional2.ParagraphLarge,
	LabelSmallRest: typographyStylesFunctional2.LabelSmallRest,
	LabelDefaultRest: typographyStylesFunctional2.LabelDefaultRest,
})

export const useContentStyles2 = makeStyles({
	H2: typographyStylesContent2.H2,
	H3: typographyStylesContent2.H3,
	H1: typographyStylesContent2.H1,
	H4: typographyStylesContent2.H4,
	ParagraphDefault: typographyStylesContent2.ParagraphDefault,
	ParagraphLarge: typographyStylesContent2.ParagraphLarge,
	SubtitleDefault: typographyStylesContent2.SubtitleDefault,
})

// eBay typography styles
export const useEbayStyles = makeStyles({
	caption2: typographyEbayStyles.caption2,
	caption2Strong: typographyEbayStyles.caption2Strong,
	caption1: typographyEbayStyles.caption1,
	caption1Strong: typographyEbayStyles.caption1Strong,
	caption1Stronger: typographyEbayStyles.caption1Stronger, // no caption1Strong in ramp
	body2: typographyEbayStyles.body2, // no body2 in ramp
	body1: typographyEbayStyles.body1,
	body1Strong: typographyEbayStyles.body1Strong,
	body1Stronger: typographyEbayStyles.body1Stronger, // no body1Strong in ramp
	subtitle2: typographyEbayStyles.subtitle2,
	subtitle2Stronger: typographyEbayStyles.subtitle2Stronger,
	subtitle1: typographyEbayStyles.subtitle1,
	title3: typographyEbayStyles.title3,
	title2: typographyEbayStyles.title2,
	title1: typographyEbayStyles.title1,
	largeTitle: typographyEbayStyles.largeTitle, // no largeTitle in ramp
	display3: typographyEbayStyles.display3,
	display2: typographyEbayStyles.display2,
	display: typographyEbayStyles.display,
	displayPlus: typographyEbayStyles.displayPlus,
})

// Material Design 3 typography styles using existing Fluent style keys
export const useMaterial3Styles = makeStyles({
	// Material Design mappings to existing Fluent style keys
	caption2: typographyMaterialStyles.caption2, // Label Small (11px)
	caption2Strong: typographyMaterialStyles.caption2Strong, // Label Medium (12px)
	caption1: typographyMaterialStyles.caption1, // Label Large/Body Small (12px)
	caption1Strong: typographyMaterialStyles.caption1Strong,
	caption1Stronger: typographyMaterialStyles.caption1Stronger,
	body2: typographyMaterialStyles.body2, // Body Small (12px)
	body1: typographyMaterialStyles.body1, // Body Medium (14px)
	body1Strong: typographyMaterialStyles.body1Strong,
	body1Stronger: typographyMaterialStyles.body1Stronger,
	subtitle2: typographyMaterialStyles.subtitle2, // Body Large (16px)
	subtitle2Stronger: typographyMaterialStyles.subtitle2Stronger,
	subtitle1: typographyMaterialStyles.subtitle1, // Title Small (14px)
	title3: typographyMaterialStyles.title3, // Title Medium (16px)
	title2: typographyMaterialStyles.title2, // Title Large (22px)
	title1: typographyMaterialStyles.title1, // Headline Small (24px)
	largeTitle: typographyMaterialStyles.largeTitle, // Headline Medium (28px)
	display3: typographyMaterialStyles.display3, // Headline Large (32px)
	display2: typographyMaterialStyles.display2, // Display Small (36px)
	display: typographyMaterialStyles.display, // Display Medium (45px)
	displayPlus: typographyMaterialStyles.displayPlus, // Display Large (57px)
})
