import styled from 'styled-components'
import { IProject, relatedTags, TagType, SkillType } from '../../data/IProject'
import { SMALL_SCREEN } from '../../styles/GlobalStyles'
import { Heading } from '../Page'
import { Tags, Thumbnail } from '../shared'

interface ISearchProps {
	projects: IProject[]
	query: string | null
	setQuery: (query: string) => void
	thumbnailClick: () => void
}

interface IProjectSearch extends IProject {
	query: string
}

export const SearchResults = (props: ISearchProps): JSX.Element | null => {
	if (!props.query) {
		return null
	}

	const relatedMatches: IProjectSearch[] = relatedQueryMatches(props.projects, props.query)
	let matches: IProjectSearch[] = queryMatches(props.projects, props.query)
	matches = removeDuplicateTitles([...relatedMatches, ...matches])

	const searchResults: IProjectSearch[] = matches.filter((match) => match.query === props.query)
	const relatedResults: IProjectSearch[] = matches.filter((match) => match.query !== props.query)
	const relatedResultTags =
		relatedResults && relatedResults.map((project) => project.query).filter((value, index, self) => self.indexOf(value) === index)

	return (
		<>
			{searchResults.length > 0 ? (
				<Gallery>
					<Heading>
						<span>Results </span>
						<Tags tags={[props.query]} setQuery={props.setQuery} />
					</Heading>
					{searchResults.map((project: IProjectSearch) => (
						<Thumbnail
							key={project.details.header}
							data={project.details}
							thumbnailClick={props.thumbnailClick}
							setQuery={props.setQuery}
							showFull={true}
						/>
					))}
				</Gallery>
			) : (
				<>
					<Message>
						<Heading>Sorry, no results for {props.query}</Heading>
					</Message>
				</>
			)}

			{relatedResults.length > 0 && (
				<>
					<Gallery>
						<Divider />
					</Gallery>
					<Gallery>
						<Heading>
							<span>Related results </span>
							<Tags tags={relatedResultTags} setQuery={props.setQuery} />
						</Heading>
						{relatedResults.map((project: IProjectSearch) => (
							<Thumbnail
								key={project.details.header}
								data={project.details}
								thumbnailClick={props.thumbnailClick}
								setQuery={props.setQuery}
								showFull={true}
							/>
						))}
					</Gallery>
				</>
			)}
		</>
	)
}

const queryMatches = (projects: IProject[], query: string): IProjectSearch[] => {
	const tagMatches: IProject[] = projects.filter(
		(project: IProject) => project.details.tags && project.details.tags.find((tag) => tag.toLowerCase() === query.toLowerCase())
	)
	const skillMatches: IProject[] = projects.filter(
		(project: IProject) =>
			project.content &&
			project.content.find(
				(section) =>
					section.highlight &&
					section.highlight.find((item) => item.tags && item.tags.find((tag) => tag.toLowerCase() === query.toLowerCase()))
			)
	)
	const titleMatches: IProject[] = projects.filter(
		(project: IProject) => project.details.header.toLowerCase().indexOf(query.toLowerCase()) !== -1
	)

	const matches: IProject[] = removeDuplicates([...tagMatches, ...skillMatches, ...titleMatches])
	matches.forEach((match) => ((match as IProjectSearch).query = query))

	return matches as IProjectSearch[]
}

const removeDuplicates = (matches: IProject[]): IProject[] => matches.filter((match, index) => matches.indexOf(match) >= index)

const removeDuplicateTitles = (matches: IProjectSearch[]) =>
	matches.filter((item, pos, array) => array.map((mapItem) => mapItem.details['header']).indexOf(item.details['header']) === pos)

const relatedQueryTags = (query: string) => {
	let tags: any = relatedTags.filter((tags) => tags.find((tag) => tag.toLowerCase() === query.toLowerCase()))
	tags = removeDuplicates([].concat(...tags))
	return tags.filter((tag: TagType | SkillType) => tag !== query)
}

const relatedQueryMatches = (projects: IProject[], query: string): IProjectSearch[] => {
	const tags: (TagType | SkillType)[] = relatedQueryTags(query)
	return tags.map((tag) => queryMatches(projects, tag)).flat(1) // Flatten IProjectSearch[][] to IProjectSearch[]
}

const Message = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Gallery = styled.ul`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 450px));
	justify-content: center;
	grid-gap: 25px 15px;

	@media (min-width: ${SMALL_SCREEN}px) {
		grid-template-columns: repeat(2, minmax(200px, 450px));
	}

	> h3 {
		grid-row: 1;
		grid-column: 1/-1;

		> span {
			padding-right: 5px;
		}
	}

	> hr {
		grid-row: 1;
		grid-column: 1/-1;
		margin: 50px 0;
	}
`
const Divider = styled.hr`
	height: 1px;
	width: 100%;
	background-color: transparent;
`
