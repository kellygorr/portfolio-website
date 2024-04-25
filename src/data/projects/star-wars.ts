import { IProject, FileType, SkillType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/starwars.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/starwars.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/starwars.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/starwars-kotaku.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/starwars-kotaku.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/starwars-kotaku.jpg', import.meta.url).href

const video1 = new URL('../../assets/videos/starWars.mp4', import.meta.url).href

const img1 = new URL('../../assets/images/star-wars/starwars1.png', import.meta.url).href
const img2 = new URL('../../assets/images/star-wars/starwars2.png', import.meta.url).href
const img3 = new URL('../../assets/images/star-wars/starwars3.png', import.meta.url).href
const img5 = new URL('../../assets/images/star-wars/starwars5.png', import.meta.url).href

export const starWars: IProject = {
	details: {
		header: 'Star Wars Xbox Promotion',
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
				width: 1920,
				slides: [
					{
						img: img1,
						file: {
							type: FileType.Video,
							source: video1,
						},
					},
					{
						img: img2,
						caption: 'Slideshow',
					},
					{
						img: img3,
						caption: 'Billboard promotion',
					},
					{
						img: img5,
						caption: 'Placement on the Xbox Dashboard',
					},
				],
			},
		},
		{
			header: SectionName.Role,
			body: 'I built a promotion for Star Wars that included a home page, slideshow, and promotional offer billboard. I also added all the assets and localized text.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Platform_Accessories,
					tags: [TagType.Xbox, TagType.Kinect],
				},
				{
					header: HighlightName.Featured_On,
					body: 'Xbox One dashboard: home page, Movie & TV, and Gold Lounge',
				},
				{
					header: HighlightName.Localization,
					tags: ['United States', 'Canada (EN-CA & FR-CA)', 'United Kingdom', 'Mexico', 'Brazil', 'France', 'Spain', 'Germany'],
				},
				{
					header: HighlightName.Dates,
					body: 'April 2016',
				},
				{
					header: HighlightName.Designer,
					body: 'Eric Embry',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr & Jana Sheehan',
				},
			],
		},
		{
			header: SectionName.Hype,
			attachments: [
				{
					header: 'Kotaku article',
					thumbnail: {
						x1: thumbnail2x1,
						x15: thumbnail2x15,
						x2: thumbnail2x2,
					},
					file: {
						type: FileType.Link,
						source: 'http://kotaku.com/the-force-awakens-on-game-consoles-1768991827#',
					},
				},
			],
		},
	],
}
