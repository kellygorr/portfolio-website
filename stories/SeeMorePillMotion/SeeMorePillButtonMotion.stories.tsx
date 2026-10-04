import type { Meta, StoryObj } from '@storybook/react-vite'
import { SeeMorePillButtonMotion } from './SeeMorePillButtonMotion'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type StoryArgs = { motionTheme: string }

const SeeMorePillButtonMotionStory = ({ motionTheme }: StoryArgs) => {
	const palette = resolveMotionTheme(motionTheme)
	return <SeeMorePillButtonMotion palette={palette} />
}

const meta = {
	title: 'Copilot/See More Pill Button Motion',
	component: SeeMorePillButtonMotionStory,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		motionTheme: motionThemeArgType,
	},
	args: {
		motionTheme: 'Warm Sand',
	},
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
