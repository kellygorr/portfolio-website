import styled from 'styled-components'
import { IHighlight, ILink } from '../../data/IProject'

import { SIDE_GAP, SIDE_GAP_SMALL_SCREEN, SMALL_SCREEN } from '../../styles/GlobalStyles'
import { Sidebar } from '../shared'
import { SettingsButton } from './SettingsButton'

const list: IHighlight[] = [
	{
		header: 'Contact/Resume',
		link: {
			title: 'LinkedIn',
			link: 'https://www.linkedin.com/in/kellygorr/',
		},
	},
	{
		header: 'Photography',
		link: {
			title: 'photography.kellygorr.com',
			link: 'https://photography.kellygorr.com/',
		},
	},
	{
		header: 'About the website',
		link: {
			title: 'github.com/kellygorr/portfolio-website',
			link: 'https://github.com/kellygorr/portfolio-website',
		},
	},
]

interface IFooterProps {
	isDarkMode: boolean
	toggleDarkMode: () => void
	isSmallScreen: boolean
}

export const Footer = ({ isDarkMode, isSmallScreen, toggleDarkMode }: IFooterProps): JSX.Element => {
	return (
		<Container>
			<Sidebar
				isOpen={false}
				isSmallScreen={isSmallScreen}
				setIsOpen={() => {}}
				onClick={toggleDarkMode}
				ariaLabel={isDarkMode ? 'Set light mode' : 'Set dark mode'}
			>
				<SettingsButton isDarkMode={isDarkMode} />
			</Sidebar>
			<List>
				{list.map((item: IHighlight) => (
					<ListItem key={item.header}>
						<StyledLink href={(item.link as ILink).link} rel="noopener noreferrer" target="_blank">
							<Header>{item.header}</Header>
							<URL>{(item.link as ILink).title}</URL>
						</StyledLink>
					</ListItem>
				))}
			</List>
		</Container>
	)
}

const Container = styled.footer`
	width: 100%;
	padding: 30px 0;
	color: ${({ theme }) => theme.footerText};
	line-height: 1.5rem;
	font-size: 0.9rem;

	background-color: ${({ theme }) => theme.footerBackground};
	transition: background 0.5s ease-in;

	> div > button {
		background-color: ${({ theme }) => theme.footerBackgroundSecondary};

		background-image: linear-gradient(
			to right,
			${({ theme }) => theme.gradient1} 5%,
			${({ theme }) => theme.gradient2} 30%,
			${({ theme }) => theme.footerBackgroundSecondary} 75%
		);
		background-position: right center;
		background-size: 400% 100%;

		&:hover {
			background-position: left center;

			transition: background-position 500ms ease-in-out;
		}
	}

	/* Spikey border  */
	&:after {
		content: '';
		position: absolute;
		top: -14px;
		left: 0px;
		width: 100%;
		height: 14px;
		background: ${({ theme }) =>
			`linear-gradient(-45deg, ${theme.footerBackground} 7px, transparent 0), linear-gradient(45deg, ${theme.footerBackground} 7px, transparent 0)`};
		background-repeat: repeat-x;
		background-size: 14px 14px;
		transition: background 0.5s ease-in;
	}
`

const List = styled.ul`
	padding: 0 ${SIDE_GAP_SMALL_SCREEN};
	padding-top: 30px;
	transition: padding 0.5s ease-out;
	@media (min-width: ${SMALL_SCREEN}px) {
		padding: 0px ${SIDE_GAP};
	}
`

const ListItem = styled.li`
	display: flex;
	margin-bottom: 15px;
`

const Header = styled.div``
const URL = styled.span``

const StyledLink = styled.a`
	&:before {
		content: ' ';
		position: absolute;
		pointer-events: none;
		top: 0px;
		left: -15px;
		bottom: 0px;
		transition:
			border-color 100ms ease-in,
			left 100ms ease-in;
		border-left: 2px solid transparent;
	}

	&:hover {
		text-decoration: none;

		&:before {
			left: -8px;
			border-color: ${({ theme }) => theme.footerText};
		}
	}
`
