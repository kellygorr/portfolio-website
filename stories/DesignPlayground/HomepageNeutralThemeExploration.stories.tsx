import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'
import { Blocks } from '../BlocksLatency/Blocks'
import { motionPalettes } from '../../src/styles/motionPalettes'
import { neutralThemes, type NeutralTheme } from '../../src/styles/neutralThemes'

/**
 * Homepage Neutral Theme Exploration — following feedback that an earlier
 * literal motion-palette treatment (bright gradients, tinted thumbnails,
 * rainbow name hover) read as too colorful/juvenile for a portfolio that
 * should stay mostly black/white/neutral, matching the real site's
 * existing aesthetic.
 *
 * These themes intentionally do NOT pull from the Warm Sand / Golden Hour
 * / Dusty Rose / Lime / Beige motion palettes for their base colors. Each is
 * dominated by black, white, and grey, with at most one quiet, desaturated
 * accent used sparingly (a thin underline or a single subtle text-color
 * shift on hover) — never a full gradient sweep or colored thumbnail fill.
 *
 * Theme data lives in src/styles/neutralThemes.ts (the same source the real
 * site's src/styles/theme.ts reads from), so a color change there
 * automatically shows up here too.
 *
 * Fully self-contained (does not use stories/shared/SiteChrome.tsx) so we
 * can freely experiment without touching other mockups.
 */

const themes = neutralThemes
const palettes = motionPalettes

const fakeProjects = [
	{ title: 'Focus Order Plugin', tags: ['Microsoft', 'tooling'] },
	{ title: 'Copilot Motion System', tags: ['Copilot', 'motion'] },
	{ title: 'Outlook Calendar', tags: ['Microsoft', 'web'] },
	{ title: 'Xbox Promo Billboards', tags: ['Xbox'] },
]

const footerLinks = [
	{ header: 'Contact/Resume', title: 'LinkedIn' },
	{ header: 'Photography', title: 'photography.kellygorr.com' },
	{ header: 'About the website', title: 'github.com/kellygorr/portfolio-website' },
]

const ThemedHomepage = ({ theme, scale = 1 }: { theme: NeutralTheme; scale?: number }) => (
	<Page $bg={theme.background} $text={theme.text} $scale={scale}>
		<HeaderWrapper>
			<Name $text={theme.text} $accent={theme.accent}>
				Kelly Gorr
			</Name>
			<Subtitle $subtitle={theme.subtitleText}>UX Engineer + Designer</Subtitle>

			<SearchButtonWrapper>
				<SearchButton $text={theme.text} $accent={theme.accent} $bg={theme.background}>
					<svg width="20" height="20" viewBox="0 0 30 30">
						<path
							d="M25.42,26.6l-5.07-6.93.39-.29a2.07,2.07,0,0,0,.45-2.81,1.89,1.89,0,0,0-1.8-.82,10.11,10.11,0,1,0-8.74,5,10,10,0,0,0,3-.44A2.07,2.07,0,0,0,13.9,22a1.9,1.9,0,0,0,1.57.84,1.88,1.88,0,0,0,1.12-.37L17.2,22l5.11,7a2,2,0,0,0,1.56.81A1.87,1.87,0,0,0,25,29.4,2.06,2.06,0,0,0,25.42,26.6ZM4,10.68a6.63,6.63,0,1,1,6.62,6.62A6.62,6.62,0,0,1,4,10.68Z"
							fill="currentColor"
						/>
					</svg>
				</SearchButton>
			</SearchButtonWrapper>
		</HeaderWrapper>

		<Grid>
			{fakeProjects.map((p) => (
				<Card key={p.title}>
					<ImageWrapper $accent={theme.accent}>
						<Thumb $thumb={theme.thumbnail} />
					</ImageWrapper>
					<CardTitle $text={theme.text} $accent={theme.accent}>
						{p.title}
					</CardTitle>
					<Tags $subtitle={theme.subtitleText}>[ {p.tags.join(', ')} ]</Tags>
				</Card>
			))}
		</Grid>

		<PaletteSection>
			<PaletteSectionGrid>
				{palettes.map((p) => (
					<PaletteMiniCard key={p.name} style={{ background: p.background }}>
						<Blocks size={14} colors={p.colors} />
						<PaletteMiniLabel>{p.name}</PaletteMiniLabel>
					</PaletteMiniCard>
				))}
			</PaletteSectionGrid>
		</PaletteSection>

		<Footer $bg={theme.footerBackground} $text={theme.footerText} $footerStyle={theme.footerStyle}>
			<FooterList>
				{footerLinks.map((link) => (
					<FooterItem key={link.header}>
						<div>{link.header}</div>
						<span>{link.title}</span>
					</FooterItem>
				))}
			</FooterList>
		</Footer>
	</Page>
)

const Page = styled.div<{ $bg: string; $text: string; $scale: number }>`
	background: ${({ $bg }) => $bg};
	color: ${({ $text }) => $text};
	font-family: sans-serif;
	min-height: ${({ $scale }) => ($scale === 1 ? '700px' : 'auto')};
	display: flex;
	flex-direction: column;
	${({ $scale }) => $scale !== 1 && `transform: scale(${$scale}); transform-origin: top left; width: ${100 / $scale}%;`}
`

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

/* Simple solid ring, no gradient — a thin border that darkens/tints on hover. */
const SearchButton = styled.button<{ $text: string; $accent: string; $bg: string }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1.5px solid ${({ $text }) => $text};
	background: transparent;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ $text }) => $text};
	transition: border-color 250ms ease-in-out, color 250ms ease-in-out;

	&:hover {
		border-color: ${({ $accent }) => $accent};
		color: ${({ $accent }) => $accent};
	}
`

/*
 * Name: solid text color at rest. On hover, a simple color shift to the
 * theme's single quiet accent plus a thin underline — no gradient sweep,
 * no per-letter rainbow.
 */
const Name = styled.h1<{ $text: string; $accent: string }>`
	font-family: 'montserrat', sans-serif;
	font-size: 2.5rem;
	display: inline-block;
	cursor: pointer;
	padding-bottom: 4px;
	border-bottom: 2px solid transparent;
	color: ${({ $text }) => $text};
	transition: color 250ms ease-in-out, border-color 250ms ease-in-out;

	&:hover {
		color: ${({ $accent }) => $accent};
		border-bottom-color: ${({ $accent }) => $accent};
	}
`

const Subtitle = styled.h2<{ $subtitle: string }>`
	font-size: 1.25rem;
	font-weight: 400;
	color: ${({ $subtitle }) => $subtitle};
	margin-top: 4px;
`

const Grid = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(2, minmax(200px, 400px));
	gap: 32px;
	justify-content: center;
	padding: 48px 32px;
`

const PaletteSection = styled.div`
	padding: 8px 32px 48px;
`

const PaletteSectionGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	justify-content: center;
`

const PaletteMiniCard = styled.div`
	width: 100px;
	height: 100px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 6px;
`

const PaletteMiniLabel = styled.div`
	font-family: sans-serif;
	font-size: 0.6rem;
	color: rgba(0, 0, 0, 0.6);
	text-align: center;
	padding: 0 6px;
`

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`

/* Thin solid border on hover instead of a gradient sweep. */
const ImageWrapper = styled.div<{ $accent: string }>`
	position: relative;
	width: 100%;
	margin-bottom: 8px;
	border-radius: 4px;
	border: 1px solid transparent;
	transition: border-color 300ms ease-in-out;

	${Card}:hover & {
		border-color: ${({ $accent }) => $accent};
	}
`

const Thumb = styled.div<{ $thumb: string }>`
	width: 100%;
	height: 160px;
	background: ${({ $thumb }) => $thumb};
	border-radius: 4px;
`

const CardTitle = styled.h4<{ $text: string; $accent: string }>`
	font-family: serif;
	color: ${({ $text }) => $text};
	transition: color 300ms ease-in;

	${Card}:hover & {
		color: ${({ $accent }) => $accent};
	}
`

const Tags = styled.div<{ $subtitle: string }>`
	font-size: 0.8rem;
	color: ${({ $subtitle }) => $subtitle};
	margin-top: 4px;
`

/*
 * Two mutually-exclusive footer styles, both using the same filled zigzag
 * notch mask technique (punches background-colored triangles out of a
 * solid block):
 * - dark: solid dark-color block.
 * - light: same technique, using the theme's lighter footer color
 *   (matching its thumbnail placeholder) instead of a dark block.
 */
const Footer = styled.footer<{ $bg: string; $text: string; $footerStyle: NeutralTheme['footerStyle'] }>`
	position: relative;
	width: 100%;
	padding: 30px 0;
	color: ${({ $text }) => $text};
	line-height: 1.5rem;
	font-size: 0.9rem;
	background-color: ${({ $bg }) => $bg};
	margin-top: 48px;

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

const FooterItem = styled.li`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;

	span {
		opacity: 0.7;
		font-size: 0.85rem;
	}
`

const ThemeLabel = styled.div`
	font-family: sans-serif;
	font-weight: 700;
	font-size: 1rem;
	padding: 12px 16px 0;
`

const ThemeDescription = styled.div`
	font-family: sans-serif;
	font-size: 0.8rem;
	color: #888;
	padding: 2px 16px 12px;
`

const OverviewGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
	gap: 24px;
	padding: 24px;
	background: #f2f2f2;
`

const OverviewCard = styled.div`
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	background: #fff;
`

const OverviewFrame = styled.div`
	height: 260px;
	overflow: hidden;
	position: relative;
`

const meta: Meta<typeof ThemedHomepage> = {
	title: 'Design Playground/Homepage Neutral Theme Exploration',
	component: ThemedHomepage,
	parameters: { layout: 'fullscreen', hideRecreatedBadge: true },
}

export default meta
type Story = StoryObj<typeof ThemedHomepage>

export const Overview: Story = {
	render: () => (
		<OverviewGrid>
			{Object.entries(themes).map(([key, theme]) => (
				<OverviewCard key={key}>
					<ThemeLabel>{theme.label}</ThemeLabel>
					<ThemeDescription>{theme.description}</ThemeDescription>
					<OverviewFrame>
						<ThemedHomepage theme={theme} scale={0.45} />
					</OverviewFrame>
				</OverviewCard>
			))}
		</OverviewGrid>
	),
}

export const ClassicMonoDark: Story = { render: () => <ThemedHomepage theme={themes.classicMonoDark} /> }
export const ClassicMonoLight: Story = { render: () => <ThemedHomepage theme={themes.classicMonoLight} /> }

export const WarmInkDark: Story = { render: () => <ThemedHomepage theme={themes.warmInkDark} /> }
export const WarmInkLight: Story = { render: () => <ThemedHomepage theme={themes.warmInkLight} /> }

export const SoftStoneDark: Story = { render: () => <ThemedHomepage theme={themes.softStoneDark} /> }
export const SoftStoneLight: Story = { render: () => <ThemedHomepage theme={themes.softStoneLight} /> }

export const BoneAndCharcoalDark: Story = { render: () => <ThemedHomepage theme={themes.boneAndCharcoalDark} /> }
export const BoneAndCharcoalLight: Story = { render: () => <ThemedHomepage theme={themes.boneAndCharcoalLight} /> }


