import { IProject, FileType, TagType, ToolType, SectionName, HighlightName, SkillType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/malaria.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/malaria.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/malaria.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/malaria-pdf.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/malaria-pdf.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/malaria-pdf.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/malaria-infographic/large4a.jpg', import.meta.url).href
const pdf = new URL('../../assets/images/malaria-infographic/research_based_design.pdf', import.meta.url).href

export const malariaInfographic: IProject = {
	details: {
		header: 'Malaria Infographic',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Infographic],
	},
	content: [
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img1,
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'Malaria infographic design.',
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
					tags: [ToolType.Illustrator],
				},
			],
		},
		{
			header: 'Project Statement',
			attachments: [
				{
					header: 'Research Based Design PDF',
					thumbnail: {
						x1: thumbnail2x1,
						x15: thumbnail2x15,
						x2: thumbnail2x2,
					},
					file: {
						type: FileType.Pdf,
						source: pdf,
					},
				},
			],
		},
	],
}
