import { useGroundingMenuListItemStyles } from './GroundingMenuListItem.styles'

export interface GroundingMenuListItemProps {
  icon?: JSX.Element
  title?: string
  subtitle?: string
}

export const GroundingMenuListItem = ({ icon, title, subtitle }: GroundingMenuListItemProps) => {
  const styles = useGroundingMenuListItemStyles()

  return (
    <div className={styles.root} tabIndex={0} role="button">
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  )
}
