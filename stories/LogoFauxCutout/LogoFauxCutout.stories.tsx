import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoFauxCutout } from './LogoFauxCutout'

// (for storybook only)
interface StoryArgs {
  scale: number
}

// (for storybook only) - faux cutout needs its own background for the punch effect
const fullscreenWrapper: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#16213e',
}

const meta: Meta<StoryArgs> = {
  title: 'Copilot Logo Latency/LogoFauxCutout',
  parameters: {
    layout: 'fullscreen',
  },
  // (for storybook only)
  argTypes: {
    scale: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: 'Scale of the animation',
      table: { defaultValue: { summary: '1' } },
    },
  },
  args: {
    scale: 1,
  },
}

export default meta
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  // (for storybook only)
  render: ({ scale }) => (
    <div style={fullscreenWrapper}>
      <div style={{ transform: `scale(${scale})` }}>
        <LogoFauxCutout noBackground />
      </div>
    </div>
  ),
}
