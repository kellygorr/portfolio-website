import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket24Filled } from '@fluentui/react-icons'
import {
  LinePathMotionOvershootV3Css,
  LinePathMotionOvershootV3Worker,
} from './index'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'
import { darkestColor } from '../../src/styles/motionPalettes'

const meta: Meta<typeof LinePathMotionOvershootV3Css> = {
  title: 'Line Path Motion/Rectangle',
  component: LinePathMotionOvershootV3Css,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    width: {
      name: 'Width (px)',
      control: { type: 'range', min: 80, max: 600, step: 1 },
      table: {
        defaultValue: { summary: '240' },
        type: { summary: 'number' },
      },
    },
    height: {
      name: 'Height (px)',
      control: { type: 'range', min: 20, max: 200, step: 1 },
      table: {
        defaultValue: { summary: '60' },
        type: { summary: 'number' },
      },
    },
    duration: {
      name: 'Duration (ms)',
      control: { type: 'range', min: 500, max: 8000, step: 10 },
      table: {
        defaultValue: { summary: '1833' },
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
      control: { type: 'range', min: 0, max: 20, step: 1 },
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' },
      },
    },
    motionTheme: motionThemeArgType,
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
}

export default meta

type CssStory = StoryObj<typeof LinePathMotionOvershootV3Css> & {
  args: { motionTheme?: string }
}

export const CssVersion: CssStory = {
  parameters: {
    controls: { include: ['width', 'height', 'duration', 'strokeWidth', 'feather', 'motionTheme'] },
  },
  args: {
    width: 240,
    height: 60,
    duration: 1833,
    strokeWidth: 2,
    feather: 3,
    motionTheme: 'Warm Sand',
  },
  render: (args = {}) => {
    const width = args.width ?? 240
    const height = args.height ?? 60
    const palette = resolveMotionTheme((args as { motionTheme?: string }).motionTheme)
    const lineColor = palette ? palette.colors[1] : (args.color ?? '#5940ff')
    const iconColor = palette ? darkestColor(palette) : (args.color ?? '#5940ff')
    const barColor = palette ? palette.colors[1] : '#000'
    const iconSize = Math.round(height * 0.5)
    const paddingLeft = Math.max(16, height * 0.35)
    // Match LinePathMotionOvershoot's own corner radius formula so the
    // white background2 box shares the exact same rounded corners as
    // the animated line tracing it — otherwise the line's rounded
    // corner pokes outside the box's square corner.
    const cornerRadius = Math.min(width, height) * 0.2
    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
          background: palette?.background2,
          borderRadius: cornerRadius,
        }}
      >
        <LinePathMotionOvershootV3Css {...args} color={lineColor} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft,
            paddingRight: 16,
            color: iconColor,
          }}
        >
          <Rocket24Filled style={{ width: iconSize, height: iconSize, flexShrink: 0 }} />
          {/* Wireframe text placeholder, replacing the hardcoded "CSS
              renderer" label, themed with the palette's own accent token.
              Fills the remaining width of the section instead of a fixed
              fraction. */}
          <div
            style={{
              flex: 1,
              height: Math.max(8, iconSize * 0.35),
              borderRadius: 9999,
              backgroundColor: barColor,
            }}
          />
        </div>
      </div>
    )
  },
}

type WorkerStory = StoryObj<typeof LinePathMotionOvershootV3Worker> & {
  args: { motionTheme?: string }
}

export const WorkerVersion: WorkerStory = {
  parameters: {
    controls: {
      include: ['width', 'height', 'duration', 'strokeWidth', 'feather', 'pauseMs', 'motionTheme'],
    },
  },
  argTypes: {
    pauseMs: {
      name: 'Pause between sweeps (ms)',
      control: { type: 'range', min: 0, max: 5000, step: 50 },
      table: {
        defaultValue: { summary: '1000' },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    width: 240,
    height: 60,
    duration: 1833,
    strokeWidth: 2,
    feather: 3,
    pauseMs: 1000,
    motionTheme: 'Warm Sand',
  },
  render: (args = {}) => {
    const width = args.width ?? 240
    const height = args.height ?? 60
    const palette = resolveMotionTheme((args as { motionTheme?: string }).motionTheme)
    const lineColor = palette ? palette.colors[1] : (args.color ?? '#5940ff')
    const iconColor = palette ? darkestColor(palette) : (args.color ?? '#5940ff')
    const barColor = palette ? palette.colors[1] : '#000'
    const iconSize = Math.round(height * 0.5)
    const paddingLeft = Math.max(16, height * 0.35)
    // Match LinePathMotionOvershoot's own corner radius formula so the
    // white background2 box shares the exact same rounded corners as
    // the animated line tracing it — otherwise the line's rounded
    // corner pokes outside the box's square corner.
    const cornerRadius = Math.min(width, height) * 0.2
    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
          background: palette?.background2,
          borderRadius: cornerRadius,
        }}
      >
        <LinePathMotionOvershootV3Worker {...args} color={lineColor} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft,
            paddingRight: 16,
            color: iconColor,
          }}
        >
          <Rocket24Filled style={{ width: iconSize, height: iconSize, flexShrink: 0 }} />
          {/* Wireframe text placeholder, replacing the hardcoded "Worker
              renderer" label, themed with the palette's own accent token.
              Fills the remaining width of the section instead of a fixed
              fraction. */}
          <div
            style={{
              flex: 1,
              height: Math.max(8, iconSize * 0.35),
              borderRadius: 9999,
              backgroundColor: barColor,
            }}
          />
        </div>
      </div>
    )
  },
}
