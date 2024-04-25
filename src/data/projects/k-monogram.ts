import { HighlightName, IProject, SectionName, SkillType, ToolType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/monogram.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/monogram.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/monogram.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/k-monogram/large6.jpg', import.meta.url).href

export const kMonogram: IProject = {
	details: {
		header: 'K Monogram',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
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
			body: 'K monogram design',
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
	],
}
