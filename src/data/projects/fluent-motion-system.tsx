import { useEffect, useRef } from 'react'
import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { useDemoMotion } from '../../components/Page/DemoMotionContext'
import { Durations, type DurationsHandle } from '../../../stories/MotionTokens/Durations'
import { Easings, type EasingsHandle } from '../../../stories/MotionTokens/Easings'
import { randomMotionPaletteNames, motionPalette } from '../../styles/motionPalettes'
import type { MotionPaletteName } from '../../styles/motionPalettes'
import { formatYearRange } from '../../utils/dateFormat'

// Randomized once per page load, same convention as copilot-motion-systems
// and copilot-latency-motion — each of the 2 in-page token demos below
// gets a different, non-repeating motion palette, reshuffled on every
// fresh page load rather than hand-picked.
const [durationsTheme, easingsTheme] = randomMotionPaletteNames(2)

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
 * Durations/Easings own their own dark-mode look (see their Storybook
 * .stories.tsx wrappers) via `palette.backgroundDark` — a deliberately
 * different, more dramatic dark tone than `darkestColor(palette)`
 * (colors[3], used by Demo's own "recreated for portfolio"/interactive
 * badges), so those badges still read clearly against this background
 * instead of blending into it.
 */
const DurationsDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const palette = motionPalette(theme)
	const ref = useRef<DurationsHandle>(null)
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
		ref.current?.replayAll()
		const timer = window.setTimeout(() => onReplayStateChange?.(false), DURATIONS_MAX_MS)
		return () => window.clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: palette.backgroundDark }}>
			<Durations ref={ref} palette={palette} />
		</div>
	)
}

/**
 * Live embed of the Motion Tokens/Easings Storybook story — the real
 * Fluent Flex Motion easing tokens (functional/expressive enter, exit,
 * transition, linear), each shown as a position-over-time graph with a
 * dot tracing the curve and a progress bar reusing that same easing.
 *
 * Also an `interactive` demo, but unlike Durations' "run every row at
 * once" replay-all, clicking the restart icon here plays a "click
 * through every graph, one at a time" sequence (`playSequence` — see
 * EasingsHandle in Easings.tsx) instead: animating all 7 curves
 * simultaneously would be visually noisy and hard to actually compare,
 * where Durations' rows are specifically designed to be read side by
 * side while running together.
 */
const EasingsDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const palette = motionPalette(theme)
	const ref = useRef<EasingsHandle>(null)
	const { replayToken, onReplayStateChange } = useDemoMotion()
	const isFirstRun = useRef(true)

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false
			return
		}
		ref.current?.playSequence(() => onReplayStateChange?.(false))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: palette.backgroundDark }}>
			<Easings ref={ref} palette={palette} />
		</div>
	)
}

const thumbnailx1 = new URL('../../assets/thumbnails/x1/fluent-motion-system-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/fluent-motion-system-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/fluent-motion-system-thumbnail.jpg', import.meta.url).href

// PLACEHOLDER ASSETS — these are showreel-style stand-ins, not real product
// screenshots. Swap the files at these same paths (keep the same
// fluent-motion-system-0N naming) once real screenshots/diagrams are ready;
// no code changes needed.
const img1 = new URL('../../assets/images/fluent-motion-system/fluent-motion-system-01.png', import.meta.url).href
const img2 = new URL('../../assets/images/fluent-motion-system/fluent-motion-system-02.png', import.meta.url).href
const img3 = new URL('../../assets/images/fluent-motion-system/fluent-motion-system-03.png', import.meta.url).href
const img4 = new URL('../../assets/images/fluent-motion-system/fluent-motion-system-04.png', import.meta.url).href
const img5 = new URL('../../assets/images/fluent-motion-system/fluent-motion-system-05.png', import.meta.url).href

export const fluentMotionSystem: IProject = {
	details: {
		header: 'Fluent Design System Motion',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Design, TagType.AI],
	},
	content: [
		{
			title: 'Fluent Design System Motion',
		},
		{
			slideshow: {
				width: 1735,
				slides: [
					{
						img: img1,
						caption: 'Motion system overview — communication, orientation, feedback, delight',
					},
					{
						img: img2,
						caption: 'Easing carries intent: arrive, transition, leave',
					},
					{
						img: img3,
						caption: 'Continuity preserves orientation — persistent chrome, moving content',
					},
					{
						img: img4,
						caption: 'Directional transitions map to navigation order and hierarchy',
					},
					{
						img: img5,
						caption: 'Move with meaning',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: `An agent-facing motion guidance system for the Fluent design system's Flex plugin. The goal wasn't just to document motion principles for humans — it was to make motion guidance actionable for AI agents that create, review, and implement component behavior: choosing motion patterns, applying motion tokens, avoiding performance issues, respecting reduced motion, and producing output that can be reviewed and trusted.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.AI, SkillType.Design, SkillType.Prototyping, SkillType.JSON],
				},
			],
			body: `I led the development, testing, and refinement of the motion guidance system end-to-end. This included building the knowledge base itself (foundations, recipes, duration/easing selection, spatial models, rhythm, governance, accessibility, performance, anti-patterns, and reduced-motion guidance), then validating it through real component testing rather than treating it as static documentation.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Design, TagType.AI],
				},
				{
					header: HighlightName.Dates,
					body: formatYearRange(2026),
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk',
				},
			],
		},
		{
			header: 'Building the motion knowledge base',
			body: `I helped shape the system so agents could answer practical questions for any motion decision: what problem does this motion solve, what motion pillar does it support, what spatial relationship is changing, what duration/easing tokens should be used, what properties should animate, and how should the experience behave under reduced motion.`,
		},
		{
			demo: (
				<Demo theme={durationsTheme} minHeight={560} interactive>
					<DurationsDemo theme={durationsTheme} />
				</Demo>
			),
		},
		{
			body: `The real Fluent Flex Motion duration scale — base-50 through base-1000 — each row independently clickable to compare relative pacing side by side.`,
		},
		{
			demo: (
				<Demo theme={easingsTheme} minHeight={560} interactive>
					<EasingsDemo theme={easingsTheme} />
				</Demo>
			),
		},
		{
			body: `The full easing library — functional and expressive enter/exit/transition/linear curves — plotted as position-over-time graphs, each with a dot tracing the curve and a progress bar reusing that same easing.`,
		},
		{
			header: 'Performance testing phase',
			body: `The first testing phase focused on performance by asking the plugin to generate motion for common components. This surfaced real failures: layout/reflow-heavy animation, paint-heavy property animation, overuse of decorative motion, and context leakage from other systems (like Fluent tokens or Fluent components) instead of Flex guidance. I used those failures to refine the plugin's guidance around performant properties, token usage, implementation boundaries, reduced motion, and approved motion approaches.`,
		},
		{
			header: 'Storybook-based validation',
			body: `I set up and reviewed Storybook-based component tests to evaluate generated motion in context. This surfaced cases where motion looked reasonable but caused performance problems — layout animation or unnecessary repaint. It led to clearer guidance around preferring transform and opacity, avoiding properties like height/width/color/background where they create performance issues, using FLIP-style approaches for layout transitions, and treating paint flashing as diagnostic rather than a simple pass/fail signal.`,
		},
		{
			header: 'Spec-authoring pilot: component YAML',
			body: `The next phase used the plugin as a spec-authoring tool for Fluent Flex component YAML files. These web/tokens.yaml files act as a deterministic component spec layer for agents, defining the concrete token and behavior guidance agents should use when creating or reviewing components. This wasn't the plugin's typical end-user use case, but it was an effective way to stress-test whether the guidance could help author real component motion specs. I piloted the update on 10 representative components before expanding across the remaining component specs.`,
		},
		{
			header: 'System-level gaps the pilot surfaced',
			body: `The YAML pass surfaced gaps that only show up at real component scale. The plugin needed to distinguish component-owned motion, parent-owned motion, and platform-owned/native motion — and to avoid over-specifying motion for components like Select, where interaction is owned by the browser or OS. It also needed to avoid creating structured "motion" entries that only documented no-animation states. Those findings led to new guidance around motion ownership, platform-owned interaction, and an explicit "No component motion" answer.`,
		},
		{
			header: 'Destination-aware output',
			body: `Another major learning: agents need to produce guidance in the format of the destination. For component YAML, that meant making motion guidance more deterministic — part/state/lifecycle entries with animated properties, durations, easings, and concise notes. For markdown guidance or code, the output shape needs to differ. This led to authoring guidance telling agents to match the destination format, carry actionable recommendations into the deliverable, and avoid leaving important motion behavior only in prose when the target format supports structured output.`,
		},
		{
			header: 'Pattern consistency across similar components',
			body: `The YAML pass also revealed that similar UI elements need unified motion treatment. Menu buttons, dropdowns, comboboxes, split-button menus, teaching popovers, and related anchored surfaces shouldn't each receive bespoke motion — they should share an anchored disclosure motion family unless there's a clear component-specific reason to diverge. This led to stronger pattern-consistency guidance in the plugin, helping agents align related components to the same motion recipe.`,
		},
		{
			header: 'Refinement through review',
			body: `Several refinements came from detailed review with Mitch and Chris. Mitch's feedback helped clarify the role of tokens.yaml as a deterministic entry point for component specs, while higher-level motion reasoning belongs in the plugin guidance. Chris's feedback helped sharpen the treatment of duration, easing, opacity, and color/state transitions — for example, opacity easing needed to remain linear, and visual state changes needed a clear pattern: instant state change by default, with an optional opacity crossfade between prepared layers when a perceptible visual transition is needed.

The work also clarified the distinction between UI motion and continuous or illustrative animation. UI transitions should use approved Flex duration tokens, but continuous animations like indeterminate progress or loading indicators may need explicit authored cycle timing when the token scale doesn't fit the behavior. That distinction was added to duration guidance so agents don't force every animation into short UI transition tokens.`,
		},
		{
			header: 'Review output as a first-class deliverable',
			body: `A final area of improvement was review output. When agents are specifically asked to create, review, or update motion, they shouldn't just produce the final artifact — they should also report high-signal conflicts, judgment calls, and low-confidence areas. This helps reviewers understand where the tool struggled or made design decisions. I added guidance for concise review output so agents can surface meaningful concerns without creating a noisy audit log.`,
		},
		{
			header: 'Outcome',
			body: `This work moved Fluent's motion guidance from a documentation concept toward a practical system for agent-assisted design and implementation — improving the plugin's ability to generate performant, accessible, token-aligned, consistent motion across components. It also established a feedback loop: test the plugin on real scenarios, identify where the agent fails, refine the guidance, and re-run the test to see if behavior improves.`,
		},
	],
}
