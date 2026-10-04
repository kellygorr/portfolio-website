import type { Meta, StoryObj } from '@storybook/react-vite'
import { Blocks } from '../BlocksLatency/Blocks'
import { motionPalettes, type MotionPalette } from '../../src/styles/motionPalettes'

/** @deprecated import from src/styles/motionPalettes instead. Re-exported for backward compatibility. */
export type PaletteDemo = MotionPalette
/** @deprecated import from src/styles/motionPalettes instead. Re-exported for backward compatibility. */
export const palettes = motionPalettes

const PaletteCard = ({ palette }: { palette: MotionPalette }) => (
	<div
		style={{
			flex: '0 0 auto',
			width: 280,
			borderRadius: 16,
			overflow: 'hidden',
			boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
			fontFamily: 'sans-serif',
		}}
	>
		<div
			style={{
				background: palette.background,
				height: 220,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Blocks size={20} colors={palette.colors} />
		</div>
		<div style={{ padding: '12px 16px', background: '#fff' }}>
			<div style={{ fontWeight: 700, fontSize: 15 }}>{palette.name}</div>
		</div>
	</div>
)

const PaletteGroup = () => (
	<div
		style={{
			display: 'flex',
			gap: 24,
			flexWrap: 'wrap',
			padding: 24,
		}}
	>
		{palettes.map((p) => (
			<PaletteCard key={p.name} palette={p} />
		))}
	</div>
)

const meta: Meta<typeof PaletteGroup> = {
	title: 'Design Playground/Blocks Latency Palettes',
	component: PaletteGroup,
	parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof PaletteGroup>

export const Default: Story = {}
