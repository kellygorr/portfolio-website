import { useState, useEffect } from 'react'
import { useScroll } from 'motion/react'

export const useScrollPosition = (): number => {
	const { scrollY } = useScroll()
	const [hookedYPostion, setHookedYPosition] = useState(0)
	useEffect(() => {
		// hook into onChange, store the current value as state.
		const unsubscribe = scrollY.on('change', (v) => setHookedYPosition(v))
		return unsubscribe
	}, [scrollY]) //make sure to re-subscriobe when scrollYProgress changes

	return hookedYPostion
}
