import type { Meta, StoryObj } from '@storybook/react-vite'
import { Blocks, type BlocksProps } from './Blocks'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type BlocksStoryArgs = BlocksProps & { motionTheme: string }

const meta = {
  title: 'Blocks Latency/Blocks',
  component: Blocks,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 2, max: 50, step: 1 },
    },
    duration: {
      control: { type: 'range', min: 500, max: 10000, step: 50 },
      table: { defaultValue: { summary: '3567' } },
    },
    motionTheme: motionThemeArgType,
    colors: { table: { disable: true } },
  },
  args: {
    size: 16,
    duration: 3567,
    motionTheme: 'Warm Sand',
  } as BlocksStoryArgs,
  render: ({ motionTheme, ...args }: BlocksStoryArgs) => {
    const palette = resolveMotionTheme(motionTheme)
    return (
      <div
        style={{
          background: palette?.background,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Blocks {...args} colors={palette?.colors} />
      </div>
    )
  },
} satisfies Meta<BlocksStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
