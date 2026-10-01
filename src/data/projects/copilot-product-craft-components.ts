import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { formatYearRange } from '../../utils/dateFormat'

const placeholderThumbnailx1 = new URL('../../assets/thumbnails/x1/placeholder-thumbnail.svg', import.meta.url).href
const placeholderThumbnailx15 = new URL('../../assets/thumbnails/x15/placeholder-thumbnail.svg', import.meta.url).href
const placeholderThumbnailx2 = new URL('../../assets/thumbnails/x2/placeholder-thumbnail.svg', import.meta.url).href

export const copilotProductCraftComponents: IProject = {
	details: {
		header: 'Copilot Product Craft & Components',
		thumbnail: {
			x1: placeholderThumbnailx1,
			x15: placeholderThumbnailx15,
			x2: placeholderThumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Copilot, TagType.Website],
	},
	content: [
		{
			title: 'Copilot Product Craft & Components',
		},
		{
			header: SectionName.Overview,
			body: `Non-motion Copilot product work across Microsoft 365 Chat and related Copilot surfaces. This page is a placeholder for product craft, component architecture, accessibility fixes, loading-state improvements, and menu/input behavior that do not need to live inside a motion-specific case study.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.CSS, SkillType.UIUX],
				},
			],
			body: `I contributed product-quality improvements across Copilot by translating design intent into production UI, fixing interaction bugs, improving component behavior, and resolving accessibility or focus issues that affected real user flows.`,
		},
		{
			header: 'Input, footer, and overlay menu systems',
			body: `Placeholder for Bebop input and overlay-menu work: capabilities and sources menus, input menu styling, footer architecture, background interaction fixes, submenu navigation fixes, and focus behavior for agent/menu flows.`,
		},
		{
			header: 'Accessibility and navigation fixes',
			body: `Placeholder for high-signal accessibility/product fixes, including the chat settings keyboard focus fix and the left-nav restore bug where closing a page reopened a nav the user had intentionally collapsed.`,
		},
		{
			header: 'Loading and visual consistency',
			body: `Placeholder for non-motion framing of loading-state and craft updates: replacing skeleton UI where it flashed unnecessarily, updating the indeterminate progress component, formatting toolbar style and tooltip fixes, Core10+ icon updates, and other polish work that improved consistency across Copilot.`,
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
			],
		},
	],
}
