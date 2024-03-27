import { IProject, FileType, SkillType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/witcher3.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/witcher3.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/witcher3.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/the-witcher-3/witcher2.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/the-witcher-3/witcher3.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/the-witcher-3/witcher5.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/the-witcher-3/witcher6.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/the-witcher-3/witcher7.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/the-witcher-3/witcher9.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/the-witcher-3/witcher10.jpg', import.meta.url).href
const img8 = new URL('../../assets/images/the-witcher-3/witcher11.jpg', import.meta.url).href
const img9 = new URL('../../assets/images/the-witcher-3/witcher12.jpg', import.meta.url).href
const img10 = new URL('../../assets/images/the-witcher-3/witchera.jpg', import.meta.url).href
const img11 = new URL('../../assets/images/the-witcher-3/witcher13.jpg', import.meta.url).href
const img12 = new URL('../../assets/images/the-witcher-3/witcher14.jpg', import.meta.url).href
const img13 = new URL('../../assets/images/the-witcher-3/witcher8.jpg', import.meta.url).href
const img14 = new URL('../../assets/images/the-witcher-3/witcher1.jpg', import.meta.url).href

const video1 = new URL('../../assets/videos/witcherPollOpt.mp4', import.meta.url).href

export const theWitcher3: IProject = {
	details: {
		header: 'The Witcher 3 Xbox Launch',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Xbox, TagType.Poll, TagType.Quiz],
	},
	content: [
		{
			slideshow: {
				width: 1440,
				slides: [
					{
						img: img1,
						caption: 'Main menu with animated background (Pre-launch)',
					},
					{
						img: img2,
						caption: 'Watch section shows subnav with trailers and gameplay',
					},
					{
						img: img3,
						caption: 'Character gallery with center carousel navigation.',
					},
					{
						img: img4,
						caption: 'Character details page',
					},
					{
						img: img5,
						caption: 'Image slideshow',
					},
					{
						img: img6,
						caption: 'Quiz with animated background',
					},
					{
						img: img7,
						caption: 'Quiz question',
					},
					{
						img: img8,
						caption: 'Quiz incorrect answer message',
					},
					{
						img: img9,
						caption: 'Quiz results page with animated background',
					},
					{
						img: img10,
						caption: 'Post-launch experience with new content',
					},
					{
						img: img11,
						caption: 'Post-launch poll',
						file: {
							type: FileType.Video,
							source: video1,
						},
					},
					{
						img: img12,
						caption: 'Post-launch monster bestiary',
					},
					{
						img: img13,
						caption: 'Quiz featured as a stand-alone experience on the Xbox One',
					},
					{
						img: img14,
						caption: 'Xbox One games section feature',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'This large promotion provided games and content for fans to explore including: trailers and gameplay videos, character/weapon/monster galleries, quizzes, and a poll.  A pre-launch version ran before The Witcher 3 was released and a post-launch version ran that added new videos, content and games.',
		},
		{
			header: SectionName.Role,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.UIUX, SkillType.JQuery, SkillType.JavaScript, SkillType.Ajax, SkillType.HTML, SkillType.CSS],
				},
			],
			body: 'I was responsible for building the entire promotion, excluding the hunt section (built by a teammate).  This involved working through the UX of the main sections, galleries, and games with designers to ensure that the promotion would be easy to navigate on the Xbox, and to establish all the functionality I would need to code.  I built the promotion to be compatible with the Xbox controller and the Xbox Kinect (voice and gesture), and I also implemented custom user data tracking.  After building the promotion I added all the localized assets (videos, images, sound), and text for the other regions.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform_Accessories,
					tags: [TagType.Xbox, TagType.Kinect],
				},
				{
					header: HighlightName.Featured_On,
					body: 'Xbox One dashboard home page and games section',
				},
				{
					header: HighlightName.Localization,
					tags: ['United States', 'Canada (EN-CA & FR-CA)', 'United Kingdom', 'Mexico', 'Brazil', 'France', 'Spain', 'Germany'],
				},
				{
					header: HighlightName.Dates,
					body: 'May 2015 - June 2015',
				},
				{
					header: HighlightName.Design_Lead,
					body: 'Karlo Reyes',
				},
				{
					header: HighlightName.Designer,
					body: 'Annie Marten & Eric Embry',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr & Jana Sheehan',
				},
			],
		},
	],
}
