import { IProject, FileType, SkillType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/xbox-billboards-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/xbox-billboards-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/xbox-billboards-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/xbox-billboards/xbox-billboards-01.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/xbox-billboards/xbox-billboards-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/xbox-billboards/xbox-billboards-03.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/xbox-billboards/xbox-billboards-04.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/xbox-billboards/xbox-billboards-05.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/xbox-billboards/xbox-billboards-06.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/xbox-billboards/xbox-billboards-07.jpg', import.meta.url).href

const video1 = new URL('../../assets/videos/xbox-billboards/xbox-billboards-08.mp4', import.meta.url).href

export const xboxBillboards: IProject = {
	details: {
		header: 'Xbox promotional billboards',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
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
			header: 'Billboard templates',
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
