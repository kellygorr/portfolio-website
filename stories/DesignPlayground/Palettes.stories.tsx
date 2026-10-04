import type { Meta, StoryObj } from '@storybook/react-vite'
import { motionPalette, paletteSwatches } from '../../src/styles/motionPalettes'

interface Swatch {
	name: string
	hex: string
}

interface PaletteProps {
	title: string
	swatches: Swatch[]
}

const Palette = ({ title, swatches }: PaletteProps) => (
	<div style={{ fontFamily: 'sans-serif', maxWidth: 720 }}>
		<h2 style={{ marginBottom: 4 }}>{title}</h2>
		<div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
			{swatches.map((s) => (
				<div key={s.hex} style={{ flex: 1, minWidth: 90 }}>
					<div style={{ height: 120, background: s.hex }} />
					<div style={{ padding: '8px 10px', background: '#fff' }}>
						<div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
						<div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace' }}>{s.hex}</div>
					</div>
				</div>
			))}
		</div>
	</div>
)

const meta: Meta<typeof Palette> = {
	title: 'Design Playground/Palettes',
	component: Palette,
	parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Palette>

export const RoseVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<Palette
				title="Option A — Warm Sand"
				swatches={paletteSwatches(motionPalette('Warm Sand'))}
			/>
			<Palette
				title="Option B — Golden Hour"
				swatches={paletteSwatches(motionPalette('Golden Hour'))}
			/>
			<Palette
				title="Option C — Dusty Rose"
				swatches={paletteSwatches(motionPalette('Dusty Rose'))}
			/>
		</div>
	),
}

export const GreenVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<Palette
				title="Option A — Warm Sand (Lime)"
				swatches={paletteSwatches(motionPalette('Warm Sand (Lime)'))}
			/>
			<Palette
				title="Option B — Golden Hour (Lime)"
				swatches={paletteSwatches(motionPalette('Golden Hour (Lime)'))}
			/>
			<Palette
				title="Option C — Dusty Rose (Lime)"
				swatches={paletteSwatches(motionPalette('Dusty Rose (Lime)'))}
			/>
		</div>
	),
}

export const BrownVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<Palette
				title="Option A — Warm Sand (Beige)"
				swatches={paletteSwatches(motionPalette('Warm Sand (Beige)'))}
			/>
			<Palette
				title="Option B — Golden Hour (Beige)"
				swatches={paletteSwatches(motionPalette('Golden Hour (Beige)'))}
			/>
			<Palette
				title="Option C — Dusty Rose (Beige)"
				swatches={paletteSwatches(motionPalette('Dusty Rose (Beige)'))}
			/>
		</div>
	),
}

export const All: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<Palette
				title="Option A — Warm Sand"
				swatches={paletteSwatches(motionPalette('Warm Sand'))}
			/>
			<Palette
				title="Option B — Golden Hour"
				swatches={paletteSwatches(motionPalette('Golden Hour'))}
			/>
			<Palette
				title="Option C — Dusty Rose"
				swatches={paletteSwatches(motionPalette('Dusty Rose'))}
			/>
			<Palette
				title="Option A — Warm Sand (Lime)"
				swatches={paletteSwatches(motionPalette('Warm Sand (Lime)'))}
			/>
			<Palette
				title="Option B — Golden Hour (Lime)"
				swatches={paletteSwatches(motionPalette('Golden Hour (Lime)'))}
			/>
			<Palette
				title="Option C — Dusty Rose (Lime)"
				swatches={paletteSwatches(motionPalette('Dusty Rose (Lime)'))}
			/>
			<Palette
				title="Option A — Warm Sand (Beige)"
				swatches={paletteSwatches(motionPalette('Warm Sand (Beige)'))}
			/>
			<Palette
				title="Option B — Golden Hour (Beige)"
				swatches={paletteSwatches(motionPalette('Golden Hour (Beige)'))}
			/>
			<Palette
				title="Option C — Dusty Rose (Beige)"
				swatches={paletteSwatches(motionPalette('Dusty Rose (Beige)'))}
			/>
		</div>
	),
}
