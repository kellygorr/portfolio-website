import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoFauxCutout } from './LogoFauxCutout'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

interface StoryArgs {
  scale: number
  duration: number
  motionTheme: string
}

const meta: Meta<StoryArgs> = {
  title: 'Copilot Logo Latency/LogoFauxCutout',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    scale: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      table: { defaultValue: { summary: '0.2' } },
    },
    duration: {
      control: { type: 'range', min: 500, max: 8000, step: 100 },
      table: { defaultValue: { summary: '1000' } },
    },
    motionTheme: motionThemeArgType,
  },
  args: {
    scale: 0.2,
    duration: 1000,
    motionTheme: 'Warm Sand',
  },
}

export default meta
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  render: ({ scale, duration, motionTheme }) => {
    const palette = resolveMotionTheme(motionTheme)
    // The scene's own background doubles as the punch/cutout color (the
    // punch is a hole revealing whatever's behind it), so the wrapper's
    // background must match palette.background exactly — same token
    // passed into LogoFauxCutout as backgroundColor.
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: palette?.background,
        }}
      >
        <div style={{ transform: `scale(${scale})` }}>
          <LogoFauxCutout
            noBackground
            backgroundColor={palette?.background}
            fillColor={palette?.colors[2]}
            duration={duration}
          />
        </div>
      </div>
    )
  },
}
