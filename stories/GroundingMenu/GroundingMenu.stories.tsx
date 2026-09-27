import type { Meta, StoryObj } from '@storybook/react-vite'
import { GroundingMenu } from './GroundingMenu'
import type { GroundingMenuProps } from './GroundingMenu'
import { GroundingMenuListProps } from './GroundingMenuList'

import {
  Document20Regular,
  Person20Regular,
  VideoRecording20Regular,
  Mail20Regular,
} from '@fluentui/react-icons'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Copilot/GroundingMenu',
  component: GroundingMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: `
**Motion spec: ** <a href="https://microsoft.sharepoint-df.com/:v:/t/TechCreativeMotion/EQLxS49Z-e5ElRaOVOZXoK8B6uiF5XPRQmDE2C9SCdeFrw?e=rTh1DF" target="_blank">View</a>

**Figma: ** <a href="https://www.figma.com/design/fkZgR5M9vBbW9awDT5mGZ2/Peek-Menu?m=auto&node-id=20548-44865&t=Qw9pmtvTEL8ngq7M-1" target="_blank">View</a>

This component demonstrates the grounding menu interaction pattern with smooth animations and micro-interactions.
        `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof GroundingMenu>

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
    { icon: <Person20Regular />, title: 'Mona Kane', subtitle: 'Mona.Kane@outlook.com' },
    {
      icon: <Document20Regular />,
      title: 'Leading the way with Brew Fusion',
      subtitle: 'You opened yesterday',
    },
    {
      icon: <VideoRecording20Regular />,
      title: 'Stand-up meeting',
      subtitle: 'Occurs every Thu, 2:30 PM - 3:30 PM',
    },
    {
      icon: <Mail20Regular />,
      title: 'Research Guide',
      subtitle: 'Mona Kane sent 2 hours ago',
    },
    {
      icon: <VideoRecording20Regular />,
      title: 'Contoso Team Chat',
      subtitle: 'Thu 7/10/2023 2:30 PM- 3:30 PM',
    },
    { icon: <Document20Regular />, title: 'Document 4', subtitle: 'Subtitle of Document 4' },
    { icon: <Document20Regular />, title: 'Document 5', subtitle: 'Subtitle of Document 5' },
  ],
}

const sampleList2: GroundingMenuListProps = {
  menuTitle: 'Files',
  list: [
    { icon: <Document20Regular />, title: 'Document 4', subtitle: 'Subtitle of Document 4' },
    { icon: <Document20Regular />, title: 'Document 5', subtitle: 'Subtitle of Document 5' },
    { icon: <Document20Regular />, title: 'Document 6', subtitle: 'Subtitle of Document 6' },
  ],
}
const sampleList3: GroundingMenuListProps = {
  menuTitle: 'People',
  list: [
    { icon: <Person20Regular />, title: 'Person 1', subtitle: 'Subtitle of Person 1' },
    { icon: <Person20Regular />, title: 'Person 2', subtitle: 'Subtitle of Person 2' },
    { icon: <Person20Regular />, title: 'Person 3', subtitle: 'Subtitle of Person 3' },
    { icon: <Person20Regular />, title: 'Person 4', subtitle: 'Subtitle of Person 4' },
    { icon: <Person20Regular />, title: 'Person 5', subtitle: 'Subtitle of Person 5' },
    { icon: <Person20Regular />, title: 'Person 6', subtitle: 'Subtitle of Person 6' },
    { icon: <Person20Regular />, title: 'Person 7', subtitle: 'Subtitle of Person 7' },
  ],
}

const sampleList4: GroundingMenuListProps = {
  menuTitle: 'Meetings',
  list: [
    { icon: <VideoRecording20Regular />, title: 'Meeting 1', subtitle: 'Subtitle of Meeting 1' },
  ],
}

const sampleList5: GroundingMenuListProps = {
  menuTitle: 'Emails',
  list: [
    { icon: <Mail20Regular />, title: 'Email 1', subtitle: 'Subtitle of Email 1' },
    { icon: <Mail20Regular />, title: 'Email 2', subtitle: 'Subtitle of Email 2' },
    { icon: <Mail20Regular />, title: 'Email 3', subtitle: 'Subtitle of Email 3' },
  ],
}

export const Default: Story = {
  args: {
    headerMenu: sampleMenu,
    list: [sampleList1, sampleList2, sampleList3, sampleList4, sampleList5],
  },
}
export const Header: Story = {
  args: {
    headerMenu: sampleMenu,
  },
}

export const List: Story = {
  args: {
    list: [sampleList1],
  },
}
