import { MenuTab, MenuTabProps } from './MenuTab'
import { useGroundingMenuHeaderStyles } from './GroundingMenuHeader.styles'

export interface GroundingMenuHeaderProps {
  menu: MenuTabProps[]
  selectedTab?: number | null
  setSelectedTab: (tab: number | null) => void
}

export const GroundingMenuHeader = ({
  menu,
  selectedTab,
  setSelectedTab,
}: GroundingMenuHeaderProps) => {
  const styles = useGroundingMenuHeaderStyles()

  return (
    <div className={styles.root}>
      {menu.map((tab, idx) => (
        <MenuTab
          key={tab.title}
          title={tab.title}
          selected={selectedTab === idx}
          onClick={() => setSelectedTab(idx)}
        />
      ))}
    </div>
  )
}
