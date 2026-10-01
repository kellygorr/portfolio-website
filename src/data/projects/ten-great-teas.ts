import { HighlightName, IProject, SectionName, SkillType, TagType, ToolType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/ten-great-teas-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/ten-great-teas-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/ten-great-teas-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/ten-great-teas/ten-great-teas-01.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/ten-great-teas/ten-great-teas-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/ten-great-teas/ten-great-teas-03.jpg', import.meta.url).href

export const tenGreatTeas: IProject = {
	details: {
		header: 'Ten Great Teas',
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
						caption: 'Main screen',
					},
					{
						img: img2,
						caption: 'Main screen with selected state',
					},
					{
						img: img3,
						caption: 'Tea details screen',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'I designed the interface for an interactive tea map for Tazo tea.',
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
