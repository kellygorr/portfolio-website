import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { formatYear } from '../../utils/dateFormat'

const placeholderThumbnailx1 = new URL('../../assets/thumbnails/x1/placeholder-thumbnail.svg', import.meta.url).href
const placeholderThumbnailx15 = new URL('../../assets/thumbnails/x15/placeholder-thumbnail.svg', import.meta.url).href
const placeholderThumbnailx2 = new URL('../../assets/thumbnails/x2/placeholder-thumbnail.svg', import.meta.url).href

export const copilotNotebooks: IProject = {
	details: {
		header: 'Notebooks in Copilot',
		thumbnail: {
			x1: placeholderThumbnailx1,
			x15: placeholderThumbnailx15,
			x2: placeholderThumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Copilot, TagType.Website],
	},
	content: [
		{
			title: 'Notebooks in Copilot',
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
			body: `Placeholder for the Storybook demo from copilot-motion-POR: SeeMorePillButtonMotion. This demo shows the Maker Space "See more" pill button expand/collapse behavior, including staggered additional items, reduced-motion support, and a FLIP translateY transition so lower content slides instead of jumping.`,
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
