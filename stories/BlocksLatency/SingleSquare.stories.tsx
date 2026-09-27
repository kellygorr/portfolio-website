import type { Meta, StoryObj } from '@storybook/react-vite'
import { SingleSquare } from './SingleSquare'

const meta = {
  title: 'Blocks Latency/Single Square',
  component: SingleSquare,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 2, max: 200, step: 1 },
      description: 'Size of the square in pixels',
    },
    delay: {
      control: { type: 'range', min: 0, max: 3000, step: 50 },
      description: 'Start-hold delay in ms before the rotation plays',
      table: { defaultValue: { summary: '1000' } },
    },
    duration: {
      control: { type: 'range', min: 200, max: 3000, step: 50 },
      description: 'Animation duration in ms',
      table: { defaultValue: { summary: '1166' } },
    },
  },
  args: {
    size: 8,
    delay: 1000,
    duration: 1166,
  },
} satisfies Meta<typeof SingleSquare>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <SingleSquare {...args} />,
}
