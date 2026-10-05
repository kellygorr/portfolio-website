import { FunctionComponent, useState, useEffect } from 'react'
import { tokens } from '@fluentui/react-components'
import { useBreakpointIndicatorStyles } from './BreakpointIndicator.styles'
import { useWindowWidth } from '../../utils/hooks'

interface BreakpointIndicatorProps {
	show: boolean
	initialY?: number
}

export const BreakpointIndicator: FunctionComponent<BreakpointIndicatorProps> = ({
	show,
	initialY = 18,
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

	const indicatorColors = {
		lineColor: tokens.colorNeutralForeground1,
		boxColor: tokens.colorNeutralForeground1,
	}

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
		</>
	)
}
