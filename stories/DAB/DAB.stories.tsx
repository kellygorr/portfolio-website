import type { Meta, StoryObj } from '@storybook/react-vite'
import { useCallback, useMemo, useState } from 'react'
import { DAB, type DABProps } from './DAB'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'
import { darkestColor } from '../../src/styles/motionPalettes'

type DABStoryArgs = DABProps & { motionTheme: string }

const meta = {
	title: 'DAB',
	component: DAB,
	parameters: {
		layout: 'fullscreen',
	},
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
        defaultValue: { summary: '3' },
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
    backgroundColor: { table: { disable: true } },
    iconColor: { table: { disable: true } },
    gradientColor1: { table: { disable: true } },
    gradientColor2: { table: { disable: true } },
    gradientColor3: { table: { disable: true } },
    gradientColor4: { table: { disable: true } },
    gradientColor5: { table: { disable: true } },
    gradientColor6: { table: { disable: true } },
    isThinking: {
      name: 'Is Thinking',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    play: {
      table: { disable: true },
    },
    motionTheme: motionThemeArgType,
  },
  args: {
    size: 80,
    strokeWidth: 3,
    motionTheme: 'Warm Sand',
  } as DABStoryArgs,
} satisfies Meta<DABStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

const DABWithButtons = ({ motionTheme, ...props }: DABStoryArgs) => {
  const [mode, setMode] = useState<'idle' | 'intro' | 'thinking'>('thinking')
  const [key, setKey] = useState(0)
  const palette = resolveMotionTheme(motionTheme)

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
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
      }) as const,
    []
  )

  // Inactive: darkest token bg, white text. Active: the amber accent
  // token (colors[2]) bg, white text — a different theme token so the
  // active state stays visually distinct without a border.
  const inactiveBg = palette ? darkestColor(palette) : '#333'
  const activeBg = palette?.colors[2] ?? '#4f46e5'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
        background: palette?.background,
      }}
    >
      <div style={{ display: 'inline-flex' }}>
        <DAB
          key={key}
          {...props}
          isThinking={isThinking}
          play={play}
          onAnimationEnd={handleAnimationEnd}
          backgroundColor="#fff"
          iconColor={palette && darkestColor(palette)}
          gradientColor1={palette?.colors[1]}
          gradientColor2={palette && darkestColor(palette)}
          gradientColor3={palette?.colors[0]}
          gradientColor4={palette?.colors[1]}
          gradientColor5={palette?.colors[2]}
          gradientColor6={palette && darkestColor(palette)}
        />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          onClick={startIntro}
          style={{
            ...buttonBaseStyle,
            background: mode === 'intro' ? activeBg : inactiveBg,
            color: '#fff',
          }}
        >
          Intro
        </button>

        <button
          type="button"
          onClick={toggleThinking}
          style={{
            ...buttonBaseStyle,
            background: mode === 'thinking' ? activeBg : inactiveBg,
            color: '#fff',
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
