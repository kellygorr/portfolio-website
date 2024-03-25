import styled from 'styled-components'
import { IProject, ISection, SectionType } from '../../data/IProject'
import { MEDIUM_SMALL_SCREEN, SIDE_GAP } from '../../styles/GlobalStyles'
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

export const Page: React.FC<IPageProps> = (props: IPageProps) => {
	const { title } = useParams()
	const projectName = title && SanitizePath(title)
	const project = props.projects.find((project) => projectName === GetPageName(project.details.header))

	if (!project?.content) {
		return <Navigate to="/" />
	}

	const content: ISection[] = project.content
	console.log('PAGE content', content)
	return (
		<Container>
			{(content || []).map((data: ISection, index) => {
				const items: [string, ISection][] = Object.entries(data)
				const type = items[0][0]

				return (
					<SectionPadding key={index} style={type !== SectionType.Slideshow ? sectionStyle : slideshowStyle}>
						<SectionWidth style={{ maxWidth: type !== SectionType.Slideshow ? MAX_WIDTH : '' }}>
							{items.map((item, index) => {
								return <Section key={index} type={item[0] as SectionType} data={item[1] as any} setQuery={props.setQuery} />
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
const SectionWidth = styled.div`
	margin: 0 auto;
`
