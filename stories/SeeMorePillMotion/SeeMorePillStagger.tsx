import { mergeClasses, useIsomorphicLayoutEffect } from '@fluentui/react-components'
import { useEffect, useRef, useState } from 'react'
import { Add20Regular, ChevronDown20Regular, ChevronUp20Regular, Document20Regular } from '@fluentui/react-icons'
import { useSeeMorePillStyles } from './SeeMorePillButtonMotion.styles'
import {
	PillButton,
	primaryEntries,
	additionalEntries,
	STAGGER_DELAY_MS,
	useLowerContentTransition,
} from './SeeMorePillButtonMotion'
import { darkestColor, type MotionPalette } from '../../src/styles/motionPalettes'
import { hexToRgba, lightenHex } from '../shared/motionTheme'
import { useDemoMotion } from '../../src/components/Page/DemoMotionContext'

// How long to hold each expanded/collapsed state during `autoPlay`
// before toggling again — long enough to read the stagger settle in
// (last tile's entrance finishes at 3 * STAGGER_DELAY_MS + 200ms) and
// the lower-content FLIP slide settle in, and register the collapsed
// state before looping back.
const AUTO_PLAY_HOLD_MS = 1800

/**
 * Smaller variant of SeeMorePillButtonMotion — a minified version of
 * the SAME expand/collapse motion (staggered additional-tile fade-in,
 * FLIP-animated lower content sliding the divider/recent-files list
 * into place), just WITHOUT the suggestion block, and with a reduced
 * (`compact`) entry count option — for use as a homepage grid card
 * thumbnail, where the full component's fixed-height rail (560px) is
 * too tall for a thumbnail slot.
 *
 * Reuses the same PillButton, primaryEntries/additionalEntries,
 * STAGGER_DELAY_MS, and useLowerContentTransition (the FLIP-slide
 * hook) as the full component (all exported from
 * SeeMorePillButtonMotion.tsx) — this file only re-implements the
 * smaller rail/layout and the autoPlay loop, not the actual motion
 * logic, so both components' behavior stays identical.
 */
export interface SeeMorePillStaggerProps {
	/** Full motion palette to theme every part of this component from. */
	palette?: MotionPalette
	/** When true, the toggle isn't click-driven — instead the component
	 *  loops expand/collapse on its own timer (see AUTO_PLAY_HOLD_MS),
	 *  pausing while DemoThumbnail/Demo's own stop control is active
	 *  (read via useDemoMotion's `stopped`, same convention as other
	 *  homepage thumbnail demos, e.g. copilot-latency-motion.tsx's
	 *  ThumbnailBlocks). Used for the homepage grid card thumbnail,
	 *  which is wrapped in a Link to the project page — a real
	 *  click-to-toggle button there would just navigate away on click
	 *  rather than actually toggling, same as every other interactive
	 *  element inside a Thumbnail card. The Storybook story leaves this
	 *  off, keeping the real click-to-toggle interaction for evaluating
	 *  the motion. */
	autoPlay?: boolean
	/** Trims the grid to 2 always-visible primary pills (instead of 6)
	 *  plus 6 collapsible ones (instead of 4) — for homepage thumbnail
	 *  use, where only the collapsed state's first couple rows are
	 *  guaranteed to be visible within the 200px thumbnail slot before
	 *  DemoSlot's `overflow: hidden` clips the rest (see
	 *  Thumbnail.tsx). Fewer always-visible pills means less of the
	 *  grid needs to render/repaint on every stagger cycle for a card
	 *  that's mostly clipped anyway. The Storybook story leaves this
	 *  off, showing the full set for evaluating the actual motion. */
	compact?: boolean
}

// `compact` reuses entries already defined on the full component
// (exported from SeeMorePillButtonMotion.tsx) rather than inventing new
// icons — primaryEntries' 3rd/4th items (Workbook, Page) move into the
// collapsible set alongside the original 4 additionalEntries, giving 6
// collapsible pills total without duplicating any icon/label data.
const compactPrimaryEntries = primaryEntries.slice(0, 2)
const compactAdditionalEntries = [...primaryEntries.slice(2, 4), ...additionalEntries]

export const SeeMorePillStagger = ({ palette, autoPlay, compact }: SeeMorePillStaggerProps) => {
	const styles = useSeeMorePillStyles()
	const visiblePrimaryEntries = compact ? compactPrimaryEntries : primaryEntries
	const visibleAdditionalEntries = compact ? compactAdditionalEntries : additionalEntries
	const [expanded, setExpanded] = useState(false)
	// Same contentMounted/visible gating as the full component: the
	// additional tiles aren't rendered until the first expand, and stay
	// mounted through the exit fade + lower-content FLIP slide after
	// collapsing, then get removed once that slide's REAL completion
	// signal fires (onCollapseSettled below) — not a guessed timeout.
	const [contentMounted, setContentMounted] = useState(false)
	const [collapseMotionFinishedKey, setCollapseMotionFinishedKey] = useState(0)
	const pendingCollapseRemovalRef = useRef(false)
	const { stopped } = useDemoMotion()

	const railBg = palette?.background2 ?? '#fff'
	const accentDark = palette ? darkestColor(palette) : '#242424'
	const pillBorder = palette ? lightenHex(palette.colors[1], 0.5) : '#e5e5e5'

	const { makerSpaceRef, lowerContentRef } = useLowerContentTransition({
		expanded,
		railBg,
		containerPaddingInline: '16px',
		onCollapseSettled: () => setCollapseMotionFinishedKey((key) => key + 1),
	})

	useEffect(() => {
		lowerContentRef.current?.getAnimations().forEach((animation) => {
			if (stopped) {
				animation.pause()
			} else {
				animation.play()
			}
		})
	}, [lowerContentRef, stopped])

	// Both of these must be LAYOUT effects (synchronous, before paint —
	// not a plain useEffect), matching the full component exactly.
	// contentMounted gates whether the collapsible tiles are actually
	// in the DOM (which changes the grid's row count/layout), and
	// useLowerContentTransition's own measurement effect (inside
	// useLowerContentTransition above) ALSO runs as a layout effect —
	// it needs the tiles' mount/unmount to have already committed to
	// the DOM before it measures expandedTop/collapsedTop, or it
	// measures stale geometry. A plain (passive) useEffect here runs
	// AFTER paint, one tick later than the measurement effect expects,
	// which caused a real, measurable ~6-7px position mismatch between
	// where the FLIP animation visually ended and the lower content's
	// true final static-flow position — visible as a brief "flash"/
	// snap right as the transition settled.
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
	}, [collapseMotionFinishedKey])

	const toggle = (): void => {
		setExpanded((current) => !current)
	}
	const toggleRef = useRef(toggle)
	toggleRef.current = toggle

	// Auto-play loop: toggle expand/collapse on an interval instead of
	// waiting for a click. Skipped entirely while `stopped` (Demo's own
	// Stop control, exposed via DemoMotionContext) — the interval is
	// torn down and rebuilt whenever `stopped` flips, so stopping always
	// lands on whatever state was already showing rather than snapping
	// to a fixed frame.
	useEffect(() => {
		if (!autoPlay || stopped) return
		const interval = window.setInterval(() => toggleRef.current(), AUTO_PLAY_HOLD_MS)
		return () => window.clearInterval(interval)
	}, [autoPlay, stopped])

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
			} as React.CSSProperties)
		: undefined

	const visible = expanded || contentMounted
	const pausedStyle: React.CSSProperties | undefined = stopped ? { animationPlayState: 'paused' } : undefined

	return (
		<div className={styles.canvas} style={themeVars}>
			<section className={compact ? styles.compactStaggerRail : styles.staggerRail} aria-label="Maker space rail (stagger only)">
				<div ref={makerSpaceRef}>
					<div className={styles.grid}>
						<PillButton entry={{ key: 'new', label: 'New', icon: <Add20Regular /> }} />
						<button
							type="button"
							className={mergeClasses(styles.pill, styles.borderlessPill)}
							aria-expanded={expanded}
							tabIndex={autoPlay ? -1 : undefined}
							style={autoPlay ? { pointerEvents: 'none' } : undefined}
							onClick={autoPlay ? undefined : toggle}
						>
							<span className={styles.icon} aria-hidden="true">
								{expanded ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
							</span>
							<span className={styles.label}>{expanded ? 'See less' : 'See more'}</span>
						</button>
						{visiblePrimaryEntries.map((entry) => (
							<PillButton key={entry.key} entry={entry} />
						))}
						{visible &&
							visibleAdditionalEntries.map((entry, index) => (
								<div
									key={entry.key}
									data-collapse-removable
									className={expanded ? styles.additionalTile : styles.additionalTileExit}
									style={expanded ? { ...pausedStyle, animationDelay: `${index * STAGGER_DELAY_MS}ms` } : pausedStyle}
								>
									<PillButton entry={entry} />
								</div>
							))}
					</div>
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
