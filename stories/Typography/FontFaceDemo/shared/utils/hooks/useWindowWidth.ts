import { useState, useEffect } from 'react'

/**
 * Custom hook that tracks window width and triggers re-renders on resize
 * @returns current window width
 */
export const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState<number>(0)

	useEffect(() => {
		const updateWidth = () => {
			setWindowWidth(window.innerWidth)
		}

		// Set initial width
		updateWidth()

		// Add resize listener
		window.addEventListener('resize', updateWidth)

		// Cleanup
		return () => window.removeEventListener('resize', updateWidth)
	}, [])

	return windowWidth
}
