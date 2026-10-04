import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar, ProgressBarProps } from './ProgressBar'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type ProgressBarStoryArgs = ProgressBarProps & { motionTheme: string }

const ProgressBarWithTheme: React.FC<ProgressBarStoryArgs> = ({ motionTheme, ...props }) => {
  const palette = resolveMotionTheme(motionTheme)
  const color = palette?.colors[2]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        padding: 40,
        boxSizing: 'border-box',
        background: palette?.background,
      }}
    >
      <div style={{ color }}>
        <ProgressBar {...props} running />
      </div>
    </div>
  )
}

const meta = {
  title: 'Bebop Progress Bar/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    height: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      table: { defaultValue: { summary: '3' } },
    },
    duration: {
      control: { type: 'range', min: 1000, max: 10000, step: 100 },
      table: { defaultValue: { summary: '4000' } },
    },
    speedFactor: {
      name: 'Speed Factor (ms/100px)',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      table: { defaultValue: { summary: '25' } },
    },
    running: {
      table: { disable: true },
    },
    motionTheme: motionThemeArgType,
  },
  args: {
    height: 3,
    duration: 4000,
    speedFactor: 25,
    motionTheme: 'Warm Sand',
  } as ProgressBarStoryArgs,
} satisfies Meta<ProgressBarStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ProgressBarWithTheme {...args} />,
}
