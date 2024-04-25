import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/microsoft-design-website.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/microsoft-design-website.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/microsoft-design-website.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/microsoft-design-website/home.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/microsoft-design-website/news-and-stories.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/microsoft-design-website/culture-and-career.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/microsoft-design-website/article1.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/microsoft-design-website/article2.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/microsoft-design-website/home-original.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/microsoft-design-website/news-and-stories-original.jpg', import.meta.url).href
const img8 = new URL('../../assets/images/microsoft-design-website/culture-and-career-original.jpg', import.meta.url).href
const img9 = new URL('../../assets/images/microsoft-design-website/resources-original.jpg', import.meta.url).href

export const microsoftDesignWebsite: IProject = {
	details: {
		header: 'Microsoft Design Website',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Microsoft, TagType.Website],
	},
	content: [
		{
			slideshow: {
				width: 1837,
				slides: [
					{
						img: img1,
						caption: 'Home page',
					},
					{
						img: img2,
						caption: 'New & stories page',
					},
					{
						img: img3,
						caption: 'Culture & careers page',
					},
					{
						img: img4,
						caption: 'Article',
					},
					{
						img: img5,
						caption: 'Article 2',
					},
					{
						img: img6,
						caption: 'Home page - original',
					},
					{
						img: img7,
						caption: 'New & stories page - original',
					},
					{
						img: img8,
						caption: 'Culture & careers page - original',
					},
					{
						img: img9,
						caption: 'Resources page - original',
					},
				],
			},
		},
		{
			header: SectionName.URL,
			body: '<a href="https://microsoft.design">https://microsoft.design</a>',
		},
		{
			header: SectionName.Overview,
			body: `A brand new website for Microsoft Design`,
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [
						SkillType.TypeScript,
						SkillType.React,
						SkillType.HTML,
						SkillType.CSS,
						SkillType.UIUX,
						SkillType.CICD,
						SkillType.CMS,
						SkillType.MySQL,
					],
				},
			],
			body: `I built the website along with a CMS (Strapi) to allow the storytelling team to add new articles and make updates.  I also created a documentation site (storybook), preview site (for testing new articles), and I was the accessibility, privacy, and security driver for project.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Web],
				},
				{
					header: HighlightName.Dates,
					body: 'July. 2023 - Present',
				},
				{
					header: HighlightName.Designer,
					body: 'Phil Evans',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
				{
					header: `Additional Engineering Contributors`,
					body: 'Zann St Pierre, Will Chaves, Ankit Potdar',
				},
			],
		},
	],
}
