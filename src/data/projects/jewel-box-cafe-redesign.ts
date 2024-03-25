import { IProject, FileType, TagType, SkillType, ToolType, SectionName, HighlightName } from '../IProject'

const thumbnail = 'jewelbox.jpg'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'jewel-box-cafe-redesign/large5.jpg'

export const jewelBoxCafe: IProject = {
	details: {
		header: 'Jewel Box Cafe Re-Imagine',
		thumbnail: thumbnail,
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
