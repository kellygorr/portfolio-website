import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motionPalette } from '../../styles/motionPalettes'

// Amber, Clay, Rose — the three darker Warm Sand accent swatches, cycled
// per-letter on name hover (independent of the site's light/dark theme,
// same as the single-color gradient hover it replaces).
const warmSand = motionPalette('Warm Sand')
const nameHoverColors = warmSand.colors.slice(1, 4)

export const Header = (): JSX.Element => {
	// No click handler needed to close search here — the logo's own <Link>
	// already navigates to "/" (no `?q=`), which is enough on its own for
	// App.tsx's derived `isSearching` to resolve to false. Explicitly
	// closing search here too (i.e. calling the same navigate(-1)/replace
	// used by the search bar's own X button) would fire a SECOND
	// navigation racing this Link's own push.
	return (
		<Container>
			<Logo>
				<StyledLink to="/">
					{'Kelly Gorr'.split('').map((char, i) => (
						<NameChar key={i} $index={i}>
							{char === ' ' ? '\u00A0' : char}
						</NameChar>
					))}
				</StyledLink>
			</Logo>
			<H2>UX Engineer + Designer</H2>
		</Container>
	)
}
const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	height: 100%;
	padding-top: 50px;
`

const Logo = styled.h1`
	font-size: 2rem;
`

const NameChar = styled.span<{ $index: number }>`
	transition: color 200ms ease-in-out;
`

const StyledLink = styled(Link)`
	font-family: 'montserrat';
	border: 3px solid transparent;
	color: ${({ theme }) => theme.text};
	text-decoration: none;

	&:hover {
		text-decoration: none;
	}

	&:hover ${NameChar} {
		color: ${({ theme }) => theme.text};
	}

	${Array.from({ length: nameHoverColors.length })
		.map(
			(_, colorIndex) => `
		&:hover ${NameChar}:nth-child(${nameHoverColors.length}n + ${colorIndex + 1}) {
			color: ${nameHoverColors[colorIndex]};
		}
	`
		)
		.join('\n')}
`
const H2 = styled.h2`
	font-size: 1.25rem;
	color: ${({ theme }) => theme.subtitleText};
`
