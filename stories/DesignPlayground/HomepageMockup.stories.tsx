import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'
import { SiteHeader, SiteFooter, CURRENT_THEME } from '../shared/SiteChrome'

/**
 * A rough, editable-in-isolation recreation of the current portfolio
 * homepage design (colors, gradient hover, decorative spikey footer,
 * search button, layout) using fake project cards. This is a SAFE PLACE
 * to try color/design changes without touching the real site code in src/.
 *
 * Header/Footer come from stories/shared/SiteChrome.tsx, reused across
 * page mockups so they stay in sync in this playground.
 */

const fakeProjects = [
	{ title: 'Focus Order Plugin', tags: ['Microsoft', 'tooling'] },
	{ title: 'Copilot Motion System', tags: ['Copilot', 'motion'] },
	{ title: 'Outlook Calendar', tags: ['Microsoft', 'web'] },
	{ title: 'Xbox Promo Billboards', tags: ['Xbox'] },
]

const HomeMockup = () => (
	<Page $bg={CURRENT_THEME.background} $text={CURRENT_THEME.text}>
		<SiteHeader />

		<Grid>
			{fakeProjects.map((p) => (
				<Card key={p.title}>
					<ImageWrapper $accent={CURRENT_THEME.accent} $bg={CURRENT_THEME.background}>
						<Thumb $thumb={CURRENT_THEME.thumbnail} />
					</ImageWrapper>
					<CardTitle $accent={CURRENT_THEME.accent}>{p.title}</CardTitle>
					<Tags>[ {p.tags.join(', ')} ]</Tags>
				</Card>
			))}
		</Grid>

		<SiteFooter />
	</Page>
)

const Page = styled.div<{ $bg: string; $text: string }>`
	background: ${({ $bg }) => $bg};
	color: ${({ $text }) => $text};
	font-family: sans-serif;
	min-height: 700px;
	display: flex;
	flex-direction: column;
`

const Grid = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(2, minmax(200px, 400px));
	gap: 32px;
	justify-content: center;
	padding: 48px 32px;
`

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`

const ImageWrapper = styled.div<{ $accent: string; $bg: string }>`
	position: relative;
	width: 100%;
	margin-bottom: 8px;

	&:before {
		content: '';
		position: absolute;
		inset: -3px;
		border-radius: inherit;
		background-image: linear-gradient(to right, ${({ $accent }) => $accent} 60%, ${({ $bg }) => $bg} 75%);
		background-size: 400% 100%;
		background-position: right center;
		transition: background 400ms ease-in;
	}

	${Card}:hover &:before {
		background-position: left center;
		transition: background 600ms ease-in;
	}
`

const Thumb = styled.div<{ $thumb: string }>`
	width: 100%;
	height: 160px;
	background: ${({ $thumb }) => $thumb};
	border-radius: 4px;
`

const CardTitle = styled.h4<{ $accent: string }>`
	font-family: serif;
	transition: color 300ms ease-in;

	${Card}:hover & {
		color: ${({ $accent }) => $accent};
	}
`

const Tags = styled.div`
	font-size: 0.8rem;
	opacity: 0.6;
	margin-top: 4px;
`

const meta: Meta<typeof HomeMockup> = {
	title: 'Design Playground/Homepage Mockup (Current Design)',
	component: HomeMockup,
	parameters: { layout: 'fullscreen', hideRecreatedBadge: true },
}

export default meta
type Story = StoryObj<typeof HomeMockup>

export const Default: Story = {}
