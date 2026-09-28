import { useState } from 'react'
import { GroundingMenuHeader } from './GroundingMenuHeader'
import { GroundingMenuList, GroundingMenuListProps } from './GroundingMenuList'
import { useGroundingMenuStyles } from './GroundingMenu.styles'
import { MenuTabProps } from './MenuTab'
import { DirectionalMotion } from '../shared/motion'
import { hexToRgba } from '../shared/motionTheme'
import { darkestColor, type MotionPalette } from '../../src/styles/motionPalettes'

export interface GroundingMenuProps {
  headerMenu?: MenuTabProps[]
  list?: GroundingMenuListProps[]
  /** Full motion palette to theme every part of this component from —
   *  the card is the darkest palette token (colors[3]), with the active
   *  tab, icon circles, and text bars using the lighter tokens for
   *  contrast against it. Resting-state fills are solid palette tokens;
   *  hover/press states use a translucent white overlay so they read as
   *  a subtle lightening against the dark card. */
  palette?: MotionPalette
}

export const GroundingMenu = ({ headerMenu, list, palette }: GroundingMenuProps) => {
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

  const themeVars = palette
    ? (() => {
        const darkest = darkestColor(palette)
        return {
          // Card itself is the darkest token — the whole surface is a
          // solid palette color, not a white shell with colored accents.
          '--gm-card-bg': darkest,
          // Active tab is the lightest token so it stands out against
          // the dark card; its text is the darkest token again (reads
          // well on a light pill, and ties back to the card color).
          '--gm-active-bg': palette.colors[0],
          '--gm-active-text': darkest,
          // Divider under the header — a light overlay, since a solid
          // token here would compete visually with the tabs below it.
          '--gm-divider': hexToRgba('#ffffff', 0.16),
          // Inactive tab resting fill — the token right before the
          // darkest (colors[2]), solid, giving contrast against the
          // colors[3] card without competing with the active tab.
          '--gm-tab-bg': palette.colors[2],
          // Hover/press overlays: translucent white wash, applied on
          // top of the resting fill (not a swap to a different solid
          // token, which read as jarring against the light resting pill).
          '--gm-tab-hover-bg': hexToRgba('#ffffff', 0.18),
          '--gm-item-hover-bg': hexToRgba('#ffffff', 0.1),
          '--gm-icon-bg': palette.colors[1],
          '--gm-bar-strong': palette.colors[0],
          '--gm-bar-soft': palette.colors[1],
        } as React.CSSProperties
      })()
    : undefined

  // return header only
  if (headerMenu && !list) {
    return (
      <div style={themeVars}>
        <GroundingMenuHeader
          menu={headerMenu}
          selectedTab={selectedMenu}
          setSelectedTab={handleMenuChange}
        />
      </div>
    )
  }
  // return list only
  if (!headerMenu && list) {
    return (
      <div style={themeVars}>
        <GroundingMenuList {...list[0]} />
      </div>
    )
  }

  return (
    <div className={styles.root} style={themeVars}>
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
