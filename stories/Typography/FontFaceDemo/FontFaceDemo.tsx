import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Button } from '@fluentui/react-components'
import { useStyles } from './FontFaceDemo.styles'
import { ControlPanel } from './ControlPanel'
import { SettingsGearButton } from '../SettingsPanel'
import { useContentStyles } from './shared/styles/ramp.styles'
import { useFullDemoStyles } from './FullDemo/FullDemo.styles'
import { useWindowWidth } from './shared/utils/hooks'
import { BreakpointIndicator } from './shared/components/BreakpointIndicator/BreakpointIndicator'
import aptosWoff2Url from '../../../src/assets/fonts/aptos/Aptos.woff2?url'
import aptosWoffUrl from '../../../src/assets/fonts/aptos/Aptos.woff?url'

// Bumped to -v2: the previous key could hold stale color values saved
// to localStorage (e.g. blue/green) that silently override
// DEFAULT_UI_SETTINGS below on every load (loadUISettings() merges
// saved values OVER the defaults) — so changing the defaults alone
// never actually changed what was displayed. Bumping the key forces
// everyone back onto the current defaults.
const UI_SETTINGS_STORAGE_KEY = 'fontFaceDemo-ui-settings-v2'

const debounce = (fn: (value: string) => void, delay: number) => {
	let timeoutId: number | undefined
	const debounced = (value: string) => {
		if (timeoutId !== undefined) window.clearTimeout(timeoutId)
		timeoutId = window.setTimeout(() => fn(value), delay)
	}
	debounced.cancel = () => {
		if (timeoutId !== undefined) window.clearTimeout(timeoutId)
	}
	return debounced
}

// UI settings interface
interface UISettings {
	showAptos: boolean
	segoeColor: string
	segoeOpacity: number
	aptosColor: string
	aptosOpacity: number
	sizeAdjust: number
	ascentOverride: number
	descentOverride: number
	showControlPanel: boolean
}

// Default UI settings - using values that result in 'normal' (no override)
const DEFAULT_UI_SETTINGS: UISettings = {
	showAptos: true,
	segoeColor: '#a85d2f',
	segoeOpacity: 1,
	aptosColor: '#c8843d',
	aptosOpacity: 1,
	sizeAdjust: 100, // 100% = normal (no size adjustment)
	ascentOverride: 100, // 100% = normal (no ascent override)
	descentOverride: 100, // 100% = normal (no descent override)
	showControlPanel: false,
}

// localStorage utilities
const loadUISettings = (): UISettings => {
	try {
		const saved = localStorage.getItem(UI_SETTINGS_STORAGE_KEY)
		const merged = saved ? { ...DEFAULT_UI_SETTINGS, ...JSON.parse(saved) } : DEFAULT_UI_SETTINGS
		// When embedded via the portfolio site's Demo wrapper, the parent
		// page passes the demo's randomized palette colors (Segoe ->
		// backgroundDark, Aptos -> darkestColor) as query params — these
		// win over both the hardcoded defaults AND any saved localStorage
		// values, so the demo always matches its own page's palette
		// instead of whatever color a visitor last picked in the color
		// pickers.
		const params = new URLSearchParams(window.location.search)
		const segoeColor = params.get('segoeColor')
		const aptosColor = params.get('aptosColor')
		return {
			...merged,
			...(segoeColor ? { segoeColor } : {}),
			...(aptosColor ? { aptosColor } : {}),
		}
	} catch {
		return DEFAULT_UI_SETTINGS
	}
}

const saveUISettings = (settings: UISettings): void => {
	try {
		localStorage.setItem(UI_SETTINGS_STORAGE_KEY, JSON.stringify(settings))
	} catch {
		// Handle localStorage errors silently
	}
}

// Constants
const EDITORIAL_BREAKPOINTS = [320, 1440]
const STYLE_MAPPING = {
	heading2: 'Heading2',
	heading5: 'Heading3', // Map heading5 to Heading3 since there's no Heading5
	heading6: 'Heading4', // Map heading6 to Heading4 since there's no Heading6
	base: 'Base',
} as const

export const FontFaceDemo = () => {
	const initialUISettings = loadUISettings()
	// Darkest theme color for this demo's own page (passed in as a
	// query param, same mechanism as segoeColor/aptosColor above) — used
	// for the settings gear's hover color, the "Show/Hide Aptos" button
	// background, and every slider's accentColor in ControlPanel.
	// Doesn't need localStorage persistence since it's not a
	// user-adjustable setting, only ever set by the embedding page.
	const accentColor = useMemo(() => new URLSearchParams(window.location.search).get('accentColor') || '#a85d2f', [])

	// Session-only state (not persisted)
	const [showFontSize, setShowFontSize] = useState(true)
	const [showControlPanel, setShowControlPanel] = useState(false) // Always start closed
	const [usePxUnits, setUsePxUnits] = useState(true)
	const [showBreakpoints, setShowBreakpoints] = useState(true)

	// Persisted state using localStorage
	const [showAptos, setShowAptos] = useState(initialUISettings.showAptos)
	const [segoeColor, setSegoeColor] = useState(initialUISettings.segoeColor)
	const [aptosColor, setAptosColor] = useState(initialUISettings.aptosColor)
	const [segoeOpacity, setSegoeOpacity] = useState(initialUISettings.segoeOpacity)
	const [aptosOpacity, setAptosOpacity] = useState(initialUISettings.aptosOpacity)
	const [sizeAdjust, setSizeAdjust] = useState(initialUISettings.sizeAdjust)
	const [ascentOverride, setAscentOverride] = useState(initialUISettings.ascentOverride)
	const [descentOverride, setDescentOverride] = useState(initialUISettings.descentOverride)

	const windowWidth = useWindowWidth()
	const styles = useStyles()
	const contentStyles = useContentStyles()
	const fullDemoStyles = useFullDemoStyles()

	// Create a unique font family name to avoid conflicts
	const dynamicFontFamily = 'Aptos-Dynamic'

	// Helper function for formatting font descriptors
	const formatOverride = (value: number, defaultValue: number) => (value === defaultValue ? 'normal' : `${value}%`) // Memoize font-face CSS content to prevent unnecessary updates
	const fontFaceCSS = useMemo(() => {
		const formattedAscentOverride = formatOverride(ascentOverride, 100) // 100% = normal
		const formattedDescentOverride = formatOverride(descentOverride, 100) // 100% = normal
		const formattedSizeAdjust = formatOverride(sizeAdjust, 100) // 100% = normal

		return `
			@font-face {
				font-family: '${dynamicFontFamily}';
				src: url('${aptosWoff2Url}') format('woff2'), 
					 url('${aptosWoffUrl}') format('woff');
				font-display: fallback;
				ascent-override: ${formattedAscentOverride};
				descent-override: ${formattedDescentOverride};
				size-adjust: ${formattedSizeAdjust};
			}
		`
	}, [sizeAdjust, ascentOverride, descentOverride, dynamicFontFamily])

	// Debounced font-face injection to smooth slider updates
	const debouncedUpdateFont = useMemo(
		() =>
			debounce((css: string) => {
				const updateFont = () => {
					const styleId = 'dynamic-aptos-fontface'
					let style = document.getElementById(styleId) as HTMLStyleElement

					// Create style element if it doesn't exist
					if (!style) {
						style = document.createElement('style')
						style.id = styleId
						style.type = 'text/css'
						document.head.appendChild(style)
					}

					// Only update if content has actually changed
					if (style.textContent !== css) {
						style.textContent = css
					}
				}

				requestAnimationFrame(updateFont)
			}, 20), // 20ms debounce
		[sizeAdjust, ascentOverride, descentOverride],
	)

	useEffect(() => {
		debouncedUpdateFont(fontFaceCSS)

		return () => {
			debouncedUpdateFont.cancel()
		}
	}, [fontFaceCSS, debouncedUpdateFont]) // Save UI settings to localStorage whenever any setting changes
	useEffect(() => {
		saveUISettings({
			showAptos,
			segoeColor,
			segoeOpacity,
			aptosColor,
			aptosOpacity,
			sizeAdjust,
			ascentOverride,
			descentOverride,
			showControlPanel: false, // Don't persist control panel state
		})
	}, [showAptos, segoeColor, segoeOpacity, aptosColor, aptosOpacity, sizeAdjust, ascentOverride, descentOverride])

	// Convert hex color to RGBA with opacity
	const hexToRgba = useCallback((hex: string, opacity: number): string => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		if (!result) return hex

		const [, r, g, b] = result
		return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}, ${opacity})`
	}, [])

	// Reset font adjustments to default values
	const resetFontAdjustments = useCallback(() => {
		const { sizeAdjust: defaultSize, ascentOverride: defaultAscent, descentOverride: defaultDescent } = DEFAULT_UI_SETTINGS
		setSizeAdjust(defaultSize)
		setAscentOverride(defaultAscent)
		setDescentOverride(defaultDescent)
	}, [])

	// Refs for measuring actual font sizes
	const heading2Ref = useRef<HTMLDivElement>(null)
	const heading5Ref = useRef<HTMLDivElement>(null)
	const baseRefs = useRef<(HTMLDivElement | null)[]>([null, null])
	const heading6Ref = useRef<HTMLDivElement>(null)

	// Get actual computed font size from DOM
	const getCurrentFontSize = useCallback(
		(element: 'heading2' | 'heading5' | 'heading6' | 'base', index: number = 0) => {
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
				case 'base':
					ref = baseRefs.current[index]
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
		(element: 'heading2' | 'heading5' | 'heading6' | 'base', index: number = 0, prefix: string = '') => {
			if (!showFontSize) return ''
			const size = getCurrentFontSize(element, index)
			const unit = usePxUnits ? 'px' : 'rem'
			return prefix ? ` ${prefix}: ${size}${unit}` : ` - ${size}${unit}`
		},
		[showFontSize, getCurrentFontSize, usePxUnits],
	)

	// State for tracking which sections are swapped to Aptos
	const [swappedSections, setSwappedSections] = useState<Set<string>>(new Set())

	// Toggle swap for a specific section
	const toggleSectionSwap = useCallback((sectionId: string) => {
		setSwappedSections((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(sectionId)) {
				newSet.delete(sectionId)
			} else {
				newSet.add(sectionId)
			}
			return newSet
		})
	}, [])

	// Helper to get the current font type for a section
	const getSectionFontType = useCallback(
		(sectionId: string) => {
			// Overlay sections are always aptos, regular sections check swappedSections
			const isOverlay = sectionId.includes('overlay')
			return isOverlay || swappedSections.has(sectionId) ? 'aptos' : 'segoe'
		},
		[swappedSections],
	)

	// Get combined CSS class names for sections
	const getSectionStyle = useCallback(
		(styleName: keyof typeof STYLE_MAPPING, sectionId: string) => {
			const sectionType = getSectionFontType(sectionId)

			const contentStyleName = STYLE_MAPPING[styleName]
			const baseStyle = contentStyles[contentStyleName as keyof typeof contentStyles]
			const overrideStyleName = `${contentStyleName}OverrideContent` as keyof typeof fullDemoStyles
			const overrideStyle = fullDemoStyles[overrideStyleName]
			const fontOverride = sectionType === 'segoe' ? styles.segoeFont : styles.aptosFont

			return `${baseStyle} ${overrideStyle} ${fontOverride}`.trim()
		},
		[contentStyles, fullDemoStyles, styles, getSectionFontType],
	)

	return (
		<div className={styles.container}>
			<BreakpointIndicator show={showBreakpoints} breakpoints={EDITORIAL_BREAKPOINTS} />
			<article className={`${styles.article}`}>
				{/* Settings and Controls */}
				<div className={styles.settingsGear}>
					<SettingsGearButton
						onClick={() => setShowControlPanel(!showControlPanel)}
						hoverIconColor={accentColor}
						transparentBackground
					/>
				</div>
				{/* Segoe */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<div style={{ position: 'relative' }}>
						{/** segoe section 0 **/}
						<h2
							ref={heading2Ref}
							className={getSectionStyle('heading2', 'section0')}
							style={{
								color: hexToRgba(segoeColor, segoeOpacity),
							}}
						>
							Introducing A Design System Built for AI-First Experiences{getFontSizeDisplay('heading2')}
						</h2>
						<Button
							appearance="primary"
							size="small"
							onClick={() => toggleSectionSwap('section0')}
							className={styles.sectionSwapButton}
							style={{
								backgroundColor: getSectionFontType('section0') === 'segoe' ? aptosColor : segoeColor,
								borderColor: getSectionFontType('section0') === 'segoe' ? aptosColor : segoeColor,
							}}
						>
							Add {getSectionFontType('section0') === 'segoe' ? 'Aptos' : 'Segoe'}
						</Button>
					</div>
					<div style={{ position: 'relative' }}>
						<h5
							ref={heading5Ref}
							className={getSectionStyle('heading5', 'section1')}
							style={{
								color: hexToRgba(segoeColor, segoeOpacity),
							}}
						>
							Ensuring products feel intuitive, accessible, and beautifully consistent{getFontSizeDisplay('heading5')}
						</h5>
						<Button
							appearance="primary"
							size="small"
							onClick={() => toggleSectionSwap('section1')}
							className={styles.sectionSwapButton}
							style={{
								backgroundColor: getSectionFontType('section1') === 'segoe' ? aptosColor : segoeColor,
								borderColor: getSectionFontType('section1') === 'segoe' ? aptosColor : segoeColor,
							}}
						>
							Add {getSectionFontType('section1') === 'segoe' ? 'Aptos' : 'Segoe'}
						</Button>
					</div>
					<div style={{ position: 'relative' }}>
						{/** segoe section 2 **/}
						<p
							ref={(el) => {
								baseRefs.current[0] = el
							}}
							className={getSectionStyle('base', 'section2')}
							style={{
								color: hexToRgba(segoeColor, segoeOpacity),
							}}
						>
							A new design system that adapts to the way AI shapes interactions. Every component is responsive, context-aware,
							and designed to evolve with the user's needs. Instead of rigid templates, we provide living patterns that grow
							smarter as experiences change. With scalable typography, dynamic color, and adaptive layouts, we ensure products
							feel intuitive, accessible, and beautifully consistent—no matter where AI takes them next.
							{getFontSizeDisplay('base', 0)}
						</p>
						<Button
							appearance="primary"
							size="small"
							onClick={() => toggleSectionSwap('section2')}
							className={styles.sectionSwapButton}
							style={{
								backgroundColor: getSectionFontType('section2') === 'segoe' ? aptosColor : segoeColor,
								borderColor: getSectionFontType('section2') === 'segoe' ? aptosColor : segoeColor,
							}}
						>
							Add {getSectionFontType('section2') === 'segoe' ? 'Aptos' : 'Segoe'}
						</Button>
					</div>
					<div className={styles.twoColumnGrid}>
						{/** segoe section 3 **/}
						<h6
							ref={heading6Ref}
							className={`${styles.leftColumn} ${getSectionStyle('heading6', 'section3')}`}
							style={{
								color: hexToRgba(segoeColor, segoeOpacity),
							}}
						>
							Design that learns with you—flexible, fluid, and always one step ahead{getFontSizeDisplay('heading6')}
						</h6>
						<div style={{ position: 'relative' }}>
							{/** segoe section 4 **/}
							<p
								ref={(el) => {
									baseRefs.current[1] = el
								}}
								className={`${styles.rightColumn} ${getSectionStyle('base', 'section4')}`}
								style={{
									color: hexToRgba(segoeColor, segoeOpacity),
								}}
							>
								By blending intelligence with accessibility, Flex helps teams create experiences that feel natural,
								scalable, and ready for whatever comes next.{getFontSizeDisplay('base', 1)}
							</p>
							<Button
								appearance="primary"
								size="small"
								onClick={() => toggleSectionSwap('section4')}
								className={styles.sectionSwapButton}
								style={{
									backgroundColor: getSectionFontType('section4') === 'segoe' ? aptosColor : segoeColor,
									borderColor: getSectionFontType('section4') === 'segoe' ? aptosColor : segoeColor,
								}}
							>
								Add {getSectionFontType('section4') === 'segoe' ? 'Aptos' : 'Segoe'}
							</Button>
						</div>
					</div>
				</div>
			</article>

			{/* Aptos Overlay */}

			{showAptos && (
				<div className={styles.aptosOverlay}>
					<div className={styles.aptosOverlayContent}>
						<h2
							className={getSectionStyle('heading2', 'overlay-section0')}
							style={{
								color: hexToRgba(aptosColor, aptosOpacity),
							}}
						>
							Introducing A Design System Built for AI-First Experiences{getFontSizeDisplay('heading2')}
						</h2>
						<h5
							className={getSectionStyle('heading5', 'overlay-section1')}
							style={{
								color: hexToRgba(aptosColor, aptosOpacity),
							}}
						>
							Ensuring products feel intuitive, accessible, and beautifully consistent{getFontSizeDisplay('heading5')}
						</h5>
						<p
							className={getSectionStyle('base', 'overlay-section2')}
							style={{
								color: hexToRgba(aptosColor, aptosOpacity),
							}}
						>
							A new design system that adapts to the way AI shapes interactions. Every component is responsive, context-aware,
							and designed to evolve with the user's needs. Instead of rigid templates, we provide living patterns that grow
							smarter as experiences change. With scalable typography, dynamic color, and adaptive layouts, we ensure products
							feel intuitive, accessible, and beautifully consistent—no matter where AI takes them next.
							{getFontSizeDisplay('base', 0)}
						</p>
						<div className={styles.twoColumnGrid}>
							<h6
								className={`${styles.leftColumn} ${getSectionStyle('heading6', 'overlay-section3')}`}
								style={{
									color: hexToRgba(aptosColor, aptosOpacity),
								}}
							>
								Design that learns with you—flexible, fluid, and always one step ahead{getFontSizeDisplay('heading6')}
							</h6>
							<p
								className={`${styles.rightColumn} ${getSectionStyle('base', 'overlay-section4')}`}
								style={{
									color: hexToRgba(aptosColor, aptosOpacity),
								}}
							>
								By blending intelligence with accessibility, Flex helps teams create experiences that feel natural,
								scalable, and ready for whatever comes next.{getFontSizeDisplay('base', 1)}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Control Panel */}
			<ControlPanel
				showControlPanel={showControlPanel}
				showFontSize={showFontSize}
				usePxUnits={usePxUnits}
				showBreakpoints={showBreakpoints}
				onShowFontSizeChange={setShowFontSize}
				onUsePxUnitsChange={setUsePxUnits}
				onShowBreakpointsChange={setShowBreakpoints}
				styles={styles}
				segoeColor={segoeColor}
				aptosColor={aptosColor}
				segoeOpacity={segoeOpacity}
				aptosOpacity={aptosOpacity}
				showAptos={showAptos}
				onSegoeColorChange={setSegoeColor}
				onAptosColorChange={setAptosColor}
				onSegoeOpacityChange={setSegoeOpacity}
				onAptosOpacityChange={setAptosOpacity}
				onShowAptosChange={setShowAptos}
				accentColor={accentColor}
				sizeAdjust={sizeAdjust}
				ascentOverride={ascentOverride}
				descentOverride={descentOverride}
				onSizeAdjustChange={setSizeAdjust}
				onAscentOverrideChange={setAscentOverride}
				onDescentOverrideChange={setDescentOverride}
				onFontAdjustmentsReset={resetFontAdjustments}
			/>
		</div>
	)
}
