import { HighlightName, IProject, SectionName, SkillType, TagType, ToolType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/k-monogram-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/k-monogram-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/k-monogram-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/k-monogram/k-monogram-01.jpg', import.meta.url).href

export const kMonogram: IProject = {
	details: {
		header: 'K monogram',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Design],
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
			body: 'I designed a K monogram.',
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
				{
					header: HighlightName.Designer,
					body: 'Kelly Gorr',
				},
			],
		},
	],
}
