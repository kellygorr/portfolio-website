import { IProject, TagType, SkillType, FileType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/focus-order.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/focus-order.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/focus-order.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/focus-order-twitter.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/focus-order-twitter.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/focus-order-twitter.jpg', import.meta.url).href

const thumbnail3x1 = new URL('../../assets/thumbnails/x1/focus-order-instagram.jpg', import.meta.url).href
const thumbnail3x15 = new URL('../../assets/thumbnails/x15/focus-order-instagram.jpg', import.meta.url).href
const thumbnail3x2 = new URL('../../assets/thumbnails/x2/focus-order-instagram.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/focus-order/1.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/focus-order/3.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/focus-order/4.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/focus-order/video1thumb2.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/focus-order/video2thumb2.jpg', import.meta.url).href
const img8 = new URL('../../assets/images/focus-order/v2/v2-1.jpg', import.meta.url).href
const img9 = new URL('../../assets/images/focus-order/v2/v2-2.jpg', import.meta.url).href
const img10 = new URL('../../assets/images/focus-order/v2/v2-3.jpg', import.meta.url).href
const img11 = new URL('../../assets/images/focus-order/v2/v2-4.jpg', import.meta.url).href

const video1 = new URL('../../assets/videos/focus-order/v2/v2-video.mp4', import.meta.url).href
const video2 = new URL('../../assets/videos/focus-order/sizedvid2.mp4', import.meta.url).href

export const focusOrder: IProject = {
	details: {
		header: 'Figma Focus Order',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Tooling],
	},
	content: [
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
			header: SectionName.URL,
			body: '<a href="https://www.figma.com/community/plugin/731310036968334777/A11y---Focus-order">https://www.figma.com/community/plugin/731310036968334777/A11y---Focus-order</a>',
		},
		{
			header: SectionName.Accessibility,
			body: `Microsoft's Focus Order is a plugin for Figma that allows designers to build accessibility into their designs.  It is publicly available to the figma community.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.HTML, SkillType.CSS, SkillType.UIUX],
				},
			],
			body: `My team and I partnered with the a11y team to redesign the Focus Order plugin and expand its capabilities.  I rebuilt the plugin in React and added new features including: 
			1) Edit screen to add roles, properties, and comments on each annotation 2) First Run Experience tutorial for new plugin users 3) Auto load user annotations when plugin launches 4) A readout of the annotation details so users can see them without having to download the plugin`,
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
					body: 'Sept. 2020 - Present',
				},
				{
					header: HighlightName.Designer,
					body: 'Damien Aistrope, Ben Truelove',
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
					header: `Original plugin ${HighlightName.Engineer}`,
					body: 'Tiffany Chen',
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
			],
		},
	],
}
