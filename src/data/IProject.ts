import type { ReactNode } from 'react'

export enum TagType {
	Xbox = 'Xbox',
	Microsoft = 'Microsoft',
	Copilot = 'Copilot',
	Motion = 'motion',
	Poll = 'poll',
	Quiz = 'quiz',
	Template = 'template',
	Tooling = 'tooling',
	Infographic = 'infographic',
	Website = 'website',
	Mobile = 'mobile',
	Kinect = 'Xbox Kinect',
	Print = 'print',
	Figma = 'Figma',
	Design = 'design',
	Android = 'Android',
	AI = 'AI',
}
export enum SkillType {
	UIUX = 'UI-UX',
	Prototyping = 'prototyping',
	Design = 'design',
	CMS = 'CMS',
	Illustration = 'illustration',
	JQuery = 'jQuery',
	JavaScript = 'JavaScript',
	React = 'React',
	TypeScript = 'TypeScript',
	AngularJS = 'AngularJS',
	CICD = 'CI/CD',
	PHP = 'PHP',
	MySQL = 'MySQL',
	Ajax = 'Ajax',
	JSON = 'JSON',
	HTML = 'HTML',
	CSS = 'CSS',
	Fabric = 'UI Fabric',
	Node = 'Node.js',
	AI = 'AI',
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
	[SkillType.PHP, SkillType.MySQL, SkillType.CMS],
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
	Demo = 'demo',
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
	Content_Designer = 'Content Designer(s)',
	Dates = 'Dates',
	Engineer = 'Engineer(s)',
	Featured_On = 'Featured On',
	Illustrator = 'Illustrator',
	Localization = 'Localization',
	Motion = 'Motion',
	Motion_Designer = 'Motion designer',
	Platform = 'Platform',
	Platform_Accessories = 'Platform and Accessories',
	Skills = 'Skills',
	Tools = 'Tools',
	URL = 'URL',
}

/**
 * Canonical display order for `IHighlight` items within a Details (or
 * any other) section, enforced at render time by Section.tsx — NOT by
 * the order highlights are written in project data files. This means
 * project files can still list highlights in whatever order is
 * convenient to author (full flexibility preserved), while every page
 * always renders them consistently.
 *
 * Any highlight whose `header` isn't in this list (a custom/one-off
 * string header, or a HighlightName added later and not yet placed
 * here) falls through to the end, in the order it was originally
 * authored — so nothing is ever silently dropped.
 */
export const HIGHLIGHT_ORDER: (HighlightName | string)[] = [
	HighlightName.Platform,
	HighlightName.Platform_Accessories,
	HighlightName.Dates,
	HighlightName.Skills,
	HighlightName.Tools,
	HighlightName.Designer,
	HighlightName.Design_Lead,
	HighlightName.Content_Designer,
	HighlightName.Illustrator,
	HighlightName.Engineer,
	HighlightName.Motion,
	HighlightName.Motion_Designer,
	HighlightName.Featured_On,
	HighlightName.Localization,
	HighlightName.Assets,
	HighlightName.URL,
]

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
	/** A live, interactive React element embedded directly in the page
	 *  (e.g. a themed motion demo), instead of a static image. Rendered
	 *  full-width, matching the slideshow's layout treatment. */
	demo?: ReactNode
	/** Width of a `demo` section. 'full' (default) spans the full page
	 *  width, matching Slideshow. 'half' constrains it to the same
	 *  max-width as text sections (700px), so a demo can sit inline at
	 *  the same width as the body copy around it. */
	demoWidth?: 'full' | 'half'
}

export interface ISlideshow {
	neutralBorder?: boolean
	slides: ISlide[]
	width: number
	/** Horizontal spacing between slides, in px (applied as margin on
	 *  each side, so total gap between two slides is 2x this value).
	 *  Defaults to 5 (10px total) if not set. Since this is a fixed px
	 *  value rather than a percentage/count-based layout, it stays
	 *  visually consistent regardless of how many slides are in view. */
	gap?: number
}
export interface ISlide {
	/** Static image (required unless `demo` is provided). Also used as
	 *  the video poster when `file.type` is Video. */
	img?: string
	/** Optional 2x-density version of `img`, added to a `srcSet` so
	 *  high-DPI screens render the sharper asset. Purely additive — omit
	 *  it and the slide renders exactly as before (just `img`, no
	 *  srcSet). Not required for every slide the way thumbnails require
	 *  all 3 densities; add it only when a 2x asset actually exists. */
	img2x?: string
	caption?: string
	file?: IFile
	width?: number
	/** A live, interactive React element rendered in place of img/video
	 *  for this slide (e.g. a themed motion demo). */
	demo?: ReactNode
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
	thumbnail: { x1: string | null; x15: string | null; x2: string | null } | null
	neutralBorder?: boolean
	file?: IFile
	tags?: (TagType | string)[]
	highlights?: IHighlight[]
	/** A live, interactive React element rendered in place of the static
	 *  thumbnail image (e.g. a themed motion demo) on the homepage grid
	 *  card. When set, `thumbnail` is ignored for rendering (still used
	 *  for aria/inView bookkeeping) — this project's card shows a real,
	 *  running animation instead of a screenshot. */
	demo?: ReactNode
}
