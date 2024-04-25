import { IProject, TagType, SkillType, FileType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/mental-health-cognition-plugin.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/mental-health-cognition-plugin.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/mental-health-cognition-plugin.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/mental-health-cognition-plugin-article1.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/mental-health-cognition-plugin-article1.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/mental-health-cognition-plugin-article1.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/mental-health-and-cognition-plugin/community-page.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/mental-health-and-cognition-plugin/example1.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/mental-health-and-cognition-plugin/cards.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/mental-health-and-cognition-plugin/ai-section.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/mental-health-and-cognition-plugin/color-section.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/mental-health-and-cognition-plugin/share-learn-section.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/mental-health-and-cognition-plugin/fre.jpg', import.meta.url).href

const img8 = new URL('../../assets/images/mental-health-and-cognition-plugin/video-thumbnail.jpg', import.meta.url).href
const video1 = new URL('../../assets/videos/mhc-plugin.mp4', import.meta.url).href

export const mhcPlugin: IProject = {
	details: {
		header: 'Mental Health & Cognition Plugin',
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
						img: img1,
						caption: 'Community page',
					},
					{
						img: img2,
						caption: 'Drag/drop guidance cards from the plugin to your design',
					},
					{
						img: img8,
						caption: 'Drag and drop video from FRE ',
						file: {
							type: FileType.Video,
							source: video1,
						},
					},
					{
						img: img3,
						caption: 'More guidance cards',
					},
					{
						img: img4,
						caption: 'AI assistants section in plugin',
					},
					{
						img: img5,
						caption: 'Color section in plugin',
					},
					{
						img: img6,
						caption: 'Share and learn tabs',
					},
					{
						img: img7,
						caption: 'FRE',
					},
				],
			},
		},
		{
			header: SectionName.URL,
			body: '<a href="https://www.figma.com/community/plugin/1268611308971699930/mental-health-cognition-plugin">https://www.figma.com/community/plugin/1268611308971699930/mental-health-cognition-plugin</a>',
		},
		{
			header: SectionName.Accessibility,
			body: `Microsoft's Mental Health and Cognition Plugin (for Figma) allows designers to learn more about how they can reduce cognitive demands and distractions in their designs in order to help customers.  The plugin also provides informational cards that can be used to give feedback on a design.  It was released at Ability Summit 2024, and it is publicly available to the figma community.`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.TypeScript, SkillType.React, SkillType.HTML, SkillType.CSS, SkillType.UIUX],
				},
			],
			body: `The plugin was launched as a companion to the mental health toolkits.  The toolkits were a multi-year effort by the a11y team to extend Microsoft's accessibility framework into mental health and are available at <a href="https://inclusive.microsoft.design/">https://inclusive.microsoft.design/</a>.  I built the plugin and provided UX feedback to the designers because I understand the strenghts and limitations of figma plugins.`,
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
					body: 'Mar. 2024 - Present',
				},
				{
					header: HighlightName.Designer,
					body: 'Ali Benter, Amanda Poh, Will Brennan, Amanda Yang',
				},
				{
					header: HighlightName.Content_Designer,
					body: 'Tany Holzworth',
				},
				{
					header: HighlightName.Motion,
					body: 'Brandon Foy, Will Brennan',
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
					header: `Inclusive Design’s next wave breaks for mental health`,
					thumbnail: {
						x1: thumbnail2x1,
						x15: thumbnail2x15,
						x2: thumbnail2x2,
					},
					file: {
						type: FileType.Link,
						source: 'https://microsoft.design/articles/inclusive-design-s-next-wave-breaks-for-mental-health',
					},
				},
			],
		},
	],
}
