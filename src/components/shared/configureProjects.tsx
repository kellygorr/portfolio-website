import { IProject, IHighlight, HighlightName, TagType, SkillType, ToolType } from '../../data/IProject'

export const configureProjects = (projects: IProject[]): IProject[] => {
	projects?.forEach((project) => {
		const highlights: IHighlight[] = []

		// Add title to beginning of content
		if (!project.content[0].header) {
			project.content.unshift({ title: project.details.header })
		}

		// Find all highlights and add them to details (thumbnail)
		project?.content?.forEach((section) => {
			section?.highlight?.forEach((highlight) => {
				if (highlight.tags && highlight.header !== HighlightName.Localization) {
					highlights.push(highlight)
				}
			})
		})

		if (highlights) {
			// Combine duplicate keys and remove duplicate values
			const result: IHighlight[] = Object.values(
				highlights.reduce((c, { header, tags }, index, array) => {
					// Check for duplicate keys
					c[header] = c[header] || { header, tags }

					// Check for duplicate values on the last item only
					if (array.length - 1 === index) {
						c[header].tags = removeDuplicateValues(c[header].tags.concat(Array.isArray(tags) ? tags : [tags]))
					}

					return c
				}, {})
			)

			if (result) {
				project.details.highlights = result
			}
		}
	})

	return projects
}

function removeDuplicateValues(array: (TagType | SkillType | ToolType | string)[]) {
	const a = array.concat()
	for (let i = 0; i < a.length; ++i) {
		for (let j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j]) a.splice(j--, 1)
		}
	}

	return a
}
