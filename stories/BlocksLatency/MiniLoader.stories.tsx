import type { Meta, StoryObj } from '@storybook/react-vite'
import { MiniLoader, type MiniLoaderProps } from './MiniLoader'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'
import { darkestColor } from '../../src/styles/motionPalettes'

type MiniLoaderStoryArgs = MiniLoaderProps & { motionTheme: string }

const meta = {
	title: 'Blocks Latency/Mini Loader',
	component: MiniLoader,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		size: {
			control: { type: 'range', min: 4, max: 120, step: 4 },
			table: { defaultValue: { summary: '80' } },
		},
		duration: {
			control: { type: 'range', min: 500, max: 10000, step: 50 },
			table: { defaultValue: { summary: '5117' } },
		},
		motionTheme: motionThemeArgType,
		rollerColor: { table: { disable: true } },
		trackColors: { table: { disable: true } },
	},
	args: {
		size: 16,
		duration: 5117,
		motionTheme: 'Warm Sand',
	} as MiniLoaderStoryArgs,
	render: ({ motionTheme, ...args }: MiniLoaderStoryArgs) => {
		const palette = resolveMotionTheme(motionTheme)
		// Each dropped box's own color, shuffled (not in light-to-dark
		// palette order) so they don't read left-to-right as a gradient:
		// slot0=token2, slot1=token4, slot2=token3. Never uses `background` —
		// that's the same color as the story canvas, so it'd be invisible.
		const trackColors: [string, string, string] | undefined = palette && [
			palette.colors[0],
			palette.colors[2],
			palette.colors[1],
		]
		return (
			<div
				style={{
					background: palette?.background,
					width: '100%',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<MiniLoader {...args} rollerColor={palette && darkestColor(palette)} trackColors={trackColors} />
			</div>
		)
	},
} satisfies Meta<MiniLoaderStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
