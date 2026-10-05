import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { normalizeHref } from '../../../utils/links'

interface ILinkWrapperProps {
	isExternal: boolean
	link: string
	tabIndex?: number
	children: React.ReactNode
}

export const LinkWrapper = (props: ILinkWrapperProps): JSX.Element => {
	return props.isExternal ? (
		<a href={normalizeHref(props.link)} target="_blank" rel="noopener noreferrer">
			{props.children}
		</a>
	) : (
		<Link to={props.link} tabIndex={props.tabIndex}>
			{props.children}
		</Link>
	)
}
