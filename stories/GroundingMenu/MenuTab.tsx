import { useMenuTabStyles } from './MenuTab.styles'

export interface MenuTabProps {
  title: string
  selected?: boolean
  onClick?: () => void
}

export const MenuTab = ({ title, selected = false, onClick }: MenuTabProps) => {
  const styles = useMenuTabStyles()

  const className = [styles.root, selected && styles.selected].filter(Boolean).join(' ')

  return (
    <button
      className={className}
      onClick={onClick}
      type="button"
      role="tab"
      aria-selected={selected}
    >
      {title}
    </button>
  )
}
