import styled from 'styled-components'
import { IProject, ISection, SectionType } from '../../data/IProject'
import { MEDIUM_SMALL_SCREEN, SIDE_GAP, SMALL_SCREEN } from '../../styles/GlobalStyles'
import { Section } from './Section'
import { Navigate, useParams } from 'react-router-dom'
import { GetPageName, SanitizePath } from '../shared'
interface IPageProps {
	projects: IProject[]
	setQuery: (query: string) => void
}

export const MAX_WIDTH = '700px'

const sectionStyle = {
	padding: `0 ${SIDE_GAP} 1.5rem ${SIDE_GAP}`,
}

const slideshowStyle = {
	paddingBottom: `1.5rem`,
}

const demoStyle = {
	padding: `1.5rem 0`,
}

export const Page: React.FC<IPageProps> = (props: IPageProps) => {
	const { title } = useParams()
	const projectName = title && SanitizePath(title)
	const project = props.projects.find((project) => projectName === GetPageName(project.details.header))

	if (!project?.content) {
		return <Navigate to="/" />
	}

	const content: ISection[] = project.content
	return (
		<Container>
			{(content || []).map((data: ISection, index) => {
				const items: [string, ISection][] = Object.entries(data)
				const type = items[0][0]
				const isHalfWidthDemo = type === SectionType.Demo && data.demoWidth === 'half'
				const isFullWidth = (type === SectionType.Slideshow || type === SectionType.Demo) && !isHalfWidthDemo

				return (
					<SectionPadding
						key={index}
						style={type === SectionType.Demo ? demoStyle : !isFullWidth ? sectionStyle : slideshowStyle}
					>
						<SectionWidth $collapsible={isHalfWidthDemo} style={{ maxWidth: !isFullWidth ? MAX_WIDTH : '' }}>
							{items.map((item, index) => {
								return (
									<Section
										key={index}
										type={item[0] as SectionType}
										data={item[1] as any}
										setQuery={props.setQuery}
										isHalfWidthDemo={isHalfWidthDemo}
									/>
								)
							})}
						</SectionWidth>
					</SectionPadding>
				)
			})}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 1.1rem;
	line-height: 1.9rem;
	width: 100%;

	h2 {
		bottom: 0.2rem;
	}

	@media (min-width: ${MEDIUM_SMALL_SCREEN}px) {
		font-size: 1.2rem;
	}
`

const SectionPadding = styled.div`
	width: 100%;
	word-wrap: break-word;
`
/**
 * $constrained mirrors the inline maxWidth style (700px cap for non-full-
 * width sections). $collapsible is set only for a half-width Demo section
 * — below SMALL_SCREEN it collapses to the same unconstrained width as a
 * full-width demo (see also DemoWrapper's matching $rounded override in
 * Section.tsx), since there isn't enough room on narrow screens for a
 * demo to visually "match the body text column" the way it does on
 * wider viewports.
 */
const SectionWidth = styled.div<{ $collapsible?: boolean }>`
	margin: 0 auto;

	${({ $collapsible }) =>
		$collapsible &&
		`
		@media (max-width: ${SMALL_SCREEN}px) {
			max-width: none !important;
		}
	`}
`
