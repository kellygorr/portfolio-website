import styled from 'styled-components'

/**
 * "Recreated for portfolio" badge, matching the same badge shown on
 * every Storybook story (see .storybook/preview.tsx). Rendered inside
 * DemoHeader's normal flex flow (not absolutely positioned) — the
 * header row itself owns layout/positioning, so this component only
 * needs to handle the badge's own look. No motion/animation on this
 * badge — it's a static label.
 *
 * The underlying `Badge` styled-component is also reused by
 * ImagesRecreatedBadge (the slideshow equivalent of this disclosure,
 * shown above image slideshows rather than motion demos) so both
 * badges share one definition instead of duplicating the same CSS.
 */
export const Badge = styled.div<{ $bg: string; $color: string }>`
	display: inline-flex;
	max-width: 100%;
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

export const RecreatedBadge = ({ bg, color, simple }: { bg: string; color: string; simple?: boolean }) => (
	<Badge $bg={bg} $color={color}>
		{simple ? 'Recreated for portfolio' : 'Motion Interaction — recreated for portfolio'}
	</Badge>
)
