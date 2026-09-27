import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket48Filled } from '@fluentui/react-icons'
import { LinePathMotionV2 } from './square/v2/LinePathMotionV2'

const meta: Meta<typeof LinePathMotionV2> = {
  title: 'Line Path Motion/Square/V2 AE Data',
  component: LinePathMotionV2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A line that travels around the border of a squircle, matching the Lottie designer spec (butt-cap head, soft tail, ~45° drift per revolution, long pause between sweeps).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        <Story />
        <div
          style={{
            border: '1px solid #ccc',
            padding: 12,
            fontFamily: 'monospace',
            fontSize: 13,
            lineHeight: 1.6,
            alignSelf: 'center',
          }}
        >
          <div>AE Data</div>
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      name: 'Size (px)',
      control: { type: 'range', min: 20, max: 400, step: 1 },
      table: {
        defaultValue: { summary: '70' },
        type: { summary: 'number' },
      },
    },
    duration: {
      name: 'Duration (ms)',
      control: { type: 'range', min: 500, max: 8000, step: 50 },
      table: {
        defaultValue: { summary: '1500' },
        type: { summary: 'number' },
      },
    },
    strokeWidth: {
      name: 'Stroke Width',
      control: { type: 'range', min: 1, max: 20, step: 0.5 },
      table: {
        defaultValue: { summary: '2' },
        type: { summary: 'number' },
      },
    },
    color: {
      name: 'Line Color',
      control: { type: 'color' },
      table: {
        defaultValue: { summary: '#707070' },
        type: { summary: 'string' },
      },
    },
    feather: {
      name: 'Feather edge (px)',
      control: { type: 'range', min: 0, max: 12, step: 1 },
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof LinePathMotionV2>

export const Default: Story = {
  args: {
    size: 70,
    duration: 1500,
    strokeWidth: 2,
    color: '#707070',
    feather: 4,
  },
  render: (args = {}) => {
    const size = args.size ?? 70
    const color = args.color ?? '#707070'
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <LinePathMotionV2 {...args} />
        <Rocket48Filled
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 0.5,
            height: size * 0.5,
            color,
          }}
        />
      </div>
    )
  },
}
