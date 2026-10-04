import { IProject, FileType, TagType, ToolType, SectionName, HighlightName, SkillType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/crime-spot-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/crime-spot-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/crime-spot-thumbnail.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/crime-spot-thumbnail.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/crime-spot-thumbnail.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/crime-spot-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/crime-spot/crime-spot-01.png', import.meta.url).href
const img2 = new URL('../../assets/images/crime-spot/crime-spot-02.png', import.meta.url).href
const img3 = new URL('../../assets/images/crime-spot/crime-spot-03.png', import.meta.url).href

const pdf1 = new URL('../../assets/images/crime-spot/crime-spot-04.pdf', import.meta.url).href

export const crimeSpot: IProject = {
	details: {
		header: 'Crime spot',
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
			body: 'I designed a mobile/web entertainment app that allows people to track real life homicides and other violent crime in their city.',
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
				{
					header: HighlightName.Designer,
					body: 'Kelly Gorr',
				},
			],
		},
		{
			header: 'Project statement',
			attachments: [
				{
					header: 'Web/mobile integration PDF',
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
