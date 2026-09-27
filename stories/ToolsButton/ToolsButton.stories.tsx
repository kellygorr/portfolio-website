import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToolsButton } from './ToolsButtons'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Copilot/ToolsButton',
  component: ToolsButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: `
**Motion spec: ** <a href="https://microsoft-my.sharepoint-df.com/personal/chloranc_microsoft_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fchloranc%5Fmicrosoft%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FToolsButtonsAdd%26Remove%5FSpec%5Fv01%2Emp4&ga=1&gaS=25&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E89e1ef15%2Dfee3%2D4b90%2Dbf3f%2D2b089cb62365" target="_blank">View</a>

This component demonstrates the expand/collapse behavior of the tools button in the chat input component.
        `,
      },
    },
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
  },
  args: {
    widthTransitionDuration: '100ms',
    textFadeInDuration: 50,
    textFadeOutDuration: 50,
  },
} satisfies Meta<typeof ToolsButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '100px' }}>
      <ToolsButton {...args} />
    </div>
  ),
}
