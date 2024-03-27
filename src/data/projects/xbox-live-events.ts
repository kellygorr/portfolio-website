import { IProject, FileType, SkillType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/xlei.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/xlei.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/xlei.jpg', import.meta.url).href

const thumbnail6x1 = new URL('../../assets/thumbnails/x1/xlei-twitter.jpg', import.meta.url).href
const thumbnail6x15 = new URL('../../assets/thumbnails/x15/xlei-twitter.jpg', import.meta.url).href
const thumbnail6x2 = new URL('../../assets/thumbnails/x2/xlei-twitter.jpg', import.meta.url).href

const thumbnail7x1 = new URL('../../assets/thumbnails/x1/xlei-twitter2.jpg', import.meta.url).href
const thumbnail7x15 = new URL('../../assets/thumbnails/x15/xlei-twitter2.jpg', import.meta.url).href
const thumbnail7x2 = new URL('../../assets/thumbnails/x2/xlei-twitter2.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/xbox-live-events/xlei1.png', import.meta.url).href
const img2 = new URL('../../assets/images/xbox-live-events/E32.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/xbox-live-events/TGA1.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/xbox-live-events/TGA2.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/xbox-live-events/TGA4.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/xbox-live-events/TGA9.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/xbox-live-events/TGA7.jpg', import.meta.url).href
const img8 = new URL('../../assets/images/xbox-live-events/TGA5.jpg', import.meta.url).href
const img9 = new URL('../../assets/images/xbox-live-events/TGA10.jpg', import.meta.url).href
const img10 = new URL('../../assets/images/xbox-live-events/TGA11.jpg', import.meta.url).href

const img11 = new URL('../../assets/images/xbox-live-events/Gamescom11.jpg', import.meta.url).href
const img12 = new URL('../../assets/images/xbox-live-events/Gamescom1.jpg', import.meta.url).href
const img13 = new URL('../../assets/images/xbox-live-events/Gamescom5.jpg', import.meta.url).href
const img14 = new URL('../../assets/images/xbox-live-events/Gamescom6.jpg', import.meta.url).href
const img15 = new URL('../../assets/images/xbox-live-events/Gamescom10.jpg', import.meta.url).href
const img16 = new URL('../../assets/images/xbox-live-events/Gamescom12.jpg', import.meta.url).href
const img17 = new URL('../../assets/images/xbox-live-events/Gamescom3.png', import.meta.url).href
const img24 = new URL('../../assets/images/xbox-live-events/Gamescom16.jpg', import.meta.url).href
const img25 = new URL('../../assets/images/xbox-live-events/Gamescom17.jpg', import.meta.url).href

const img18 = new URL('../../assets/images/xbox-live-events/E31.jpg', import.meta.url).href
const img19 = new URL('../../assets/images/xbox-live-events/E32.jpg', import.meta.url).href

const img20 = new URL('../../assets/images/xbox-live-events/CODLive4.png', import.meta.url).href
const img21 = new URL('../../assets/images/xbox-live-events/CODLive.jpg', import.meta.url).href
const img22 = new URL('../../assets/images/xbox-live-events/CODLive2.jpg', import.meta.url).href
const img23 = new URL('../../assets/images/xbox-live-events/CODLive5.png', import.meta.url).href

const video1 = new URL('../../assets/videos/TGAPromo.mp4', import.meta.url).href
const video2 = new URL('../../assets/videos/TGAscreencapture.mp4', import.meta.url).href
const video3 = new URL('../../assets/videos/GCPromo.mp4', import.meta.url).href
const video4 = new URL('../../assets/videos/GCTombraiderQuiz.mp4', import.meta.url).href

export const xboxLiveEvents: IProject = {
	details: {
		header: 'Xbox Live Events',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Xbox, TagType.Quiz, TagType.Poll],
	},
	content: [
		{
			slideshow: {
				neutralBorder: true,
				width: 1920,
				slides: [
					{
						img: img1,
					},
					{
						img: img2,
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'The XLEi app was built by the Xbox Broadcast Service Team and is available on the Xbox One to play live events and video on-demand.  The main feature of the app is the interactive overlays it inserts over the video that lets users make purchases and take polls and quizzes while watching an event.  The app can also be used to create a game that lets users play along with events (and possibly win prizes) by keeping track of the user’s points and showing a leaderboard of the highest scores.',
		},
		{
			header: SectionName.Role,
			body: "My role was to build the interactive overlays that were used during the live events.  I was chosen to collaborate with the Broadcast Team because I had built an interactive video playlist (<a href='index.html#interactive_playlist?plugin=project'>featured here</a>) that had similar interactivity.  I built in the animations and functionality of the overlays and hooked up the polls, quizzes, and leaderboards to the Broadcast Team’s database.",
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Xbox],
				},
				{
					header: HighlightName.Featured_On,
					body: 'Xbox One dashboard home page and games section',
				},
				{
					header: HighlightName.Localization,
					body: 'Varies by event',
				},
				{
					header: HighlightName.Dates,
					body: '2014 - 2015',
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Designer,
					body: 'Jacqueline Montplaisir',
				},
				{
					header: `${HighlightName.Engineer} - XLEi App and database`,
					body: 'Xbox Broadcast Service Team',
				},
				{
					header: `${HighlightName.Engineer} - Overlays`,
					body: 'Kelly Gorr',
				},
			],
		},
		{ title: 'The Game Awards 2015' },
		{
			slideshow: {
				width: 1408,
				slides: [
					{
						img: img9,
						caption: 'Exclusive Xbox game promo',
						file: {
							type: FileType.Video,
							source: video1,
						},
					},
					{
						img: img10,
						caption: 'The Game Awards Video Capture',
						file: {
							type: FileType.Video,
							source: video2,
						},
					},
					{
						img: img3,
					},
					{
						img: img4,
					},
					{
						img: img5,
						caption: 'Lower thirds leaderboard',
					},
					{
						img: img6,
						caption: 'Full screen leaderboard',
					},
					{
						img: img7,
						caption: 'Fullscreen user stats',
					},
					{
						img: img8,
						caption: 'Taco bell promo',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'The Game Awards celebrates the best video games of the year.  For the 2015 event it was available to watch live on Xbox One (XLEi), Twitch, Playstation Network, Steam, YouTube, Kotaku, and more.  The XLEi app featured an exclusive game that let viewers play along with the event and it was promoted on YouTube, Twitter, and other media outlets and it was discussed during the live show.',
		},
		{
			header: SectionName.Role,
			body: 'I was in charge of building the interactive game and overlays. During the event players guessed who would win at the beginning each category and they received points based on how fast they answered correctly (once the winner was announced).  Throughout the event an overlay was inserted that showed the top ten highest scoring players, and there was also an overlay that was customized for each player to show them their total points and how fast and accurate they were guessing the winners.  At the end of the event a fullscreen leaderboard was inserted into the live broadcast that allowed users streaming on other devices to see who was at the top of the Xbox leaderboard.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Xbox],
				},
				{
					header: HighlightName.Featured_On,
					body: 'Xbox One dashboard home page and games section',
				},
				{
					header: HighlightName.Dates,
					body: 'Dec. 3, 2015',
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Designer,
					body: 'Jacqueline Montplaisir',
				},
				{
					header: `${HighlightName.Engineer} - XLEi App and database`,
					body: 'Xbox Broadcast Service Team',
				},
				{
					header: `${HighlightName.Engineer} - Overlays`,
					body: 'Kelly Gorr',
				},
			],
		},
		{
			header: SectionName.Hype,
			attachments: [
				{
					header: 'Larry Hryb',
					thumbnail: {
						x1: thumbnail6x1,
						x15: thumbnail6x15,
						x2: thumbnail6x2,
					},
					file: {
						type: FileType.Link,
						source: 'https://twitter.com/majornelson/status/672128749467340800',
					},
				},
				{
					header: 'Windows Central',
					thumbnail: {
						x1: thumbnail7x1,
						x15: thumbnail7x15,
						x2: thumbnail7x2,
					},
					file: {
						type: FileType.Link,
						source: 'https://twitter.com/windowscentral/status/672123341185024000',
					},
				},
			],
		},
		{ title: 'Gamescom 2015: Xbox Daily Show' },
		{
			slideshow: {
				width: 1440,
				slides: [
					{
						img: img24,
						caption: 'Daily Show and Interactive Promo',
						file: {
							type: FileType.Video,
							source: video3,
						},
					},
					{
						img: img25,
						caption: 'Tomb Raider Quiz',
						file: {
							type: FileType.Video,
							source: video4,
						},
					},
					{
						img: img11,
					},
					{
						img: img12,
						caption: 'Preshow poll',
					},
					{
						img: img13,
						caption: 'Preshow quiz pt.1',
					},
					{
						img: img14,
						caption: 'Preshow quiz pt.2',
					},
					{
						img: img15,
						caption: 'Poll',
					},
					{
						img: img16,
					},
					{
						img: img17,
						caption: 'Xbox Gamescom promotion',
					},
				],
			},
		},
		{
			header: SectionName.Role,
			body: 'The Xbox Daily Show held two live shows during Gamescom 2015.  I was in charge of building the interactive poll and quiz overlays for the event.  I also built the overlays for the preshow.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Xbox],
				},
				{
					header: HighlightName.Featured_On,
					body: 'Xbox One dashboard home page',
				},
				{
					header: HighlightName.Dates,
					body: 'June 17, 2015 - June 18, 2015',
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Designer,
					body: 'Jacqueline Montplaisir',
				},
				{
					header: `${HighlightName.Engineer} - XLEi App and database`,
					body: 'Xbox Broadcast Service Team',
				},
				{
					header: `${HighlightName.Engineer} - Overlays`,
					body: 'Kelly Gorr',
				},
			],
		},
		{ title: 'E3 2015: Xbox Daily Show' },
		{
			slideshow: {
				width: 1914,
				slides: [
					{
						img: img18,
					},
					{
						img: img19,
					},
				],
			},
		},
		{
			header: SectionName.Role,
			body: 'The Xbox Daily Show held three live shows during E3 2015.  I was in charge of building the interactive poll and quiz overlays for the event.  Some polls influenced what was presented during the show.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Xbox],
				},
				{
					header: HighlightName.Featured_On,
					body: 'Xbox One dashboard home page',
				},
				{
					header: HighlightName.Dates,
					body: 'June 17, 2015 - June 18, 2015',
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Designer,
					body: 'Jacqueline Montplaisir',
				},
				{
					header: `${HighlightName.Engineer} - XLEi App and database`,
					body: 'Xbox Broadcast Service Team',
				},
				{
					header: `${HighlightName.Engineer} - Overlays`,
					body: 'Kelly Gorr',
				},
			],
		},
		{ title: 'Call of Duty Championship 2015' },
		{
			slideshow: {
				width: 1920,
				slides: [
					{
						img: img20,
					},
					{
						img: img21,
					},
					{
						img: img22,
					},
					{
						img: img23,
						caption: 'Xbox Promotion',
					},
				],
			},
		},
		{
			header: SectionName.Role,
			body: 'This was the debut of the interactive overlays on the XLEi.  I was in charge of building the preshow polls.  Once the user made a selection the poll and numbers animated to show the live results.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Xbox],
				},
				{
					header: HighlightName.Featured_On,
					body: 'Xbox One dashboard home page',
				},
				{
					header: HighlightName.Dates,
					body: 'March 29, 2015',
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JavaScript, SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Designer,
					body: 'Efus Richman',
				},
				{
					header: `${HighlightName.Engineer} - XLEi App and database`,
					body: 'Xbox Broadcast Service Team',
				},
				{
					header: `${HighlightName.Engineer} - Overlays`,
					body: 'Kelly Gorr',
				},
			],
		},
	],
}
