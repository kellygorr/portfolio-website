import { useEffect, useRef, useState } from 'react'
import { Rocket24Filled } from '@fluentui/react-icons'
import { AnimatePresence, motion } from 'motion/react'
import styled from 'styled-components'
import { IProject, SkillType, SectionName, HighlightName, TagType } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { DemoSlide } from '../../components/Page/Slideshow/DemoSlide'
import { useDemoMotion } from '../../components/Page/DemoMotionContext'
import { DemoThumbnail } from '../../components/shared'
import { Greeting } from '../../../stories/Welcome/GreetingAnimation/Greeting'
import { GroundingMenu } from '../../../stories/GroundingMenu/GroundingMenu'
import type { GroundingMenuProps } from '../../../stories/GroundingMenu/GroundingMenu'
import { LinePathMotionOvershootV3Css } from '../../../stories/LinePathMotion/rectangle/v3/LinePathMotionOvershootV3Css'
import { LinePathMotionV2 } from '../../../stories/LinePathMotion/square/v2/LinePathMotionV2'
import { InputPositionDemo } from '../../../stories/InputPosition/InputPositionDemo'
import { randomMotionPaletteNames, darkestColor, motionPalette } from '../../styles/motionPalettes'
import type { MotionPaletteName } from '../../styles/motionPalettes'
import { formatYearRange } from '../../utils/dateFormat'

const inputPositionCentered = new URL(
	'../../assets/images/copilot-motion-systems/copilot-motion-systems-01.jpg',
	import.meta.url
).href
const inputPositionCentered2x = new URL(
	'../../assets/images/copilot-motion-systems/copilot-motion-systems-01@2x.jpg',
	import.meta.url
).href
const inputPositionAnchored = new URL(
	'../../assets/images/copilot-motion-systems/copilot-motion-systems-02.jpg',
	import.meta.url
).href
const inputPositionAnchored2x = new URL(
	'../../assets/images/copilot-motion-systems/copilot-motion-systems-02@2x.jpg',
	import.meta.url
).href
const inputPositionSearchExpanded = new URL(
	'../../assets/images/copilot-motion-systems/copilot-motion-systems-03.jpg',
	import.meta.url
).href
const inputPositionSearchExpanded2x = new URL(
	'../../assets/images/copilot-motion-systems/copilot-motion-systems-03@2x.jpg',
	import.meta.url
).href

const overlayWelcomeImg = new URL('../../assets/images/copilot-motion-systems/copilot-motion-systems-04.jpg', import.meta.url).href
const overlayWelcomeImg2x = new URL('../../assets/images/copilot-motion-systems/copilot-motion-systems-04@2x.jpg', import.meta.url).href
const overlayFooterImg = new URL('../../assets/images/copilot-motion-systems/copilot-motion-systems-05.jpg', import.meta.url).href
const overlayFooterImg2x = new URL('../../assets/images/copilot-motion-systems/copilot-motion-systems-05@2x.jpg', import.meta.url).href

// Randomized once per page load: each of the 5 in-page demos below gets a
// different, non-repeating motion palette, reshuffled every time this
// module is freshly evaluated (i.e. on every full page load/refresh).
const [thinkingLineTheme, groundingMenuTheme, greetingTheme, inputPositionTheme, thumbnailTheme, topGreetingTheme] = randomMotionPaletteNames(6)

const groundingMenuHeaderMenu: GroundingMenuProps['headerMenu'] = [
	{ title: 'All' },
	{ title: 'Files' },
	{ title: 'People' },
	{ title: 'Meetings' },
]

const groundingMenuList: GroundingMenuProps['list'] = [
	{
		menuTitle: 'All',
		list: [
			{ title: 'Mona Kane', subtitle: 'mona.kane@outlook.com' },
			{ title: 'Q3 budget review', subtitle: 'Shared with Finance team' },
			{ title: 'Stand-up meeting', subtitle: 'Occurs every Thu, 2:30 PM - 3:30 PM' },
			{ title: 'Research guide', subtitle: 'Mona Kane sent 2 hours ago' },
		],
	},
	{
		menuTitle: 'Files',
		list: [
			{ title: 'Q3 budget review', subtitle: 'Shared with Finance team' },
			{ title: 'Onboarding guide', subtitle: 'Last edited 3 days ago' },
		],
	},
	{
		menuTitle: 'People',
		list: [{ title: 'Mona Kane', subtitle: 'mona.kane@outlook.com' }],
	},
	{
		menuTitle: 'Meetings',
		list: [{ title: 'Stand-up meeting', subtitle: 'Occurs every Thu, 2:30 PM - 3:30 PM' }],
	},
]

// Delay between each scripted tab click in the auto-play-once sequence
// below — long enough to actually read/see each tab's content and the
// directional transition between them, short enough that the whole
// sequence doesn't feel like a stall.
const GROUNDING_MENU_STEP_MS = 900

/**
 * Drives GroundingMenu's tab selection through a scripted click-through
 * sequence (All -> Files -> People -> Meetings -> All) whenever Demo's
 * replayToken changes — this is what actually makes the "Click below to
 * interact" badge's auto-play-once behavior visible for this demo:
 * without something reading replayToken, Demo's auto-run-on-scroll and
 * the ReplayButton click both fire, but nothing here was listening, so
 * the demo just sat there unchanged. Reports back to Demo via
 * onReplayStateChange once the full loop finishes, so the button settles
 * instead of relying purely on Demo's fallback timeout.
 *
 * Local to this file (not exported/reused elsewhere), same pattern as
 * TeachingHandraise below.
 */
const GroundingMenuDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const [selectedMenu, setSelectedMenu] = useState<number | null>(0)
	const { replayToken, onReplayStateChange } = useDemoMotion()
	const handledReplayToken = useRef(replayToken)

	useEffect(() => {
		if (handledReplayToken.current === replayToken) {
			return
		}
		handledReplayToken.current = replayToken

		let cancelled = false
		const steps = [1, 2, 3, 0]
		const timers: number[] = []

		// First step fires IMMEDIATELY (i=0 -> 0ms delay) — not after a
		// full GROUNDING_MENU_STEP_MS wait. An earlier version scheduled
		// every step at `GROUNDING_MENU_STEP_MS * (i + 1)`, which made
		// even the FIRST tab change wait a full step interval after the
		// click/auto-trigger before anything visibly happened at all —
		// same class of bug as InputPositionDemo's replay-delay fix.
		steps.forEach((tabIndex, i) => {
			const timer = window.setTimeout(
				() => {
					if (cancelled) return
					setSelectedMenu(tabIndex)
					if (i === steps.length - 1) {
						onReplayStateChange?.(false)
					}
				},
				GROUNDING_MENU_STEP_MS * i
			)
			timers.push(timer)
		})

		return () => {
			cancelled = true
			timers.forEach((t) => window.clearTimeout(t))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

	return (
		<GroundingMenu
			headerMenu={groundingMenuHeaderMenu}
			list={groundingMenuList}
			palette={motionPalette(theme)}
			selectedMenu={selectedMenu}
			onSelectedMenuChange={setSelectedMenu}
		/>
	)
}

/**
 * Reads Demo's `stopped` flag (via useDemoMotion()) and passes it
 * straight through to Greeting as `paused` so the animation freezes in
 * place instead of swapping to a separate static frame.
 */
const greetingPrompts = [
	'Hi, try asking me what needs your attention today',
	'Hi, try asking me to find updates from your team',
	'Hi, try asking me what changed in this document',
]

const GreetingMotionDemo = ({ theme, text }: { theme: MotionPaletteName; text: string }) => {
	const { stopped } = useDemoMotion()
	return (
		<Greeting
			text={text}
			color={darkestColor(motionPalette(theme))}
			paused={stopped}
		/>
	)
}

// "Teaching handraise" border-tracing motion — a motion cue used to draw
// the user's attention to something (NOT a thinking/loading indicator).
// This is the author's own engineering work (not a designer's spec) —
// see the "Teaching Handraise" section body for the CSS-vs-OffscreenCanvas
// tradeoff this demo illustrates.
//
// Local to this file (not exported/reused elsewhere) since its
// appear/disappear cycling logic is specific to this one demo, not a
// generic wrapper — Demo (components/Page/Demo.tsx) already handles all
// the shared badge/layout/centering concerns every demo needs.
const HANDRAISE_WIDTH = 320
const HANDRAISE_HEIGHT = 70
const HANDRAISE_CORNER_RADIUS = Math.min(HANDRAISE_WIDTH, HANDRAISE_HEIGHT) * 0.2
const HANDRAISE_ICON_SIZE = Math.round(HANDRAISE_HEIGHT * 0.5)
const HANDRAISE_PADDING_LEFT = Math.max(16, HANDRAISE_HEIGHT * 0.35)
const HANDRAISE_BAR_HEIGHT = Math.max(6, Math.round(HANDRAISE_ICON_SIZE * 0.22))

// Square companion shape shown alongside the rectangle card — the
// body text calls out that the CSS conic-gradient trick only produces
// visible seams on long, narrow rectangles, not on a more square
// aspect ratio. Showing both side by side makes that contrast visible
// directly instead of just describing it in prose. Its `duration`
// prop is set to match LinePathMotionOvershootV3Css's own 1833ms (see
// below) — both shapes then share the exact same 2833ms sweep+pause
// cycle (PAUSE_MS=1000 is identical in both components), so they stay
// visually in sync and both complete HANDRAISE_LOOP_MS's "two full
// cycles" at the same pace.
const HANDRAISE_SQUARE_SIZE = HANDRAISE_HEIGHT

// Full lifecycle, driven by a small phase state machine:
//   'looping' — the line sweeps/traces for two full internal cycles
//               (LinePathMotionOvershootV3Css's own sweep+pause loop,
//               ~2833ms each with its defaults), so the visitor
//               actually sees the handraise motion play out twice.
//   'holding' — the line's animation is frozen (paused, not hidden —
//               the component stays mounted and visible) so the cue
//               visibly settles before disappearing, rather than
//               cutting off mid-loop.
//   'hidden'  — fully unmounted (not just visually hidden — the
//               underlying animation actually stops) for a pause
//               before mounting again to repeat the whole cycle.
const HANDRAISE_LOOP_MS = 2833 * 2 // two full sweep+pause cycles of the line itself
const HANDRAISE_HOLD_MS = 2000 // frozen/settled, still visible, before exit
const HANDRAISE_HIDDEN_MS = 3000

// Forces animation-play-state: paused onto every descendant animation
// (the line's keyframes are on nested elements we don't own directly),
// so "holding" truly freezes the last frame instead of continuing to
// loop underneath a still-visible card.
const FreezeWrapper = styled.div<{ $paused: boolean }>`
	width: 100%;
	height: 100%;
	${({ $paused }) =>
		$paused &&
		`
		* {
			animation-play-state: paused !important;
		}
	`}
`

const TeachingHandraise = ({ theme, paused = false }: { theme: MotionPaletteName; paused?: boolean }) => {
	const palette = motionPalette(theme)
	const [phase, setPhase] = useState<'looping' | 'holding' | 'hidden'>('looping')

	useEffect(() => {
		if (paused) return
		const nextDelay =
			phase === 'looping' ? HANDRAISE_LOOP_MS : phase === 'holding' ? HANDRAISE_HOLD_MS : HANDRAISE_HIDDEN_MS
		const nextPhase = phase === 'looping' ? 'holding' : phase === 'holding' ? 'hidden' : 'looping'
		const timer = setTimeout(() => setPhase(nextPhase), nextDelay)
		return () => clearTimeout(timer)
	}, [phase, paused])

	const visible = phase !== 'hidden'
	const linePaused = paused || phase === 'holding'

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
			<AnimatePresence>
				{visible && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						style={{
							position: 'relative',
							width: HANDRAISE_WIDTH,
							height: HANDRAISE_HEIGHT,
							background: palette.background2,
							borderRadius: HANDRAISE_CORNER_RADIUS,
							overflow: 'hidden',
						}}
					>
						<FreezeWrapper $paused={linePaused}>
							<LinePathMotionOvershootV3Css width={HANDRAISE_WIDTH} height={HANDRAISE_HEIGHT} color={palette.colors[1]} />
							<div
								style={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									paddingLeft: HANDRAISE_PADDING_LEFT,
									paddingRight: 16,
									color: darkestColor(palette),
								}}
							>
								<Rocket24Filled style={{ width: HANDRAISE_ICON_SIZE, height: HANDRAISE_ICON_SIZE, flexShrink: 0 }} />
								<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
									<div
										style={{
											width: '100%',
											height: HANDRAISE_BAR_HEIGHT,
											borderRadius: 9999,
											backgroundColor: palette.colors[1],
										}}
									/>
									<div
										style={{
											width: '60%',
											height: HANDRAISE_BAR_HEIGHT,
											borderRadius: 9999,
											backgroundColor: palette.colors[1],
										}}
									/>
								</div>
							</div>
						</FreezeWrapper>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{visible && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						style={{
							position: 'relative',
							width: HANDRAISE_SQUARE_SIZE,
							height: HANDRAISE_SQUARE_SIZE,
							background: palette.background2,
							borderRadius: HANDRAISE_CORNER_RADIUS,
							overflow: 'hidden',
						}}
					>
						<FreezeWrapper $paused={linePaused}>
							<LinePathMotionV2 size={HANDRAISE_SQUARE_SIZE} duration={1833} color={palette.colors[1]} />
							<div
								style={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: darkestColor(palette),
								}}
							>
								<Rocket24Filled style={{ width: HANDRAISE_ICON_SIZE, height: HANDRAISE_ICON_SIZE, flexShrink: 0 }} />
							</div>
						</FreezeWrapper>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

/**
 * Reads Demo's `stopped` flag and passes it through to TeachingHandraise
 * as `paused` so the line animations freeze in place.
 */
const TeachingHandraiseDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const { stopped } = useDemoMotion()
	return <TeachingHandraise theme={theme} paused={stopped} />
}

/**
 * Copilot Motion Systems — a design-systems case study, not a single
 * shipped feature. Visuals are live embeds of the themed Storybook motion
 * demos (teaching handraise, grounding menu, greeting) rather than
 * static Copilot product screenshots, since the real product UI isn't
 * available to share publicly. Each embed uses a different one of the 9
 * motion palettes so the page doesn't read as one repeated color scheme.
 *
 * SCAFFOLDING NOTE: latency-related content (DAB, Blocks/Mini Loader/
 * Single Square, Progress Bar) has been split out to its own project,
 * copilot-latency-motion.tsx. The homepage card/thumbnail reuses the
 * Greeting animation via the shared, badge-free DemoThumbnail wrapper —
 * revisit once more animations are added to this page.
 */
export const copilotMotionSystems: IProject = {
	details: {
		header: 'Copilot product craft & components',
		thumbnail: null,
		demo: (
			<DemoThumbnail theme={thumbnailTheme}>
				<GreetingMotionDemo theme={thumbnailTheme} text={greetingPrompts[0]} />
			</DemoThumbnail>
		),
		tags: [TagType.Microsoft, TagType.Copilot, TagType.Motion, TagType.Website],
	},
	content: [
		{
			title: 'Copilot product craft & components',
		},
		{
			demo: (
				<Demo theme={topGreetingTheme} minHeight={140}>
					<GreetingMotionDemo theme={topGreetingTheme} text={greetingPrompts[1]} />
				</Demo>
			),
		},
		{
			header: SectionName.Overview,
			body: `As Microsoft 365 Copilot moved toward a more unified product experience, my team was brought in to improve polish and quality, close interaction gaps, and support the work needed to land Ignite and Build deadlines.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, SkillType.UIUX, TagType.Motion],
				},
			],
			body: `UX engineer contributing to Copilot craft work across component behavior, interaction polish, accessibility, and performant motion.`,
		},

		{
			header: 'Overlay and capabilities menus',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Chris Lorance',
				},
			],
		},
		{
			slideshow: {
				width: 900,
				slides: [
					{
						img: overlayWelcomeImg,
						img2x: overlayWelcomeImg2x,
						caption: 'Overlay menu',
					},
					{
						img: overlayFooterImg,
						img2x: overlayFooterImg2x,
						caption: 'Overlay menu in Footer',
					},
				],
			},
		},
		{
			body: `I built Copilot's overlay menu component into Fluent AI, reconfiguring Fluent's existing overlay menu. This work included the component structure, submenu behavior, and motion. One tricky part was that the base menu resolved its direction and placement asynchronously, while the motion wrapper needed the direction earlier in order to animate correctly. Because that process was built into the original Fluent component, I had to work around it and wait for the position to resolve before animating. This also exposed an issue where submenus could get stuck open when users moved between them quickly. I tracked down and resolved each issue so the overlay held up under the conditions that used to break it.`,
		},
		{
			header: 'Input position animation',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk',
				},
			],
		},
		{
			slideshow: {
				width: 1250,
				gap: 20,
				slides: [
					{
						demo: (
							<DemoSlide theme={inputPositionTheme} interactive hasHeader>
								<InputPositionDemo theme={inputPositionTheme} />
							</DemoSlide>
						),
						caption: 'Input motion',
					},
					{
						img: inputPositionCentered,
						img2x: inputPositionCentered2x,
						caption: 'New chat home screen',
					},
					{
						img: inputPositionAnchored,
						img2x: inputPositionAnchored2x,
						caption: 'Anchored chat, conversation started',
					},
					{
						img: inputPositionSearchExpanded,
						img2x: inputPositionSearchExpanded2x,
						caption: 'Anchored chat (shows diffused background)',
					},
				],
			},
		},
		{
			body: `The chat input moves between two anchor points: centered when starting a new chat, and docked to the footer once a conversation starts. I used the FLIP technique (First, Last, Invert, Play) to anchor the footer in its final position, then animate it from the center to that docked state. This kept the motion performant and ensured the input ended in the correct position even if the browser resized during the animation.`,
		},
		{
			header: 'Grounding menu',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Chris Lorance',
				},
			],
		},
		{
			demo: (
				<Demo theme={groundingMenuTheme} minHeight={360} interactive allowRestartWhileRunning>
					<GroundingMenuDemo theme={groundingMenuTheme} />
				</Demo>
			),
		},
		{
			body: `For the grounding menu, I explored a directional motion strategy that was later simplified into staggered entrance motion. That approach better matched other list motion across Copilot and kept the pattern cohesive. I focused on craft cleanup, including removing the skeleton UI. I also fixed menu state issues where the correct default tab was being cleared, leaving the control in an incorrect starting state. This was part of the broader push to make Copilot interactions feel more polished, stable, and visually consistent.`,
		},
		{
			header: 'Teaching handraise',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk',
				},
			],
		},
		{
			demo: (
				<Demo theme={thinkingLineTheme} minHeight={94} variant="half">
					<TeachingHandraiseDemo theme={thinkingLineTheme} />
				</Demo>
			),
			demoWidth: 'half',
		},
		{
			body: `I built the Copilot teaching popover motion and created reusable motion patterns for different sized teaching surfaces. I built both JavaScript and CSS implementation prototypes and compared their performance, fidelity, and implementation complexity before the motion moved into product code. I documented the timing, easing, directional behavior, and implementation tradeoffs, then worked directly with engineering as they adapted the motion for production.`,
		},
		{
			header: 'Greeting motion',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk',
				},
			],
		},
		{
			demo: (
				<Demo theme={greetingTheme} minHeight={140}>
					<GreetingMotionDemo theme={greetingTheme} text={greetingPrompts[2]} />
				</Demo>
			),
		},
		{
			body: `A character-by-character reveal used for Copilot's welcome/greeting message on chat and agent pages. Here, polish mattered because it shaped the first impression of the experience.`,
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
					body: formatYearRange(2025),
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Motion_Designer,
					body: 'Chris Lorance, Andrew Falk',
				},
			],
		},
	],
}
