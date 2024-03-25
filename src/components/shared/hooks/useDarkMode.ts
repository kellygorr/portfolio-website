import { useEffect, useState } from 'react'

export const useDarkMode = (): [boolean, () => void] => {
	const [isDarkMode, setTheme] = useState(false)

	const setMode = (isDarkMode: boolean) => {
		window.localStorage.setItem('isDarkMode', isDarkMode.toString())
		setTheme(isDarkMode)
	}

	const toggleDarkMode = () => {
		setMode(!isDarkMode)
	}

	useEffect(() => {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
		const localTheme = window.localStorage.getItem('isDarkMode')
		localTheme ? setTheme(localTheme === 'true') : systemTheme && setTheme(systemTheme)
	}, [])
	return [isDarkMode, toggleDarkMode]
}
