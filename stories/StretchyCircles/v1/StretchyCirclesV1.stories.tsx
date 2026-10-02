import type { Meta, StoryObj } from '@storybook/react-vite'
import { StretchyCircles, type StretchyCirclesProps } from './StretchyCirclesV1'
import { motionThemeArgType, resolveMotionTheme } from '../../shared/motionTheme'

type StoryArgs = StretchyCirclesProps & { motionTheme: string }

const meta = {
	title: 'Stretchy Circles/SVG',
	component: StretchyCircles,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			name: 'Size (px)',
			control: { type: 'range', min: 20, max: 200, step: 5 },
			table: { defaultValue: { summary: '100' } },
		},
		duration: {
			name: 'Duration (ms)',
			control: { type: 'range', min: 500, max: 5000, step: 50 },
			table: { defaultValue: { summary: '1200' } },
		},
		circleDiameter: {
			name: 'Circle Diameter (%)',
			control: { type: 'range', min: 10, max: 100, step: 1 },
			table: { defaultValue: { summary: '48' } },
		},
		distance: {
			control: { type: 'range', min: 10, max: 60, step: 1 },
			table: { defaultValue: { summary: '30' } },
		},
		bridgeHeight: {
			name: 'Bridge Height (%)',
			control: { type: 'range', min: 5, max: 50, step: 1 },
			table: { defaultValue: { summary: '14' } },
		},
		scaleBridgeHeight: {
			name: 'Scale Bridge Height (%)',
			control: { type: 'range', min: 100, max: 500, step: 5 },
			table: { defaultValue: { summary: '300' } },
		},
		blur: {
			name: 'Filter Blur',
			control: { type: 'range', min: 1, max: 20, step: 0.5 },
			table: { defaultValue: { summary: '6' } },
		},
		intensity: {
			name: 'Filter Intensity',
			control: { type: 'range', min: 10, max: 40, step: 1 },
			table: { defaultValue: { summary: '24' } },
		},
		crispness: {
			name: 'Filter Crispness',
			control: { type: 'range', min: 5, max: 30, step: 1 },
			table: { defaultValue: { summary: '15' } },
		},
		color: { table: { disable: true } },
		gradient: { table: { disable: true } },
		motionTheme: motionThemeArgType,
	},
	args: {
		size: 100,
		duration: 1200,
		circleDiameter: 48,
		distance: 30,
		bridgeHeight: 14,
		scaleBridgeHeight: 300,
		blur: 6,
		intensity: 24,
		crispness: 15,
		motionTheme: 'Warm Sand',
	} as StoryArgs,
	render: ({ motionTheme, ...args }: StoryArgs) => {
		const palette = resolveMotionTheme(motionTheme)
		return (
			<div
				style={{
					background: palette?.background,
					width: 300,
					height: 300,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<StretchyCircles {...args} color={palette?.colors[2]} />
			</div>
		)
	},
} satisfies Meta<StoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
