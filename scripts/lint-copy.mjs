import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const projectDir = new URL('../src/data/projects/', import.meta.url)

const properNouns = new Set([
	'AI',
	'API',
	'Assistant',
	'Awards',
	'Box',
	'Broadcast',
	'Cafe',
	'Call',
	'Championship',
	'Central',
	'Challenge',
	'Copilot',
	'Cognition',
	'DAB',
	'Daily',
	'Design',
	'Duty',
	'E3',
	'Earth',
	'Figma',
	'Fluent',
	'FRE',
	'Game',
	'Gamescom',
	'Gmail',
	'Gold',
	'Grounding',
	'Health',
	'HTML',
	'Hryb',
	'Instagram',
	'Jana',
	'Jewel',
	'Kane',
	'Kelly',
	'Kinect',
	'Kotaku',
	'Larry',
	'Live',
	'Mental',
	'Microsoft',
	'Middle',
	'Mona',
	'Notebooks',
	'Order',
	'Outlook',
	'PDF',
	'Q3',
	'React',
	'Slipknot',
	'Show',
	'Star',
	'Strapi',
	'Taco',
	'Tazo',
	'The',
	'Thrones',
	'TypeScript',
	'Twitter',
	'UX',
	'Verge',
	'Video',
	'Wars',
	'Web',
	'Windows',
	'Witcher',
	'Xbox',
	'XLEi',
])

const ignoredAllCaps = /^[A-Z0-9&/+-]{2,}$/
const wordPattern = /[\p{L}\p{N}][\p{L}\p{N}.'’/&+-]*/gu
const propPattern = /\b(header|title|body|caption):\s*(['"`])([\s\S]*?)\2/g

const stripMarkup = (value) =>
	value
		.replace(/<[^>]+>/g, ' ')
		.replace(/\[[^\]]*\]/g, ' ')
		.replace(/\{[^}]*\}/g, ' ')

const isAllowedCapital = (word) => {
	const normalized = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N})]+$/gu, '').replace(/[’']s$/u, '')
	if (!normalized) return true
	if (ignoredAllCaps.test(normalized)) return true
	if (properNouns.has(normalized)) return true
	if (/^\d/.test(normalized)) return true
	if (normalized.includes('.')) return true
	return false
}

const getLine = (text, index) => text.slice(0, index).split('\n').length

const issues = []

for (const file of readdirSync(projectDir).filter((name) => /\.(ts|tsx)$/.test(name)).sort()) {
	const path = join(projectDir.pathname, file)
	const text = readFileSync(path, 'utf8')
	for (const match of text.matchAll(propPattern)) {
		const [, prop, , rawValue] = match
		const line = getLine(text, match.index)
		const value = rawValue.replace(/\s+/g, ' ').trim()
		const readable = stripMarkup(value)
		const readableForSpacing = value.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')

		if (/[.!?] {2,}\S/.test(readableForSpacing)) {
			issues.push({ file, line, message: `${prop} has a double space after punctuation`, value })
		}

		if (/\bplaceholder\b|add screenshots?/i.test(readable)) {
			issues.push({ file, line, message: `${prop} contains placeholder/review-note language`, value })
		}

		if (prop === 'header' || prop === 'title') {
			const words = [...readable.matchAll(wordPattern)].map((wordMatch) => ({
				word: wordMatch[0],
				index: wordMatch.index,
			}))
			words.slice(1).forEach(({ word }) => {
				if (/^\p{Lu}/u.test(word) && !isAllowedCapital(word)) {
					issues.push({
						file,
						line,
						message: `${prop} may not be sentence case: unexpected capitalized word "${word}"`,
						value,
					})
				}
			})
		}
	}
}

if (issues.length) {
	console.error(`Copy lint found ${issues.length} issue${issues.length === 1 ? '' : 's'}:\n`)
	issues.forEach(({ file, line, message, value }) => {
		console.error(`${file}:${line} ${message}`)
		console.error(`  ${value}\n`)
	})
	process.exitCode = 1
} else {
	console.log('Copy lint passed.')
}
