import { IProject, FileType, TagType, ToolType, SectionName, HighlightName, SkillType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/crime-spot.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/crime-spot.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/crime-spot.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/crime-spot.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/crime-spot.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/crime-spot.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/crime-spot/crimespot_1.png', import.meta.url).href
const img2 = new URL('../../assets/images/crime-spot/crimespot_2.png', import.meta.url).href
const img3 = new URL('../../assets/images/crime-spot/crimespot_3.png', import.meta.url).href

const pdf1 = new URL('../../assets/images/crime-spot/kelly_gorr_web_integration.pdf', import.meta.url).href

export const crimeSpot: IProject = {
	details: {
		header: 'Crime Spot',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
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
					thumbnail: {
						x1: thumbnail2x1,
						x15: thumbnail2x15,
						x2: thumbnail2x2,
					},
					file: {
						type: FileType.Pdf,
						source: pdf1,
					},
				},
			],
		},
	],
}
