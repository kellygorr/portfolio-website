import type { Meta, StoryObj } from '@storybook/react-vite'
import { GroundingMenu } from './GroundingMenu'
import type { GroundingMenuProps } from './GroundingMenu'
import { GroundingMenuListProps } from './GroundingMenuList'
import { motionThemeArgType, resolveMotionTheme } from '../shared/motionTheme'

type GroundingMenuStoryArgs = GroundingMenuProps & { motionTheme: string }

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Copilot/GroundingMenu',
  component: GroundingMenu,
  parameters: {
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    motionTheme: motionThemeArgType,
    palette: { table: { disable: true } },
  },
  args: {
    motionTheme: 'Warm Sand',
  } as GroundingMenuStoryArgs,
  render: ({ motionTheme, ...args }: GroundingMenuStoryArgs) => {
    const palette = resolveMotionTheme(motionTheme)
    return (
      <div
        style={{
          background: palette?.background,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GroundingMenu {...args} palette={palette} />
      </div>
    )
  },
} satisfies Meta<GroundingMenuStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

const sampleMenu: GroundingMenuProps['headerMenu'] = [
  { title: 'All' },
  { title: 'Files' },
  { title: 'People' },
  { title: 'Meetings' },
  { title: 'Emails' },
]

const sampleList1: GroundingMenuListProps = {
  menuTitle: 'All',
  list: [
    { title: 'Mona Kane', subtitle: 'Mona.Kane@outlook.com' },
    {
      title: 'Leading the way with Brew Fusion',
      subtitle: 'You opened yesterday',
    },
    {
      title: 'Stand-up meeting',
      subtitle: 'Occurs every Thu, 2:30 PM - 3:30 PM',
    },
    {
      title: 'Research Guide',
      subtitle: 'Mona Kane sent 2 hours ago',
    },
    {
      title: 'Contoso Team Chat',
      subtitle: 'Thu 7/10/2023 2:30 PM- 3:30 PM',
    },
    { title: 'Document 4', subtitle: 'Subtitle of Document 4' },
    { title: 'Document 5', subtitle: 'Subtitle of Document 5' },
  ],
}

const sampleList2: GroundingMenuListProps = {
  menuTitle: 'Files',
  list: [
    { title: 'Q3 Budget Review', subtitle: 'Shared with Finance team' },
    { title: 'Onboarding Guide', subtitle: 'Last edited 3 days ago' },
    { title: 'Contoso rebrand assets for the new marketing campaign', subtitle: 'You opened this morning' },
  ],
}
const sampleList3: GroundingMenuListProps = {
  menuTitle: 'People',
  list: [
    { title: 'Priya Shah', subtitle: 'priya.shah@contoso.com' },
    { title: 'Alex Nguyen', subtitle: 'Product Manager, Devices' },
    { title: 'Sam Okafor', subtitle: 'sam.okafor@contoso.com' },
    { title: 'Jordan Lee', subtitle: 'Engineering Manager, Cloud Infrastructure team' },
    { title: 'Mona Kane', subtitle: 'mona.kane@outlook.com' },
    { title: 'Wei Zhang', subtitle: 'Design Lead' },
    { title: 'Diego Ramirez', subtitle: 'diego.ramirez@contoso.com' },
  ],
}

const sampleList4: GroundingMenuListProps = {
  menuTitle: 'Meetings',
  list: [{ title: 'Quarterly planning sync', subtitle: 'Occurs every Mon, 9:00 AM - 10:00 AM' }],
}

const sampleList5: GroundingMenuListProps = {
  menuTitle: 'Emails',
  list: [
    { title: 'Your expense report was approved', subtitle: 'Finance Team' },
    { title: 'Re: Design review notes', subtitle: 'Wei Zhang sent yesterday' },
    { title: 'Welcome to the team!', subtitle: 'HR sent 2 weeks ago' },
  ],
}

export const Default: Story = {
  args: {
    headerMenu: sampleMenu,
    list: [sampleList1, sampleList2, sampleList3, sampleList4, sampleList5],
  } as Partial<GroundingMenuStoryArgs>,
}
export const Header: Story = {
  args: {
    headerMenu: sampleMenu,
  } as Partial<GroundingMenuStoryArgs>,
}

export const List: Story = {
  args: {
    list: [sampleList1],
  } as Partial<GroundingMenuStoryArgs>,
}
