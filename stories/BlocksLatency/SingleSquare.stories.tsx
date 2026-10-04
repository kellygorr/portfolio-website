import type { Meta, StoryObj } from '@storybook/react-vite'
import { SingleSquare, type SingleSquareProps } from './SingleSquare'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type SingleSquareStoryArgs = SingleSquareProps & { motionTheme: string }

const meta = {
  title: 'Blocks Latency/Single Square',
  component: SingleSquare,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 2, max: 200, step: 1 },
    },
    delay: {
      control: { type: 'range', min: 0, max: 3000, step: 50 },
      table: { defaultValue: { summary: '1000' } },
    },
    duration: {
      control: { type: 'range', min: 200, max: 3000, step: 50 },
      table: { defaultValue: { summary: '1166' } },
    },
    motionTheme: motionThemeArgType,
    color: { table: { disable: true } },
  },
  args: {
    size: 16,
    delay: 1000,
    duration: 1166,
    motionTheme: 'Warm Sand',
  } as SingleSquareStoryArgs,
  render: ({ motionTheme, ...args }: SingleSquareStoryArgs) => {
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
        <SingleSquare {...args} color={palette?.colors[3]} />
      </div>
    )
  },
} satisfies Meta<SingleSquareStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
