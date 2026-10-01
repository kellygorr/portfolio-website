import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { formatMonthYearRange } from '../../utils/dateFormat'

const placeholderThumbnailx1 = new URL('../../assets/thumbnails/x1/placeholder-thumbnail.svg', import.meta.url).href
const placeholderThumbnailx15 = new URL('../../assets/thumbnails/x15/placeholder-thumbnail.svg', import.meta.url).href
const placeholderThumbnailx2 = new URL('../../assets/thumbnails/x2/placeholder-thumbnail.svg', import.meta.url).href

export const copilotDesignSystemTypography: IProject = {
	details: {
		header: 'Copilot Design System Typography',
		thumbnail: {
			x1: placeholderThumbnailx1,
			x15: placeholderThumbnailx15,
			x2: placeholderThumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Copilot, SkillType.Prototyping],
	},
	content: [
		{
			title: 'Copilot Design System Typography',
		},
		{
			header: SectionName.Overview,
			body: `Typography foundation work for a major Copilot design-system update. This collaborative effort explored how a fluid type system could scale across viewports, devices, fonts, languages, and future product needs while still fitting into reusable design-token and theme infrastructure.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, SkillType.Prototyping, SkillType.Design],
				},
			],
			body: `For this update to the Copilot design system, I partnered with design leadership and design-system collaborators to shape the typography foundations through exploration, prototyping, and implementation validation. I built browser-based prototypes and reference implementations that helped the team evaluate fluid type ramps, responsive scaling, font behavior, line-height tradeoffs, and tokenized implementation in real web conditions.`,
		},
		{
			header: 'Fluid type ramps',
			body: `I investigated responsive type ramps using min, max, and CSS clamp techniques instead of fixed-only scales. The prototypes let the team compare multiple type-ramp approaches, validate breakpoint behavior, and test whether fluid typography could remain stable, readable, and predictable across product surfaces.`,
		},
		{
			header: 'Font and language resilience',
			body: `The work also tested how typography behaved when swapping font families and when supporting alternate character sets such as Cyrillic, LTR, and RTL scenarios. I created font-normalization demos using descriptors such as size-adjust, ascent, and descent to compare fallback fonts against Segoe metrics and reduce layout shifts when fonts changed.`,
		},
		{
			header: 'Spacing tied to typography',
			body: `I also prototyped em-based spacing for Copilot content surfaces so spacing could respond proportionally to text hierarchy instead of relying only on fixed padding values. This gave the team a concrete way to evaluate whether typography, spacing, and layout rules could work together as a system.`,
		},
		{
			header: 'Tokenization and design-system handoff',
			body: `The exploration helped translate typography concepts into reusable design-language foundations. Rather than shipping as a standalone typography product, the work fed into broader Copilot design-language efforts, where typography specs, type ramps, font variables, and token structures could be carried forward through theming, Fluent integration, and product migration work.`,
		},
		{
			header: 'Portfolio placeholder',
			body: `Add screenshots or embedded prototype captures from the typography playgrounds: font ramp comparison, clamp breakpoint testing, Bebop clamp test, design-system swap playground, em spacing demo, and font-face normalization.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Copilot, TagType.Website],
				},
				{
					header: HighlightName.Dates,
					body: formatMonthYearRange('May', 2025, 'Apr', 2026),
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Design_Lead,
					body: 'Karlee Boillot',
				},
			],
		},
	],
}
