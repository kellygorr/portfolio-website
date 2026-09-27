import { useState } from 'react'
import { GroundingMenuHeader } from './GroundingMenuHeader'
import { GroundingMenuList, GroundingMenuListProps } from './GroundingMenuList'
import { useGroundingMenuStyles } from './GroundingMenu.styles'
import { MenuTabProps } from './MenuTab'
import { DirectionalMotion } from '../shared/motion'

export interface GroundingMenuProps {
  headerMenu?: MenuTabProps[]
  list?: GroundingMenuListProps[]
}

export const GroundingMenu = ({ headerMenu, list }: GroundingMenuProps) => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(0)
  const styles = useGroundingMenuStyles()

  // Handle menu changes
  const handleMenuChange = (newMenu: number | null) => {
    setSelectedMenu(newMenu)
  }

  // Determine animation direction based on index comparison
  const getAnimationDirection = (
    currentKey: string | number,
    newKey: string | number
  ): 'left' | 'right' => {
    const current = typeof currentKey === 'string' ? parseInt(currentKey, 10) : currentKey
    const next = typeof newKey === 'string' ? parseInt(newKey, 10) : newKey
    return next < current ? 'left' : 'right'
  }

  // return header only
  if (headerMenu && !list) {
    return (
      <GroundingMenuHeader
        menu={headerMenu}
        selectedTab={selectedMenu}
        setSelectedTab={handleMenuChange}
      />
    )
  }
  // return list only
  if (!headerMenu && list) {
    return <GroundingMenuList {...list[0]} />
  }

  return (
    <div className={styles.root}>
      {headerMenu && (
        <GroundingMenuHeader
          menu={headerMenu}
          selectedTab={selectedMenu}
          setSelectedTab={handleMenuChange}
        />
      )}
      {selectedMenu !== null && list && list[selectedMenu] ? (
        <div className={styles.listContainer}>
          <DirectionalMotion
            contentKey={selectedMenu}
            onDirectionChange={getAnimationDirection}
            animationDistance={30}
          >
            <GroundingMenuList {...list[selectedMenu]} />
          </DirectionalMotion>
        </div>
      ) : null}
    </div>
  )
}
