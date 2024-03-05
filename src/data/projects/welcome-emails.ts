import { IProject, ToolType, SkillType, SectionName, HighlightName } from '../IProject'

const thumbnail = 'email.jpg'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/welcome-emails/email1.jpg'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/welcome-emails/email2.jpg'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/welcome-emails/email3.jpg'

export const welcomeEmails: IProject = {
	details: {
		header: 'Welcome Emails',
		thumbnail: thumbnail,
	},
	content: [
		{
			slideshow: {
				width: 738,
				neutralBorder: true,
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
