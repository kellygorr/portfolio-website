import { makeStyles } from '@fluentui/react-components'

export const useGroundingMenuHeaderStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '12px 16px',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '8px',
    borderBottom: '3px solid var(--gm-divider, rgba(255, 255, 255, 0.16))',
  },
})
