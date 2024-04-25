import { IProject, FileType, ToolType, SectionName, HighlightName, SkillType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/supersized.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/supersized.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/supersized.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/supersized-user-testing/large22e.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/supersized-user-testing/large22a.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/supersized-user-testing/large22b.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/supersized-user-testing/large22c.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/supersized-user-testing/large22d.jpg', import.meta.url).href

const pdf = new URL('../../assets/images/supersized-user-testing/kelly_gorr_user_testing_plan.pdf', import.meta.url).href

export const supersizedUserTesting: IProject = {
	details: {
		header: 'Supersized User Testing',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
	},
	content: [
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img1,
					},
					{
						img: img2,
						caption: 'Part 1 tested a paper prototype of the interface',
					},
					{
						img: img3,
						caption: 'I experimented with graph visualizations',
					},
					{
						img: img4,
					},
					{
						img: img5,
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'I designed a CMS for the Supersized! slideshow plugin and conducted small-scale user testing to test the interface. The full document with methods and conclusions is available below.  In part 1, volunteers experience the interface through a paper prototype, and the results are used to create an updated digital prototype that is used for testing in part 2.<br/>View the PDF below to see the full methods and conclusions.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design, SkillType.UIUX],
				},
				{
					header: HighlightName.Tools,
					tags: [ToolType.InDesign],
				},
			],
		},
		{
			header: 'Methods and Results',
			attachments: [
				{
					header: 'Testing PDF',
					thumbnail: {
						x1: thumbnailx1,
						x15: thumbnailx15,
						x2: thumbnailx2,
					},
					file: {
						type: FileType.Pdf,
						source: pdf,
					},
				},
			],
		},
	],
}
