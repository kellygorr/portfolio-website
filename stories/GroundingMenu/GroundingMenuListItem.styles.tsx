import { makeStyles, motionTokens } from '@fluentui/react-components'

/*
  Grounding Menu List Item — simplified wireframe row: a plain circle
  placeholder (no per-item icon glyph) plus two rounded rectangle "text"
  bars sized off the real title/subtitle length. Colors are driven by
  CSS custom properties set on the GroundingMenu root (--gm-*) so any of
  the 9 motion palettes can theme it.
*/

export const useGroundingMenuListItemStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    height: '48px',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderRadius: '12px',
    transitionProperty: 'background-color',
    transitionDuration: motionTokens.durationUltraFast,
    transitionTimingFunction: motionTokens.curveLinear,

    ':hover': {
      backgroundColor: 'var(--gm-item-hover-bg, rgba(0, 0, 0, 0.05))',
    },

    ':active': {
      backgroundColor: 'var(--gm-item-hover-bg, rgba(0, 0, 0, 0.08))',
    },

    ':focus-visible': {
      outline: '2px solid var(--gm-active-bg, #4a4a4a)',
      outlineOffset: '-2px',
    },
  },

  icon: {
    width: '32px',
    height: '32px',
    flexShrink: 0,
    borderRadius: '9999px',
    backgroundColor: 'var(--gm-icon-bg, #e5e5e5)',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minWidth: 0,
  },

  titleBar: {
    height: '10px',
    borderRadius: '9999px',
    backgroundColor: 'var(--gm-bar-strong, #d0d0d0)',
  },

  subtitleBar: {
    height: '8px',
    borderRadius: '9999px',
    backgroundColor: 'var(--gm-bar-soft, #e5e5e5)',
  },
})
