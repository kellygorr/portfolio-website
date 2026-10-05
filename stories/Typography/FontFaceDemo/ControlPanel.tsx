import { Button } from '@fluentui/react-components'
import { SettingsCheckbox, SettingsSwitch } from '../SettingsPanel'

interface ControlPanelProps {
	showControlPanel: boolean
	showFontSize: boolean
	usePxUnits: boolean
	showBreakpoints: boolean
	onShowFontSizeChange: (checked: boolean) => void
	onUsePxUnitsChange: (checked: boolean) => void
	onShowBreakpointsChange: (checked: boolean) => void
	styles: any
	segoeColor: string
	aptosColor: string
	segoeOpacity: number
	aptosOpacity: number
	showAptos: boolean
	onSegoeColorChange: (color: string) => void
	onAptosColorChange: (color: string) => void
	onSegoeOpacityChange: (opacity: number) => void
	onAptosOpacityChange: (opacity: number) => void
	onShowAptosChange: (show: boolean) => void
	accentColor: string
	sizeAdjust: number
	ascentOverride: number
	descentOverride: number
	onSizeAdjustChange: (value: number) => void
	onAscentOverrideChange: (value: number) => void
	onDescentOverrideChange: (value: number) => void
	onFontAdjustmentsReset: () => void
}

export const ControlPanel = ({
	showControlPanel,
	showFontSize,
	usePxUnits,
	showBreakpoints,
	onShowFontSizeChange,
	onUsePxUnitsChange,
	onShowBreakpointsChange,
	styles,
	segoeColor,
	aptosColor,
	segoeOpacity,
	aptosOpacity,
	showAptos,
	onSegoeColorChange,
	onAptosColorChange,
	onSegoeOpacityChange,
	onAptosOpacityChange,
	onShowAptosChange,
	accentColor,
	sizeAdjust,
	ascentOverride,
	descentOverride,
	onSizeAdjustChange,
	onAscentOverrideChange,
	onDescentOverrideChange,
	onFontAdjustmentsReset,
}: ControlPanelProps) => {
	return (
		<>
			{showControlPanel && (
				<div
					style={{
						position: 'fixed',
						top: '60px',
						right: '16px',
						backgroundColor: 'rgba(255, 255, 255, 0.96)',
						backdropFilter: 'blur(8px)',
						border: '1px solid #e0e0e0',
						borderRadius: '8px',
						padding: '12px',
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
						minWidth: '220px',
						zIndex: 10001,
					}}
				>
					<SettingsCheckbox
						label="Show font sizes"
						checked={showFontSize}
						onChange={onShowFontSizeChange}
						accentColor={accentColor}
					/>
					<SettingsCheckbox
						label="Show breakpoint marker"
						checked={showBreakpoints}
						onChange={onShowBreakpointsChange}
						accentColor={accentColor}
					/>
					<SettingsSwitch label="rem/px" checked={usePxUnits} onChange={onUsePxUnitsChange} accentColor={accentColor} />
				</div>
			)}

			<div
				style={{
					position: 'fixed',
					bottom: '16px',
					right: '16px',
					backgroundColor: 'rgba(255, 255, 255, 0.95)',
					backdropFilter: 'blur(8px)',
					border: '1px solid #e0e0e0',
					borderRadius: '8px',
					padding: '12px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					minWidth: '200px',
					zIndex: 1000,
				}}
			>
				<ColorOpacityControl
					label="Segoe"
					color={segoeColor}
					opacity={segoeOpacity}
					accentColor={accentColor}
					onColorChange={onSegoeColorChange}
					onOpacityChange={onSegoeOpacityChange}
				/>
				<ColorOpacityControl
					label="Aptos"
					color={aptosColor}
					opacity={aptosOpacity}
					accentColor={accentColor}
					onColorChange={onAptosColorChange}
					onOpacityChange={onAptosOpacityChange}
				/>
				<Button
					appearance="primary"
					onClick={() => onShowAptosChange(!showAptos)}
					size="small"
					style={{
						backgroundColor: accentColor,
						borderColor: accentColor,
						marginTop: '4px',
					}}
				>
					{showAptos ? 'Hide Aptos' : 'Show Aptos'}
				</Button>

				<div
					style={{
						marginTop: '12px',
						paddingTop: '12px',
						borderTop: '1px solid #e0e0e0',
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
					}}
				>
					<span style={{ fontSize: '11px', fontWeight: '600', color: '#666' }}>@font-face Descriptors</span>
					<DescriptorControl
						label="size-adjust:"
						value={sizeAdjust}
						display={sizeAdjust === 100 ? 'normal' : `${sizeAdjust}%`}
						accentColor={accentColor}
						onChange={onSizeAdjustChange}
					/>
					<DescriptorControl
						label="ascent:"
						value={ascentOverride}
						display={`${ascentOverride}%`}
						accentColor={accentColor}
						onChange={onAscentOverrideChange}
					/>
					<DescriptorControl
						label="descent:"
						value={descentOverride}
						display={`${descentOverride}%`}
						accentColor={accentColor}
						onChange={onDescentOverrideChange}
					/>
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
						<Button size="small" onClick={onFontAdjustmentsReset} style={{ fontSize: '10px', padding: '2px 8px' }}>
							Reset
						</Button>
					</div>
				</div>
			</div>

		</>
	)
}

const ColorOpacityControl = ({
	label,
	color,
	opacity,
	accentColor,
	onColorChange,
	onOpacityChange,
}: {
	label: string
	color: string
	opacity: number
	accentColor: string
	onColorChange: (color: string) => void
	onOpacityChange: (opacity: number) => void
}) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
		<span style={{ fontSize: '12px', fontWeight: '500', whiteSpace: 'nowrap', minWidth: '40px' }}>{label}:</span>
		<input
			type="color"
			value={color}
			onChange={(e) => onColorChange(e.target.value)}
			style={{ width: '32px', height: '24px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
		/>
		<input
			type="range"
			min="0"
			max="1"
			step="0.1"
			value={opacity}
			onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
			style={{ width: '120px', accentColor }}
		/>
		<span style={{ fontSize: '11px', minWidth: '35px', fontFamily: 'monospace' }}>{opacity.toFixed(1)}</span>
	</div>
)

const DescriptorControl = ({
	label,
	value,
	display,
	accentColor,
	onChange,
}: {
	label: string
	value: number
	display: string
	accentColor: string
	onChange: (value: number) => void
}) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
		<span style={{ fontSize: '11px', minWidth: '80px', fontFamily: 'monospace' }}>{label}</span>
		<input
			type="range"
			min="50"
			max="150"
			step="1"
			value={value}
			onChange={(e) => onChange(parseInt(e.target.value))}
			style={{ width: '120px', accentColor }}
		/>
		<span style={{ fontSize: '11px', minWidth: '45px', fontFamily: 'monospace' }}>{display}</span>
	</div>
)
