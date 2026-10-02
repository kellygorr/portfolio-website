import { IProject, TagType, SkillType, FileType, SectionName, HighlightName } from '../IProject'
import { formatMonthYear, formatMonthYearRange } from '../../utils/dateFormat'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/figma-focus-order-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/figma-focus-order-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/figma-focus-order-thumbnail.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/figma-focus-order-thumbnail-2.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/figma-focus-order-thumbnail-2.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/figma-focus-order-thumbnail-2.jpg', import.meta.url).href

const thumbnail3x1 = new URL('../../assets/thumbnails/x1/figma-focus-order-thumbnail-3.jpg', import.meta.url).href
const thumbnail3x15 = new URL('../../assets/thumbnails/x15/figma-focus-order-thumbnail-3.jpg', import.meta.url).href
const thumbnail3x2 = new URL('../../assets/thumbnails/x2/figma-focus-order-thumbnail-3.jpg', import.meta.url).href

const thumbnail4x1 = new URL('../../assets/thumbnails/x1/figma-focus-order-thumbnail-4.jpg', import.meta.url).href
const thumbnail4x15 = new URL('../../assets/thumbnails/x15/figma-focus-order-thumbnail-4.jpg', import.meta.url).href
const thumbnail4x2 = new URL('../../assets/thumbnails/x2/figma-focus-order-thumbnail-4.jpg', import.meta.url).href

const thumbnail5x1 = new URL('../../assets/thumbnails/x1/figma-focus-order-thumbnail-5.jpg', import.meta.url).href
const thumbnail5x15 = new URL('../../assets/thumbnails/x15/figma-focus-order-thumbnail-5.jpg', import.meta.url).href
const thumbnail5x2 = new URL('../../assets/thumbnails/x2/figma-focus-order-thumbnail-5.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/figma-focus-order/figma-focus-order-01.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/figma-focus-order/figma-focus-order-02.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/figma-focus-order/figma-focus-order-03.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/figma-focus-order/figma-focus-order-04.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/figma-focus-order/figma-focus-order-05.jpg', import.meta.url).href
const img8 = new URL('../../assets/images/figma-focus-order/figma-focus-order-06.jpg', import.meta.url).href
const img9 = new URL('../../assets/images/figma-focus-order/figma-focus-order-07.jpg', import.meta.url).href
const img10 = new URL('../../assets/images/figma-focus-order/figma-focus-order-08.jpg', import.meta.url).href
const img11 = new URL('../../assets/images/figma-focus-order/figma-focus-order-09.jpg', import.meta.url).href
const img12 = new URL('../../assets/images/figma-focus-order/figma-focus-order-10.png', import.meta.url).href

const video1 = new URL('../../assets/videos/figma-focus-order/figma-focus-order-10.mp4', import.meta.url).href
const video2 = new URL('../../assets/videos/figma-focus-order/figma-focus-order-11.mp4', import.meta.url).href

export const focusOrder: IProject = {
	details: {
		header: 'Accessibility Assistant',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Tooling],
	},
	content: [
		{
			title: 'Accessibility Assistant',
		},
		{
			slideshow: {
				width: 1735,
				slides: [
					{
						img: img12,
						caption: 'Accessibility Assistant product page',
					},
				],
			},
		},
		{
			header: SectionName.URL,
			body: '[ <a href="https://www.figma.com/community/plugin/731310036968334777/accessibility-assistant">https://www.figma.com/community/plugin/731310036968334777/accessibility-assistant</a> ]',
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Dates,
					body: formatMonthYearRange('May', 2024, 'May', 2025),
				},
			],
			body: `Accessibility Assistant began as the Focus Order plugin, a public Figma accessibility tool I rebuilt and expanded as the engineering lead. As the project evolved into Accessibility Assistant, my later role focused on release support, contributor mentorship, and implementation guidance. The plugin grew to 34K+ downloads, was used in Microsoft accessibility training, and was recognized by Microsoft accessibility leadership.`,
		},
		{
			body: `The work below focuses on the Focus Order foundation I built before the plugin expanded into the broader Accessibility Assistant experience.`,
		},
		{
			title: 'Focus Order Plugin',
		},
		{
			slideshow: {
				width: 1735,
				slides: [
					{
						img: img5,
						caption: 'Community page',
					},
					{
						img: img8,
						caption: 'Annotations and Readout',
					},
					{
						img: img11,
						caption: 'Multiple annotation sets',
					},
					{
						img: img9,
						caption: 'Home view and sorting',
					},
					{
						img: img10,
						caption: 'List view and edit screens',
					},
					{
						img: img4,
						caption: 'FRE with Lottie animations',
						file: {
							type: FileType.Video,
							source: video1,
						},
					},
					{
						img: img7,
						caption: 'Original plugin',
					},
					{
						img: img1,
						caption: 'Plugin V1',
					},
					{
						img: img6,
						caption: 'Plugin V1 - Demo',
						file: {
							type: FileType.Video,
							source: video2,
						},
					},
				],
			},
		},
		{
			header: SectionName.Accessibility,
			body: `Microsoft's Focus Order is a plugin for Figma that allows designers to build accessibility for assitive technology into their designs.  It is publicly available to the figma community.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.HTML, SkillType.CSS, SkillType.UIUX],
				},
			],
			body: `I partnered with the a11y team to redesign the Focus Order plugin and expand its capabilities.  I rebuilt the plugin in React and added new features including: 
			1) Edit screen to add roles, properties, and comments on each annotation 2) First Run Experience tutorial for new plugin users 3) Auto load user annotations when plugin launches 4) A readout of the annotation details so users can see them without having to download the plugin`,
		},
		{
			body: `For many years I continued to work with a designer to add more features to the plugin, even though it was no longer a core project.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Figma],
				},
				{
					header: HighlightName.Dates,
					body: formatMonthYearRange('Sep', 2020, 'May', 2024),
				},
				{
					header: HighlightName.Designer,
					body: 'Ben Truelove, Damien Aistrope',
				},
				{
					header: HighlightName.Illustrator,
					body: 'Jason Custer, Nando Costa',
				},
				{
					header: HighlightName.Motion,
					body: 'Chris Lorance',
				},
				{
					header: HighlightName.Engineer,
					body: 'Tiffany Chen (original plugin)',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
			],
		},
		{
			header: SectionName.Hype,
			attachments: [
				{
					header: `Microsoft Design Twitter`,
					thumbnail: {
						x1: thumbnail2x1,
						x15: thumbnail2x15,
						x2: thumbnail2x2,
					},
					file: {
						type: FileType.Link,
						source: 'https://twitter.com/MicrosoftDesign/status/1304072149334925314',
					},
				},
				{
					header: `microsoft.design Instagram`,
					thumbnail: {
						x1: thumbnail3x1,
						x15: thumbnail3x15,
						x2: thumbnail3x2,
					},
					file: {
						type: FileType.Link,
						source: 'https://www.instagram.com/p/CE9dP0ml_Ib/',
					},
				},
				{
					header: `10 Figma accessibility plugins that make up for the lack of inbuilt options`,
					thumbnail: {
						x1: thumbnail4x1,
						x15: thumbnail4x15,
						x2: thumbnail4x2,
					},
					file: {
						type: FileType.Link,
						source: 'https://blog.logrocket.com/ux-design/10-figma-accessibility-plugins/#a11y-focus-order',
					},
				},
				{
					header: `Free Figma Plugins for Accessibility Design`,
					thumbnail: {
						x1: thumbnail5x1,
						x15: thumbnail5x15,
						x2: thumbnail5x2,
					},
					file: {
						type: FileType.Link,
						source: 'https://www.kalamuna.com/blog/free-figma-plugins-accessibility-design',
					},
				},
			],
		},
	],
}
