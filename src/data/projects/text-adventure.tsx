import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { formatYear } from '../../utils/dateFormat'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/text-adventure-new-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/text-adventure-new-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/text-adventure-new-thumbnail.jpg', import.meta.url).href

// Real UI screenshots from a full playthrough of the on-rails demo build
// (websites/text-adventure-on-rails — the scripted, zero-backend-
// dependency version this portfolio's URL section already points
// visitors to). Replaces the earlier placeholder slideshow, which only
// showed isolated AI-generated background/character art with no actual
// app UI.
const imgLanding = new URL('../../assets/images/text-adventure-new/text-adventure-landing.webp', import.meta.url).href
const imgRoom1Autofill = new URL('../../assets/images/text-adventure-new/text-adventure-room1-autofill.png', import.meta.url).href
const imgRoom2 = new URL('../../assets/images/text-adventure-new/text-adventure-room2.png', import.meta.url).href
const imgRoom3DeadEnd = new URL('../../assets/images/text-adventure-new/text-adventure-room3-deadend.png', import.meta.url).href
const imgRoom4 = new URL('../../assets/images/text-adventure-new/text-adventure-room4.png', import.meta.url).href
const imgEscaped = new URL('../../assets/images/text-adventure-new/text-adventure-escaped.webp', import.meta.url).href

/**
 * Text Adventure — a personal learning project exploring generative AI as
 * a live game engine: OpenAI generates rooms, story text, and art on the
 * fly, and the app has to turn that unreliable, occasionally-hallucinated
 * output into a consistent, playable text adventure. Built solo as a
 * hands-on way to learn prompt engineering and the practical failure
 * modes of LLM-driven applications.
 */
export const textAdventure: IProject = {
	details: {
		header: 'Text adventure',
		demoBadge: true,
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [SkillType.AI, TagType.Website],
	},
	content: [
		{
			title: 'Text adventure',
		},
		{
			slideshow: {
				width: 1250,
				slides: [
					{
						img: imgLanding,
						caption: 'Select theme',
						alt: 'Text adventure theme selection screen with options for dungeon, forest, and castle.',
					},
					{
						img: imgRoom1Autofill,
						caption: 'Room 1',
						alt: 'Text adventure game screen showing room 1 with illustrated dungeon artwork, room text, and an autofilled action to investigate the chair.',
					},
					{
						img: imgRoom2,
						caption: 'Room 2',
						alt: 'Text adventure game screen showing room 2, with dungeon artwork on the left and room description, exits, response text, and inventory controls on the right.',
					},
					{
						img: imgRoom3DeadEnd,
						caption: 'Dead end',
						alt: 'Text adventure game screen showing a dead-end room where collapsed rubble blocks the way forward.',
					},
					{
						img: imgRoom4,
						caption: 'Room 4',
						alt: 'Text adventure game screen showing room 4 with guard room artwork, final obstacle text, and inventory controls.',
					},
					{
						img: imgEscaped,
						caption: 'Escaped!',
						alt: 'Text adventure end screen confirming the player escaped the dungeon.',
					},
				],
			},
		},
		{
			header: SectionName.URL,
			body: '[ <a href="https://kellygorr.com/websites/text-adventure">https://kellygorr.com/websites/text-adventure</a> ]<br />The live OpenAI backend is no longer running; this demo replays a scripted playthrough instead.',
		},
		{
			header: SectionName.Overview,
			body: `A personal learning project: a text adventure game where OpenAI generates the rooms, story, and art in real time. This was built to learn generative AI application development and prompt engineering hands-on.`,
		},
		{
			header: 'Turning AI output into reliable game state',
			body: `The hardest problem wasn't generating content, it was trusting it. I designed guardrails so unreliable model output could still support a playable app. Rather than treating the model's narration as the source of truth, the app kept track of the game state (player inventory, room state, and progression). That meant the model could enrich the experience without being allowed to rewrite history, or add brand new obstacles (for example, saying an avalanche blocked a door that the user had already opened). Models are better at maintaining conversational history and context now, but at the time this needed to be guardrailed by the app.`,
		},
		{
			header: 'Off the rails (fallback recovery)',
			body: `I tried to rely on the model to label the appropriate action type the user was performing, but when the model failed to understand an interaction, the app could not always use the normal guardrails without confusing the model further. Instead, it used a fallback prompt that reframed the moment. For example, if a character was trying to pick up an item and the model returned data that showed it did not understand what was happening, the game would tell the player they had dropped the item so they could try picking it up again. This gave the model another chance to infer the interaction instead of leaving the player stuck.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Website],
				},
				{
					header: HighlightName.Skills,
					tags: [
						SkillType.Design,
						SkillType.UIUX,
						SkillType.TypeScript,
						SkillType.React,
						SkillType.HTML,
						SkillType.CSS,
						SkillType.AI,
						TagType.Motion,
					],
				},
				{
					header: HighlightName.Date,
					body: formatYear(2025),
				},
				{
					header: HighlightName.Designer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
			],
		},
	],
}
