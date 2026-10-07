import { useState, useRef, useCallback, useEffect } from 'react'
import { useStyles } from './EditorialClamp.styles'
import { useBebopStyles2 } from './shared/styles/ramp.styles'
import { useWindowWidth } from './shared/utils/hooks'
import { BreakpointLine } from '../SettingsPanel'
import { SettingsCheckbox, SettingsPanel, SettingsSwitch } from '../SettingsPanel'
import './shared/styles/typography-base.css'

// Constants for this page
const EDITORIAL_BREAKPOINTS = [320, 1440]

export const EditorialClamp = ({ accentColor, fillViewport = true }: { accentColor?: string; fillViewport?: boolean }) => {
	const [showFontSize, setShowFontSize] = useState<boolean>(true)
	const [usePxUnits, setUsePxUnits] = useState<boolean>(true)
	const [showBreakpoints, setShowBreakpoints] = useState<boolean>(true)
	const windowWidth = useWindowWidth() // Triggers re-renders on resize
	const styles = useStyles()
	const bebopStyles2 = useBebopStyles2()

	// Add/remove class to html element for font-size override
	useEffect(() => {
		document.documentElement.classList.add('typography-active')
		return () => {
			document.documentElement.classList.remove('typography-active')
		}
	}, [])

	// Refs for measuring actual font sizes
	const heading2Ref = useRef<HTMLDivElement>(null)
	const heading5Ref = useRef<HTMLDivElement>(null)
	const paragraph1Refs = useRef<(HTMLDivElement | null)[]>([null, null])
	const heading6Ref = useRef<HTMLDivElement>(null)

	// Get actual computed font size from DOM
	const getCurrentFontSize = useCallback(
		(element: 'heading2' | 'heading5' | 'heading6' | 'paragraph1', index: number = 0) => {
			let ref = null

			switch (element) {
				case 'heading2':
					ref = heading2Ref.current
					break
				case 'heading5':
					ref = heading5Ref.current
					break
				case 'heading6':
					ref = heading6Ref.current
					break
				case 'paragraph1':
					ref = paragraph1Refs.current[index]
					break
			}

			if (ref) {
				const computedStyle = window.getComputedStyle(ref)
				const fontSize = parseFloat(computedStyle.fontSize)

				if (usePxUnits) {
					return fontSize.toFixed(1)
				} else {
					// Convert px to rem (assuming 16px = 1rem)
					const remValue = fontSize / 16
					return remValue.toFixed(2)
				}
			}
			return ''
		},
		[windowWidth, usePxUnits],
	)

	// Helper function for font size display
	const getFontSizeDisplay = useCallback(
		(element: 'heading2' | 'heading5' | 'heading6' | 'paragraph1', index: number = 0, prefix: string = '') => {
			if (!showFontSize) return ''
			const size = getCurrentFontSize(element, index)
			const unit = usePxUnits ? 'px' : 'rem'
			return prefix ? ` ${prefix}: ${size}${unit}` : ` - ${size}${unit}`
		},
		[showFontSize, getCurrentFontSize, usePxUnits],
	)
	return (
		<div className={styles.container} style={fillViewport ? undefined : { minHeight: 'auto' }}>
			{showBreakpoints && <BreakpointLine breakpoints={EDITORIAL_BREAKPOINTS} />}
			<SettingsPanel transparentButton hoverIconColor={accentColor}>
				<SettingsCheckbox label="Show font sizes" checked={showFontSize} onChange={setShowFontSize} accentColor={accentColor} />
				<SettingsCheckbox label="Show breakpoint marker" checked={showBreakpoints} onChange={setShowBreakpoints} accentColor={accentColor} />
				<SettingsSwitch label="rem/px" checked={usePxUnits} onChange={setUsePxUnits} accentColor={accentColor} />
			</SettingsPanel>
			<article className={`${styles.article}`}>
				<h2 ref={heading2Ref} className={`${bebopStyles2.heading2} ${styles.heading2Override}`}>
					Introducing A Design System Built for AI-First Experiences{getFontSizeDisplay('heading2')}
				</h2>
				<h5 ref={heading5Ref} className={`${bebopStyles2.heading5} ${styles.heading5Override}`}>
					Ensuring products feel intuitive, accessible, and beautifully consistent{getFontSizeDisplay('heading5')}
				</h5>
				<p
					ref={(el) => {
						paragraph1Refs.current[0] = el
					}}
					className={`${bebopStyles2.paragraph1} ${styles.paragraph1Override}`}
				>
					A new design system that adapts to the way AI shapes interactions. Every component is responsive, context-aware, and
					designed to evolve with the user's needs. Instead of rigid templates, we provide living patterns that grow smarter as
					experiences change. With scalable typography, dynamic color, and adaptive layouts, we ensure products feel intuitive,
					accessible, and beautifully consistent, no matter where AI takes them next.{getFontSizeDisplay('paragraph1', 0)}
				</p>
				<div className={styles.twoColumnGrid}>
					<h6 ref={heading6Ref} className={`${styles.leftColumn} ${bebopStyles2.heading6} ${styles.heading6Override}`}>
						Design that is flexible, fluid, and one step ahead{getFontSizeDisplay('heading6')}
					</h6>
					<p
						ref={(el) => {
							paragraph1Refs.current[1] = el
						}}
						className={`${styles.rightColumn} ${bebopStyles2.paragraph1} ${styles.paragraph1Override}`}
					>
						By blending intelligence with accessibility, Flex helps teams create experiences that feel natural, scalable, and
						ready for whatever comes next.{getFontSizeDisplay('paragraph1', 1)}
					</p>
				</div>
				<div className={styles.breakpointInfo}>
					<span>Breakpoints:</span>
					<div className={styles.breakpoint}>320px</div>
					<div className={styles.breakpoint}>1440px</div>
				</div>
			</article>
		</div>
	)
}
