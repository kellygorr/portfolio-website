import { FileType, HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { DemoThumbnail } from '../../components/shared'
import { SeeMorePillButtonMotion } from '../../../stories/SeeMorePillMotion/SeeMorePillButtonMotion'
import { SeeMorePillStagger } from '../../../stories/SeeMorePillMotion/SeeMorePillStagger'
import { randomMotionPaletteNames, motionPalette } from '../../styles/motionPalettes'
import type { MotionPaletteName } from '../../styles/motionPalettes'
import { formatMonthYear } from '../../utils/dateFormat'

// Randomized once per page load, same convention as other project pages with in-page motion demos.
const [pillMotionTheme, thumbnailTheme] = randomMotionPaletteNames(2)
const videoChatList = new URL('../../assets/videos/copilot-notebooks/copilot-notebooks-01.mp4', import.meta.url).href
const videoPoster = new URL('../../assets/images/copilot-notebooks/copilot-notebooks-01.jpg', import.meta.url).href

/**
 * Live embed of the See More Pill Button Motion Storybook story — the
 * real Maker Space "See more" expand/collapse behavior (staggered
 * additional-tile fade-in, FLIP-animated lower content). The toggle
 * still works for manual clicking, but the component also runs a
 * scripted replay (expand, hold, auto-collapse) driven by Demo's
 * restart icon / auto-run-on-scroll-into-view — so it's embedded as
 * plain `interactive` (no `hideRestartIcon`), same as any other
 * scripted-sequence demo (GroundingMenu, Input Position).
 */
const PillMotionDemo = ({ theme }: { theme: MotionPaletteName }) => {
	const palette = motionPalette(theme)
	return <SeeMorePillButtonMotion palette={palette} />
}

const ThumbnailPillStagger = ({ theme }: { theme: typeof thumbnailTheme }) => {
	const palette = motionPalette(theme)
	return (
		<div style={{ width: '100%', height: '100%', alignSelf: 'flex-start', paddingTop: 20, overflow: 'hidden' }}>
			<SeeMorePillStagger palette={palette} autoPlay compact />
		</div>
	)
}

export const copilotNotebooks: IProject = {
	details: {
		header: 'Notebooks in Copilot',
		thumbnail: null,
		demo: (
			<DemoThumbnail theme={thumbnailTheme}>
				<ThumbnailPillStagger theme={thumbnailTheme} />
			</DemoThumbnail>
		),
		tags: [TagType.Microsoft, TagType.Copilot, TagType.Website],
	},
	content: [
		{
			title: 'Notebooks in Copilot',
		},
		{
			slideshow: {
				width: 1600,
				slides: [
					{
						img: videoPoster,
						caption: 'New chat list (center) with content panel motion (right)',
						file: {
							type: FileType.Video,
							source: videoChatList,
						},
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: `Product UI and interaction work for Notebooks in Microsoft 365 Copilot. I was brought in for a focused two-week craft push to improve product quality across the Notebooks experience, build new components, update UI, and refine the content panel with motion.`,
		},
		{
			header: 'Chat list',
			body: `I added the new Notebooks chat list design to product, replacing the previous chat history list. The work included staggered list motion with pagination-aware behavior, preview text, and preview-text fallback logic for in-progress chat response states that do not contain usable display text.`,
		},
		{
			header: 'Notebook content panel motion',
			highlight: [
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk, Kelly Gorr',
				},
			],
		},
		{
			demo: (
				<Demo theme={pillMotionTheme} minHeight={620} interactive allowRestartWhileRunning>
					<PillMotionDemo theme={pillMotionTheme} />
				</Demo>
			),
		},
		{
			body: `I built the motion for the Notebooks content panel, where the "See more" interaction expands the tile grid and moves the content list below it. The work included the button animation and the content panel transition. As I worked through the interaction, I added the safeguards needed to keep the motion stable in real product conditions: reserved space for suggested content that lazy-loads into the panel, and layout-aware motion so the content list could animate to the correct position even as new content appeared. When the target position changed during the animation, the motion retargeted and adjusted its easing so the transition stayed smooth instead of snapping.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Copilot, TagType.Website],
				},
				{
					header: HighlightName.Date,
					body: formatMonthYear('Sep', 2026),
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, TagType.Motion],
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Motion_Designer,
					body: 'Andrew Falk, Kelly Gorr',
				},
			],
		},
	],
}
