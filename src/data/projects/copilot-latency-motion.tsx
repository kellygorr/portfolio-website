import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { IProject, SkillType, SectionName, HighlightName, TagType } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { DemoSlide } from '../../components/Page/Slideshow/DemoSlide'
import { DemoThumbnail } from '../../components/shared'
import { useDemoMotion } from '../../components/Page/DemoMotionContext'
import { Blocks } from '../../../stories/BlocksLatency/Blocks'
import { MiniLoader } from '../../../stories/BlocksLatency/MiniLoader'
import { SingleSquare } from '../../../stories/BlocksLatency/SingleSquare'
import { StretchyCircles as StretchyCirclesV1 } from '../../../stories/StretchyCircles/StretchyCirclesV1'
import { StretchyCircles as StretchyCirclesV2 } from '../../../stories/StretchyCircles/StretchyCirclesV2'
import { LogoFauxCutout } from '../../../stories/LogoFauxCutout/LogoFauxCutout'
import { DAB } from '../../../stories/DAB/DAB'
import { ProgressBar } from '../../../stories/ProgressBar/ProgressBar'
import { randomMotionPaletteNames, darkestColor, motionPalette } from '../../styles/motionPalettes'
import { formatYearRange } from '../../utils/dateFormat'

const dabPowerPointWeb = new URL('../../assets/images/copilot-latency/copilot-latency-03.png', import.meta.url).href
const dabPowerPointWeb2x = new URL('../../assets/images/copilot-latency/copilot-latency-03-2x.png', import.meta.url).href
const dabWordWeb = new URL('../../assets/images/copilot-latency/copilot-latency-04.png', import.meta.url).href
const dabWordWeb2x = new URL('../../assets/images/copilot-latency/copilot-latency-04-2x.png', import.meta.url).href
const dabExcelWeb = new URL('../../assets/images/copilot-latency/copilot-latency-05.png', import.meta.url).href
const dabExcelWeb2x = new URL('../../assets/images/copilot-latency/copilot-latency-05-2x.png', import.meta.url).href
const copilotLogoScreenshot = new URL('../../assets/images/copilot-latency/copilot-latency-06.jpg', import.meta.url).href
const copilotLogoScreenshot2x = new URL('../../assets/images/copilot-latency/copilot-latency-06-2x.jpg', import.meta.url).href
const thinProgressBarContext = new URL('../../assets/images/copilot-latency/copilot-latency-thin-progress-bar-context.jpg', import.meta.url).href

// Randomized once per page load: each of the 6 in-page demos below gets a
// different, non-repeating motion palette, reshuffled every time this
// module is freshly evaluated (i.e. on every full page load/refresh).
const [dabTheme, allBlocksTheme, circleLatencyTheme, progressBarTheme, logoTheme, thumbnailTheme] = randomMotionPaletteNames(6)

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
const AllBlocks = ({ theme }: { theme: typeof allBlocksTheme }) => {
	const palette = motionPalette(theme)
	const { stopped } = useDemoMotion()
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
			<AllBlocksItem label="Blocks" textColor={darkestColor(palette)}>
				<Blocks size={24} duration={3567} colors={palette.colors as [string, string, string, string, string]} paused={stopped} />
			</AllBlocksItem>
			<AllBlocksItem label="Mini Loader" textColor={darkestColor(palette)}>
				<MiniLoader
					size={24}
					duration={5117}
					rollerColor={darkestColor(palette)}
					trackColors={[palette.colors[0], palette.colors[1], palette.colors[2]]}
					paused={stopped}
				/>
			</AllBlocksItem>
			<AllBlocksItem label="Single Square" textColor={darkestColor(palette)}>
				<SingleSquare size={24} color={palette.colors[1]} paused={stopped} />
			</AllBlocksItem>
		</div>
	)
}

// Both stretchy-circle explorations shown side by side, mirroring the
// adjacent body copy's narrative (built the SVG version first, then
// rewrote it in pure CSS for performance) — same AllBlocksItem layout
// pattern as the Blocks/MiniLoader/SingleSquare comparison above.
const CircleLatency = ({ theme }: { theme: typeof circleLatencyTheme }) => {
	const palette = motionPalette(theme)
	const { stopped } = useDemoMotion()
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
			<AllBlocksItem label="SVG" textColor={darkestColor(palette)}>
				<StretchyCirclesV1 size={90} duration={1200} color={palette.colors[2]} paused={stopped} />
			</AllBlocksItem>
			<AllBlocksItem label="CSS" textColor={darkestColor(palette)}>
				<StretchyCirclesV2
					size={50}
					blur={2}
					contrast={13}
					duration={1200}
					paused={stopped}
				/>
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
				size={70}
				strokeWidth={2}
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
 * Blocks as `paused` so the homepage thumbnail freezes mid-animation
 * instead of swapping to the resting frame.
 */
const ThumbnailBlocks = ({ theme }: { theme: typeof thumbnailTheme }) => {
	const palette = motionPalette(theme)
	const { stopped } = useDemoMotion()
	return <Blocks size={32} duration={3567} colors={palette.colors as [string, string, string, string, string]} paused={stopped} />
}

const ProgressBarDemo = ({ theme }: { theme: typeof progressBarTheme }) => {
	const { stopped } = useDemoMotion()
	return (
		<div style={{ width: '100%', padding: '0 40px', boxSizing: 'border-box', color: motionPalette(theme).colors[2] }}>
			<ProgressBar running paused={stopped} />
		</div>
	)
}

const CopilotLogoDemo = ({ theme }: { theme: typeof logoTheme }) => {
	const palette = motionPalette(theme)
	const { stopped } = useDemoMotion()
	return (
		<div style={{ transform: 'scale(0.45)' }}>
			<LogoFauxCutout
				noBackground
				backgroundColor={palette.background}
				fillColor={palette.colors[2]}
				duration={1000}
				paused={stopped}
			/>
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
		header: 'Copilot latency',
		thumbnail: null,
		demo: (
			<DemoThumbnail theme={thumbnailTheme}>
				<ThumbnailBlocks theme={thumbnailTheme} />
			</DemoThumbnail>
		),
		tags: [TagType.Microsoft, TagType.Copilot, TagType.Motion, TagType.Website],
	},
	content: [
		{
			title: 'Copilot latency',
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
			body: `Latency and loading-state interaction work for Microsoft Copilot. Latency is a large part of how AI products feel: when loading states pop in abruptly, flash too quickly, or have poor performance, the experience feels slower and less polished even when the underlying service time has not changed. This work focused on improving perceived performance through lightweight motion patterns that make the data latency feel responsive without adding unnecessary implementation cost.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, SkillType.Prototyping, TagType.Motion],
				},
			],
			body: `Motion engineering leader for latency and loading states across Microsoft 365 and Copilot. I collaborated with UXE, motion, design, Copilot engineering, and Fluent AI on latency systems. I built motion components, evaluated performance tradeoffs, and shared motion optimization guidance with Fluent design and engineering partners.`,
		},

		{
			header: 'Dynamic action bar (DAB)',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Ryan Gagnier',
				},
			],
		},
		{
			slideshow: {
				width: 1600,
				slides: [
					{
						img: dabPowerPointWeb,
						img2x: dabPowerPointWeb2x,
						caption: 'The DAB (bottom right) in PowerPoint',
					},
					{
						demo: (
							<DemoSlide theme={dabTheme} interactive hasHeader>
								<DABInteractive theme={dabTheme} />
							</DemoSlide>
						),
						caption: 'Demo',
					},
					{
						img: dabWordWeb,
						img2x: dabWordWeb2x,
						caption: 'The DAB (expanded bottom right) in Word',
					},
					{
						img: dabExcelWeb,
						img2x: dabExcelWeb2x,
						caption: 'The DAB (expanded bottom right) in Excel',
					},
				],
			},
		},
		{
			body: `The DAB implementation became a performance investigation into how motion should be built for product UI. I evaluated multiple implementation approaches, compared their rendering cost in browser tooling, and rebuilt the animation around lighter-weight CSS motion. The work helped clarify which animated properties were safe to use, which approaches caused unnecessary layout or paint work, and how to keep a polished latency state performant enough for repeated product use. I also shared the guidance so other teams could apply the same performance lens to their own motion work.`,
		},
		{
			header: 'Blocks latency',
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
			body: `I built lightweight, reusable motion components for Copilot loading and latency indicators. The goal was to give engineers components they could move directly into Fluent AI. Blocks latency added a consistent latency identity that was neutral enough to work across many products and surfaces.`,
		},
		{
			header: 'Circle latency',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Leitin Pedro',
				},
			],
		},
		{
			demo: (
				<Demo theme={circleLatencyTheme} minHeight={160}>
					<CircleLatency theme={circleLatencyTheme} />
				</Demo>
			),
		},
		{
			body: `The stretchy circle latency animation was a useful performance and system-fit exploration. I first built a scalable vector version, then found that the vector filters created main-thread work and were not performant enough for web. I rewrote the animation in pure CSS to reduce JavaScript overhead, improve frame rate, and make the motion more GPU-friendly. The CSS technique had its own tradeoff: it looked best at the smaller size it was designed for, while scaling it up made the softened connection feel less refined. Even though the animation was fun and technically successful, it did not move forward because the stretch behavior was not represented elsewhere in the Copilot motion language and felt less cohesive as a product-wide latency pattern.`,
		},
		{
			body: `That contrast directly informed the adoption of the Blocks latency set. Blocks was stronger as a system because it was not just one expressive loader. It created a family of related latency indicators that could scale across different densities and surfaces while maintaining a consistent visual language across the product.`,
		},
		{
			header: 'Progress bar',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk',
				},
			],
		},
		{
			slideshow: {
				width: 1920,
				slides: [
					{
						img: thinProgressBarContext,
						caption: 'Thin progress bar in context',
					},
					{
						demo: (
							<DemoSlide theme={progressBarTheme} hasHeader>
								<ProgressBarDemo theme={progressBarTheme} />
							</DemoSlide>
						),
						caption: 'Demo',
					},
				],
			},
		},
		{
			body: `I worked on several progress bars throughout Copilot's lifetime. The first was a thin, ambient progress indicator that replaced stale skeleton UI in conversation loading states. This was part of a broader effort to reduce loading surfaces that flashed briefly, popped in at the wrong moment, or made Copilot feel less polished. I built the replacement on top of Fluent's ProgressBar for consistency and accessibility, then adjusted the visual treatment so the bar had softer edges.<br /><br />A second bouncy loader was added to a Copilot splash screen. The animation speed scales to the width of its container so perceived motion speed reads consistently across layouts.`,
		},
		{
			header: 'Copilot logo solutions',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'David Park',
				},
			],
		},
		{
			slideshow: {
				width: 900,
				slides: [
					{
						img: copilotLogoScreenshot,
						img2x: copilotLogoScreenshot2x,
						caption: 'Latency logo in product',
					},
					{
						demo: (
							<DemoSlide theme={logoTheme} hasHeader>
								<CopilotLogoDemo theme={logoTheme} />
							</DemoSlide>
						),
						caption: 'Simplified CSS solution',
					},
				],
			},
		},
		{
			body: `The MAI motion design team brought me in to evaluate whether the new Copilot logo thinking-state animation could ship, and what implementation approach would make sense. I built and compared CSS and JavaScript versions, focusing on the center cutout, animated corners, runtime cost, and fidelity at the logo's real display size. I also consulted with the engineer that built the motion into the product. The CSS version explored a simpler solution: at small scale, some path detail and corner-radius differences were much less perceptible, so a lighter implementation could deliver a similar user-facing effect with lower complexity. This became a useful tradeoff study in fidelity, performance, and implementation simplicity.`,
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
					body: 'Andrew Falk, Ryan Gagnier, Leitin Pedro, David Park',
				},
			],
		},
	],
}
