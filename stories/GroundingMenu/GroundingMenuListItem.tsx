import { useGroundingMenuListItemStyles } from './GroundingMenuListItem.styles'

export interface GroundingMenuListItemProps {
  title?: string
  subtitle?: string
}

// Deterministic wireframe bar width derived from string length, clamped to
// a believable text-line range so rows read as varied placeholder text
// instead of identical bars.
const barWidth = (text: string | undefined, min: number, max: number, perChar: number): number => {
  if (!text) return min
  return Math.min(max, Math.max(min, text.length * perChar))
}

export const GroundingMenuListItem = ({ title, subtitle }: GroundingMenuListItemProps) => {
  const styles = useGroundingMenuListItemStyles()
  const label = [title, subtitle].filter(Boolean).join(', ') || undefined

  return (
    <div className={styles.root} tabIndex={0} role="button" aria-label={label}>
      <div className={styles.icon} />
      <div className={styles.content}>
        {title && <div className={styles.titleBar} style={{ width: barWidth(title, 60, 220, 7) }} />}
        {subtitle && <div className={styles.subtitleBar} style={{ width: barWidth(subtitle, 40, 180, 6) }} />}
      </div>
    </div>
  )
}
