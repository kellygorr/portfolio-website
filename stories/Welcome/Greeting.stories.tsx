import type { Meta, StoryObj } from '@storybook/react-vite'
import { Greeting } from './index'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'
import { darkestColor } from '../../src/styles/motionPalettes'

type GreetingStoryArgs = Parameters<typeof Greeting>[0] & { motionTheme: string }

const meta = {
  title: 'Welcome Motion/Greeting',
  component: Greeting,
  parameters: {
    layout: 'fullscreen',
    controls: {
      sort: 'none',
    },
    docs: {
      description: {
        component:
          'A welcome message animation that reveals text character by character with scale and fade effects.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: 'Text',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'Welcome back!' },
        type: { summary: 'string' },
      },
    },
    duration: {
      name: 'Character Duration (ms)',
      control: { type: 'range', min: 10, max: 2000, step: 50 },
      table: {
        defaultValue: { summary: '150' },
        type: { summary: 'number' },
      },
    },
    characterEasing: {
      name: 'Character Easing',
      control: { type: 'text' },
      description: 'Cubic-bezier values for per-character animation easing',
      table: {
        defaultValue: { summary: '0.1, 0.9, 0.2, 1' },
        type: { summary: 'string' },
      },
    },
    totalDuration: {
      name: 'Total Duration (ms)',
      control: { type: 'range', min: 200, max: 2000, step: 50 },
      table: {
        defaultValue: { summary: '500' },
        type: { summary: 'number' },
      },
    },
    stagger: {
      table: { disable: true },
    },
    useStaggerCurve: {
      name: 'Use Stagger Curve',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    staggerCurve: {
      name: 'Stagger Curve',
      control: { type: 'text' },
      description: 'Cubic-bezier values (x1, y1, x2, y2)',
      table: {
        defaultValue: { summary: '0.33, 0, 0.67, 1' },
        type: { summary: 'string' },
      },
    },
    motionTheme: motionThemeArgType,
  },
  args: {
    duration: 150,
    characterEasing: '0.1, 0.9, 0.2, 1',
    totalDuration: 500,
    stagger: 30,
    useStaggerCurve: true,
    staggerCurve: '0.33, 0, 0.67, 1',
    motionTheme: 'Warm Sand',
  } as GreetingStoryArgs,
  render: ({ motionTheme, ...args }: GreetingStoryArgs) => {
    const palette = resolveMotionTheme(motionTheme)
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          boxSizing: 'border-box',
          background: palette?.background,
        }}
      >
        <Greeting {...args} color={palette && darkestColor(palette)} />
      </div>
    )
  },
} satisfies Meta<GreetingStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Short: Story = {
  args: {
    text: 'What can I help you with?',
  } as Partial<GreetingStoryArgs>,
}

export const Long: Story = {
  args: {
    text: "Hi, try asking me what's next on your calendar",
  } as Partial<GreetingStoryArgs>,
}
