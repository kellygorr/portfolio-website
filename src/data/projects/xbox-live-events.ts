import { IProject, FileType, SkillType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'
import { formatYearRange, formatFullDate, formatFullDateRange } from '../../utils/dateFormat'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/xbox-live-events-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/xbox-live-events-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/xbox-live-events-thumbnail.jpg', import.meta.url).href

const thumbnail6x1 = new URL('../../assets/thumbnails/x1/xbox-live-events-thumbnail-2.jpg', import.meta.url).href
const thumbnail6x15 = new URL('../../assets/thumbnails/x15/xbox-live-events-thumbnail-2.jpg', import.meta.url).href
const thumbnail6x2 = new URL('../../assets/thumbnails/x2/xbox-live-events-thumbnail-2.jpg', import.meta.url).href

const thumbnail7x1 = new URL('../../assets/thumbnails/x1/xbox-live-events-thumbnail-3.jpg', import.meta.url).href
const thumbnail7x15 = new URL('../../assets/thumbnails/x15/xbox-live-events-thumbnail-3.jpg', import.meta.url).href
const thumbnail7x2 = new URL('../../assets/thumbnails/x2/xbox-live-events-thumbnail-3.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/xbox-live-events/xbox-live-events-01.png', import.meta.url).href
const img2 = new URL('../../assets/images/xbox-live-events/xbox-live-events-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/xbox-live-events/xbox-live-events-03.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/xbox-live-events/xbox-live-events-04.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/xbox-live-events/xbox-live-events-05.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/xbox-live-events/xbox-live-events-06.jpg', import.meta.url).href
const img7 = new URL('../../assets/images/xbox-live-events/xbox-live-events-07.jpg', import.meta.url).href
const img8 = new URL('../../assets/images/xbox-live-events/xbox-live-events-08.jpg', import.meta.url).href
const img9 = new URL('../../assets/images/xbox-live-events/xbox-live-events-09.jpg', import.meta.url).href
const img10 = new URL('../../assets/images/xbox-live-events/xbox-live-events-10.jpg', import.meta.url).href

const img11 = new URL('../../assets/images/xbox-live-events/xbox-live-events-11.jpg', import.meta.url).href
const img12 = new URL('../../assets/images/xbox-live-events/xbox-live-events-12.jpg', import.meta.url).href
const img13 = new URL('../../assets/images/xbox-live-events/xbox-live-events-13.jpg', import.meta.url).href
const img14 = new URL('../../assets/images/xbox-live-events/xbox-live-events-14.jpg', import.meta.url).href
const img15 = new URL('../../assets/images/xbox-live-events/xbox-live-events-15.jpg', import.meta.url).href
const img16 = new URL('../../assets/images/xbox-live-events/xbox-live-events-16.jpg', import.meta.url).href
const img17 = new URL('../../assets/images/xbox-live-events/xbox-live-events-17.png', import.meta.url).href
const img24 = new URL('../../assets/images/xbox-live-events/xbox-live-events-18.jpg', import.meta.url).href
const img25 = new URL('../../assets/images/xbox-live-events/xbox-live-events-19.jpg', import.meta.url).href

const img18 = new URL('../../assets/images/xbox-live-events/xbox-live-events-20.jpg', import.meta.url).href
const img19 = new URL('../../assets/images/xbox-live-events/xbox-live-events-02.jpg', import.meta.url).href

const img20 = new URL('../../assets/images/xbox-live-events/xbox-live-events-21.png', import.meta.url).href
const img21 = new URL('../../assets/images/xbox-live-events/xbox-live-events-22.jpg', import.meta.url).href
const img22 = new URL('../../assets/images/xbox-live-events/xbox-live-events-23.jpg', import.meta.url).href
const img23 = new URL('../../assets/images/xbox-live-events/xbox-live-events-24.png', import.meta.url).href

const video1 = new URL('../../assets/videos/xbox-live-events/xbox-live-events-25.mp4', import.meta.url).href
const video2 = new URL('../../assets/videos/xbox-live-events/xbox-live-events-26.mp4', import.meta.url).href
const video3 = new URL('../../assets/videos/xbox-live-events/xbox-live-events-27.mp4', import.meta.url).href
const video4 = new URL('../../assets/videos/xbox-live-events/xbox-live-events-28.mp4', import.meta.url).href

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
			body: "The XLEi app was built by the Xbox Broadcast Service Team and is available on the Xbox One to play live events and video on-demand.  The main feature of the app is the interactive overlays it inserts over the video that lets users make purchases, take polls and quizzes, and compete on live leaderboards while watching an event.  I built the interactive overlays used during some of gaming's biggest live broadcasts, including The Game Awards, E3, Gamescom, and the Call of Duty Championship, reaching millions of viewers.",
		},
		{
			header: SectionName.Role,
			body: "My role was to build the interactive overlays that were used during the live events.  My work on the [ <a href='interactive-video-playlist'>interactive video playlist</a> ] demonstrated the kind of interactivity the Broadcast Team needed, and led to them bringing me on to collaborate on these broadcasts.  I built in the animations and functionality of the overlays and hooked up the polls, quizzes, and leaderboards to the Broadcast Team’s database. Content and requirements often changed right up until broadcast, so I was also present at each live event to make last-minute updates, monitor the overlays, and troubleshoot in real time.",
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
					body: formatYearRange(2014, 2015),
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
					header: HighlightName.Engineer,
					body: 'Xbox Broadcast Service Team (XLEi App and database)',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr (Overlays)',
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
			body: 'The Game Awards celebrates the best video games of the year.  For the 2015 event it was available to watch live on Xbox One (XLEi), Twitch, Playstation Network, Steam, YouTube, and more, and it was promoted on Twitter and other media outlets and discussed during the live show.<br /><br />The XLEi app turned the broadcast into a competitive game: players guessed who would win each category and earned points based on how fast they answered correctly once the winner was announced, with their rank tracked on a live leaderboard throughout the show. An overlay showed the top ten highest-scoring players, along with a player-specific overlay showing total points and guess speed/accuracy, and at the end of the event a fullscreen leaderboard was inserted directly into the live broadcast so viewers on other devices could see who was at the top of the Xbox leaderboard.',
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
					body: formatFullDate('Dec', 3, 2015),
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
					header: HighlightName.Engineer,
					body: 'Xbox Broadcast Service Team (XLEi App and database)',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr (Overlays)',
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
			header: SectionName.Overview,
			body: 'The Xbox Daily Show ran two live broadcasts during Gamescom 2015, each paired with its own preshow. The preshow quizzes and polls primed the audience, then carried through into the live overlays on the main show, keeping the interactive experience continuous across both formats.',
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
					body: formatFullDateRange('Jun', 17, 'Jun', 18, 2015),
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
					header: HighlightName.Engineer,
					body: 'Xbox Broadcast Service Team (XLEi App and database)',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr (Overlays)',
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
			header: SectionName.Overview,
			body: "The Xbox Daily Show ran three live broadcasts during E3 2015. Audience polls didn't just run alongside the show. Results directly influenced what content was presented live, making viewers part of shaping the broadcast in real time.",
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
					body: formatFullDateRange('Jun', 17, 'Jun', 18, 2015),
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
					header: HighlightName.Engineer,
					body: 'Xbox Broadcast Service Team (XLEi App and database)',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr (Overlays)',
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
			header: SectionName.Overview,
			body: 'This was the debut of the interactive overlay system on XLEi: preshow polls where, once a viewer made a selection, the poll and result numbers animated live to reflect real-time audience results.',
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
					body: formatFullDate('Mar', 29, 2015),
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
					header: HighlightName.Engineer,
					body: 'Xbox Broadcast Service Team (XLEi App and database)',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr (Overlays)',
				},
			],
		},
	],
}
