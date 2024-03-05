export const Sanitize = (text: string): string => text.replace(/[^-,^/,a-zA-Z0-9]/g, '').toLowerCase()

export const SanitizePath = (text: string): string => {
	// Remove extra params.  Params start with ?
	const path = text.split('?')[0]
	return Sanitize(path)
}

export const GetPageName = (text: string): string => {
	const path = text.replaceAll(' ', '-')
	return Sanitize(path)
}
