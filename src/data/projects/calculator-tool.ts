import { IProject, TagType, SkillType, HighlightName, SectionName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/calculator-tool-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/calculator-tool-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/calculator-tool-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/calculator-tool/calculator-tool-01.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/calculator-tool/calculator-tool-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/calculator-tool/calculator-tool-03.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/calculator-tool/calculator-tool-04.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/calculator-tool/calculator-tool-05.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/calculator-tool/calculator-tool-06.jpg', import.meta.url).href

export const calculatorTool: IProject = {
	details: {
		header: 'Calculator tool',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Tooling, TagType.Website],
	},
	content: [
		{
			slideshow: {
				width: 1100,
				slides: [
					{
						img: img1,
					},
					{
						img: img2,
					},
					{
						img: img3,
					},
					{
						img: img4,
						caption: 'Items successfully calculated',
					},
					{
						img: img5,
						caption: 'One of the error messages',
					},
					{
						img: img6,
						caption: 'Some messages from the fish',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: "This is an internal tool that I designed and built to help calculate/estimate the amount of pop-in items that can be added to the [ <a href='interactive-video-playlist'>interactive video playlist</a> ]. The tool added required-field validation and guardrails for impossible calculations. I also added a fishBot guide to provide lightweight instructions and feedback inside the tool.",
		},

		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Website],
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design, SkillType.UIUX, SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
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
