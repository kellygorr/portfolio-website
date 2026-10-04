import type { JSX } from 'react'
import styled from 'styled-components'

// `data` must only ever come from static, developer-authored project
// content (src/data/projects/*) — never from user input (URL/search
// query, form fields, etc.) — since this renders raw HTML unescaped.
export const Body = (props: { data: string }): JSX.Element => {
	return <Paragraph dangerouslySetInnerHTML={{ __html: props.data }} />
}

const Paragraph = styled.p``
