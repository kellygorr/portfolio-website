import { useState, useEffect } from 'react'
import { useViewportScroll } from 'framer-motion'

export const useScrollPosition = (): number => {
	const { scrollY } = useViewportScroll()
	const [hookedYPostion, setHookedYPosition] = useState(0)
	useEffect(() => {
		// hook into the onChange, store the current value as state.
		scrollY.onChange((v) => setHookedYPosition(v))
	}, [scrollY]) //make sure to re-subscriobe when scrollYProgress changes

	return hookedYPostion
}
