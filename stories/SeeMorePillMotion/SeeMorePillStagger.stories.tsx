import type { Meta, StoryObj } from '@storybook/react-vite'
import { SeeMorePillStagger } from './SeeMorePillStagger'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type StoryArgs = { motionTheme: string }

const SeeMorePillStaggerStory = ({ motionTheme }: StoryArgs) => {
	const palette = resolveMotionTheme(motionTheme)
	return <SeeMorePillStagger palette={palette} />
}

const meta = {
	title: 'Copilot/See More Pill Stagger (compact)',
	component: SeeMorePillStaggerStory,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
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
