import type { Meta, StoryObj } from '@storybook/react-vite'
import { StretchyCircles, type StretchyCirclesProps } from './StretchyCirclesV2'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type StoryArgs = StretchyCirclesProps & { motionTheme: string }

const meta = {
	title: 'Circle Latency/Stretchy Circles',
	component: StretchyCircles,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		size: {
			name: 'Size (px)',
			control: { type: 'range', min: 20, max: 200, step: 5 },
			table: { defaultValue: { summary: '50' } },
		},
		blur: {
			name: 'Blur (px)',
			control: { type: 'range', min: 0, max: 20, step: 0.5 },
			table: { defaultValue: { summary: '2' } },
		},
		contrast: {
			control: { type: 'range', min: 1, max: 50, step: 1 },
			table: { defaultValue: { summary: '13' } },
		},
		circleDiameter: {
			name: 'Circle Diameter (%)',
			control: { type: 'range', min: 10, max: 100, step: 1 },
			table: { defaultValue: { summary: '41' } },
		},
		distance: {
			name: 'Distance (%)',
			control: { type: 'range', min: 0, max: 50, step: 1 },
			table: { defaultValue: { summary: '25' } },
		},
		bridgeHeight: {
			name: 'Bridge Height (%)',
			control: { type: 'range', min: 5, max: 50, step: 1 },
			table: { defaultValue: { summary: '13' } },
		},
		scaleBridgeHeight: {
			name: 'Scale Bridge Height (%)',
			control: { type: 'range', min: 100, max: 500, step: 5 },
			table: { defaultValue: { summary: '300' } },
		},
		duration: {
			name: 'Duration (ms)',
			control: { type: 'range', min: 500, max: 5000, step: 100 },
			table: { defaultValue: { summary: '1200' } },
		},
		backgroundColor: { table: { disable: true } },
		circleColor: { table: { disable: true } },
		motionTheme: motionThemeArgType,
	},
	args: {
		size: 100,
		blur: 2,
		contrast: 13,
		circleDiameter: 41,
		distance: 25,
		bridgeHeight: 13,
		scaleBridgeHeight: 300,
		duration: 1200,
		motionTheme: 'Warm Sand',
	} as StoryArgs,
	render: ({ motionTheme, ...args }: StoryArgs) => {
		const palette = resolveMotionTheme(motionTheme)
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
				<StretchyCircles {...args} circleColor={palette?.colors[2]} />
			</div>
		)
	},
} satisfies Meta<StoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const CSS: Story = {}
