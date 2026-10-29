import { useState } from 'react'

// Reads the user's saved preference (or system preference, as a fallback)
// SYNCHRONOUSLY, during the very first render -- not after mount in a
// useEffect, which is what this used to do. Since this is a pure
// client-rendered app (no SSR, so there's no server/client markup mismatch
// risk to worry about here), there is no reason not to compute the real
// starting theme immediately: the previous always-start-false-then-correct-
// in-an-effect approach forced a real extra render after the initial
// (wrong, light) one, and GlobalStyles' global 0.5s background-color
// transition then visibly ANIMATED that correction -- so reloading with
// dark mode saved flashed light, then visibly faded to dark, every time.
const getInitialDarkMode = (): boolean => {
	if (typeof window === 'undefined') {
		return false
	}
	const localTheme = window.localStorage.getItem('isDarkMode')
	if (localTheme) {
		return localTheme === 'true'
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useDarkMode = (): [boolean, () => void] => {
	const [isDarkMode, setTheme] = useState(getInitialDarkMode)

	const setMode = (isDarkMode: boolean) => {
		window.localStorage.setItem('isDarkMode', isDarkMode.toString())
		setTheme(isDarkMode)
	}

	const toggleDarkMode = () => {
		setMode(!isDarkMode)
	}

	return [isDarkMode, toggleDarkMode]
}
