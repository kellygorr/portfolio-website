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
import { InputPositionDemo } from '../../../stories/InputPosition/InputPositionDemo'
import { randomMotionPaletteNames, darkestColor, motionPalette } from '../../styles/motionPalettes'
import type { MotionPaletteName } from '../../styles/motionPalettes'
import { formatYearRange } from '../../utils/dateFormat'

const inputPositionCentered = new URL(
	'../../assets/images/copilot-motion-systems/input-position-centered.jpg',
	import.meta.url
).href
const inputPositionCentered2x = new URL(
	'../../assets/images/copilot-motion-systems/input-position-centered@2x.jpg',
	import.meta.url
).href
const inputPositionAnchored = new URL(
	'../../assets/images/copilot-motion-systems/input-position-anchored.jpg',
	import.meta.url
).href
const inputPositionAnchored2x = new URL(
	'../../assets/images/copilot-motion-systems/input-position-anchored@2x.jpg',
	import.meta.url
).href
const inputPositionSearchExpanded = new URL(
	'../../assets/images/copilot-motion-systems/input-position-search-expanded.jpg',
	import.meta.url
).href
const inputPositionSearchExpanded2x = new URL(
	'../../assets/images/copilot-motion-systems/input-position-search-expanded@2x.jpg',
	import.meta.url
).href

// Randomized once per page load: each of the 5 in-page demos below gets a
// different, non-repeating motion palette, reshuffled every time this
// module is freshly evaluated (i.e. on every full page load/refresh).
const [thinkingLineTheme, groundingMenuTheme, greetingTheme, inputPositionTheme, thumbnailTheme] = randomMotionPaletteNames(5)

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
			{ title: 'Q3 Budget Review', subtitle: 'Shared with Finance team' },
			{ title: 'Stand-up meeting', subtitle: 'Occurs every Thu, 2:30 PM - 3:30 PM' },
			{ title: 'Research Guide', subtitle: 'Mona Kane sent 2 hours ago' },
		],
	},
	{
		menuTitle: 'Files',
		list: [
			{ title: 'Q3 Budget Review', subtitle: 'Shared with Finance team' },
			{ title: 'Onboarding Guide', subtitle: 'Last edited 3 days ago' },
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
	const isFirstRun = useRef(true)

	useEffect(() => {
		// Skip on initial mount — replayToken starts at 0 and this effect
		// would otherwise immediately "replay" a sequence nobody asked
		// for the moment the demo first renders.
		if (isFirstRun.current) {
			isFirstRun.current = false
			return
		}

		let cancelled = false
		const steps = [1, 2, 3, 0]
		const timers: number[] = []

		steps.forEach((tabIndex, i) => {
			const timer = window.setTimeout(
				() => {
					if (cancelled) return
					setSelectedMenu(tabIndex)
					if (i === steps.length - 1) {
						onReplayStateChange?.(false)
					}
				},
				GROUNDING_MENU_STEP_MS * (i + 1)
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
 * straight through to Greeting as `isStatic` — Greeting renders its own
 * settled, fully-revealed end state when isStatic is true, instead of
 * Demo trying to swap in some separate static element. Local to this
 * file since the "read stopped, pass isStatic" wiring is specific to
 * how this one demo instance is embedded, same pattern as
 * GroundingMenuDemo above.
 */
const GreetingMotionDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const { stopped } = useDemoMotion()
	return (
		<Greeting
			text="Hi, try asking me what's next on your calendar"
			color={darkestColor(motionPalette(theme))}
			isStatic={stopped}
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

const TeachingHandraise = ({ theme, isStatic = false }: { theme: MotionPaletteName; isStatic?: boolean }) => {
	const palette = motionPalette(theme)
	const [phase, setPhase] = useState<'looping' | 'holding' | 'hidden'>('looping')

	useEffect(() => {
		if (isStatic) return
		const nextDelay =
			phase === 'looping' ? HANDRAISE_LOOP_MS : phase === 'holding' ? HANDRAISE_HOLD_MS : HANDRAISE_HIDDEN_MS
		const nextPhase = phase === 'looping' ? 'holding' : phase === 'holding' ? 'hidden' : 'looping'
		const timer = setTimeout(() => setPhase(nextPhase), nextDelay)
		return () => clearTimeout(timer)
	}, [phase, isStatic])

	// Static: settled resting frame, no AnimatePresence mount/unmount
	// cycle, no phase machine, and no LinePathMotionOvershootV3Css (its
	// sweep geometry has no natural "paused mid-frame" state to render
	// safely) — a plain static border stands in for the line instead.
	if (isStatic) {
		return (
			<div
				style={{
					position: 'relative',
					width: HANDRAISE_WIDTH,
					height: HANDRAISE_HEIGHT,
					background: palette.background2,
					borderRadius: HANDRAISE_CORNER_RADIUS,
					border: `2px solid ${palette.colors[1]}`,
					boxSizing: 'border-box',
					overflow: 'hidden',
				}}
			>
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
			</div>
		)
	}

	const visible = phase !== 'hidden'
	const paused = phase === 'holding'

	return (
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
					<FreezeWrapper $paused={paused}>
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
	)
}

/**
 * Reads Demo's `stopped` flag and passes it through to TeachingHandraise
 * as `isStatic`, same pattern as GreetingMotionDemo above.
 */
const TeachingHandraiseDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const { stopped } = useDemoMotion()
	return <TeachingHandraise theme={theme} isStatic={stopped} />
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
		header: 'Copilot Motion Systems',
		thumbnail: null,
		demo: (
			<DemoThumbnail theme={thumbnailTheme}>
				<GreetingMotionDemo theme={thumbnailTheme} />
			</DemoThumbnail>
		),
		tags: [TagType.Microsoft, TagType.Copilot, TagType.Motion],
	},
	content: [
		{
			title: 'Copilot Motion Systems',
		},
		{
			header: SectionName.Overview,
			body: `Motion engineering across Microsoft Copilot: AI thinking states, chat and panel interactions, grounding/menu patterns, and teaching popups. I led how designers and engineers across Copilot chose performant, accessible motion implementations — from CSS and SVG to JavaScript-driven animation — and delivered craft improvements for major public moments at Build and Ignite.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, SkillType.Prototyping],
				},
			],
			body: `Motion engineering leader for this work across Microsoft 365 and Copilot. Partnered with the Fluent team on reusable motion components and implementation patterns to reduce duplicate work across Copilot surfaces. Delivered high-priority craft improvements — theming, menu interactions, accessibility, and optimized motion — for Build and Ignite. Helped designers and engineers choose performant implementation approaches across CSS, SVG, and JavaScript-driven animation, including reduced-motion support and cross-platform tradeoffs, and presented motion performance best practices to engineering and design teams across Microsoft.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Copilot, TagType.Web],
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
					body: 'Chris Lorence, Andrew Falk',
				},
			],
		},
		{
			header: 'Teaching Handraise',
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
			body: `This border-tracing indicator is a "teaching handraise," a motion cue used to draw the user's attention to something. It went through many implementation passes chasing a specific performance/fidelity tradeoff. The CSS-only version (shown below) uses a conic-gradient trick to draw the traveling line — cheap and GPU-friendly, but it has a real visual compromise: on long, narrow rectangles, the gradient's start angle causes visible seams/cracks in the line at certain points in the sweep. The only implementation that fully eliminated the artifact was rendering the line to an OffscreenCanvas on a Web Worker, keeping the drawing work off the main thread entirely. I built and compared both versions myself to understand exactly where the CSS approach breaks down and when the added complexity of a worker-driven canvas is actually justified.`,
		},
		{
			header: 'Grounding Menu',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Chris Lorence',
				},
			],
		},
		{
			demo: (
				<Demo theme={groundingMenuTheme} minHeight={360} interactive>
					<GroundingMenuDemo theme={groundingMenuTheme} />
				</Demo>
			),
		},
		{
			body: `Copilot surfaces grounding sources — files, people, meetings, emails — through a tabbed menu pattern. This wireframe demonstrates the interaction shape (tab switching, directional content transitions) independent of any specific visual design, so the underlying motion and information architecture can be evaluated on its own.`,
		},
		{
			header: 'Greeting Motion',
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
					<GreetingMotionDemo theme={greetingTheme} />
				</Demo>
			),
		},
		{
			body: `A character-by-character reveal used for Copilot's welcome/greeting message. Each character animates in on its own easing curve, staggered across the sequence with a second, distinct curve — tuned specifically so the animation doesn't produce a "late straggler" effect where the last character visibly lags behind the rest.`,
		},
		{
			header: 'Input Position Animation',
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
						caption: 'Interactive recreation — click Send to try it',
					},
					{
						img: inputPositionCentered,
						img2x: inputPositionCentered2x,
						caption: 'Product screenshot — centered, empty-conversation state',
					},
					{
						img: inputPositionAnchored,
						img2x: inputPositionAnchored2x,
						caption: 'Product screenshot — anchored to footer, conversation started',
					},
					{
						img: inputPositionSearchExpanded,
						img2x: inputPositionSearchExpanded2x,
						caption: 'Product screenshot — search expanded',
					},
				],
			},
		},
		{
			body: `The chat input moves between two anchor points: centered in an empty conversation, or docked to the footer once a conversation starts. Both the footer's divider line and its background fill are carried by the exact same FLIP-animated container as the input itself, so they arrive already in sync with zero extra timing logic. Recreated from Copilot's design system for this portfolio; click Send in the demo above to see it in both directions.`,
		},
	],
}
