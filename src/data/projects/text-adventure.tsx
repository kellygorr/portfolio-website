import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/text-adventure-new-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/text-adventure-new-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/text-adventure-new-thumbnail.jpg', import.meta.url).href

const imgDungeonBg = new URL('../../assets/images/text-adventure/text-adventure-01.jpeg', import.meta.url).href
const imgCastleBg = new URL('../../assets/images/text-adventure/text-adventure-02.jpeg', import.meta.url).href
const imgForestBg = new URL('../../assets/images/text-adventure/text-adventure-03.jpeg', import.meta.url).href
const imgDungeonCharacter = new URL('../../assets/images/text-adventure/text-adventure-04.png', import.meta.url).href
const imgCastleCharacter = new URL('../../assets/images/text-adventure/text-adventure-05.png', import.meta.url).href
const imgForestCharacter = new URL('../../assets/images/text-adventure/text-adventure-06.png', import.meta.url).href

/**
 * Text Adventure — a personal learning project exploring generative AI as
 * a live game engine: OpenAI generates rooms, story text, and art on the
 * fly, and the app has to turn that unreliable, occasionally-hallucinated
 * output into a consistent, playable text adventure. Built solo as a
 * hands-on way to learn prompt engineering and the practical failure
 * modes of LLM-driven applications.
 *
 * SCAFFOLDING NOTE: content below is a first pass built from the repo's
 * own README (its "Challenges" section already documented real,
 * specific AI-reliability problems and fixes) and existing in-game art
 * assets. No actual app screenshots yet — slideshow currently uses the
 * game's AI-generated background/character art as placeholders. Revisit
 * before treating this as final: confirm tone, trim/expand sections,
 * and swap in real UI screenshots once captured.
 */
export const textAdventure: IProject = {
	details: {
		header: 'Text Adventure',
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
					{ img: imgDungeonBg, caption: 'AI-generated dungeon room background' },
					{ img: imgCastleBg, caption: 'AI-generated castle room background' },
					{ img: imgForestBg, caption: 'AI-generated forest room background' },
					{ img: imgDungeonCharacter, caption: 'AI-generated character art, dungeon theme' },
					{ img: imgCastleCharacter, caption: 'AI-generated character art, castle theme' },
					{ img: imgForestCharacter, caption: 'AI-generated character art, forest theme' },
				],
			},
		},
		{
			header: SectionName.URL,
			body: '<a href="https://kellygorr.com/websites/text-adventure">https://kellygorr.com/websites/text-adventure</a><br />The live OpenAI backend is no longer running; this demo replays a scripted playthrough instead.',
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
