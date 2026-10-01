import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { IProject, SkillType, SectionName, HighlightName, TagType } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { DemoThumbnail } from '../../components/shared'
import { useDemoMotion } from '../../components/Page/DemoMotionContext'
import { Blocks } from '../../../stories/BlocksLatency/Blocks'
import { MiniLoader } from '../../../stories/BlocksLatency/MiniLoader'
import { SingleSquare } from '../../../stories/BlocksLatency/SingleSquare'
import { DAB } from '../../../stories/DAB/DAB'
import { ProgressBar } from '../../../stories/ProgressBar/ProgressBar'
import { randomMotionPaletteNames, darkestColor, motionPalette } from '../../styles/motionPalettes'
import { formatYearRange } from '../../utils/dateFormat'

// Randomized once per page load: each of the 4 in-page demos below gets a
// different, non-repeating motion palette, reshuffled every time this
// module is freshly evaluated (i.e. on every full page load/refresh).
const [dabTheme, allBlocksTheme, progressBarTheme, thumbnailTheme] = randomMotionPaletteNames(4)

const AllBlocksItem = ({ label, children, textColor }: { label: string; children: ReactNode; textColor: string }) => (
	<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 24 }}>
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 160, height: 100 }}>
			{children}
		</div>
		<span style={{ color: textColor, fontSize: 14 }}>{label}</span>
	</div>
)

// All three "block" latency/loading animations (Blocks, MiniLoader,
// SingleSquare) shown side by side for comparison. Local to this file
// since the layout (flex-wrap so the three stack on narrow viewports)
// is specific to this one section, not a generic reusable wrapper.
// Reads Demo's `stopped` flag (via useDemoMotion()) and passes it
// straight through to all three as `isStatic`, same pattern as
// GreetingMotionDemo/TeachingHandraiseDemo in copilot-motion-systems.tsx.
const AllBlocks = ({ theme }: { theme: typeof allBlocksTheme }) => {
	const palette = motionPalette(theme)
	const { stopped } = useDemoMotion()
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
			<AllBlocksItem label="Blocks" textColor={darkestColor(palette)}>
				<Blocks size={24} duration={3567} colors={palette.colors as [string, string, string, string, string]} isStatic={stopped} />
			</AllBlocksItem>
			<AllBlocksItem label="Mini Loader" textColor={darkestColor(palette)}>
				<MiniLoader
					size={24}
					duration={5117}
					rollerColor={darkestColor(palette)}
					trackColors={[palette.colors[0], palette.colors[1], palette.colors[2]]}
					isStatic={stopped}
				/>
			</AllBlocksItem>
			<AllBlocksItem label="Single Square" textColor={darkestColor(palette)}>
				<SingleSquare size={24} color={palette.colors[1]} isStatic={stopped} />
			</AllBlocksItem>
		</div>
	)
}

const dabButtonBaseStyle = {
	padding: '8px 12px',
	borderRadius: 8,
	border: 'none',
	cursor: 'pointer',
	fontSize: 14,
	fontWeight: 600,
	color: '#fff',
} as const

// Dynamic Action Bar (DAB) demo, including the same Intro/Thinking mode
// toggle buttons as the Storybook story, so visitors can see both
// animation states, not just a single static "thinking" loop. Local to
// this file since the mode-toggle state is specific to this one demo.
const DABInteractive = ({ theme }: { theme: typeof dabTheme }) => {
	const palette = motionPalette(theme)
	const [mode, setMode] = useState<'idle' | 'intro' | 'thinking'>('thinking')
	const [key, setKey] = useState(0)

	const isThinking = mode === 'thinking'
	const play = mode !== 'idle'

	const handleAnimationEnd = useCallback(() => {
		if (mode === 'intro') {
			setMode('idle')
		}
	}, [mode])

	const startIntro = () => {
		setMode('idle')
		requestAnimationFrame(() => {
			setKey((k) => k + 1)
			setMode('intro')
		})
	}

	const toggleThinking = () => {
		if (mode === 'thinking') {
			setMode('idle')
			return
		}
		setMode('idle')
		requestAnimationFrame(() => {
			setKey((k) => k + 1)
			setMode('thinking')
		})
	}

	const inactiveBg = darkestColor(palette)
	const activeBg = palette.colors[2]

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
			<DAB
				key={key}
				size={140}
				strokeWidth={4}
				isThinking={isThinking}
				play={play}
				onAnimationEnd={handleAnimationEnd}
				backgroundColor="#fff"
				iconColor={darkestColor(palette)}
				gradientColor1={palette.colors[1]}
				gradientColor2={darkestColor(palette)}
				gradientColor3={palette.colors[0]}
				gradientColor4={palette.colors[1]}
				gradientColor5={palette.colors[2]}
				gradientColor6={darkestColor(palette)}
			/>
			<div style={{ display: 'flex', gap: 12 }}>
				<button
					type="button"
					onClick={startIntro}
					style={{ ...dabButtonBaseStyle, background: mode === 'intro' ? activeBg : inactiveBg }}
				>
					Intro
				</button>
				<button
					type="button"
					onClick={toggleThinking}
					style={{ ...dabButtonBaseStyle, background: mode === 'thinking' ? activeBg : inactiveBg }}
				>
					Thinking
				</button>
			</div>
		</div>
	)
}

/**
 * Reads Demo/DemoThumbnail's `stopped` flag and passes it through to
 * Blocks as `isStatic`, same pattern as AllBlocks above — used by the
 * homepage thumbnail card, which renders Blocks directly (not wrapped
 * in AllBlocksItem).
 */
const ThumbnailBlocks = ({ theme }: { theme: typeof thumbnailTheme }) => {
	const palette = motionPalette(theme)
	const { stopped } = useDemoMotion()
	return <Blocks size={32} duration={3567} colors={palette.colors as [string, string, string, string, string]} isStatic={stopped} />
}

/**
 * Reads Demo's `stopped` flag and passes it through to ProgressBar as
 * `isStatic` — distinct from ProgressBar's own `running` prop, which
 * fades the bar out to invisible rather than showing a settled frame.
 */
const ProgressBarDemo = ({ theme }: { theme: typeof progressBarTheme }) => {
	const { stopped } = useDemoMotion()
	return (
		<div style={{ width: '100%', padding: '0 40px', boxSizing: 'border-box', color: motionPalette(theme).colors[2] }}>
			<ProgressBar running={!stopped} isStatic={stopped} />
		</div>
	)
}

/**
 * Copilot Latency Motion — split out of Copilot Motion Systems so that
 * page stays focused; this one is specifically about ambient
 * latency/loading indicators (DAB, Blocks/Mini Loader/Single Square,
 * Progress Bar). Visuals are live embeds of the themed Storybook motion
 * demos rather than static Copilot product screenshots, since the real
 * product UI isn't available to share publicly.
 */
export const copilotLatencyMotion: IProject = {
	details: {
		header: 'Copilot Latency Motion',
		thumbnail: null,
		demo: (
			<DemoThumbnail theme={thumbnailTheme}>
				<ThumbnailBlocks theme={thumbnailTheme} />
			</DemoThumbnail>
		),
		tags: [TagType.Microsoft, TagType.Copilot, TagType.Motion],
	},
	content: [
		{
			title: 'Copilot Latency Motion',
		},
		{
			demo: (
				<Demo theme={thumbnailTheme} minHeight={160}>
					<AllBlocks theme={thumbnailTheme} />
				</Demo>
			),
		},
		{
			header: SectionName.Overview,
			body: `Ambient motion for Microsoft Copilot's latency and loading states.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, SkillType.Prototyping],
				},
			],
			body: `Motion engineering leader for this work across Microsoft 365 and Copilot. Delivered high-priority craft improvements for these latency/loading states for Build and Ignite, and helped designers and engineers choose performant implementation approaches.`,
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
					body: 'Andrew Falk, Ryan Gagnier',
				},
			],
		},
		{
			header: 'Dynamic Action Bar (DAB)',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Ryan Gagnier',
				},
			],
		},
		{
			demo: (
				<Demo theme={dabTheme} minHeight={280} variant="half" interactive hideRestartIcon>
					<DABInteractive theme={dabTheme} />
				</Demo>
			),
			demoWidth: 'half',
		},
		{
			body: `The Dynamic Action Bar's animated border communicates state, idle, thinking, and an intro moment when it first appears. The trickiest part was the crossfade between the "thinking" state's partial gradient arc and a fuller gradient ring: two independently-rotating gradient layers, each with their own transparent gaps, composited into a visible seam at certain rotation offsets. The fix was architectural, the full-ring layer needed to be a complete, gap-free 360° gradient with its appearance driven entirely by whole-layer opacity keyframes, never per-degree transparency. Below is a live rebuild of that corrected animation.`,
		},
		{
			header: 'Latency & Loading Blocks',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk',
				},
			],
		},
		{
			demo: (
				<Demo theme={allBlocksTheme} minHeight={160}>
					<AllBlocks theme={allBlocksTheme} />
				</Demo>
			),
		},
		{
			body: `Three lightweight loading/latency indicators built to run continuously in low-attention contexts: Blocks (a 3×3 color-cycling grid), Mini Loader (a single rolling block that picks up and drops off tracked squares), and Single Square (a minimal pulsing square for the smallest spaces). Shown together below, the layout wraps to stack on narrow screens rather than squeezing all three into one row.`,
		},
		{
			header: 'Progress Bar',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk',
				},
			],
		},
		{
			demo: (
				<Demo theme={progressBarTheme} minHeight={80} variant="half">
					<ProgressBarDemo theme={progressBarTheme} />
				</Demo>
			),
			demoWidth: 'half',
		},
		{
			body: `A thin, ambient progress indicator that scales its animation speed to the width of its container, so the perceived motion speed reads consistently across different surface sizes rather than feeling faster or slower depending on layout.`,
		},
	],
}
