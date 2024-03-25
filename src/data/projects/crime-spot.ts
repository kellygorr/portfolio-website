import { IProject, FileType, TagType, ToolType, SectionName, HighlightName, SkillType } from '../IProject'

const thumbnail = 'crime-spot.jpg'
const thumbnail2 = 'crime-spot-pdf.jpg'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'crime-spot/crimespot_1.png'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + 'crime-spot/crimespot_2.png'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + 'crime-spot/crimespot_3.png'

const pdf1 = import.meta.env.VITE_IMAGE_URL_SRC + 'crime-spot/kelly_gorr_web_integration.pdf'
export const crimeSpot: IProject = {
	details: {
		header: 'Crime Spot',
		thumbnail: thumbnail,
		tags: [TagType.Website, TagType.Mobile],
	},
	content: [
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img1,
						caption: 'Mobile and web',
					},
					{
						img: img2,
						caption: 'Start, settings, and map screens',
					},
					{
						img: img3,
						caption: "Map filtered by 'assualt' and 'homicide', map with selection, and news details",
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'Mobile/web design for an entertainment app that allows people to track real life homicides and other violent crime in their city.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design],
				},
				{
					header: HighlightName.Tools,
					tags: [ToolType.Illustrator, ToolType.Photoshop, ToolType.InDesign],
				},
			],
		},
		{
			header: 'Project Statement',
			attachments: [
				{
					header: 'Web/Mobile Integration PDF',
					thumbnail: thumbnail2,
					file: {
						type: FileType.Pdf,
						source: pdf1,
					},
				},
			],
		},
	],
}
