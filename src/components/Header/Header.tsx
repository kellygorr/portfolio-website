import { useState, type JSX } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motionPalette, motionPalettes, motionThemeTokens, type MotionPaletteName } from '../../styles/motionPalettes'

const nameHoverTokenNames = ['--name-motion-token-3', '--name-motion-token-4', '--name-motion-token-5'] as const
const excludedNameHoverThemes = new Set<MotionPaletteName>(['Golden Hour (Lime)', 'Golden Hour (Beige)'])
const motionPaletteNames = motionPalettes.map((palette) => palette.name).filter((name) => !excludedNameHoverThemes.has(name))

const getRandomMotionTheme = (currentTheme?: MotionPaletteName): MotionPaletteName => {
	const availableThemes = motionPaletteNames.filter((theme) => theme !== currentTheme)
	return availableThemes[Math.floor(Math.random() * availableThemes.length)] ?? motionPaletteNames[0]
}

const getNameMotionThemeStyle = (theme: MotionPaletteName): React.CSSProperties => {
	const tokens = motionThemeTokens(motionPalette(theme))

	return {
		'--name-motion-token-3': tokens.token3,
		'--name-motion-token-4': tokens.token4,
		'--name-motion-token-5': tokens.token5,
	} as React.CSSProperties
}

export const Header = (): JSX.Element => {
	const [nameMotionTheme, setNameMotionTheme] = useState<MotionPaletteName>(() => getRandomMotionTheme())

	// No click handler needed to close search here — the logo's own <Link>
	// already navigates to "/" (no `?q=`), which is enough on its own for
	// App.tsx's derived `isSearching` to resolve to false. Explicitly
	// closing search here too (i.e. calling the same navigate(-1)/replace
	// used by the search bar's own X button) would fire a SECOND
	// navigation racing this Link's own push.
	return (
		<Container>
			<Logo>
				<StyledLink
					to="/"
					style={getNameMotionThemeStyle(nameMotionTheme)}
					onMouseLeave={() => setNameMotionTheme((currentTheme) => getRandomMotionTheme(currentTheme))}
				>
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

	/* Scoped to real hover-capable pointers (mouse/trackpad) only — on
	   touch devices, :hover has no "pointer left the element" event to
	   clear it after a tap, so without this guard the color-cycle hover
	   effect below would visibly stick on indefinitely after tapping the
	   name on mobile, instead of being a transient hover affordance. */
	@media (hover: hover) {
		&:hover {
			text-decoration: none;
		}

		&:hover ${NameChar} {
			color: ${({ theme }) => theme.text};
		}

		${Array.from({ length: nameHoverTokenNames.length })
			.map(
				(_, colorIndex) => `
			&:hover ${NameChar}:nth-child(${nameHoverTokenNames.length}n + ${colorIndex + 1}) {
				color: var(${nameHoverTokenNames[colorIndex]});
			}
		`
			)
			.join('\n')}
	}
`
const H2 = styled.h2`
	font-size: 1.25rem;
	color: ${({ theme }) => theme.subtitleText};
`
