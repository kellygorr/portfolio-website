import { makeStyles } from '@fluentui/react-components'

/*
  See More Pill Button Motion — themed port of the Maker Space "See more"
  pill button expand/collapse motion (originally
  copilot-motion-POR/src/stories/SeeMorePillButtonMotion.stories.tsx, from
  PR 5769919). All Fluent design-token references (tokens.colorNeutral*,
  shorthands.border, etc.) are replaced here with CSS custom properties
  driven by a MotionPalette (see SeeMorePillButtonMotion.tsx's `themeVars`)
  — same pattern as GroundingMenu — so this never depends on a
  FluentProvider wrapper being present (the actual portfolio page never
  wraps in one; relying on Fluent tokens looked fine in Storybook but
  silently rendered unstyled on the real site, same bug class fixed for
  Input Position's Send button).
*/

export const useSeeMorePillStyles = makeStyles({
	canvas: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		boxSizing: 'border-box',
	},
	rail: {
		position: 'relative',
		width: '320px',
		// Fixed height, matching the original POR story's `.rail`
		// (minHeight: '560px') — the rail never grows/shrinks to fit its
		// expanded/collapsed content; it's a stable card that the content
		// animates within. Without this, the card visibly resized taller
		// on expand and shorter on collapse instead of staying put.
		minHeight: '560px',
		// Resets the portfolio page's own global `line-height: 1.9rem`
		// (Page.tsx's Container), which otherwise cascades into every
		// plain text node here that doesn't set its own line-height (the
		// recent-files title/subtitle, suggestion block text) and
		// roughly doubles their row height — in Storybook's isolated
		// canvas this was never an issue since nothing ambient set an
		// oversized line-height to inherit from. 1.3rem (not the bare
		// browser default) keeps a bit of breathing room between lines
		// rather than the tightest possible metrics-only spacing.
		// `.label`'s own explicit line-height (18px) still wins over
		// this for pill labels.
		lineHeight: '1.3rem',
		boxSizing: 'border-box',
		padding: '16px',
		borderRadius: '20px',
		backgroundColor: 'var(--smp-rail-bg, #fff)',
		boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
		overflow: 'hidden',
	},
	// Smaller rail for SeeMorePillStagger — a minified version of the
	// full component's expand/collapse motion (same staggered tile
	// fade + FLIP-slid divider/recent-files list), just without the
	// suggestion block. Same fixed-height reasoning as `rail` above
	// (never resize to fit expanded vs. collapsed content), sized to
	// the full entry set's expanded height: grid (6 rows * 36px + 5 *
	// 8px gaps = 256px) + lower content (16px top padding + 1px divider
	// + recent list's own 12px top padding + 2 * 51px rows + 8px gap =
	// 139px) + rail's own 16px top/bottom padding (32px) = 427px. Used
	// by SeeMorePillStagger's Storybook story (the full, non-`compact`
	// set of entries) — `compactStaggerRail` below is used instead for
	// the actual homepage thumbnail embed.
	staggerRail: {
		position: 'relative',
		width: '320px',
		minHeight: '427px',
		lineHeight: '1.3rem',
		boxSizing: 'border-box',
		padding: '16px',
		borderRadius: '20px',
		backgroundColor: 'var(--smp-rail-bg, #fff)',
		boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
		overflow: 'hidden',
	},
	// `compact` variant of staggerRail (see SeeMorePillStagger's
	// `compact` prop). Fixed minHeight, same "never resize" reasoning
	// as `rail`/`staggerRail` above — sized to the compact grid's own
	// EXPANDED height (2 fixed rows + 3 rows of 6 collapsible pills:
	// 5 * 36px + 4 * 8px gaps = 212px) plus the same lower content
	// (139px, see `staggerRail`'s comment) plus rail padding (32px) =
	// 383px, so the card stays at that height even while collapsed,
	// instead of visibly shrinking down to the 2-row collapsed height
	// and snapping back on expand.
	compactStaggerRail: {
		position: 'relative',
		width: '320px',
		minHeight: '383px',
		lineHeight: '1.3rem',
		boxSizing: 'border-box',
		padding: '16px',
		borderRadius: '20px',
		backgroundColor: 'var(--smp-rail-bg, #fff)',
		boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
		overflow: 'hidden',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
		gap: '8px',
	},
	pill: {
		display: 'flex',
		width: '100%',
		height: '36px',
		minWidth: 0,
		boxSizing: 'border-box',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		columnGap: '8px',
		paddingInline: '12px',
		borderRadius: '8px',
		border: '1px solid var(--smp-pill-border, #e5e5e5)',
		backgroundColor: 'var(--smp-pill-bg, #fff)',
		color: 'var(--smp-text, #242424)',
		cursor: 'pointer',
		appearance: 'none',
		fontFamily: 'inherit',
		transitionProperty: 'border-color, background-color',
		transitionDuration: '150ms',
		':hover': {
			backgroundColor: 'var(--smp-pill-hover-bg, #f5f5f5)',
		},
	},
	borderlessPill: {
		border: '1px solid transparent',
		backgroundColor: 'transparent',
		':hover': {
			backgroundColor: 'var(--smp-pill-hover-bg, #f5f5f5)',
		},
	},
	icon: {
		flexShrink: 0,
		width: '20px',
		height: '20px',
		fontSize: '20px',
		lineHeight: '20px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'var(--smp-icon-color, #616161)',
	},
	label: {
		minWidth: 0,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		fontSize: '13px',
		fontWeight: 400,
		lineHeight: '18px',
		color: 'var(--smp-text, #242424)',
	},
	// Additional (collapsible) tile — a plain opacity fade, staggered per
	// index via an inline `animationDelay` (see SeeMorePillButtonMotion.tsx)
	// — simpler than Fluent's createPresenceComponent, which needs
	// FluentProvider's AnimationProvider context to resolve properly.
	additionalTile: {
		animationName: {
			from: { opacity: 0 },
			to: { opacity: 1 },
		},
		animationDuration: '200ms',
		animationTimingFunction: 'linear',
		animationFillMode: 'both',
	},
	// Exit counterpart of `additionalTile` — matches the original POR's
	// AdditionalTileMotion `exit` keyframes (opacity 1 -> 0, fill
	// 'forwards', no per-index delay/stagger: unlike the entrance, every
	// tile fades out together). Applied while collapsing, for the
	// duration content stays mounted (SeeMorePillButtonMotion.tsx keeps
	// `contentMounted` true until the lower-content FLIP transition
	// finishes) — without this, tiles had no exit animation at all and
	// simply vanished instantly the moment they were unmounted.
	additionalTileExit: {
		animationName: {
			from: { opacity: 1 },
			to: { opacity: 0 },
		},
		animationDuration: '200ms',
		animationTimingFunction: 'linear',
		animationFillMode: 'forwards',
	},
	divider: {
		height: '1px',
		backgroundColor: 'var(--smp-divider, #e5e5e5)',
	},
	lowerContent: {
		boxSizing: 'border-box',
		paddingBlockStart: '16px',
	},
	suggestionBlock: {
		display: 'grid',
		alignContent: 'center',
		gap: '8px',
		height: '92px',
		marginBlockStart: '12px',
		padding: '12px',
		boxSizing: 'border-box',
		borderRadius: '12px',
		backgroundColor: 'var(--smp-suggestion-bg, #f5f5f5)',
		color: 'var(--smp-text-secondary, #616161)',
		fontSize: '13px',
	},
	suggestionTitle: {
		color: 'var(--smp-text, #242424)',
		fontWeight: 600,
	},
	suggestionSkeleton: {
		height: '12px',
		borderRadius: '999px',
		backgroundColor: 'var(--smp-skeleton-bg, #e0e0e0)',
	},
	recentList: {
		display: 'grid',
		gap: '8px',
		paddingBlockStart: '12px',
	},
	recentItem: {
		display: 'grid',
		gridTemplateColumns: '20px 1fr',
		columnGap: '8px',
		alignItems: 'center',
		paddingBlock: '8px',
		color: 'var(--smp-text-secondary, #616161)',
		fontSize: '13px',
	},
	recentTitle: {
		color: 'var(--smp-text, #242424)',
		fontWeight: 600,
	},
})
