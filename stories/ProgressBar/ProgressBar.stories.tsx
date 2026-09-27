import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@fluentui/react-components'
import {
  ProgressBar,
  ProgressBarProps,
  computeDuration,
} from './ProgressBar'

const ProgressBarWithControls: React.FC<ProgressBarProps> = (props) => {
  const [running, setRunning] = React.useState(false)
  const barWrapperRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    if (!barWrapperRef.current) return
    const el = barWrapperRef.current
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setWidth(Math.round(w))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const effectiveDuration = computeDuration(width, props.duration, props.speedFactor)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
        width: '100%',
        height: '100vh',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
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
        <div>Fade in/fade out 100ms linear opacity.</div>
        <div>Animation loops until stopped.</div>
      </div>
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
        <div>
          {props.duration}ms at 2600px, duration changes by +/- {props.speedFactor}ms per 100px
        </div>
        <div>width: {width}px</div>
        <div>duration: {Math.round(effectiveDuration)}ms</div>
      </div>
      <div ref={barWrapperRef}>
        <ProgressBar {...props} running={running} />
      </div>
      <Button onClick={() => setRunning((r) => !r)} style={{ alignSelf: 'center' }}>
        {running ? 'Stop' : 'Start'}
      </Button>
    </div>
  )
}

const meta = {
  title: 'Bebop Progress Bar/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Height of the progress bar in pixels',
      table: { defaultValue: { summary: '2' } },
    },
    duration: {
      control: { type: 'range', min: 1000, max: 10000, step: 100 },
      description: 'Base duration at 2600px width in ms',
      table: { defaultValue: { summary: '4000' } },
    },
    speedFactor: {
      name: 'Speed Factor (ms/100px)',
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Ms added/subtracted per 100px of width difference',
      table: { defaultValue: { summary: '25' } },
    },
    running: {
      table: { disable: true },
    },
  },
  args: {
    height: 2,
    duration: 4000,
    speedFactor: 25,
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ProgressBarWithControls {...args} />,
}
