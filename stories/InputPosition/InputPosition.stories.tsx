import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputPositionDemo } from './InputPositionDemo'
import { motionThemeArgType } from '../shared/motionTheme'
import type { MotionPaletteName } from '../../src/styles/motionPalettes'

const meta = {
	title: 'Input/Input Position',
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		baseDistance: {
			control: { type: 'number', min: 0, max: 1000, step: 50 },
			description: 'Reference distance in px',
		},
		baseDurationMs: {
			control: { type: 'number', min: 0, max: 1000, step: 10 },
			description: 'Duration at reference distance in ms',
		},
		msPer100px: {
			control: { type: 'range', min: 0, max: 200, step: 5 },
			description: 'Milliseconds added per 100px of distance',
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

/**
 * Click-driven demo: the input starts centered (empty-state greeting
 * position). Clicking Send anchors it to the footer — a divider line
 * appears above the footer (full width of the footer area) and a
 * darker background fills in behind it, same as the real Copilot
 * footer treatment once a conversation starts. Clicking again (now
 * visible as "New chat") reverses the transition back to center.
 *
 * Unlike the original one-directional POR component (which only
 * animates center -> footer and resets instantly with no animation on
 * the way back), both directions here animate identically — see
 * InputPositionAnimation.tsx's docstring for what changed.
 *
 * This does NOT autoplay — the visitor has to click Send/New chat
 * themselves to see the motion.
 *
 * This story is just a full-viewport wrapper around InputPositionDemo
 * (stories/InputPosition/InputPositionDemo.tsx) — that component is the
 * actual reusable demo, also embedded directly in the portfolio's
 * Copilot Motion Systems page via a DemoSlide.
 */
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
	docs: { source: {} },
	layout: 'fullscreen',
}

export const Default: Story = {
	render: (args) => <PositionAnimation {...(args as StoryArgs)} />,
}
