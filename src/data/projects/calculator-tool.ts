import { IProject, TagType, SkillType, HighlightName, SectionName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/calc.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/calc.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/calc.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/calculator-tool/itemcalc1.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/calculator-tool/itemcalc2.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/calculator-tool/itemcalc3.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/calculator-tool/itemcalc4.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/calculator-tool/itemcalc5.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/calculator-tool/itemcalc7.jpg', import.meta.url).href

export const calculatorTool: IProject = {
	details: {
		header: 'Calculator Tool',
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
			body: "This is an internal tool that I designed and built to help calculate/estimate the amount of pop-in items that can be added to the [ <a href='interactive-video-playlist'>interactive video playlist</a> ].  To help navigate the tool I included a ‘fishBot’ guide to give the user feedback, and to show the user an instruction page when clicked.  The tool also has error messaging so that the user includes all the required fields, and more prominent messaging when the user divides be zero or does other impossible calculations. As an unexpected twist for my teammates, I gave the fishBot a bad attitude to add some humor to the calculator.  If the user takes too long on the calculator page, the fish will die from boredom and have to be revived with a click.  Eventually the fishBot will not respond and will no longer help the user.",
		},

		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Web],
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
