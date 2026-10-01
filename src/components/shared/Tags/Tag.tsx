import type { JSX } from 'react'
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
			{/* Search on the ORIGINAL tag value ("UI-UX"), not the renamed
			    display label ("UI/UX") — Sanitize() keeps both '-' and '/'
			    as valid characters rather than stripping either, so
			    sanitizing the slash-renamed display text produces a
			    different query string ("ui/ux") than what's actually
			    stored on every project's data ("UI-UX" -> "ui-ux"),
			    silently breaking the search for every project with this
			    skill. The label itself still shows the friendlier "UI/UX"
			    rendering. */}
			<TagButton onClick={(e) => handleClick(e, tag)} tabIndex={-1}>
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
