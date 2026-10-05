import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { darkestColor, motionPalette, MotionPaletteNames, randomMotionPaletteNames } from '../../styles/motionPalettes'
import { formatMonthYearRange } from '../../utils/dateFormat'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/copilot-design-system-typography-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/copilot-design-system-typography-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/copilot-design-system-typography-thumbnail.jpg', import.meta.url).href
const [editorialClampTheme] = randomMotionPaletteNames(1)
// Pinned (NOT randomized) — the Font Face Demo's Segoe/Aptos colors are
// driven by this palette's backgroundDark/colors[2], and the "Lime"
// palette family (Warm/Golden/Dusty + Lime) uses blue/green accent
// colors that look broken on a demo whose whole point is comparing warm
// font colors. Pinning to a Beige-family palette guarantees warm
// orange/brown tones every time, regardless of what the other two
// demos' random draw picks.
const fontFaceTheme = MotionPaletteNames.GoldenHourBeige

// Forwards the SAME randomized palette's colors into the embedded
// Storybook iframe (via query params the story reads itself), so each
// story's own color usage (hero backgrounds, Segoe/Aptos swatches,
// buttons, slider accents) matches the Demo wrapper's badges — all
// driven by one shared palette — instead of unrelated hardcoded colors
// baked into the story's own CSS/state defaults.
const storybookIframe = (id: string, heroColor?: string, extraParams?: Record<string, string>) => {
	const params = new URLSearchParams({ id, viewMode: 'story' })
	if (heroColor) {
		params.set('heroColor', heroColor)
	}
	if (extraParams) {
		Object.entries(extraParams).forEach(([key, value]) => params.set(key, value))
	}
	const path = `/iframe.html?${params.toString()}`
	if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
		return `http://localhost:6006${path}`
	}
	return `/storybook${path}`
}

export const copilotDesignSystemTypography: IProject = {
	details: {
		header: 'Copilot design system typography',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Copilot, SkillType.Prototyping],
	},
	content: [
		{
			title: 'Copilot design system typography',
		},
		{
			demo: (
				<Demo
					theme={editorialClampTheme}
					minHeight={620}
					interactive
					hideRestartIcon
					simpleBadge
					iframeSrc={storybookIframe('typography-editorial-clamp--default', undefined, {
						accentColor: darkestColor(motionPalette(editorialClampTheme)),
					})}
					iframeTitle="Typography editorial clamp demo"
				>
					<span />
				</Demo>
			),
		},
		{
			header: SectionName.Overview,
			body: `Typography foundation work for a major Copilot design-system update. This collaborative effort explored how fluid type, spacing, font behavior, and token structures could scale across viewports, devices, and future product needs. My role was to turn exploratory typography directions into feasible, scalable web implementation decisions the team could evaluate in real browser conditions.<br /><br />The demo above uses Aptos and Aptos Serif together in an editorial layout to show design leadership early on how clamped type could behave in a real product-like composition.`,
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
			body: `Fluid type is a modern approach to type scaling that lets typography respond smoothly across screen sizes instead of jumping between fixed breakpoint values. I investigated how responsive type ramps could help Copilot typography adapt across surfaces while staying readable and predictable. The prototypes gave design and engineering a way to evaluate type behavior and make design system decisions.`,
		},
		{
			header: 'Font fallback and layout stability',
		},
		{
			demo: (
				<Demo
					theme={fontFaceTheme}
					minHeight={680}
					interactive
					hideRestartIcon
					simpleBadge
					iframeSrc={storybookIframe('typography-font-face-demo--default', undefined, {
						segoeColor: motionPalette(fontFaceTheme).backgroundDark,
						aptosColor: motionPalette(fontFaceTheme).colors[2],
						accentColor: darkestColor(motionPalette(fontFaceTheme)),
					})}
					iframeTitle="Typography font face demo"
				>
					<span />
				</Demo>
			),
		},
		{
			body: `The work tested how typography behaves when fonts change, especially during loading when a fallback font renders before the preferred font has loaded.`,
		},
		{
			body: `The demo above compares Segoe and Aptos in the same layout. The controls adjust @font-face descriptors so the temporary fallback text can better match the spacing and baseline of the final font. This can reduce the visible layout shift when the intended font swaps in.`,
		},
		{
			header: 'Spacing tied to typography',
			body: `Fixed spacing can break the relationship between text and surrounding content when type sizes change across breakpoints or hierarchy levels. I prototyped em-based spacing for Copilot content surfaces so spacing could scale with the text itself, keeping layout relationships proportional as the type system changed.`,
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
					body: formatMonthYearRange('May', 2025, 'Dec', 2025),
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
