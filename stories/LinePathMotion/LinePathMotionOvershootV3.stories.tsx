import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket24Filled } from '@fluentui/react-icons'
import {
  LinePathMotionOvershootV3Css,
  LinePathMotionOvershootV3Worker,
} from './index'

const meta: Meta<typeof LinePathMotionOvershootV3Css> = {
  title: 'Line Path Motion/Rectangle/V3 AE Data',
  component: LinePathMotionOvershootV3Css,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Rectangle V3 AE Data. Includes both CSS and OffscreenCanvas Worker renderers with AE baseline duration set to 1670ms. Final path/easing calibration will be updated from incoming AE JSON data.',
      },
    },
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
    color: {
      name: 'Line Color',
      control: { type: 'color' },
      table: {
        defaultValue: { summary: '#5940ff' },
        type: { summary: 'string' },
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
  },
  decorators: [
    (Story, context) => (
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
          <div>Med rectangle 1833ms, Large rectangle 2000ms</div>
          {(context.id?.endsWith('--css-version') ||
            context.name?.toLowerCase().includes('css')) && (
            <div>The end point should be updated to hide the angle limitation with CSS</div>
          )}
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default meta

type CssStory = StoryObj<typeof LinePathMotionOvershootV3Css>

export const CssVersion: CssStory = {
  parameters: {
    controls: { include: ['width', 'height', 'duration', 'strokeWidth', 'color', 'feather'] },
  },
  args: {
    width: 240,
    height: 60,
    duration: 1833,
    strokeWidth: 2,
    color: '#5940ff',
    feather: 3,
  },
  render: (args = {}) => {
    const width = args.width ?? 240
    const height = args.height ?? 60
    const color = args.color ?? '#5940ff'
    const iconSize = Math.round(height * 0.5)
    return (
      <div style={{ position: 'relative', width, height }}>
        <LinePathMotionOvershootV3Css {...args} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: Math.max(16, height * 0.35),
            color,
          }}
        >
          <Rocket24Filled style={{ width: iconSize, height: iconSize }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>CSS renderer</span>
        </div>
      </div>
    )
  },
}

type WorkerStory = StoryObj<typeof LinePathMotionOvershootV3Worker>

export const WorkerVersion: WorkerStory = {
  parameters: {
    controls: {
      include: ['width', 'height', 'duration', 'strokeWidth', 'color', 'feather', 'pauseMs'],
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
    color: '#5940ff',
    feather: 3,
    pauseMs: 1000,
  },
  render: (args = {}) => {
    const width = args.width ?? 240
    const height = args.height ?? 60
    const color = args.color ?? '#5940ff'
    const iconSize = Math.round(height * 0.5)
    return (
      <div style={{ position: 'relative', width, height }}>
        <LinePathMotionOvershootV3Worker {...args} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: Math.max(16, height * 0.35),
            color,
          }}
        >
          <Rocket24Filled style={{ width: iconSize, height: iconSize }} />
          <span style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>Worker renderer</span>
        </div>
      </div>
    )
  },
}
