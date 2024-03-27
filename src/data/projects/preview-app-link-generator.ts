import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/link-generator.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/link-generator.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/link-generator.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/preview-app-link-generator/previewApp1.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/preview-app-link-generator/previewApp4.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/preview-app-link-generator/previewApp6.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/preview-app-link-generator/previewApp3.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/preview-app-link-generator/previewApp2.jpg', import.meta.url).href

export const previewAppLinkGenerator: IProject = {
	details: {
		header: 'Video App Link Generator',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Tooling],
	},
	content: [
		{
			slideshow: {
				width: 1000,
				slides: [
					{
						img: img1,
						caption: 'Starting screen',
					},
					{
						img: img2,
						caption: 'Error messages are included to help users include all the required information',
					},
					{
						img: img3,
						caption: 'Link generated successfully',
					},
					{
						img: img4,
						caption: 'Information section',
					},
					{
						img: img5,
						caption: 'Just for fun',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'This tool creates a link that is used on the Xbox One to launch and play videos with the Xbox’s video player (the Preview App).  The tool can string together multiple videos to play in a row and add video titles, CTA buttons, and redirect links.',
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design, SkillType.AngularJS, SkillType.JQuery, SkillType.JSON, SkillType.HTML, SkillType.CSS],
				},
			],
			body: "I was in charge of designing and creating the tool.  In the original version I used AngularJS's two-way data binding so the user could live-edit and create the link (This version is available to test below). In the final version I removed the live-edit functionality and instead used a ‘generate link’ button, because I didn't want users to have access to an unfinished link.  Details from the original app have been altered or removed.",
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Web],
				},
				{
					header: HighlightName.Designer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
			],
		},
	],
}
