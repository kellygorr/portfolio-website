import { IProject, FileType, SkillType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'

const thumbnail = 'xlei.jpg'
const thumbnail6 = 'xlei-twitter.jpg'
const thumbnail7 = 'xlei-twitter2.jpg'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/xlei1.png'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/E32.jpg'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA1.jpg'
const img4 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA2.jpg'
const img5 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA4.jpg'
const img6 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA9.jpg'
const img7 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA7.jpg'
const img8 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA5.jpg'
const img9 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA10.jpg'
const img10 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/TGA11.jpg'

const img11 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom11.jpg'
const img12 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom1.jpg'
const img13 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom5.jpg'
const img14 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom6.jpg'
const img15 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom10.jpg'
const img16 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom12.jpg'
const img17 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom3.png'
const img24 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom16.jpg'
const img25 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/Gamescom17.jpg'

const img18 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/E31.jpg'
const img19 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/E32.jpg'

const img20 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/CODLive4.png'
const img21 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/CODLive.jpg'
const img22 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/CODLive2.jpg'
const img23 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/images/xbox-live-events/CODLive5.png'

const video1 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/videos/TGAPromo.mp4'
const video2 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/videos/TGAscreencapture.mp4'
const video3 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/videos/GCPromo.mp4'
const video4 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/videos/GCTombraiderQuiz.mp4'

export const xboxLiveEvents: IProject = {
	details: {
		header: 'Xbox Live Events',
		thumbnail: thumbnail,
		tags: [TagType.Xbox, TagType.Quiz, TagType.Poll],
	},
	content: [
		{
			slideshow: {
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
					thumbnail: thumbnail6,
					file: {
						type: FileType.Link,
						source: 'https://twitter.com/majornelson/status/672128749467340800',
					},
				},
				{
					header: 'Windows Central',
					thumbnail: thumbnail7,
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
