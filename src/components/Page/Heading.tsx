import * as React from 'react'
import styled from 'styled-components'
import { MEDIUM_SMALL_SCREEN } from '../../styles/GlobalStyles'
interface IPageProps {
	children?: React.ReactNode
}

export const Heading: React.FC<IPageProps> = (props: IPageProps) => {
	if (!props.children) {
		return null
	}

	return <Container>{props.children}</Container>
}

const Container = styled.h3`
	display: flex;
	font-family: 'Museo_Slab_500_2';
	font-size: 1.3rem;
	padding-bottom: 0.2rem;

	/* The paragraph immediately after a header does not need to have padding-top (this is covered by the header) */
	+ p {
		padding-top: 0;
	}

	border-color: ${({ theme }) => theme.thumbnail};

	@media (min-width: ${MEDIUM_SMALL_SCREEN}px) {
		font-size: 1.4rem;
	}
`
