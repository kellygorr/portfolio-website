import type { Meta, StoryObj } from '@storybook/react-vite'
import { Greeting } from './index'

const meta: Meta<typeof Greeting> = {
  title: 'Welcome Motion/Greeting',
  component: Greeting,
  parameters: {
    layout: 'centered',
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
  decorators: [
    (Story) => (
      <div style={{ padding: 40 }}>
        <Story />
      </div>
    ),
  ],
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
        defaultValue: { summary: '0, 0, 0, 1' },
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
        defaultValue: { summary: '0.33, 0, 0.1, 1' },
        type: { summary: 'string' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Greeting>

const InfoBox = ({
  duration,
  totalDuration,
  staggerCurve,
  useStaggerCurve,
}: {
  duration: number
  totalDuration: number
  staggerCurve: string
  useStaggerCurve: boolean
}) => (
  <div
    style={{
      border: '1px solid #ccc',
      padding: 12,
      marginTop: 24,
      fontFamily: 'monospace',
      fontSize: 13,
      lineHeight: 1.6,
    }}
  >
    <div>character duration: {duration}ms</div>
    <div>total duration: {totalDuration}ms</div>
    <div>stagger curve: {useStaggerCurve ? `cubic-bezier(${staggerCurve})` : 'none'}</div>
  </div>
)

export const Short: Story = {
  render: (args) => (
    <>
      <Greeting {...args} />
      <InfoBox
        duration={args.duration!}
        totalDuration={args.totalDuration!}
        staggerCurve={args.staggerCurve!}
        useStaggerCurve={args.useStaggerCurve!}
      />
    </>
  ),
  args: {
    text: 'What can I help you with?',
    duration: 150,
    characterEasing: '0, 0, 0, 1',
    totalDuration: 500,
    stagger: 30,
    useStaggerCurve: true,
    staggerCurve: '0.33, 0, 0.1, 1',
  },
}

export const Long: Story = {
  render: (args) => (
    <>
      <Greeting {...args} />
      <InfoBox
        duration={args.duration!}
        totalDuration={args.totalDuration!}
        staggerCurve={args.staggerCurve!}
        useStaggerCurve={args.useStaggerCurve!}
      />
    </>
  ),
  args: {
    text: "Hi, try asking me what's next on your calendar",
    duration: 150,
    characterEasing: '0, 0, 0, 1',
    totalDuration: 500,
    stagger: 30,
    useStaggerCurve: true,
    staggerCurve: '0.33, 0, 0.1, 1',
  },
}
