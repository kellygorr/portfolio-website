import { useEffect, useState, useRef } from 'react'
import { MEDIUM_SCREEN } from '../../../styles/GlobalStyles'

export const useRowHook = (projectLength: number): [React.MutableRefObject<HTMLUListElement>, number, number] => {
	const ref = useRef<HTMLUListElement>()
	const [rowLength, setRowLength] = useState(0)
	const [overflowAmount, setOverflowAmount] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			if (ref) {
				// Is the width wrong?  Do not include padding on the ref container.
				const width = ref?.current?.clientWidth
				// In order to calculate the correct amount of cells, the padding/margin must be apart of the cell
				const childWidth = ref?.current?.children[0]?.clientWidth
				// This gets messy when we switch from auto-fit (floor) to 2 columns (round)
				const rowLength = width > MEDIUM_SCREEN ? Math.floor(width / childWidth) : Math.round(width / childWidth)
				setRowLength(rowLength)
				const overflow = projectLength % rowLength
				setOverflowAmount(overflow ? rowLength - (projectLength % rowLength) : overflow)
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
