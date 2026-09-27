import styled from 'styled-components'
import { neutralThemes } from '../../src/styles/neutralThemes'
import { motionPalette } from '../../src/styles/motionPalettes'

/**
 * Reusable header + footer matching the real site's Header.tsx/Footer.tsx,
 * for use across multiple Design Playground page mockups (homepage,
 * project page, etc.) without duplicating the same JSX/CSS each time.
 *
 * Colors are pulled from the same shared tokens the real site uses
 * (src/styles/neutralThemes.ts, src/styles/motionPalettes.ts) — updating a
 * token there updates both the real site and every mockup that uses it.
 */

const activeNeutral = neutralThemes.classicMonoDark
const warmSand = motionPalette('Warm Sand')

export const CURRENT_THEME = {
	background: activeNeutral.background,
	text: activeNeutral.text,
	accent: activeNeutral.accent,
	thumbnail: activeNeutral.thumbnail,
	gradient1: '#e2934f', // clay / light terracotta — intentionally independent of the neutral theme
	gradient2: '#b06a3e', // clay / darker terracotta
	footerBackground: activeNeutral.footerBackground,
	footerText: activeNeutral.footerText,
}

const footerLinks = [
	{ header: 'Contact/Resume', title: 'LinkedIn' },
	{ header: 'Photography', title: 'photography.kellygorr.com' },
	{ header: 'About the website', title: 'github.com/kellygorr/portfolio-website' },
]

export const SiteHeader = () => (
	<HeaderWrapper>
		<Name $accent={CURRENT_THEME.accent} $text={CURRENT_THEME.text}>
			{'Kelly Gorr'.split('').map((char, i) => (
				<NameChar key={i} $index={i} $text={CURRENT_THEME.text}>
					{char === ' ' ? '\u00A0' : char}
				</NameChar>
			))}
		</Name>
		<Subtitle>UX Engineer + Designer</Subtitle>

		<SearchButtonWrapper>
			<SearchButton
				$accent={CURRENT_THEME.accent}
				$gradient1={CURRENT_THEME.gradient1}
				$gradient2={CURRENT_THEME.gradient2}
				$bg={CURRENT_THEME.background}
			>
				<svg width="23" height="23" viewBox="0 0 30 30">
					<path
						d="M25.42,26.6l-5.07-6.93.39-.29a2.07,2.07,0,0,0,.45-2.81,1.89,1.89,0,0,0-1.8-.82,10.11,10.11,0,1,0-8.74,5,10,10,0,0,0,3-.44A2.07,2.07,0,0,0,13.9,22a1.9,1.9,0,0,0,1.57.84,1.88,1.88,0,0,0,1.12-.37L17.2,22l5.11,7a2,2,0,0,0,1.56.81A1.87,1.87,0,0,0,25,29.4,2.06,2.06,0,0,0,25.42,26.6ZM4,10.68a6.63,6.63,0,1,1,6.62,6.62A6.62,6.62,0,0,1,4,10.68Z"
						fill="currentColor"
					/>
				</svg>
			</SearchButton>
		</SearchButtonWrapper>
	</HeaderWrapper>
)

export const SiteFooter = () => (
	<Footer $bg={CURRENT_THEME.footerBackground} $text={CURRENT_THEME.footerText}>
		<FooterList>
			{footerLinks.map((link) => (
				<FooterItem key={link.header} $text={CURRENT_THEME.footerText}>
					<div>{link.header}</div>
					<span>{link.title}</span>
				</FooterItem>
			))}
		</FooterList>
	</Footer>
)

const HeaderWrapper = styled.div`
	position: relative;
	text-align: center;
	padding: 48px 32px 0;
`

const SearchButtonWrapper = styled.div`
	position: absolute;
	top: 48px;
	right: 32px;
`

const SearchButton = styled.button<{ $accent: string; $gradient1: string; $gradient2: string; $bg: string }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ $bg }) => $bg};

	background-image: linear-gradient(
		to right,
		${({ $gradient1 }) => $gradient1} 5%,
		${({ $gradient2 }) => $gradient2} 30%,
		${({ $accent }) => $accent} 75%
	);
	background-position: right center;
	background-size: 400% 100%;

	&:hover {
		background-position: left center;
		transition: background-position 500ms ease-in-out;
	}
`

// Amber, Clay, Rose — the three darker Warm Sand accent swatches, used to
// cycle the name's hover color per-character.
const nameHoverColors = warmSand.colors.slice(1, 4)

const NameChar = styled.span<{ $index: number; $text: string }>`
	transition: color 200ms ease-in-out;
	color: ${({ $text }) => $text};
`

const Name = styled.h1<{ $accent: string; $text: string }>`
	font-family: 'montserrat', sans-serif;
	font-size: 2.5rem;
	display: inline-block;
	cursor: pointer;
	border: 3px solid transparent;

	&:hover ${NameChar} {
		color: ${({ $text }) => $text};
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

const Subtitle = styled.h2`
	font-size: 1.25rem;
	font-weight: 400;
	color: ${activeNeutral.subtitleText};
	margin-top: 4px;
`

const Footer = styled.footer<{ $bg: string; $text: string }>`
	position: relative;
	width: 100%;
	padding: 30px 0;
	color: ${({ $text }) => $text};
	line-height: 1.5rem;
	font-size: 0.9rem;
	background-color: ${({ $bg }) => $bg};
	margin-top: 48px;

	/* Decorative spikey/zig-zag top border, matches Footer.tsx's &:after */
	&:before {
		content: '';
		position: absolute;
		top: -14px;
		left: 0px;
		width: 100%;
		height: 14px;
		background: ${({ $bg }) =>
			`linear-gradient(-45deg, ${$bg} 7px, transparent 0), linear-gradient(45deg, ${$bg} 7px, transparent 0)`};
		background-repeat: repeat-x;
		background-size: 14px 14px;
	}
`

const FooterList = styled.ul`
	padding: 0 3vw;
	list-style: none;
`

const FooterItem = styled.li<{ $text: string }>`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;

	span {
		opacity: 0.7;
		font-size: 0.85rem;
	}
`
