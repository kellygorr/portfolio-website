import { IProject, TagType, SkillType, SectionName, HighlightName } from '../IProject'
import { formatMonthYearRange } from '../../utils/dateFormat'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/microsoft-design-website-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/microsoft-design-website-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/microsoft-design-website-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-01.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-03.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-04.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-05.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-06.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-07.jpg', import.meta.url).href
const img8 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-08.jpg', import.meta.url).href
const img9 = new URL('../../assets/images/microsoft-design-website/microsoft-design-website-09.jpg', import.meta.url).href

export const microsoftDesignWebsite: IProject = {
	details: {
		header: 'Microsoft Design website',
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
			body: '[ <a href="https://microsoft.design">https://microsoft.design</a> ]',
		},
		{
			header: SectionName.Overview,
			body: `I led engineering for the public Microsoft Design website and its CMS, helping launch microsoft.design in July 2023. The site became a public hub for Microsoft Design stories, with a publishing workflow that let the storytelling team create and update articles through the CMS.`,
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
			body: `I built and maintained the public Microsoft Design website and CMS, creating a secure and reviewable publishing workflow for the storytelling team. My work covered the production site, editorial staging preview site, component documentation, telemetry, CMS training, custom article support, and the accessibility, privacy, and security requirements needed to launch and maintain the site.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Website],
				},
				{
					header: HighlightName.Dates,
					body: formatMonthYearRange('Jul', 2023, 'Oct', 2024),
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
					header: `Additional engineering contributors`,
					body: 'Zann St Pierre, Will Chavez, Ankit Potdar',
				},
			],
		},
	],
}
