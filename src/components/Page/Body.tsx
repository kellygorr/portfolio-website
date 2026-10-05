import type { JSX } from 'react'
import styled from 'styled-components'
import { normalizeHref } from '../../utils/links'

// `data` must only ever come from static, developer-authored project
// content (src/data/projects/*) — never from user input (URL/search
// query, form fields, etc.) — since this renders raw HTML unescaped.
export const Body = (props: { data: string }): JSX.Element => {
	const html = props.data.replace(/<a\s+([^>]*href=(["'])([^"']+)\2[^>]*)>/g, (_match, attrs, quote, href) => {
		const normalizedAttrs = attrs.replace(`href=${quote}${href}${quote}`, `href=${quote}${normalizeHref(href)}${quote}`)
		const withTarget = /\starget=/.test(normalizedAttrs) ? normalizedAttrs : `${normalizedAttrs} target="_blank"`
		const withRel = /\srel=/.test(withTarget) ? withTarget : `${withTarget} rel="noopener noreferrer"`
		return `<a ${withRel}>`
	})
	return <Paragraph dangerouslySetInnerHTML={{ __html: html }} />
}

const Paragraph = styled.p``
