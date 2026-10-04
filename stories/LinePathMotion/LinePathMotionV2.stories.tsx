import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket48Filled } from '@fluentui/react-icons'
import { LinePathMotionV2 } from './square/v2/LinePathMotionV2'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

const meta: Meta<typeof LinePathMotionV2> = {
  title: 'Line Path Motion/Square',
  component: LinePathMotionV2,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const motionTheme = context.args?.motionTheme as string | undefined
      const palette = resolveMotionTheme(motionTheme)
      return (
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            boxSizing: 'border-box',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            background: palette?.background,
          }}
        >
          <Story />
        </div>
      )
    },
  ],
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
    feather: {
      name: 'Feather edge (px)',
      control: { type: 'range', min: 0, max: 12, step: 1 },
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    motionTheme: motionThemeArgType,
  },
}

export default meta
type Story = StoryObj<typeof LinePathMotionV2> & { args: { motionTheme?: string } }

export const CssVersion: Story = {
  args: {
    size: 70,
    duration: 1500,
    strokeWidth: 2,
    feather: 4,
    motionTheme: 'Warm Sand',
  },
  render: (args = {}) => {
    const size = args.size ?? 70
    const palette = resolveMotionTheme((args as { motionTheme?: string }).motionTheme)
    const lineColor = palette ? palette.colors[2] : (args.color ?? '#707070')
    const iconColor = palette ? palette.colors[3] : (args.color ?? '#707070')
    // Match LinePathMotionV2's own corner radius formula — 0.2 × size,
    // the same ratio as the Rectangle (V3) component, so the white
    // background2 box shares the exact same rounded corners as the
    // animated line tracing it, and the two demos read consistently.
    const cornerRadius = size * 0.2
    return (
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          background: palette?.background2,
          borderRadius: cornerRadius,
        }}
      >
        <LinePathMotionV2 {...args} color={lineColor} />
        <Rocket48Filled
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 0.5,
            height: size * 0.5,
            color: iconColor,
          }}
        />
      </div>
    )
  },
}
