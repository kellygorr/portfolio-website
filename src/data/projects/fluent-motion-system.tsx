import { useEffect, useRef } from 'react'
import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'
import { DemoSlide } from '../../components/Page/Slideshow/DemoSlide'
import { useDemoMotion } from '../../components/Page/DemoMotionContext'
import { DemoThumbnail } from '../../components/shared'
import { Durations, type DurationsHandle } from '../../../stories/MotionTokens/Durations'
import { Easings, type EasingsHandle } from '../../../stories/MotionTokens/Easings'
import { EasingThumbnail } from '../../../stories/MotionTokens/EasingThumbnail'
import { randomMotionPaletteNames, motionPalette } from '../../styles/motionPalettes'
import type { MotionPaletteName } from '../../styles/motionPalettes'
import { formatMonthYear } from '../../utils/dateFormat'

// Randomized once per page load, same convention as copilot-motion-systems
// and copilot-latency-motion — each of the 2 in-page token demos below
// gets a different, non-repeating motion palette, reshuffled on every
// fresh page load rather than hand-picked.
const [durationsTheme, easingsTheme] = randomMotionPaletteNames(2)
const [thumbnailTheme] = randomMotionPaletteNames(1)

// Longest row in the real duration scale (base-1000) + its own
// RESET_HOLD_MS (500ms, mirrored here rather than imported since it's an
// internal constant of Durations.tsx) — used below to know when a
// "replay all" has actually finished, so the interactive badge's restart
// icon can stop spinning at the right time instead of relying purely on
// Demo's generic fallback timeout.
const DURATIONS_MAX_MS = 1000 + 500

/**
 * Live embed of the Motion Tokens/Durations Storybook story — the real
 * Fluent Flex Motion duration scale (`base-50` through `base-1000`).
 * This is an `interactive` demo (see the <Demo interactive> usage
 * below): rather than an autoplay Stop/Start toggle, the page shows a
 * "Click below to interact" badge + restart icon, and clicking it
 * triggers the exact same "replay every row at once" action as
 * Durations' own internal icon button — reusing that existing
 * replay-all implementation via `DurationsHandle` (see Durations.tsx)
 * instead of building a second, separate one here.
 *
 * Durations/Easings use a dark-mode look via Demo's `darkBackground` prop
 * (which applies `palette.backgroundDark` — a deliberately different,
 * more dramatic dark tone than `darkestColor(palette)`, i.e. colors[3],
 * used by Demo's own "recreated for portfolio"/interactive badges — so
 * those badges still read clearly against this background instead of
 * blending into it).
 */
const DurationsDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const palette = motionPalette(theme)
	const ref = useRef<DurationsHandle>(null)
	const { replayToken, onReplayStateChange } = useDemoMotion()
	const handledReplayToken = useRef(replayToken)

	useEffect(() => {
		if (handledReplayToken.current === replayToken) {
			return
		}
		handledReplayToken.current = replayToken
		ref.current?.replayAll()
		const timer = window.setTimeout(() => onReplayStateChange?.(false), DURATIONS_MAX_MS)
		return () => window.clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

	return <Durations ref={ref} palette={palette} compact />
}

/**
 * Live embed of the Motion Tokens/Easings Storybook story — the real
 * Fluent Flex Motion easing tokens (functional/expressive enter, exit,
 * transition, linear), each shown as a position-over-time graph with a
 * dot tracing the curve and a progress bar reusing that same easing.
 *
 * Also an `interactive` demo: clicking the restart icon plays a
 * "replay all" sequence (`playSequence` — see EasingsHandle in
 * Easings.tsx) that runs every one of the 7 curves at the same time, the
 * same way Durations' rows replay together.
 */
const EasingsDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const palette = motionPalette(theme)
	const ref = useRef<EasingsHandle>(null)
	const { replayToken, onReplayStateChange } = useDemoMotion()
	const handledReplayToken = useRef(replayToken)

	useEffect(() => {
		if (handledReplayToken.current === replayToken) {
			return
		}
		handledReplayToken.current = replayToken
		ref.current?.playSequence(() => onReplayStateChange?.(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

	return <Easings ref={ref} palette={palette} compact />
}

export const fluentMotionSystem: IProject = {
	details: {
		header: 'Fluent design system motion',
		thumbnail: null,
		demo: (
			<DemoThumbnail theme={thumbnailTheme}>
				<EasingThumbnail theme={thumbnailTheme} />
			</DemoThumbnail>
		),
		tags: [TagType.Microsoft, TagType.FluentDesignSystem, SkillType.AI],
	},
	content: [
		{
			title: 'Fluent design system motion',
		},
		{
			slideshow: {
				width: 1735,
				slides: [
					{
						demo: (
							<DemoSlide theme={easingsTheme} interactive hasHeader darkBackground scaleToFit allowRestartWhileRunning>
								<EasingsDemo theme={easingsTheme} />
							</DemoSlide>
						),
						caption: 'Fluent Motion easing sample: functional and expressive curves',
					},
					{
						demo: (
							<DemoSlide theme={durationsTheme} interactive hasHeader darkBackground scaleToFit allowRestartWhileRunning>
								<DurationsDemo theme={durationsTheme} />
							</DemoSlide>
						),
						caption: 'Fluent Motion duration sample: base-50 through base-1000',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: `An agent-facing motion guidance system for Fluent design system. The goal wasn't just to document motion principles for humans; it was to make motion guidance actionable for AI agents that create, review, and implement component behavior: choosing motion patterns, applying motion tokens, avoiding performance issues, respecting reduced motion, and producing output that can be reviewed and trusted.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.UIUX, SkillType.AI, TagType.Motion],
				},
			],
			body: `This is an ongoing, collaborative effort to build a comprehensive motion knowledge for the Fluent design system. My focus has been reviewing the skill documentation and testing the plugin against many scenarios (like writing real component motion), then feeding fixes back into the guidance. The goal is for agents to reason through motion the way a designer would: identify what kind of spatial relationship is changing, choose how much attention the moment deserves, and sequence multiple elements into one coordinated rhythm instead of animating each element independently.<br /><br />One of my main contributions has been the performance and accessibility guidance, along with unifying choreography across similar components. Menus, dropdowns, comboboxes, and popovers now share one consistent motion pattern instead of each getting bespoke treatment.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.FluentDesignSystem, SkillType.AI],
				},
				{
					header: HighlightName.Dates,
					body: formatMonthYear('Aug', 2026, 'Present'),
				},
				{
					header: 'Contributors',
					body: 'Andrew Falk, Kelly Gorr',
				},
			],
		},
	],
}
