import type { Meta, StoryObj } from '@storybook/react-vite'
import { FontFaceDemoIsolated } from './FontFaceDemo/FontFaceDemoIsolated'

const meta = {
	title: 'Typography/Font Face Demo',
	component: FontFaceDemoIsolated,
	parameters: {
		layout: 'fullscreen',
		hideRecreatedBadge: true,
	},
} satisfies Meta<typeof FontFaceDemoIsolated>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
