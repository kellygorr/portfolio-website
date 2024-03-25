import { IProject, FileType, SkillType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'

const thumbnail = 'billboards.jpg'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboards/billboard3.jpg'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboards/billboard1.jpg'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboards/billboard2.jpg'
const img4 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboards/ffSweepstakes.jpg'
const img5 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboards/X1-COMP-Billboard-GoldGameE3Promo-ES-MX-v2.jpg'
const img6 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboards/X1-FUT-Anniversary-billboard-MX-v2-COMP.jpg'
const img7 = import.meta.env.VITE_IMAGE_URL_SRC + 'xbox-billboards/billboard5.jpg'

const video1 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/videos/iggyazalea.mp4'

export const xboxBillboards: IProject = {
	details: {
		header: 'Xbox Promotional Billboards',
		thumbnail: thumbnail,
		tags: [TagType.Xbox],
	},
	content: [
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img7,
						caption: 'Iggy Azalea Billboard',
						file: {
							type: FileType.Video,
							source: video1,
						},
					},
					{
						img: img2,
						caption: 'Stacked buttons',
					},
					{
						img: img1,
						caption: 'Two buttons with left aligned T&C button',
					},
					{
						img: img3,
						caption: 'One button template launches video',
					},
					{
						img: img4,
						caption: 'Sweepstakes billboard',
					},
					{
						img: img5,
						caption: 'Billboard with countdown clock',
					},
					{
						img: img6,
						caption: 'Fifa Points billboard',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'Billboards are single page Xbox One promotions for games, TV, and more.  Hundreds of billboards have been published on the Xbox One since 2013.  They are completely customizable (buttons, text, background video/audio) and can integrate team plugins (preroll videos, slideshows, quizzes, etc.).  Billboard templates and the billboard generator were created to allow team designers to make billboards quickly on their own.',
		},
		{
			header: 'Billboard Templates',
			body: 'The templates for the billboards were continuously evolving and being updated by myself and other members of my team.  I greatly expanded the available customization options adding:   Text customizations, stackable buttons, data tracking, and a scrollable terms and conditions overlay.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform_Accessories,
					tags: [TagType.Xbox, TagType.Kinect],
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Designer,
					body: 'Xbox Programing Team designers',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr & Jana Sheehan',
				},
			],
		},
	],
}
