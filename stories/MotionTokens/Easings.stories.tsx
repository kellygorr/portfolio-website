import type { Meta, StoryObj } from '@storybook/react-vite'
import { Easings } from './Easings'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type EasingsStoryArgs = { motionTheme: string }

const meta = {
	title: 'Motion Tokens/Easings',
	component: Easings,
	parameters: {
		layout: 'fullscreen',
		// This story's canvas is itself the dark background (not just an
		// inner card), so the "recreated for portfolio" badge needs the
		// inverted (light-on-dark-token) pairing to stay visible — see
		// .storybook/preview.tsx.
		motionBadgeStyle: 'onDark',
	},
	tags: ['autodocs'],
	argTypes: {
		motionTheme: motionThemeArgType,
	},
	args: {
		motionTheme: 'Warm Sand',
	} as EasingsStoryArgs,
	render: ({ motionTheme }: EasingsStoryArgs) => {
		const palette = resolveMotionTheme(motionTheme)
		// The dark-mode look fills the entire canvas, not just an inner
		// card — this wrapper (not <Easings> itself) owns the full-bleed
		// background, using the palette's own hand-tuned `backgroundDark`
		// token (deliberately separate from `colors[3]`/`darkestColor()`,
		// which stays reserved for accent-token-driven demos elsewhere in
		// the app).
		const background = palette?.backgroundDark ?? '#5a3028'
		return (
			<div
				style={{
					width: '100%',
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background,
				}}
			>
				<Easings palette={palette} />
			</div>
		)
	},
} satisfies Meta<EasingsStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

