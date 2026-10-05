import { IProject, FileType, ToolType, SectionName, HighlightName, SkillType, TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/supersized-user-testing-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/supersized-user-testing-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/supersized-user-testing-thumbnail.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/supersized-user-testing/supersized-user-testing-01.jpg', import.meta.url).href
const img2 = new URL('../../assets/images/supersized-user-testing/supersized-user-testing-02.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/supersized-user-testing/supersized-user-testing-03.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/supersized-user-testing/supersized-user-testing-04.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/supersized-user-testing/supersized-user-testing-05.jpg', import.meta.url).href

const pdf = new URL('../../assets/images/supersized-user-testing/supersized-user-testing-06.pdf', import.meta.url).href

export const supersizedUserTesting: IProject = {
	details: {
		header: 'Supersized user testing',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Design, SkillType.UIUX],
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
			body: 'I designed a CMS interface for the Supersized! slideshow plugin and ran a two-phase usability study to refine it. The first round used a paper prototype to identify navigation and comprehension issues, and the second round tested an updated digital prototype. The study helped clarify where users needed stronger labels and feedback in the interface.',
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
				{
					header: HighlightName.Designer,
					body: 'Kelly Gorr',
				},
			],
		},
		{
			header: 'Methods and results',
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
