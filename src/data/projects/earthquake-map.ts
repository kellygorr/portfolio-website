import { IProject, FileType, TagType, SkillType, ToolType, SectionName, HighlightName } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/earthquake.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/earthquake.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/earthquake.jpg', import.meta.url).href

const thumbnail2x1 = new URL('../../assets/thumbnails/x1/earthquake-pdf.jpg', import.meta.url).href
const thumbnail2x15 = new URL('../../assets/thumbnails/x15/earthquake-pdf.jpg', import.meta.url).href
const thumbnail2x2 = new URL('../../assets/thumbnails/x2/earthquake-pdf.jpg', import.meta.url).href

const img1 = new URL('../../assets/images/earthquake-map/large17.jpg', import.meta.url).href
const pdf1 = new URL('../../assets/images/earthquake-map/Kelly_Gorr_Code_Sample.pdf', import.meta.url).href

export const earthquakeMap: IProject = {
	details: {
		header: 'Earthquake Map',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Website],
	},
	content: [
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: img1,
					},
				],
			},
		},
		{
			header: SectionName.Overview,
			body: 'A website that mapped worldwide seismic activity that occurred in the past hour, day, week, and month. It also included a rotating list of recent seismic activity, and a comment section for discussion.  The website recorded a lot of interesting information including the underground nuclear tests done in North Korea.',
		},
		{
			header: SectionName.Role,
			body: 'I built and designed the website.  It was connected to a worldwide earthquake feed (no longer available) and I converted the latitude/longitude data I received for each earthquake to the corresponding x/y coordinates for the map I designed.',
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Skills,
					tags: [
						SkillType.Design,
						SkillType.PHP,
						SkillType.JavaScript,
						SkillType.JQuery,
						SkillType.MySQL,
						SkillType.Ajax,
						SkillType.JSON,
						SkillType.HTML,
						SkillType.CSS,
					],
				},
				{
					header: HighlightName.Tools,
					tags: [ToolType.Illustrator, ToolType.Photoshop],
				},
			],
		},
		{
			header: 'Code Sample',
			attachments: [
				{
					header: 'Code Sample PDF',
					thumbnail: {
						x1: thumbnail2x1,
						x15: thumbnail2x15,
						x2: thumbnail2x2,
					},
					file: {
						type: FileType.Pdf,
						source: pdf1,
					},
				},
			],
		},
	],
}
