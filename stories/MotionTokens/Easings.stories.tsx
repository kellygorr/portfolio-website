import type { Meta, StoryObj } from '@storybook/react-vite'
import { Easings } from './Easings'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type EasingsStoryArgs = { motionTheme: string }

const meta = {
	title: 'Motion Tokens/Easings',
	component: Easings,
	parameters: {
		layout: 'fullscreen',
		motionBadgeStyle: 'onDark',
	},
	argTypes: {
		motionTheme: motionThemeArgType,
	},
	args: {
		motionTheme: 'Warm Sand',
	} as EasingsStoryArgs,
	render: ({ motionTheme }: EasingsStoryArgs) => {
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
				<Easings palette={palette} />
			</div>
		)
	},
} satisfies Meta<EasingsStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
