export enum TagType {
	Xbox = 'Xbox',
	Microsoft = 'Microsoft',
	Poll = 'poll',
	Quiz = 'quiz',
	Template = 'template',
	Tooling = 'tooling',
	Infographic = 'infographic',
	Website = 'website',
	Mobile = 'mobile',
	Web = 'web',
	Kinect = 'Xbox Kinect',
	Print = 'print',
	Figma = 'Figma',
}
export enum SkillType {
	UIUX = 'UI-UX',
	Prototyping = 'prototyping',
	Design = 'design',
	Illustration = 'illustration',
	JQuery = 'jQuery',
	JavaScript = 'JavaScript',
	React = 'React',
	TypeScript = 'TypeScript',
	AngularJS = 'AngularJS',
	PHP = 'PHP',
	MySQL = 'MySQL',
	Ajax = 'Ajax',
	JSON = 'JSON',
	HTML = 'HTML',
	CSS = 'CSS',
	Fabric = 'UI Fabric',
}

export enum ToolType {
	Illustrator = 'Illustrator',
	Photoshop = 'Photoshop',
	InDesign = 'InDesign',
}

export const relatedTags: (TagType | SkillType | ToolType)[][] = [
	[SkillType.HTML, SkillType.CSS],
	[SkillType.Illustration, TagType.Infographic, ToolType.Illustrator],
	[TagType.Poll, TagType.Quiz],
	[SkillType.Design, SkillType.UIUX],
	[TagType.Website, TagType.Mobile],
	[SkillType.JavaScript, SkillType.TypeScript, SkillType.React],
	[SkillType.JavaScript, SkillType.JQuery, SkillType.Ajax],
	[TagType.Website, SkillType.HTML, SkillType.CSS],
	[ToolType.Photoshop, ToolType.Illustrator],
	[SkillType.PHP, SkillType.MySQL],
	[TagType.Xbox, TagType.Microsoft],
	[TagType.Xbox, TagType.Kinect],
	[TagType.Tooling, TagType.Template],
]

export enum SectionType {
	Title = 'title',
	Header = 'header',
	Slideshow = 'slideshow',
	Body = 'body',
	Highlight = 'highlight',
	Attachments = 'attachments',
	Link = 'link',
	Tags = 'tags',
}

export enum FileType {
	Video,
	Image,
	Pdf,
	Link,
}

export enum SectionName {
	Accessibility = 'Accessibility',
	Details = 'Details',
	Hype = 'Hype',
	Overview = 'Overview',
	Role = 'Role',
	URL = 'URL',
}

export enum HighlightName {
	Assets = 'Assets',
	Designer = 'Designer(s)',
	Design_Lead = 'Design Lead',
	Dates = 'Dates',
	Engineer = 'Engineer(s)',
	Featured_On = 'Featured On',
	Illustrator = 'Illustrator',
	Localization = 'Localization',
	Motion = 'Motion',
	Platform = 'Platform',
	Platform_Accessories = 'Platform and Accessories',
	Skills = 'Skills',
	Tools = 'Tools',
}

export interface IProject {
	details: IThumbnail
	content?: ISection[]
}

export interface ISection {
	title?: string
	header?: SectionName | string
	slideshow?: ISlideshow
	body?: string
	highlight?: IHighlight[]
	attachments?: IThumbnail[]
}

export interface ISlideshow {
	neutralBorder?: boolean
	slides: ISlide[]
	width: number
}
export interface ISlide {
	img: string
	caption?: string
	file?: IFile
	width?: number
}

export interface IHighlight {
	header: HighlightName | string
	tags?: (TagType | SkillType | ToolType | string)[]
	body?: string
	link?: string | ILink
}

export interface ILink {
	title: string
	link: string
}

export interface IFile {
	type: FileType
	source: string
}

export interface IThumbnail {
	header: string
	thumbnail: string | null
	file?: IFile
	tags?: (TagType | string)[]
	highlights?: IHighlight[]
}
