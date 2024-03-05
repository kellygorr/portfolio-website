import styled from 'styled-components'

export const Body = (props: { data: string }): JSX.Element => {
	return <Paragraph dangerouslySetInnerHTML={{ __html: props.data }} />
}

const Paragraph = styled.p``
