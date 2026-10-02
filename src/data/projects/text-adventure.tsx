import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/text-adventure-new-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/text-adventure-new-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/text-adventure-new-thumbnail.jpg', import.meta.url).href

// Real UI screenshots from a full playthrough of the on-rails demo build
// (websites/text-adventure-on-rails — the scripted, zero-backend-
// dependency version this portfolio's URL section already points
// visitors to). Replaces the earlier placeholder slideshow, which only
// showed isolated AI-generated background/character art with no actual
// app UI.
const imgLanding = new URL('../../assets/images/text-adventure-new/text-adventure-landing.png', import.meta.url).href
const imgPrologue = new URL('../../assets/images/text-adventure-new/text-adventure-prologue.png', import.meta.url).href
const imgRoom1Autofill = new URL('../../assets/images/text-adventure-new/text-adventure-room1-autofill.png', import.meta.url).href
const imgRoom1KeyFound = new URL('../../assets/images/text-adventure-new/text-adventure-room1-key-found.png', import.meta.url).href
const imgRoom1Inventory = new URL('../../assets/images/text-adventure-new/text-adventure-room1-inventory.png', import.meta.url).href
const imgRoom2 = new URL('../../assets/images/text-adventure-new/text-adventure-room2.png', import.meta.url).href
const imgRoom2Sword = new URL('../../assets/images/text-adventure-new/text-adventure-room2-sword.png', import.meta.url).href
const imgRoom3DeadEnd = new URL('../../assets/images/text-adventure-new/text-adventure-room3-deadend.png', import.meta.url).href
const imgRoom2Inventory = new URL('../../assets/images/text-adventure-new/text-adventure-room2-inventory.png', import.meta.url).href
const imgRoom4 = new URL('../../assets/images/text-adventure-new/text-adventure-room4.png', import.meta.url).href
const imgEscaped = new URL('../../assets/images/text-adventure-new/text-adventure-escaped.png', import.meta.url).href

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
		header: 'Text Adventure',
		demoBadge: true,
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.AI, TagType.Website],
	},
	content: [
		{
			title: 'Text Adventure',
		},
		{
			slideshow: {
				width: 1250,
				slides: [
					{ img: imgLanding, caption: 'Theme select — dungeon, forest, or castle' },
					{ img: imgPrologue, caption: 'Prologue' },
					{ img: imgRoom1Autofill, caption: 'Room 1 — investigating the chair' },
					{ img: imgRoom1KeyFound, caption: 'A key is spotted underneath the chair' },
					{ img: imgRoom1Inventory, caption: 'Key picked up and tracked in inventory' },
					{ img: imgRoom2, caption: 'Room 2 — a larger chamber with three exits' },
					{ img: imgRoom2Sword, caption: 'A sword is spotted on the table' },
					{ img: imgRoom3DeadEnd, caption: 'A dead-end detour — collapsed rubble blocks the way' },
					{ img: imgRoom2Inventory, caption: 'Back in Room 2 — sword picked up' },
					{ img: imgRoom4, caption: 'Room 4 — the guard room, final obstacle ahead' },
					{ img: imgEscaped, caption: 'Escaped!' },
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
			header: 'Turning AI Output Into Reliable Game State',
			body: `The hardest problem wasn't generating content, it was trusting it. The model would routinely hallucinate: inventing items in an empty inventory, adding obstacles to doors it had just said were unlocked, or re-blocking a room the player had already passed through. Rather than trust the model's narration, the app kept track of the game state (player inventory, room state, and progression), so that the model couldn't make things up randomly.`,
		},
		{
			header: 'Prompt Engineering for Structured Actions',
			body: `When returning the text description, the model also labels the action type (like picked up vs. looked at), so the app can update the game state correctly instead of guessing from the model's response alone. If a pick-up is labeled successful but the model does not respond with the required item data (so the game knows what was picked up), a fallback re-prompts as if the player had dropped the item, so the game degrades gracefully instead of losing an item permanently. The player can try and pick up the item again.`,
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
					tags: [SkillType.Design, SkillType.TypeScript, SkillType.React, SkillType.Node, SkillType.AI],
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
