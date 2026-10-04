import { FunctionComponent, useState, useEffect, useMemo } from 'react'
import { tokens } from '@fluentui/react-components'
import { useBreakpointIndicatorStyles } from './BreakpointIndicator.styles'
import { useWindowWidth } from '../../utils/hooks'

// Constants
const DEFAULT_BREAKPOINTS = [480, 768, 1024]
const PROXIMITY_THRESHOLD = 5
const EXACT_MATCH_COLOR = '#006900'
const BASE_COLOR = { r: 66, g: 66, b: 66 } // neutralForeground1 approximation
const TARGET_COLOR = { r: 184, g: 134, b: 11 } // dark goldenrod

interface BreakpointIndicatorProps {
	show: boolean
	initialY?: number
	breakpoints?: number[]
}

export const BreakpointIndicator: FunctionComponent<BreakpointIndicatorProps> = ({
	show,
	initialY = 18,
	breakpoints = DEFAULT_BREAKPOINTS,
}) => {
	const screenWidth = useWindowWidth()
	const [indicatorY, setIndicatorY] = useState<number>(initialY)
	const [isDragging, setIsDragging] = useState<boolean>(false)
	const styles = useBreakpointIndicatorStyles()

	// Handle drag functionality
	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true)
		e.preventDefault()
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging) {
			const newY = (e.clientY / window.innerHeight) * 100
			setIndicatorY(Math.max(0, Math.min(100, newY)))
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
		}
	}, [isDragging])

	// Memoized breakpoint calculations
	const breakpointInfo = useMemo(() => {
		const distances = breakpoints.map((bp) => Math.abs(screenWidth - bp))
		const minDistance = Math.min(...distances)
		const isAtBreakpoint = breakpoints.includes(screenWidth)
		const isNearBreakpoint = minDistance <= PROXIMITY_THRESHOLD

		// Calculate proximity factor
		let proximity = 0
		if (minDistance === 0) proximity = 1
		else if (minDistance <= 5) proximity = 0.8
		else if (minDistance <= 10) proximity = 0.6
		else if (minDistance <= 15) proximity = 0.4
		else if (minDistance <= 20) proximity = 0.2

		return { isAtBreakpoint, isNearBreakpoint, proximity, minDistance }
	}, [screenWidth, breakpoints])

	// Memoized indicator colors
	const indicatorColors = useMemo(() => {
		const { isAtBreakpoint, proximity } = breakpointInfo

		if (isAtBreakpoint) {
			return {
				lineColor: EXACT_MATCH_COLOR,
				boxColor: EXACT_MATCH_COLOR,
				fontWeight: 900,
			}
		}

		if (proximity > 0) {
			// Interpolate colors
			const r = Math.floor(BASE_COLOR.r + (TARGET_COLOR.r - BASE_COLOR.r) * proximity)
			const g = Math.floor(BASE_COLOR.g + (TARGET_COLOR.g - BASE_COLOR.g) * proximity)
			const b = Math.floor(BASE_COLOR.b + (TARGET_COLOR.b - BASE_COLOR.b) * proximity)
			const color = `rgb(${r}, ${g}, ${b})`

			return {
				lineColor: color,
				boxColor: color,
				fontWeight: proximity > 0.5 ? 700 : 'bold',
			}
		}

		// Default state
		return {
			lineColor: tokens.colorNeutralForeground1,
			boxColor: tokens.colorNeutralForeground1,
			textColor: 'white',
			fontWeight: 'bold',
		}
	}, [breakpointInfo])

	if (!show) return null

	return (
		<>
			<div
				className={styles.widthIndicator}
				style={{
					top: `${indicatorY}%`,
					cursor: isDragging ? 'grabbing' : 'grab',
				}}
				onMouseDown={handleMouseDown}
			>
				<div
					className={styles.widthIndicatorLine}
					style={{
						backgroundColor: indicatorColors.lineColor,
					}}
				/>
				<div
					className={styles.widthBox}
					style={{
						backgroundColor: indicatorColors.boxColor,
					}}
				>
					{screenWidth}px
				</div>
			</div>
			{breakpointInfo.isNearBreakpoint && (
				<div
					className={styles.viewportBorder}
					style={{
						boxShadow: `inset 0 0 0 ${breakpointInfo.isAtBreakpoint ? '4px' : '2px'} ${indicatorColors.lineColor}`,
					}}
				/>
			)}
		</>
	)
}
