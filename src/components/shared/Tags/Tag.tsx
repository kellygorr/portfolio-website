import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Sanitize } from '..'

interface ITagProps {
	isLastTag: boolean
	tag: string
	setQuery: (query: string) => void
	pathname: string
}

export const Tag = (props: ITagProps): JSX.Element => {
	const { isLastTag, tag } = props
	const tagName = tag === 'UI-UX' ? 'UI/UX' : tag
	const navigate = useNavigate()

	const handleClick = (e: React.MouseEvent, text: string) => {
		e.stopPropagation()
		const query = Sanitize(text)
		navigate({ pathname: props.pathname, search: '?q=' + query })
		props.setQuery(query)
	}

	return (
		<>
			<TagButton onClick={(e) => handleClick(e, tagName)} tabIndex={-1}>
				{tagName}
			</TagButton>
			{!isLastTag && ', '}
		</>
	)
}

const TagButton = styled.span`
	cursor: pointer;
	width: 100%;
	padding-top: 3px;
	font-size: 0.9em;
	text-align: center;

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`
