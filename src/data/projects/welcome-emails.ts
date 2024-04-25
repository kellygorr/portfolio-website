import { IProject, ToolType, SkillType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/email.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/email.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/email.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/welcome-emails/email1.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/welcome-emails/email2.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/welcome-emails/email3.jpg', import.meta.url).href

export const welcomeEmails: IProject = {
	details: {
		header: 'Welcome Emails',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
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
			],
		},
	],
}
