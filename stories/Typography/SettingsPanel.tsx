import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Settings24Regular } from '@fluentui/react-icons'

/**
 * The gear-icon trigger button shared by every Typography story's
 * settings UI (Editorial Clamp, Clamp Breakpoint, Font Face Demo) — one
 * visual button (border, background, hover color) instead of each demo
 * reimplementing its own. `hoverIconColor` is the one thing that varies
 * per-demo: pass in that demo's own randomized theme color so the icon
 * tints to match on hover, instead of a hardcoded color.
 */
export const SettingsGearButton = ({
	onClick,
	transparentBackground = false,
	hoverIconColor,
	ariaLabel = 'Settings',
}: {
	onClick: () => void
	transparentBackground?: boolean
	hoverIconColor?: string
	ariaLabel?: string
}) => {
	const [hovered, setHovered] = useState(false)

	return (
		<>
			<style>{`
				.typography-settings-gear,
				.typography-settings-gear:hover,
				.typography-settings-gear:focus,
				.typography-settings-gear:active,
				.typography-settings-gear:focus:not(:focus-visible) {
					border-color: #d1c7b8 !important;
				}
			`}</style>
			<button
				type="button"
				className="typography-settings-gear"
				aria-label={ariaLabel}
				onClick={onClick}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{
					width: 36,
					height: 36,
					appearance: 'none',
					WebkitAppearance: 'none',
					boxSizing: 'border-box',
					border: '1px solid #d1c7b8',
					borderRadius: 8,
					background: transparentBackground ? 'transparent' : '#fff',
					color: hovered && hoverIconColor ? hoverIconColor : '#242424',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					outline: '1px solid #d1c7b8',
					outlineOffset: '-1px',
				}}
			>
				<Settings24Regular />
			</button>
		</>
	)
}

export const SettingsPanel = ({
	children,
	transparentButton = false,
	hoverIconColor,
}: {
	children: ReactNode
	transparentButton?: boolean
	hoverIconColor?: string
}) => {
	const [open, setOpen] = useState(false)

	return (
		<div style={{ position: 'absolute', top: 16, right: 16, zIndex: 2001 }}>
			<SettingsGearButton
				onClick={() => setOpen((current) => !current)}
				transparentBackground={transparentButton}
				hoverIconColor={hoverIconColor}
			/>
			{open && (
				<div
					style={{
						position: 'absolute',
						top: 44,
						right: 0,
						width: 280,
						padding: 14,
						border: '1px solid #d1c7b8',
						borderRadius: 10,
						background: 'rgba(255, 255, 255, 0.96)',
						boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						zIndex: 4000,
						fontFamily: 'Segoe UI, Arial, sans-serif',
						fontSize: 13,
					}}
				>
					{children}
				</div>
			)}
		</div>
	)
}

export const SettingsCheckbox = ({
	label,
	checked,
	onChange,
	accentColor,
}: {
	label: string
	checked: boolean
	onChange: (checked: boolean) => void
	accentColor?: string
}) => (
	<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
		<input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} style={{ accentColor }} />
		<span>{label}</span>
	</label>
)

export const SettingsSwitch = ({
	label,
	checked,
	onChange,
	accentColor,
}: {
	label: string
	checked: boolean
	onChange: (checked: boolean) => void
	accentColor?: string
}) => (
	<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			onClick={() => onChange(!checked)}
			style={{
				position: 'relative',
				width: 38,
				height: 20,
				border: 0,
				borderRadius: 999,
				background: checked ? (accentColor ?? '#242424') : '#d1c7b8',
				cursor: 'pointer',
				padding: 0,
				transition: 'background 150ms ease',
			}}
		>
			<span
				style={{
					position: 'absolute',
					top: 2,
					left: checked ? 20 : 2,
					width: 16,
					height: 16,
					borderRadius: '50%',
					background: '#fff',
					transition: 'left 150ms ease',
				}}
			/>
		</button>
		<span>{label}</span>
	</label>
)

export const SettingsRange = ({
	label,
	value,
	min,
	max,
	step = 1,
	onChange,
	accentColor,
}: {
	label: string
	value: number
	min: number
	max: number
	step?: number
	onChange: (value: number) => void
	accentColor?: string
}) => (
	<label style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
		<span>{label}</span>
		<span style={{ fontFamily: 'monospace' }}>{value}</span>
		<input
			type="range"
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={(event) => onChange(Number(event.target.value))}
			style={{ gridColumn: '1 / -1', width: '100%', accentColor }}
		/>
	</label>
)

export const BreakpointLine = ({ breakpoints }: { breakpoints: number[] }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [containerWidth, setContainerWidth] = useState(0)
	const [lineY, setLineY] = useState(18)
	const [dragging, setDragging] = useState(false)

	useEffect(() => {
		const parent = ref.current?.parentElement
		if (!parent) return

		const update = () => setContainerWidth(Math.round(parent.getBoundingClientRect().width))
		const observer = new ResizeObserver(update)
		update()
		observer.observe(parent)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!dragging) return
		const handleMove = (event: MouseEvent) => {
			const parent = ref.current?.parentElement
			if (!parent) return
			const rect = parent.getBoundingClientRect()
			setLineY(Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100)))
		}
		const handleUp = () => setDragging(false)
		window.addEventListener('mousemove', handleMove)
		window.addEventListener('mouseup', handleUp)
		return () => {
			window.removeEventListener('mousemove', handleMove)
			window.removeEventListener('mouseup', handleUp)
		}
	}, [dragging])

	const state = useMemo(() => {
		const distance = Math.min(...breakpoints.map((breakpoint) => Math.abs(containerWidth - breakpoint)))
		const atBreakpoint = breakpoints.includes(containerWidth)
		const nearBreakpoint = distance <= 20
		const color = atBreakpoint ? '#006900' : nearBreakpoint ? '#b8860b' : '#242424'
		return { atBreakpoint, nearBreakpoint, color }
	}, [breakpoints, containerWidth])

	return (
		<>
			<div
				ref={ref}
				style={{
					position: 'absolute',
					top: `${lineY}%`,
					left: 0,
					right: 0,
					height: 20,
					zIndex: 1000,
					cursor: dragging ? 'grabbing' : 'grab',
				}}
				onMouseDown={(event) => {
					event.preventDefault()
					setDragging(true)
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: 0,
						right: 0,
						height: 2,
						transform: 'translateY(-50%)',
						background: state.color,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						right: 0,
						transform: 'translateY(-50%)',
						padding: '4px 8px',
						borderRadius: 4,
						background: state.color,
						color: '#fff',
						font: '700 12px/1 monospace',
					}}
				>
					{containerWidth}px
				</div>
			</div>
			{state.nearBreakpoint && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						zIndex: 999,
						pointerEvents: 'none',
						boxShadow: `inset 0 0 0 ${state.atBreakpoint ? 4 : 2}px ${state.color}`,
					}}
				/>
			)}
		</>
	)
}
