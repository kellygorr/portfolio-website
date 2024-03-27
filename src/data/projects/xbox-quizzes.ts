import { IProject, FileType, SkillType, HighlightName, SectionName } from '../IProject'
import { TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/quizzes.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/quizzes.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/quizzes.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/xbox-quizzes/quiz7.png', import.meta.url).href
const img2 = new URL('../../assets/images/xbox-quizzes/quiz8.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/xbox-quizzes/quiz4.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/xbox-quizzes/quiz22.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/xbox-quizzes/quiz11.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/xbox-quizzes/quiz14.png', import.meta.url).href
const img7 = new URL('../../assets/images/xbox-quizzes/quiz13.png', import.meta.url).href
const img8 = new URL('../../assets/images/xbox-quizzes/quiz9.png', import.meta.url).href

const img9 = new URL('../../assets/images/xbox-quizzes/gotquiz4.jpg', import.meta.url).href
const img10 = new URL('../../assets/images/xbox-quizzes/gotquiz2.jpg', import.meta.url).href
const img11 = new URL('../../assets/images/xbox-quizzes/gotquiz3.jpg', import.meta.url).href

const video1 = new URL('../../assets/videos/fifaQuiz.mp4', import.meta.url).href
const video2 = new URL('../../assets/videos/gameofthronesquiz.mp4', import.meta.url).href

export const xboxQuizzes: IProject = {
	details: {
		header: 'Xbox Quizzes',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Xbox, TagType.Template, TagType.Quiz],
	},
	content: [
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img1,
						caption: 'Fifa 16 quiz',
						file: {
							type: FileType.Video,
							source: video1,
						},
					},
					{
						img: img2,
						caption: 'Witcher 3: Four choice quiz',
					},
					{
						img: img3,
						caption: 'World Cup Quiz: Five choice quiz',
					},
					{
						img: img4,
						caption: 'South Park Quiz: Five choice quiz with multiple sounds for right/wrong answers',
					},
					{
						img: img5,
						caption: 'Witcher 3 Quiz: User got the question incorrect',
					},
					{
						img: img6,
						caption: 'Daredevil Quiz: User got the question correct',
					},
					{
						img: img7,
						caption: 'World Cup Quiz: Results page',
					},
					{
						img: img8,
						caption: 'Tomb Raider Quiz: Results page with community performance',
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'Quizzes on the Xbox One are very popular promotional tools, because they consistently have high user engagement.  Quizzes run as stand-alone promotions or in combination with larger projects (where they still preform very well).',
		},
		{
			header: SectionName.Role,
			body: 'I was tasked with building a quiz template (plugin) that would be used to customize and run Xbox quizzes.  The intro page, question section, and results page were completely customizable, and options included video backgrounds, different result page layouts, and a vertical button layout.  The text fields for the body copy and buttons were flexible enough to accommodate varying text lengths so that a quiz could be translated into multiple languages without having to adjust the layout.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Xbox],
				},
				{
					header: HighlightName.Dates,
					body: 'March 29, 2015',
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Designer,
					body: 'Xbox Programing Team designers',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
			],
		},
		{ title: 'Game of Thrones Quiz' },
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img9,
						file: {
							type: FileType.Video,
							source: video2,
						},
					},
					{
						img: img10,
						caption: 'Question section (The answer is Stallion)',
					},
					{
						img: img11,
						caption:
							"The results screen had 6 possible messages and sound clips from previous Game of Thrones seasons, based on the user's score.",
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'This was the first quiz released by Xbox on the Xbox One.  Between projects I had built a quiz prototype, and since my team focused on user engagement they recognized it would be a great promotional tool.  GOT was the perfect opportunity to use a quiz, and I was chosen to build it.  I coded the quiz and collaborated with the project’s designers on the functionality. The quiz was a big success with 90% of users finishing the quiz and over half of those people replaying it.',
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
					tags: ['United States', 'Canada (EN-CA)'],
				},
				{
					header: HighlightName.Dates,
					body: 'May 2015 - June 2015',
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.JQuery, SkillType.HTML, SkillType.CSS],
				},
				{
					header: HighlightName.Design_Lead,
					body: 'Todd Bohanna',
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
