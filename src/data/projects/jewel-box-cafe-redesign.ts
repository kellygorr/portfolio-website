import { IProject, FileType, TagType, SkillType, ToolType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/jewelbox.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/jewelbox.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/jewelbox.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/jewel-box-cafe-redesign/large5.jpg', import.meta.url).href

export const jewelBoxCafe: IProject = {
	details: {
		header: 'Jewel Box Cafe Re-Imagine',
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
						file: {
							type: FileType.Link,
							source: 'sites/type_website/',
						},
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'Website re-imagined and smooth scroll navigation demo',
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
			],
		},
	],
}
