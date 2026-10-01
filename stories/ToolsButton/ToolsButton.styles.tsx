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
    backgroundColor: 'var(--tb-bg, transparent)',
    '>.fui-Button__icon': {
      minWidth: '24px',
      width: '24px',
      color: 'var(--tb-icon, inherit)',
    },

    ':hover': {
      backgroundColor: 'var(--tb-bg-hover, #e0e0e0)',
    },
    ':hover>.fui-Button__icon': {
      color: 'var(--tb-icon-hover, inherit)',
    },

    ':hover:active': {
      backgroundColor: 'var(--tb-bg-active, var(--tb-bg-hover, #d6d6d6))',
    },
    ':active:focus-visible': {
      backgroundColor: 'var(--tb-bg-active, var(--tb-bg-hover, #d6d6d6))',
    },
    ':hover:active>.fui-Button__icon': {
      color: 'var(--tb-icon-hover, inherit)',
    },
    ':active:focus-visible>.fui-Button__icon': {
      color: 'var(--tb-icon-hover, inherit)',
    },
  },
  toggleButton: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    backgroundColor: 'var(--tb-toggle-bg, #333)',
    color: '#fff',
  },
})
