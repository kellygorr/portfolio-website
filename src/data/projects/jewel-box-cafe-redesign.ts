import { IProject, TagType, SkillType, ToolType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/jewel-box-cafe-redesign-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/jewel-box-cafe-redesign-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/jewel-box-cafe-redesign-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/jewel-box-cafe-redesign/jewel-box-cafe-redesign-01.jpg', import.meta.url).href

export const jewelBoxCafe: IProject = {
	details: {
		header: 'Jewel Box Cafe re-imagine',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Website],
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
			body: 'Website re-imagined with smooth scroll navigation',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design, SkillType.JavaScript, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Tools,
					tags: [ToolType.Illustrator],
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
