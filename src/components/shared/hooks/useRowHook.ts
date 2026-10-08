import { useEffect, useState, useRef } from 'react'

export const useRowHook = (projectLength: number): [React.RefObject<HTMLUListElement | null>, number, number] => {
	const ref = useRef<HTMLUListElement>(null)
	const [rowLength, setRowLength] = useState(0)
	const [overflowAmount, setOverflowAmount] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			if (ref.current) {
				const columns = window.getComputedStyle(ref.current).gridTemplateColumns.split(' ').filter(Boolean)
				const nextRowLength = Math.max(columns.length, 1)
				setRowLength(nextRowLength)
				const overflow = projectLength % nextRowLength
				setOverflowAmount(overflow ? nextRowLength - overflow : overflow)
			}
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		// cleanup this component
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [projectLength])

	return [ref, rowLength, overflowAmount]
}
