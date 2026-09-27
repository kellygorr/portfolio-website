import React from 'react'
import { GroundingMenuListItem, GroundingMenuListItemProps } from './GroundingMenuListItem'
import { useGroundingMenuListStyles } from './GroundingMenuList.styles'

export interface GroundingMenuListProps {
  menuTitle?: string
  list: GroundingMenuListItemProps[]
}

export const GroundingMenuList = React.forwardRef<HTMLDivElement, GroundingMenuListProps>(
  ({ list }, ref) => {
    const styles = useGroundingMenuListStyles()

    return (
      <div ref={ref} className={styles.root}>
        {list.map((listitem, index) => (
          <GroundingMenuListItem key={index} {...listitem} />
        ))}
      </div>
    )
  }
)

GroundingMenuList.displayName = 'GroundingMenuList'
