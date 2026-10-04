import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/middle-earth-challenge-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/middle-earth-challenge-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/middle-earth-challenge-thumbnail.jpg', import.meta.url).href

const imgMap = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-01.png', import.meta.url).href
const imgMapClassic = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-02.png', import.meta.url).href
const imgMapZoomed = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-03.png', import.meta.url).href
const imgSettings = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-04.png', import.meta.url).href
const imgStats = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-05.png', import.meta.url).href
const imgCheckpoint = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-06.png', import.meta.url).href
const imgSync = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-07.png', import.meta.url).href
const imgFriends = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-08.png', import.meta.url).href
const imgMapZoomedMinimal = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-09.png', import.meta.url).href
const imgWelcome = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-10.png', import.meta.url).href

/**
 * Middle Earth Challenge — a personal React Native app that maps a
 * user's real-world walking/running distance onto Frodo's 1,235-mile
 * journey to Mount Doom. Not distributed publicly (Play Store rejects
 * apps referencing copyrighted LOTR content), so it ships via Firebase
 * App Tester instead. Screenshots here are from the running app, used
 * for a personal case study rather than app redistribution.
 */
export const middleEarthChallenge: IProject = {
	details: {
		header: 'Middle Earth Challenge',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
		tags: [TagType.Mobile],
	},
	content: [
		{
			title: 'Middle Earth Challenge',
		},
		{
			header: SectionName.Overview,
			body: `A personal React Native app that turns real-world walking or running distance into progress along Frodo's 1,235-mile journey from Hobbiton to Mount Doom. An interactive, gesture-driven map tracks the user's position on the route, unlocking illustrated checkpoints and trivia as real mileage accumulates. Built solo, end to end: map rendering, health-data integration, and offline-first storage.`,
		},
		{
			slideshow: {
				width: 1250,
				gap: 20,
				slides: [
					{ img: imgWelcome, caption: 'Home / welcome screen' },
					{ img: imgMap, caption: 'Map, Minimal theme' },
					{ img: imgMapZoomedMinimal, caption: 'Map, Minimal theme, zoomed' },
					{ img: imgMapClassic, caption: 'Map, Classic theme' },
					{ img: imgMapZoomed, caption: 'Map theme' },
					{ img: imgCheckpoint, caption: 'Unlocked checkpoint with lore and trivia' },
					{ img: imgStats, caption: 'Journey progress' },
					{ img: imgSettings, caption: 'Settings, incl. map theme' },
					{ img: imgSync, caption: 'Health Connect / Pedometer sync sources' },
					{ img: imgFriends, caption: 'Connect with friends' },
				],
			},
		},
		{
			header: 'Gesture-driven map',
			body: `The map is rendered with React Native Skia and driven by a custom gesture hook layering pinch-to-zoom and pan (react-native-gesture-handler + react-native-reanimated, scale clamped 0.5x–3x). Two independent visual themes — a minimal black-and-white ink style and a fuller color "Classic" style — plus an optional color toggle, let the same route data render in very different moods without touching the underlying map logic.`,
		},
		{
			header: 'Offline-first & health integration',
			body: `Progress is tracked locally first: OP-SQLite for persistence and Zustand for state, so the app works fully without a network connection. On Android, react-native-health-connect syncs real step/distance data; a separate reconciliation service merges health-data updates with manually-logged distance so both sources stay consistent without double-counting.`,
		},
		{
			header: SectionName.Details,
			highlight: [
				{
					header: HighlightName.Platform,
					tags: [TagType.Android],
				},
				{
					header: HighlightName.Skills,
					tags: [SkillType.Design, SkillType.TypeScript, SkillType.React, SkillType.UIUX, SkillType.Prototyping],
				},
				{
					header: HighlightName.Designer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Engineer,
					body: 'Kelly Gorr',
				},
				{
					header: HighlightName.Assets,
					link: 'github.com/k1tesurfen/mapome',
				},
			],
		},
	],
}
