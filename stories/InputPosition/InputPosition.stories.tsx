import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputPositionDemo } from './InputPositionDemo'
import { motionThemeArgType } from '../shared/motionTheme'
import type { MotionPaletteName } from '../../src/styles/motionPalettes'

const meta = {
	title: 'Input/Input Position',
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		baseDistance: {
			control: { type: 'number', min: 0, max: 1000, step: 50 },
		},
		baseDurationMs: {
			control: { type: 'number', min: 0, max: 1000, step: 10 },
		},
		msPer100px: {
			control: { type: 'range', min: 0, max: 200, step: 5 },
		},
		motionTheme: motionThemeArgType,
	},
	args: {
		baseDistance: 400,
		baseDurationMs: 250,
		msPer100px: 20,
		motionTheme: 'Warm Sand',
	},
} satisfies Meta<StoryArgs>

export default meta
type Story = StoryObj<typeof meta>

type StoryArgs = {
	baseDistance: number
	baseDurationMs: number
	msPer100px: number
	motionTheme: string
}

export const PositionAnimation = ({ baseDistance, baseDurationMs, msPer100px, motionTheme }: StoryArgs) => {
	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<InputPositionDemo
				theme={motionTheme as MotionPaletteName}
				baseDistance={baseDistance}
				baseDurationMs={baseDurationMs}
				msPer100px={msPer100px}
			/>
		</div>
	)
}

PositionAnimation.parameters = {
	layout: 'fullscreen',
}

export const Default: Story = {
	render: (args) => <PositionAnimation {...(args as StoryArgs)} />,
}
