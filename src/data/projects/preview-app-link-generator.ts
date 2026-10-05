import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/preview-app-link-generator-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/preview-app-link-generator-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/preview-app-link-generator-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/preview-app-link-generator/preview-app-link-generator-01.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/preview-app-link-generator/preview-app-link-generator-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/preview-app-link-generator/preview-app-link-generator-03.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/preview-app-link-generator/preview-app-link-generator-04.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/preview-app-link-generator/preview-app-link-generator-05.jpg', import.meta.url).href

export const previewAppLinkGenerator: IProject = {
	details: {
		header: 'Video app link generator',
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
			body: 'I designed and built an internal tool that generated Xbox One Preview App links for video launches. The tool could be used for a single video, but it was most useful for helping teammates assemble multi-video collections that could play together. The app helped them connect videos with titles, CTA buttons, and redirect behavior more accurately, reducing the chance of malformed links.',
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design, SkillType.AngularJS, SkillType.JQuery, SkillType.JSON, SkillType.HTML, SkillType.CSS],
				},
			],
			body: 'I designed and built the tool, including validation states and error messaging for required information. In an early version, users could live-edit the generated link as they worked. I removed that behavior in the final version and replaced it with a generate action, so users would not copy or use an unfinished link before all required fields were valid.',
			imagesRecreated: true,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Website],
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
