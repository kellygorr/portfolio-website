import type { Meta, StoryObj } from '@storybook/react-vite'
import { Blocks } from './Blocks'

const meta = {
  title: 'Blocks Latency/Blocks',
  component: Blocks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 2, max: 50, step: 1 },
      description: 'Size of one grid cell in pixels (component is 3×3 cells)',
    },
    duration: {
      control: { type: 'range', min: 500, max: 10000, step: 50 },
      description: 'Duration of one full cycle in ms',
      table: { defaultValue: { summary: '3567' } },
    },
  },
  args: {
    size: 4,
    duration: 3567,
  },
} satisfies Meta<typeof Blocks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
