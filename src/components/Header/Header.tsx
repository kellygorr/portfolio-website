import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface IHeaderProps {
	setIsSearchOpen: (isOpen: boolean) => void
}

export const Header = (props: IHeaderProps): JSX.Element => {
	const handleClick = () => {
		props.setIsSearchOpen(false)
	}
	return (
		<Container>
			<Logo>
				<StyledLink to="/" onClick={handleClick} className="gradient-animation">
					Kelly Gorr
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
const StyledLink = styled(Link)`
	font-family: 'montserrat';
	border: 3px solid transparent;
	transition:
		color 1s ease-in,
		background-position 500ms ease-in-out;

	&:hover {
		color: ${({ theme }) => theme.accent};
		text-decoration: none;
	}

	&.gradient-animation {
		background-image: linear-gradient(
			to right,
			${({ theme }) => theme.gradient1} 5%,
			${({ theme }) => theme.gradient2} 40%,
			${({ theme }) => theme.text} 75%
		);
		background-position: right center;
		background-size: 400% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		color: ${({ theme }) => theme.text};
		-webkit-text-fill-color: transparent;
		text-fill-color: transparent;
	}

	&.gradient-animation:hover {
		background-position: left center;

		transition:
			background-position 500ms ease-in-out,
			color 1s ease-in;
	}
`
const H2 = styled.h2`
	font-size: 1.25rem;
`
