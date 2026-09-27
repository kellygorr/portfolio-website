import type { Meta, StoryObj } from '@storybook/react-vite'
import { MiniLoader } from './MiniLoader'

const meta = {
  title: 'Blocks Latency/Mini Loader',
  component: MiniLoader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `<div style="border: 1px solid rgb(204, 204, 204); padding: 12px; font-family: monospace; font-size: 13px; line-height: 1.6;"><strong>Production Cell Size</strong><br />The cell size for production use needs to be verified by design.</div>`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 4, max: 120, step: 4 },
      description: 'Size of each block in pixels',
      table: { defaultValue: { summary: '80' } },
    },
    duration: {
      control: { type: 'range', min: 500, max: 10000, step: 50 },
      description: 'Duration of one full cycle in ms',
      table: { defaultValue: { summary: '5117' } },
    },
  },
  args: {
    size: 80,
    duration: 5117,
  },
} satisfies Meta<typeof MiniLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
