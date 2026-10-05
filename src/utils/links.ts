import type { ILink } from '../data/IProject'

export const normalizeHref = (href: string): string => {
	if (/^(https?:|mailto:|tel:|\/|#)/i.test(href)) {
		return href
	}

	if (/^(www\.|[a-z0-9-]+\.[a-z])/i.test(href)) {
		return `https://${href}`
	}

	return href
}

export const getLinkTitle = (link: string | ILink): string => (typeof link === 'string' ? link : link.title)

export const getLinkHref = (link: string | ILink): string => normalizeHref(typeof link === 'string' ? link : link.link)
