import type { Meta, StoryObj } from '@storybook/react-vite'
import { Durations } from './Durations'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type DurationsStoryArgs = { motionTheme: string }

const meta = {
	title: 'Motion Tokens/Durations',
	component: Durations,
	parameters: {
		layout: 'fullscreen',
		motionBadgeStyle: 'onDark',
	},
	argTypes: {
		motionTheme: motionThemeArgType,
	},
	args: {
		motionTheme: 'Warm Sand',
	} as DurationsStoryArgs,
	render: ({ motionTheme }: DurationsStoryArgs) => {
		const palette = resolveMotionTheme(motionTheme)
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
				<Durations palette={palette} />
			</div>
		)
	},
} satisfies Meta<DurationsStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
