import { IProject, ToolType, SkillType, TagType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/welcome-emails-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/welcome-emails-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/welcome-emails-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/welcome-emails/welcome-emails-01.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/welcome-emails/welcome-emails-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/welcome-emails/welcome-emails-03.jpg', import.meta.url).href

export const welcomeEmails: IProject = {
	details: {
		header: 'Welcome Emails',
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
				width: 738,

				slides: [
					{
						img: img1,
					},
					{
						img: img2,
					},
					{
						img: img3,
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'These are welcome emails that I built and designed for an email marketing drip program. They were compatible with multiple devices and email programs. The body copy in the images has been altered from the original version.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Tools,
					tags: [ToolType.Photoshop],
				},
				{
					header: HighlightName.Assets,
					link: 'istockphoto.com',
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
