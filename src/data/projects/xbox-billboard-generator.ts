import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'

const thumbnail = 'billboard-generator.jpg'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboard-generator/billGen0.jpg'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboard-generator/billGen2.jpg'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboard-generator/billGen3.jpg'
const img4 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboard-generator/billGen4.jpg'
const img5 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboard-generator/billGen5.jpg'

export const xboxBillboardGenerator: IProject = {
	details: {
		header: 'Xbox Billboard Generator',
		thumbnail: thumbnail,
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
