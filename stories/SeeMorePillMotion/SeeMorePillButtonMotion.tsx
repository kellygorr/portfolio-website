import { mergeClasses, useIsomorphicLayoutEffect } from '@fluentui/react-components'
import { useCallback, useEffect, useId, useRef, useState, type MutableRefObject, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import {
	Add20Regular,
	ChartMultiple20Regular,
	ChevronDown20Regular,
	ChevronUp20Regular,
	Document20Regular,
	Flowchart20Regular,
	HatGraduation20Regular,
	LayoutInfographic20Regular,
	Mic20Regular,
	Notebook20Regular,
	SlideText20Regular,
	Table20Regular,
} from '@fluentui/react-icons'
import { useSeeMorePillStyles } from './SeeMorePillButtonMotion.styles'
import { darkestColor, type MotionPalette } from '../../src/styles/motionPalettes'
import { hexToRgba, lightenHex } from '../shared/motionTheme'
import { useDemoMotion } from '../../src/components/Page/DemoMotionContext'

/**
 * Themed port of the Maker Space "See more" pill button expand/collapse
 * motion (originally copilot-motion-POR/src/stories/
 * SeeMorePillButtonMotion.stories.tsx, from PR 5769919). Additional pill
 * buttons fade in with a stagger, fade out together, and the lower
 * content (divider + recent files list) uses a FLIP translateY
 * transition so it slides instead of jumping when the grid expands or
 * collapses.
 *
 * The real "See more"/"See less" toggle still works for manual
 * clicking, but this also runs a SCRIPTED replay (expand, hold, then
 * auto-collapse) driven by `replayToken` — same convention as
 * GroundingMenu/InputPositionDemo — so it's meant to be used with
 * `<Demo interactive>` (no `hideRestartIcon`): Demo's restart icon and
 * its auto-run-once-on-scroll-into-view both now have a real scripted
 * sequence to trigger here, instead of only relying on a visitor
 * finding and clicking the toggle themselves.
 */

export type DemoEntry = {
	key: string
	label: string
	icon: ReactNode
}

const TRANSITION_EASING = 'cubic-bezier(0,0,0,1)'
const TRANSITION_DURATION_MS = 400
// How long to hold the expanded state during a scripted replay (auto-
// run on scroll-into-view, or a manual restart-icon click) before
// auto-collapsing again — long enough to read the staggered tile
// entrance (last tile finishes at 3 * STAGGER_DELAY_MS + 200ms) and
// register the expanded grid before the sequence reverses.
const REPLAY_HOLD_MS = 1600
// Delay between each additional tile's fade-in, for the staggered
// reveal — matches the original POR's motionTokens.durationUltraFast.
// Exported so SeeMorePillStagger (the smaller, thumbnail-sized variant
// with just the grid + stagger motion, no recent files/suggestions/FLIP
// transition) can reuse the exact same timing.
export const STAGGER_DELAY_MS = 50

function DashboardIcon() {
	const id = useId()

	return (
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
			<path
				d="M17 5.5C17 4.11929 15.8807 3 14.5 3H5.5C4.11929 3 3 4.11929 3 5.5V14.5C3 15.8807 4.11929 17 5.5 17H11.0008L11.0014 16H8V13H11.003L11.0036 12H8V8H12V9.08812C12.3285 8.97074 12.6813 8.97351 13 9.08498V8H16V11.8529L17 12.8439V5.5ZM4 14.5V13H7V16H5.5L5.35554 15.9931C4.59489 15.9204 4 15.2797 4 14.5ZM12 7H8V4H12V7ZM13 4H14.5L14.6445 4.00687C15.4051 4.07955 16 4.7203 16 5.5V7H13V4ZM4 7V5.5L4.00687 5.35554C4.07955 4.59489 4.7203 4 5.5 4H7V7H4ZM7 8V12H4V8H7ZM12.8563 10.1458C12.713 10.0038 12.4984 9.96185 12.3121 10.0394C12.1259 10.117 12.0045 10.2989 12.0044 10.5007L12 18.4991C11.9999 18.7141 12.1373 18.9052 12.3412 18.9735C12.5451 19.0418 12.7699 18.972 12.8993 18.8003L14.8941 16.1535L18.3908 16.9295C18.6082 16.9777 18.8313 16.8763 18.938 16.6809C19.0447 16.4854 19.0092 16.2429 18.8511 16.0862L12.8563 10.1458Z"
				fill="black"
				fillOpacity="0.635294"
			/>
			<path
				d="M12.8563 10.1451C12.713 10.0031 12.4984 9.96112 12.3121 10.0387C12.1259 10.1163 12.0045 10.2982 12.0044 10.5L12 18.4984C11.9999 18.7134 12.1373 18.9044 12.3412 18.9727C12.5451 19.041 12.7699 18.9713 12.8993 18.7996L14.8941 16.1527L18.3908 16.9287C18.6082 16.977 18.8313 16.8756 18.938 16.6801C19.0447 16.4847 19.0092 16.2422 18.8511 16.0854L12.8563 10.1451Z"
				fill={`url(#${id})`}
			/>
			<defs>
				<radialGradient
					id={id}
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="matrix(5.79552 10.1541 -8.58146 7.67337 13.323 7.00104)"
				>
					<stop stopColor="#8C48FF" />
					<stop offset="0.384017" stopColor="#F2598A" />
					<stop offset="0.853186" stopColor="#FFB152" />
				</radialGradient>
			</defs>
		</svg>
	)
}

export const primaryEntries: DemoEntry[] = [
	{ key: 'document', label: 'Document', icon: <Document20Regular /> },
	{ key: 'presentation', label: 'Presentation', icon: <SlideText20Regular /> },
	{ key: 'workbook', label: 'Workbook', icon: <Table20Regular /> },
	{ key: 'page', label: 'Page', icon: <Notebook20Regular /> },
	{ key: 'report', label: 'Report', icon: <ChartMultiple20Regular /> },
	{ key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
]

export const additionalEntries: DemoEntry[] = [
	{ key: 'infographic', label: 'Infographic', icon: <LayoutInfographic20Regular /> },
	{ key: 'mindmap', label: 'Mind map', icon: <Flowchart20Regular /> },
	{ key: 'studyGuide', label: 'Study guide', icon: <HatGraduation20Regular /> },
	{ key: 'audioOverview', label: 'Audio overview', icon: <Mic20Regular /> },
]

function readTranslateY(element: HTMLElement): number {
	const { transform } = window.getComputedStyle(element)
	if (transform === 'none') return 0
	return new DOMMatrixReadOnly(transform).m42
}

/**
 * FLIP transition for the "lower content" (divider + recent files list):
 * measures its position before/after the grid's layout change (expanding
 * or collapsing reveals/hides the additional-entries row), then animates
 * a translateY from that measured delta back to 0 — so the lower content
 * visibly SLIDES into its new position instead of instantly snapping
 * there the moment the grid reflows. Framework-agnostic (plain DOM
 * measurement + WAAPI), ported as-is from the original POR version other
 * than removing Fluent-token references (now takes plain color/padding
 * values instead of tokens.*).
 */
export function useLowerContentTransition({
	expanded,
	railBg,
	containerPaddingInline,
	onCollapseSettled,
	skipNextTransitionRef,
}: {
	expanded: boolean
	railBg: string
	containerPaddingInline: string
	onCollapseSettled: () => void
	skipNextTransitionRef?: MutableRefObject<boolean>
}) {
	const [makerSpaceElement, setMakerSpaceElement] = useState<HTMLDivElement | null>(null)
	const lowerContentRef = useRef<HTMLDivElement>(null)
	const previousExpandedRef = useRef(expanded)
	const interruptedTranslateYRef = useRef<number | null>(null)
	const onCollapseSettledRef = useRef(onCollapseSettled)
	onCollapseSettledRef.current = onCollapseSettled

	const makerSpaceRef = useCallback((node: HTMLDivElement | null): void => {
		setMakerSpaceElement(node)
	}, [])

	useIsomorphicLayoutEffect(() => {
		const wasExpanded = previousExpandedRef.current
		previousExpandedRef.current = expanded

		if (wasExpanded === expanded) {
			interruptedTranslateYRef.current = null
			return
		}

		const element = lowerContentRef.current
		if (!element || !makerSpaceElement) {
			if (!expanded) onCollapseSettledRef.current()
			return
		}

		element.getAnimations().forEach((animation) => animation.cancel())

		if (skipNextTransitionRef?.current) {
			skipNextTransitionRef.current = false
			interruptedTranslateYRef.current = null
			element.style.position = ''
			element.style.top = ''
			element.style.left = ''
			element.style.right = ''
			element.style.paddingInline = ''
			element.style.backgroundColor = ''
			element.style.minHeight = ''
			if (!expanded) onCollapseSettledRef.current()
			return
		}

		const removableElements = Array.from(makerSpaceElement.querySelectorAll<HTMLElement>('[data-collapse-removable]'))
		const previousDisplays = removableElements.map((removableElement) => removableElement.style.display)

		const measureCollapsedTop = (): number => {
			removableElements.forEach((removableElement) => {
				removableElement.style.display = 'none'
			})
			const top = element.getBoundingClientRect().top
			removableElements.forEach((removableElement, index) => {
				removableElement.style.display = previousDisplays[index]
			})
			return top
		}

		const expandedTop = element.getBoundingClientRect().top
		const collapsedTop = measureCollapsedTop()
		const delta = collapsedTop - expandedTop

		if (delta === 0) {
			if (!expanded) onCollapseSettledRef.current()
			interruptedTranslateYRef.current = null
			return
		}

		let cancelled = false
		// Capture `offsetTop` FIRST, while the element is still in its
		// normal (un-inflated) static-flow size — reading a layout
		// property like `offsetTop` forces the browser to synchronously
		// flush/recompute layout at that instant. If the oversized
		// `minHeight` below were applied first (while still `position:
		// static`), that forced layout read would reflect the element
		// TEMPORARILY ballooned to ~100vh tall while still participating
		// in normal flow — inside any flex-centered ancestor (e.g.
		// Storybook's `layout: 'centered'`, or DemoThumbnail's own
		// `alignItems: center` wrapper), that momentary inflation
		// visibly re-centers/shifts the whole block, corrupting the
		// measured offsetTop by however much the centering shifted.
		// This was a real, measurable several-px mismatch between where
		// the animation visually settled and the element's true final
		// static-flow position — seen as a brief "flash"/snap right as
		// the transition finished and position reverted to static.
		// Switching to `position: absolute` (removing the element from
		// flow) BEFORE applying the oversized minHeight avoids this
		// entirely, since an absolutely-positioned element's own size
		// can no longer influence its (now former) flow ancestors.
		const offsetTop = element.offsetTop
		element.style.position = 'absolute'
		element.style.top = `${offsetTop}px`
		element.style.left = '0'
		element.style.right = '0'
		element.style.paddingInline = containerPaddingInline
		element.style.backgroundColor = railBg
		element.style.minHeight = `calc(100vh - ${expandedTop}px + ${Math.abs(delta)}px)`

		const clearPositioning = (): void => {
			element.style.position = ''
			element.style.top = ''
			element.style.left = ''
			element.style.right = ''
			element.style.paddingInline = ''
			element.style.backgroundColor = ''
			element.style.minHeight = ''
		}

		const animation = element.animate(
			[
				{ transform: `translateY(${interruptedTranslateYRef.current ?? (expanded ? delta : 0)}px)` },
				{ transform: `translateY(${expanded ? 0 : delta}px)` },
			],
			{
				duration: TRANSITION_DURATION_MS,
				easing: TRANSITION_EASING,
				fill: expanded ? 'backwards' : 'forwards',
			}
		)

		interruptedTranslateYRef.current = null
		animation.finished.then(
			() => {
				if (cancelled) return
				element.getAnimations().forEach((activeAnimation) => activeAnimation.cancel())
				// Order matters here: unmount the (already invisible,
				// exit-faded) additional tiles via flushSync BEFORE
				// reverting this element's own position back to static
				// flow. Those tiles are opacity:0 but still MOUNTED (and
				// still occupying grid row space) until
				// onCollapseSettledRef actually sets contentMounted
				// false — if clearPositioning() ran first (as it used
				// to), this element would briefly revert to a static
				// position computed against a grid that still reserves
				// space for those invisible tiles, which is TALLER than
				// the final collapsed grid: a visible one-frame flash as
				// the element briefly renders too low, then snaps up
				// once the tiles are actually removed a moment later.
				// Doing the unmount first means the grid has already
				// shrunk to its true final size by the time position
				// reverts, so there's no discrepancy window at all.
				if (!expanded) {
					flushSync(() => {
						onCollapseSettledRef.current()
					})
				}
				clearPositioning()
			},
			() => undefined
		)

		return () => {
			cancelled = true
			if (element.style.position === 'absolute') {
				interruptedTranslateYRef.current = readTranslateY(element)
			}
			animation.cancel()
			clearPositioning()
		}
	}, [containerPaddingInline, expanded, makerSpaceElement, railBg])

	return { makerSpaceRef, lowerContentRef }
}

function DelayedSuggestions({ expanded }: { expanded: boolean }) {
	const styles = useSeeMorePillStyles()
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (!expanded) {
			setLoaded(false)
			return
		}
		const timeoutId = window.setTimeout(() => setLoaded(true), 2000)
		return () => window.clearTimeout(timeoutId)
	}, [expanded])

	return (
		<div className={styles.suggestionBlock}>
			{loaded ? (
				<>
					<div className={styles.suggestionTitle}>Project brief</div>
					<div>Summarize the milestones and next steps.</div>
				</>
			) : (
				<>
					<div>Loading suggested creation...</div>
					<div className={styles.suggestionSkeleton} />
					<div className={styles.suggestionSkeleton} style={{ width: '70%' }} />
				</>
			)}
		</div>
	)
}

export function PillButton({ entry, tabIndex }: { entry: DemoEntry; tabIndex?: number }) {
	const styles = useSeeMorePillStyles()
	return (
		<button type="button" className={styles.pill} tabIndex={tabIndex}>
			<span className={styles.icon} aria-hidden="true">
				{entry.icon}
			</span>
			<span className={styles.label}>{entry.label}</span>
		</button>
	)
}

export interface SeeMorePillButtonMotionProps {
	/** Full motion palette to theme every part of this component from. */
	palette?: MotionPalette
}

export const SeeMorePillButtonMotion = ({ palette }: SeeMorePillButtonMotionProps) => {
	const styles = useSeeMorePillStyles()
	const [expanded, setExpanded] = useState(false)
	const [contentMounted, setContentMounted] = useState(expanded)
	const [collapseMotionFinishedKey, setCollapseMotionFinishedKey] = useState(0)
	const pendingCollapseRemovalRef = useRef(false)
	const skipNextLowerContentTransitionRef = useRef(false)
	// Set while a scripted replay's auto-collapse is in flight, waiting
	// for the lower-content FLIP transition to actually finish (see
	// useLowerContentTransition's onCollapseSettled below) before
	// reporting the replay as done — same completion signal the
	// collapse-removal effect below already uses, just also consulted
	// here so "done" lines up with the real animation finishing instead
	// of a separate guessed timeout.
	const pendingReplayDoneRef = useRef(false)
	const { replayToken, onReplayStateChange } = useDemoMotion()
	const handledReplayToken = useRef(replayToken)

	// Rail is a light, near-white surface (same intent as Fluent's
	// colorNeutralBackground1) so the pills visibly pop off of it —
	// palette.background2 is exactly this token (a plain white surface
	// reserved for elements that need to stand off the demo backdrop).
	const railBg = palette?.background2 ?? '#fff'
	const accentDark = palette ? darkestColor(palette) : '#242424'
	const pillBorder = palette ? lightenHex(palette.colors[1], 0.5) : '#e5e5e5'

	const themeVars = palette
		? ({
				'--smp-rail-bg': railBg,
				'--smp-pill-bg': railBg,
				'--smp-pill-border': pillBorder,
				'--smp-pill-hover-bg': hexToRgba(palette.colors[1], 0.12),
				'--smp-text': accentDark,
				'--smp-text-secondary': hexToRgba(accentDark, 0.72),
				'--smp-icon-color': hexToRgba(accentDark, 0.78),
				'--smp-divider': pillBorder,
				'--smp-suggestion-bg': hexToRgba(palette.colors[1], 0.1),
				'--smp-skeleton-bg': hexToRgba(palette.colors[1], 0.22),
			} as React.CSSProperties)
		: undefined

	const { makerSpaceRef, lowerContentRef } = useLowerContentTransition({
		expanded,
		railBg,
		containerPaddingInline: '16px',
		onCollapseSettled: () => setCollapseMotionFinishedKey((key) => key + 1),
		skipNextTransitionRef: skipNextLowerContentTransitionRef,
	})

	useIsomorphicLayoutEffect(() => {
		if (expanded) {
			setContentMounted(true)
			pendingCollapseRemovalRef.current = false
			return
		}
		if (!contentMounted) return
		pendingCollapseRemovalRef.current = true
	}, [contentMounted, expanded])

	useIsomorphicLayoutEffect(() => {
		if (pendingCollapseRemovalRef.current) {
			setContentMounted(false)
			pendingCollapseRemovalRef.current = false
		}
		if (pendingReplayDoneRef.current) {
			pendingReplayDoneRef.current = false
			onReplayStateChange?.(false)
		}
	}, [collapseMotionFinishedKey])

	const handleToggle = (): void => {
		setExpanded((current) => !current)
	}

	// Scripted replay: expand, hold, then auto-collapse — fires once
	// when this demo first scrolls into view, and again on every
	// manual restart-icon click (see Demo.tsx's docstring for why this
	// component stays mounted continuously across replays instead of
	// being remounted).
	useEffect(() => {
		if (handledReplayToken.current === replayToken) {
			return
		}
		handledReplayToken.current = replayToken

		let cancelled = false
		const timers: number[] = []
		pendingReplayDoneRef.current = false

		const startExpand = () => {
			if (cancelled) return
			setExpanded(true)
			timers.push(
				window.setTimeout(() => {
					if (cancelled) return
					// Collapsing here is a plain setExpanded(false) — same
					// path handleToggle/a manual "See less" click takes —
					// so it runs the exact same FLIP-collapse + stagger-exit
					// as a real click. `pendingReplayDoneRef` marks that the
					// NEXT collapseMotionFinishedKey bump (the FLIP
					// transition's own real completion signal, not a
					// guessed delay) should report the replay as finished.
					pendingReplayDoneRef.current = true
					setExpanded(false)
				}, REPLAY_HOLD_MS)
			)
		}

		// Always snap back to the collapsed starting state before replaying.
		// That keeps the header replay button interruptible even while the
		// demo is expanded or mid-collapse, without waiting for the normal
		// FLIP collapse animation to finish first.
		if (expanded || contentMounted) {
			skipNextLowerContentTransitionRef.current = expanded
			const lowerContent = lowerContentRef.current
			lowerContent?.getAnimations().forEach((animation) => animation.cancel())
			if (lowerContent) {
				lowerContent.style.position = ''
				lowerContent.style.top = ''
				lowerContent.style.left = ''
				lowerContent.style.right = ''
				lowerContent.style.paddingInline = ''
				lowerContent.style.backgroundColor = ''
				lowerContent.style.minHeight = ''
			}
			flushSync(() => {
				setExpanded(false)
				setContentMounted(false)
				pendingCollapseRemovalRef.current = false
			})
			timers.push(window.setTimeout(startExpand, 0))
		} else {
			startExpand()
		}

		return () => {
			cancelled = true
			timers.forEach((t) => window.clearTimeout(t))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [replayToken])

	const visible = expanded || contentMounted

	return (
		<div className={styles.canvas} style={themeVars}>
			<section className={styles.rail} aria-label="Maker space rail">
				<div ref={makerSpaceRef}>
					<div className={styles.grid}>
						<PillButton entry={{ key: 'new', label: 'New', icon: <Add20Regular /> }} />
						<button
							type="button"
							className={mergeClasses(styles.pill, styles.borderlessPill)}
							aria-expanded={expanded}
							onClick={handleToggle}
						>
							<span className={styles.icon} aria-hidden="true">
								{expanded ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
							</span>
							<span className={styles.label}>{expanded ? 'See less' : 'See more'}</span>
						</button>
						{primaryEntries.map((entry) => (
							<PillButton key={entry.key} entry={entry} />
						))}
						{visible &&
							additionalEntries.map((entry, index) => (
								<div
									key={entry.key}
									data-collapse-removable
									// Entrance (expanding): staggered fade-in, one tile
									// at a time (animationDelay below). Exit
									// (collapsing, still mounted while the lower
									// content's FLIP transition plays out): fade out
									// together, no stagger — matches the original
									// POR's AdditionalTileMotion exit keyframes.
									className={expanded ? styles.additionalTile : styles.additionalTileExit}
									style={expanded ? { animationDelay: `${index * STAGGER_DELAY_MS}ms` } : undefined}
								>
									<PillButton entry={entry} />
								</div>
							))}
					</div>
					{visible && (
						<div data-collapse-removable>
							<DelayedSuggestions expanded={expanded} />
						</div>
					)}
				</div>
				<div ref={lowerContentRef} className={styles.lowerContent}>
					<div className={styles.divider} role="separator" />
					<div className={styles.recentList} aria-label="Recent files">
						<div className={styles.recentItem}>
							<Document20Regular />
							<div>
								<div className={styles.recentTitle}>Quarterly plan</div>
								<div>Copilot page</div>
							</div>
						</div>
						<div className={styles.recentItem}>
							<Document20Regular />
							<div>
								<div className={styles.recentTitle}>Annual plan</div>
								<div>Copilot page</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
