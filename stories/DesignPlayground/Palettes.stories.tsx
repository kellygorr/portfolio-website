import type { Meta, StoryObj } from '@storybook/react-vite'
import { motionPalette, paletteSwatches } from '../../src/styles/motionPalettes'

interface Swatch {
	name: string
	hex: string
}

interface PaletteProps {
	title: string
	description: string
	swatches: Swatch[]
}

const Palette = ({ title, description, swatches }: PaletteProps) => (
	<div style={{ fontFamily: 'sans-serif', maxWidth: 720 }}>
		<h2 style={{ marginBottom: 4 }}>{title}</h2>
		<p style={{ color: '#666', marginTop: 0, marginBottom: 16 }}>{description}</p>
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

export const WarmSand: Story = {
	args: {
		title: 'Option A — Warm Sand',
		description: motionPalette('Warm Sand').description,
		swatches: paletteSwatches(motionPalette('Warm Sand')),
	},
}

export const GoldenHour: Story = {
	args: {
		title: 'Option B — Golden Hour',
		description: motionPalette('Golden Hour').description,
		swatches: paletteSwatches(motionPalette('Golden Hour')),
	},
}

export const DustyRose: Story = {
	args: {
		title: 'Option C — Dusty Rose',
		description: motionPalette('Dusty Rose').description,
		swatches: paletteSwatches(motionPalette('Dusty Rose')),
	},
}

export const AllThree: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<Palette
				title="Option A — Warm Sand"
				description={motionPalette('Warm Sand').description}
				swatches={paletteSwatches(motionPalette('Warm Sand'))}
			/>
			<Palette
				title="Option B — Golden Hour"
				description={motionPalette('Golden Hour').description}
				swatches={paletteSwatches(motionPalette('Golden Hour'))}
			/>
			<Palette
				title="Option C — Dusty Rose"
				description={motionPalette('Dusty Rose').description}
				swatches={paletteSwatches(motionPalette('Dusty Rose'))}
			/>
		</div>
	),
}

/**
 * Lime variants: keep each palette's first two (cream/tan base) colors,
 * swap the remaining three for a bright yellow-green lime ramp, with the
 * darkest tile pushed toward a blue-green teal for contrast.
 */
export const GreenVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<Palette
				title="Option A — Warm Sand (Lime)"
				description={motionPalette('Warm Sand (Lime)').description}
				swatches={paletteSwatches(motionPalette('Warm Sand (Lime)'))}
			/>
			<Palette
				title="Option B — Golden Hour (Lime)"
				description={motionPalette('Golden Hour (Lime)').description}
				swatches={paletteSwatches(motionPalette('Golden Hour (Lime)'))}
			/>
			<Palette
				title="Option C — Dusty Rose (Lime)"
				description={motionPalette('Dusty Rose (Lime)').description}
				swatches={paletteSwatches(motionPalette('Dusty Rose (Lime)'))}
			/>
		</div>
	),
}

/**
 * Beige variants: keep each palette's first two (cream/tan base) colors,
 * swap the remaining three for a light, warm beige/camel ramp.
 */
export const BrownVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<Palette
				title="Option A — Warm Sand (Beige)"
				description={motionPalette('Warm Sand (Beige)').description}
				swatches={paletteSwatches(motionPalette('Warm Sand (Beige)'))}
			/>
			<Palette
				title="Option B — Golden Hour (Beige)"
				description={motionPalette('Golden Hour (Beige)').description}
				swatches={paletteSwatches(motionPalette('Golden Hour (Beige)'))}
			/>
			<Palette
				title="Option C — Dusty Rose (Beige)"
				description={motionPalette('Dusty Rose (Beige)').description}
				swatches={paletteSwatches(motionPalette('Dusty Rose (Beige)'))}
			/>
		</div>
	),
}
