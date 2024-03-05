import * as React from 'react'
import styled from 'styled-components'
import { MEDIUM_SMALL_SCREEN } from '../../styles/GlobalStyles'

interface ITitleProps {
	children?: React.ReactNode
}

export const Title = (props: ITitleProps): JSX.Element | null => {
	if (!props.children) {
		return null
	}

	return <Container>{props.children}</Container>
}

const Container = styled.h2`
	display: flex;
	font-family: 'Museo_Slab_500_2';
	font-size: 1.3rem;
	padding-top: 1.5rem;

	@media (min-width: ${MEDIUM_SMALL_SCREEN}px) {
		font-size: 1.5rem;
	}
`
