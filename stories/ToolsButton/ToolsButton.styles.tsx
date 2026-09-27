import { makeStyles } from '@fluentui/react-components'

export const useToolsButtonStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align content to left instead of center
    padding: '8px',

    minWidth: 'auto', // Override Fluent's default minWidth: 96px
    '>.fui-Button__icon': {
      minWidth: '24px',
      width: '24px',
    },
  },
})
