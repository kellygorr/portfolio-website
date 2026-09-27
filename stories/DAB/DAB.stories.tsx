import type { Meta, StoryObj } from '@storybook/react-vite'
import { useCallback, useMemo, useState } from 'react'
import { DAB, type DABProps } from './DAB'

const meta: Meta<typeof DAB> = {
	title: 'DAB',
	component: DAB,
	parameters: {
		layout: 'centered',
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
    size: {
      name: 'Size (px)',
      control: { type: 'range', min: 20, max: 200, step: 1 },
      table: {
        defaultValue: { summary: '44' },
        type: { summary: 'number' },
      },
    },
    duration: {
      name: 'Duration (ms)',
      control: { type: 'range', min: 1000, max: 10000, step: 100 },
      table: {
        defaultValue: { summary: '3000' },
        type: { summary: 'number' },
      },
    },
    strokeWidth: {
      name: 'Stroke Width (px)',
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      table: {
        defaultValue: { summary: '2' },
        type: { summary: 'number' },
      },
    },
    cornerRadius: {
      name: 'Corner Radius (px)',
      control: { type: 'range', min: 0, max: 50, step: 1 },
      table: {
        defaultValue: { summary: '16' },
        type: { summary: 'number' },
      },
    },
    backgroundColor: {
      name: 'Background Color',
      control: { type: 'color' },
      table: {
        defaultValue: { summary: '#fff' },
        type: { summary: 'string' },
      },
    },
    isThinking: {
      name: 'Is Thinking',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'When true, shows a continuous spinning animation.',
    },
    play: {
      table: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<typeof DAB>

const DABWithButtons = (props: DABProps) => {
  const [mode, setMode] = useState<'idle' | 'intro' | 'thinking'>('idle')
  const [key, setKey] = useState(0)

  const isThinking = mode === 'thinking'
  const play = mode !== 'idle'

  const handleAnimationEnd = useCallback(() => {
    if (mode === 'intro') {
      setMode('idle')
    }
  }, [mode])

  const startIntro = () => {
    setMode('idle')
    requestAnimationFrame(() => {
      setKey((k) => k + 1)
      setMode('intro')
    })
  }

  const toggleThinking = () => {
    if (mode === 'thinking') {
      setMode('idle')
      return
    }
    setMode('idle')
    requestAnimationFrame(() => {
      setKey((k) => k + 1)
      setMode('thinking')
    })
  }

  const buttonBaseStyle = useMemo(
    () =>
      ({
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid #ccc',
        background: '#f8fafc',
        cursor: 'pointer',
        fontSize: 14,
      }) as const,
    []
  )

  const activeButtonStyle = useMemo(
    () =>
      ({
        border: '1px solid #4f46e5',
        background: '#eef2ff',
      }) as const,
    []
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'inline-flex' }}>
        <DAB
          key={key}
          {...props}
          isThinking={isThinking}
          play={play}
          onAnimationEnd={handleAnimationEnd}
        />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          onClick={startIntro}
          style={{
            ...buttonBaseStyle,
            ...(mode === 'intro' ? activeButtonStyle : null),
          }}
        >
          Intro
        </button>

        <button
          type="button"
          onClick={toggleThinking}
          style={{
            ...buttonBaseStyle,
            ...(mode === 'thinking' ? activeButtonStyle : null),
          }}
        >
          Thinking
        </button>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <DABWithButtons {...args} />,
}
