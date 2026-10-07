import styled from 'styled-components'
import { SMALL_SCREEN } from '../../styles/GlobalStyles'

/**
 * "Recreated for portfolio" disclosure badge — the single component for
 * every instance of this badge in the app, customized entirely via
 * props rather than existing as several near-duplicate components. Used
 * in two different contexts:
 *   - DemoHeader's normal flex flow (not absolutely positioned) for
 *     motion demos — the header row itself owns layout/positioning, so
 *     this component only needs to handle the badge's own look.
 *   - Standalone below a slideshow's body copy, for the image-slideshow
 *     equivalent disclosure (see `wrapped`/`text` below and Page.tsx's
 *     usage) — this placement avoids ever overlapping/covering a slide,
 *     and sources its colors from the site's own light/dark theme
 *     (`theme.accent`/`theme.textNegative`) rather than a motion
 *     palette, since plain image slideshows aren't associated with any
 *     particular motion palette.
 * No motion/animation on this badge in either context — it's a static
 * label.
 *
 * Three preset/custom text options:
 *   1. FULL_TEXT below — the default.
 *   2. SIMPLE_TEXT below — opt in via `simple` (currently the two
 *      Typography project demos, which always want the short form).
 *   3. `text` — fully custom copy (used for the slideshow-images
 *      variant's "Images — recreated for portfolio", and available for
 *      any other one-off copy a future caller needs) — overrides both
 *      the default and `simple`, with no responsive behavior (a custom
 *      string is assumed to already be short enough, or to manage its
 *      own length).
 *
 * `shortenAtSmallScreen` is for the common case this component was
 * actually built to solve: a demo whose header ALSO has an interactive
 * badge or stop/play button crowding the right side of the same row
 * (see DemoHeader, which sets this automatically whenever
 * `showClickToInteract` is true) gets noticeably tighter on narrow
 * screens than a badge-only header does. Below SMALL_SCREEN, this swaps
 * FULL_TEXT for SIMPLE_TEXT via a pure-CSS media query (both strings are
 * always in the DOM; only one is ever visible) — no JS, no layout
 * thrash, and real text in both states for anyone using a screen
 * reader. Only applies to the plain default/full text case — `simple`
 * and `text` are already short/custom and opt out of this swap.
 *
 * `wrapped` adds the margin-top spacing the slideshow-images placement
 * needs (sitting below body copy, not inside a header row's own flex
 * gap) — DemoHeader's own usage leaves this off since its row already
 * handles spacing.
 */
export const Badge = styled.div<{ $bg: string; $color: string }>`
	display: inline-flex;
	max-width: 100%;
	/* Flex items default to min-width: auto (their un-wrapped content's
	   natural width), not 0 — so without this override, the flex row in
	   DemoHeader could never actually shrink this badge below its full
	   un-wrapped text width, regardless of the overflow/ellipsis rules
	   below. The badge would overflow the row instead of truncating,
	   then get hard-clipped by the Demo/DemoSlide container's own
	   overflow: hidden at narrow viewports. This is what actually lets
	   text-overflow: ellipsis kick in once there isn't room. */
	min-width: 0;
	padding: 6px 12px;
	border-radius: 6px;
	background: ${({ $bg }) => $bg};
	color: ${({ $color }) => $color};
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.2px;
	pointer-events: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const Wrapper = styled.div`
	margin-top: 0.75rem;
`

const FULL_TEXT = 'Motion Interaction — recreated for portfolio'
const SIMPLE_TEXT = 'Recreated for portfolio'

// Visible by default, hidden at/below SMALL_SCREEN.
const FullLabel = styled.span`
	@media (max-width: ${SMALL_SCREEN}px) {
		display: none;
	}
`
// Hidden by default, visible at/below SMALL_SCREEN — the inverse of
// FullLabel above, so exactly one of the two is ever shown.
const ShortLabel = styled.span`
	display: none;
	@media (max-width: ${SMALL_SCREEN}px) {
		display: inline;
	}
`

export const RecreatedBadge = ({
	bg,
	color,
	simple,
	text,
	shortenAtSmallScreen,
	wrapped,
}: {
	bg: string
	color: string
	/** Preset short text (SIMPLE_TEXT) instead of the default full text. */
	simple?: boolean
	/** Fully custom badge copy, overriding both the default and `simple`. */
	text?: string
	/** Swaps the default FULL_TEXT for SIMPLE_TEXT at/below SMALL_SCREEN
	 *  via CSS only. Ignored when `simple` or `text` is set (both are
	 *  already short/custom). */
	shortenAtSmallScreen?: boolean
	/** Adds standalone margin-top spacing, for placements outside a
	 *  header row's own flex gap (e.g. below slideshow body copy). */
	wrapped?: boolean
}) => {
	const badge = (
		<Badge $bg={bg} $color={color}>
			{text ? (
				text
			) : simple ? (
				SIMPLE_TEXT
			) : shortenAtSmallScreen ? (
				<>
					<FullLabel>{FULL_TEXT}</FullLabel>
					<ShortLabel>{SIMPLE_TEXT}</ShortLabel>
				</>
			) : (
				FULL_TEXT
			)}
		</Badge>
	)
	return wrapped ? <Wrapper>{badge}</Wrapper> : badge
}
