import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToolsButton } from './ToolsButtons'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'
import { darkestColor } from '../../src/styles/motionPalettes'

type ToolsButtonStoryArgs = Parameters<typeof ToolsButton>[0] & { motionTheme: string }

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Copilot/ToolsButton',
  component: ToolsButton,
  parameters: {
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    widthTransitionDuration: {
      control: { type: 'text' },
      description: 'Duration for width transition animation (e.g. "500ms", "1s")',
      defaultValue: '100ms',
    },
    textFadeInDuration: {
      control: { type: 'number', min: 50, max: 2000, step: 50 },
      description: 'Duration for text fade in animation in milliseconds',
      defaultValue: 50,
    },
    textFadeOutDuration: {
      control: { type: 'number', min: 50, max: 2000, step: 50 },
      description: 'Duration for text fade out animation in milliseconds',
      defaultValue: 50,
    },
    toggleBg: { table: { disable: true } },
    bgHoverColor: { table: { disable: true } },
    iconHoverColor: { table: { disable: true } },
    motionTheme: motionThemeArgType,
  },
  args: {
    widthTransitionDuration: '100ms',
    textFadeInDuration: 50,
    textFadeOutDuration: 50,
    motionTheme: 'Warm Sand',
  } as ToolsButtonStoryArgs,
} satisfies Meta<ToolsButtonStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ motionTheme, ...args }) => {
    const palette = resolveMotionTheme(motionTheme)
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: palette?.background,
        }}
      >
        <div style={{ width: '100px' }}>
          <ToolsButton
            {...args}
            toggleBg={palette && darkestColor(palette)}
            bgHoverColor={palette?.colors[0]}
            iconHoverColor={palette && darkestColor(palette)}
          />
        </div>
      </div>
    )
  },
}
