import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/billboard-generator.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/billboard-generator.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/billboard-generator.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/xbox-billboard-generator/billGen0.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/xbox-billboard-generator/billGen2.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/xbox-billboard-generator/billGen3.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/xbox-billboard-generator/billGen4.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/xbox-billboard-generator/billGen5.jpg', import.meta.url).href

export const xboxBillboardGenerator: IProject = {
	details: {
		header: 'Xbox Billboard Generator',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Xbox, TagType.Tooling],
	},
	content: [
		{
			slideshow: {
				width: 1000,

				slides: [
					{
						img: img1,
						caption: 'Billboard generator tool (options condensed)',
					},
					{
						img: img2,
					},
					{
						img: img3,
					},
					{
						img: img4,
					},
					{
						img: img5,
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'Billboards are single page Xbox One promotions for games, TV, and more.  Hundreds of billboards have been published on the Xbox One since 2013.  They are completely customizable (buttons, text, background video/audio) and can integrate team plugins (preroll videos, slideshows, quizzes, etc.).  Billboard templates and the billboard generator were created to allow team designers to make billboards quickly on their own.',
		},
		{
			header: 'Billboard Generator Tool',
			body: 'To further simplify the process of creating billboards I built a billboard generator tool for the designers. The tool allowed designers to create billboards using a CMS where they could upload images, make customizations, preview the billboard, save/edit different versions, and generate the completed billboard files.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Web],
				},
				{
					header: HighlightName.Skills,
					tags: [
						SkillType.Design,
						SkillType.PHP,
						SkillType.Ajax,
						SkillType.JQuery,
						SkillType.JSON,
						SkillType.HTML,
						SkillType.CSS,
					],
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
