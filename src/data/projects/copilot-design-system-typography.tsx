import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { darkestColor, motionPalette, MotionPaletteNames, randomMotionPaletteNames } from '../../styles/motionPalettes'
import { formatMonthYearRange } from '../../utils/dateFormat'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/copilot-design-system-typography-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/copilot-design-system-typography-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/copilot-design-system-typography-thumbnail.jpg', import.meta.url).href
const [clampBreakpointTheme, editorialClampTheme] = randomMotionPaletteNames(2)
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
			demo: (
				<Demo
					theme={clampBreakpointTheme}
					minHeight={1080}
					interactive
					hideRestartIcon
					simpleBadge
					iframeSrc={storybookIframe(
						'typography-clamp-breakpoint--default',
						motionPalette(clampBreakpointTheme).backgroundDark,
						{
							pageBackground: motionPalette(clampBreakpointTheme).background,
							accentColor: darkestColor(motionPalette(clampBreakpointTheme)),
						}
					)}
					iframeTitle="Typography clamp breakpoint demo"
				>
					<span />
				</Demo>
			),
		},
		{
			header: 'Font and language resilience',
			body: `The work also tested how typography behaved when fonts changed, especially when a fallback font renders before the preferred font has loaded. Different fonts can occupy vertical space differently, causing text to sit higher or lower in the same layout, and reflow differently.`,
		},
		{
			body: `The demo below compares Segoe and Aptos in the same layout. The controls adjust @font-face descriptors such as size-adjust, ascent, and descent so the temporary fallback text can better match the spacing and baseline of the final font, reducing visible layout shifts when the intended font swaps in.`,
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
			header: 'Spacing tied to typography',
			body: `I also prototyped em-based spacing for Copilot content surfaces so spacing could respond proportionally to text hierarchy instead of relying only on fixed padding values. This gave the team a concrete way to evaluate whether typography, spacing, and layout rules could work together as a system.`,
		},
		{
			header: 'Tokenization and design-system handoff',
			body: `The exploration helped translate typography concepts into reusable design-language foundations. Rather than shipping as a standalone typography product, the work fed into broader Copilot design-language efforts, where typography specs, type ramps, font variables, and token structures could be carried forward through theming, Fluent integration, and product migration work.`,
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
