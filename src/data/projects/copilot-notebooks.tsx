import { FileType, HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { Demo } from '../../components/Page/Demo'
import { DemoThumbnail } from '../../components/shared'
import { SeeMorePillButtonMotion } from '../../../stories/SeeMorePillMotion/SeeMorePillButtonMotion'
import { SeeMorePillStagger } from '../../../stories/SeeMorePillMotion/SeeMorePillStagger'
import { randomMotionPaletteNames, motionPalette } from '../../styles/motionPalettes'
import type { MotionPaletteName } from '../../styles/motionPalettes'
import { formatYear } from '../../utils/dateFormat'

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
						caption: 'Product video: Notebooks collapse and expand motion',
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
			body: `Product UI and interaction work for Notebooks in Microsoft 365 Copilot. This page is a placeholder for two related pieces of work: the Notebooks chat list update and the collapse/expand motion prototype for the Notebooks creation surface.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, SkillType.Prototyping],
				},
			],
			body: `The chat list work was mostly a focused UI update, but it also required product integration details such as preview-text fallback behavior, localized date formatting, pagination considerations, and Storybook coverage. The collapse/expand motion work belongs in the Storybook portion of this portfolio because it is easier to evaluate as an interactive motion/component demo than as static screenshots.`,
		},
		{
			header: 'Chat list UI',
			body: `Placeholder for the updated Notebooks chat list design. Add before/after screenshots from PR 5721756 and keep the description focused: simple UI update, Storybook coverage, preview-text fallback logic, date formatting, and pagination-aware list motion.`,
		},
		{
			header: 'Collapse and expand motion',
		},
		{
			demo: (
				<Demo theme={pillMotionTheme} minHeight={620} interactive>
					<PillMotionDemo theme={pillMotionTheme} />
				</Demo>
			),
		},
		{
			body: `This motion recreates the Maker Space "See more" pill button expand/collapse behavior: additional creation options fade in with a stagger, fade out together, and the lower content (recent files list) uses a FLIP translateY transition so it slides into place instead of jumping when the grid expands or collapses. Click "See more" below to try it.`,
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
					body: formatYear(2026),
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
			],
		},
	],
}
