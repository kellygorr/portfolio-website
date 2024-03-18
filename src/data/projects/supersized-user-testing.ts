import { IProject, FileType, ToolType, SectionName, HighlightName, SkillType } from '../IProject'

const thumbnail = 'supersized.jpg'

const img1 = import.meta.env.VITE_IMAGE_URL_SRC + 'supersized-user-testing/large22e.jpg'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + 'supersized-user-testing/large22a.jpg'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + 'supersized-user-testing/large22b.jpg'
const img4 = import.meta.env.VITE_IMAGE_URL_SRC + 'supersized-user-testing/large22c.jpg'
const img5 = import.meta.env.VITE_IMAGE_URL_SRC + 'supersized-user-testing/large22d.jpg'

const pdf = import.meta.env.VITE_IMAGE_URL_SRC + 'supersized-user-testing/kelly_gorr_user_testing_plan.pdf'

export const supersizedUserTesting: IProject = {
	details: {
		header: 'Supersized User Testing',
		thumbnail: thumbnail,
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
					thumbnail: thumbnail,
					file: {
						type: FileType.Pdf,
						source: pdf,
					},
				},
			],
		},
	],
}
