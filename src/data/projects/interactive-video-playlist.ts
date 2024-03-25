import { IProject, FileType, SectionName, HighlightName } from '../IProject'
import { TagType } from '../IProject'
const thumbnail = 'summer.jpg'

// const video1 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/videos/summerME.mp4'
const video2 = import.meta.env.VITE_IMAGE_URL_SRC + 'assets/videos/slipknotXboxI.mp4'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer5.png'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer8.png'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer1.png'
const img4 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer6.png'
const img5 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer3.png'
const img6 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer4.png'
const img7 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer7.png'
const img8 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer14.png'
const img9 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer11.png'
const img10 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer15.png'
const img11 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/summer12.png'

const img12 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/itv6.jpg'
const img13 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/itv3.jpg'
const img14 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/itv4.jpg'
const img15 = import.meta.env.VITE_IMAGE_URL_SRC + 'interactive-video-playlist/itv5.jpg'

export const interactiveVideoPlaylist: IProject = {
	details: {
		header: 'Interactive Video Playlist',
		thumbnail: thumbnail,
		tags: [TagType.Xbox, TagType.Template, TagType.Quiz, TagType.Poll],
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
						caption: 'Polls and quizzes are added dynamically over the video',
					},
					{
						img: img3,
					},
					{
						img: img4,
						caption: 'Buttons can link to full length videos or purchasable content',
					},
					{
						img: img5,
						caption: 'The dynamic content is customizable',
					},
					{
						img: img6,
					},
					{
						img: img7,
						caption: 'Joke xbox achievement image',
					},
					{
						img: img8,
						caption: 'A fallback quiz can be inserted if the polling database is unavailable',
					},
					{
						img: img9,
					},
					{
						img: img10,
					},
					{
						img: img11,
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'Xbox Interactive is a JavaScript app that creates an interactive video playlist. It plays through videos that are customized with interactive pop-in content that have timed appearances throughout the video. The content can be trivia, quizzes, polls, and more. One use for this tool could be timing pop-in content over a single video, or it could be used to create a video playlist.',
		},
		{
			header: SectionName.Role,
			body: 'Before building the app I created prototypes that broke down some of the key functionality.  Afterwards I started making the app while working with team designers to put together a large-scale project that would show off all the capabilities of the new technology.  The idea was to have a monthly show on the Xbox where users could watch music videos and viral content that were popular during the month.  The users could purchase the videos, learn interesting facts about them, and play along with polls and quizzes.  For the first show we created a playlists of summer videos.  With the finished app I organized the videos, created the pop-in content (each with custom effects and styles), and added a timestamp to each piece of pop-in content to mark where each would appear over the videos (I built the app to also allow for the timing of the content to be automated).  The project was completed but never launched on the Xbox.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform_Accessories,
					tags: [TagType.Xbox, TagType.Kinect],
				},
				{
					header: HighlightName.Designer,
					body: 'Bruce Warren & Jacqueline Montplaisir',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
			],
		},
		{ title: 'Interactive Slipknot Music Video' },
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img12,
						file: {
							type: FileType.Video,
							source: video2,
						},
					},
					{
						img: img13,
						caption: 'Fact/trivia',
					},
					{
						img: img14,
						caption: 'Poll',
					},
					{
						img: img15,
						caption: 'Two button billboard with T&C button',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: "For the premiere of Slipknot's music video, for ‘The Devil In I’, Xbox wanted to give fans a unique experience.  Our team decided to use the interactive video playlist app that I built to add facts, quizzes, and polls, over the music video.  The team had five days to come up with questions, design the project, and decide how the content should be spaced over the video.  I used the app to organize the videos, and create and style the content (polls/quizzes/facts).",
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
					body: 'Xbox One dashboard home page and music section',
				},
				{
					header: HighlightName.Localization,
					tags: ['United States', 'Canada (EN-CA)'],
				},
				{
					header: HighlightName.Dates,
					body: 'Sept. 2014',
				},
				{
					header: HighlightName.Designer,
					body: 'James Aparis',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
			],
		},
	],
}
