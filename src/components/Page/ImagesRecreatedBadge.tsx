import styled from 'styled-components'
import { useTheme } from 'styled-components'
import { Badge } from './RecreatedBadge'

/**
 * "Images - recreated for portfolio" badge — the slideshow-image
 * equivalent of RecreatedBadge (used on motion demos). Rendered at the
 * end of a text section (see ISection.imagesRecreated), below that
 * section's body copy, rather than above/inside the slideshow itself —
 * this avoids ever overlapping/covering a slide.
 *
 * Reuses RecreatedBadge's shared `Badge` styled-component so both
 * disclosures look identical (including the matching em dash), but
 * sources its bg/color from the site's own light/dark theme
 * (`theme.accent`/`theme.textNegative`) rather than a motion palette —
 * unlike motion demos, plain image slideshows aren't associated with
 * any particular motion palette.
 */
export const ImagesRecreatedBadge = () => {
	const theme = useTheme()
	return (
		<Wrapper>
			<Badge $bg={theme.accent} $color={theme.textNegative}>
				Images — recreated for portfolio
			</Badge>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-top: 0.75rem;
`
