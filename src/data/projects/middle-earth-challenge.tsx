import { HighlightName, IProject, SectionName, SkillType, TagType } from '../IProject'
import { formatYear } from '../../utils/dateFormat'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/middle-earth-challenge-thumbnail.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/middle-earth-challenge-thumbnail.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/middle-earth-challenge-thumbnail.jpg', import.meta.url).href

const imgMap = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-01.webp', import.meta.url).href
const imgMapClassic = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-02.webp', import.meta.url).href
const imgMapZoomed = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-03.webp', import.meta.url).href
const imgSettings = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-04.png', import.meta.url).href
const imgStats = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-05.png', import.meta.url).href
const imgCheckpoint = new URL('../../assets/images/middle-earth-challenge/middle-earth-challenge-06.webp', import.meta.url).href
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
			header: SectionName.Overview,
			body: `A personal React Native app that turns real-world walking or running distance into progress along Frodo's 1,235-mile journey from Hobbiton to Mount Doom. It tracks the user's position on the route, unlocks illustrated checkpoints and trivia as real mileage accumulates, and lets friends see each other's progress along the journey for extra motivation.<br /><br />The user's miles can be tracked across multiple sources: manual entries, phone health data (including smart watch), and live pedometer data. This allows users to track miles in the way that works best for them.`,
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
					tags: [SkillType.Design, SkillType.TypeScript, SkillType.React, SkillType.UIUX, SkillType.CSS, TagType.Motion],
				},
				{
					header: HighlightName.Date,
					body: formatYear(2026),
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
					link: 'https://github.com/k1tesurfen/mapome',
				},
			],
		},
	],
}
