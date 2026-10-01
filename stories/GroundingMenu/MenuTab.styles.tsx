import { makeStyles, shorthands } from '@fluentui/react-components'
import { durations, curves } from '../../src/styles/motionTokens'

/*
  Menu Tab — pill-shaped header tab for the Grounding Menu wireframe.
  Colors are driven entirely by CSS custom properties set on the
  GroundingMenu root (--gm-*), not Fluent design tokens, so this can be
  themed by any of the 9 motion palettes.
*/

export const useMenuTabStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    height: '32px',
    padding: 0,
    cursor: 'pointer',
    backgroundColor: 'var(--gm-tab-bg, #e5e5e5)',
    border: '2px solid transparent',
    borderRadius: '9999px',
    outline: 'none',
    transitionProperty: 'background-color, border-color',
    transitionDuration: durations.ultraFast,
    transitionTimingFunction: curves.linear,

    ':hover': {
      backgroundColor: 'var(--gm-tab-hover-bg, rgba(0, 0, 0, 0.12))',
    },

    ':active': {
      backgroundColor: 'var(--gm-tab-hover-bg, rgba(0, 0, 0, 0.18))',
    },

    ':focus-visible': {
      ...shorthands.borderColor('var(--gm-active-bg, #4a4a4a)'),
    },
  },

  selected: {
    backgroundColor: 'var(--gm-active-bg, #4a4a4a)',

    ':hover': {
      backgroundColor: 'var(--gm-active-bg, #4a4a4a)',
      opacity: 0.9,
    },
  },
})
