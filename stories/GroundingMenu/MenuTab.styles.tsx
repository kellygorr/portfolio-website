import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useMenuTabStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    minHeight: '32px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    outline: 'none',
    transition: `all ${tokens.durationUltraFast} ${tokens.curveLinear}`,

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1Hover),
      color: tokens.colorNeutralForeground1,
    },

    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },

    ':focus-visible': {
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
      outlineOffset: '-2px',
    },
  },

  selected: {
    color: tokens.colorBrandForeground1,
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
    backgroundColor: tokens.colorBrandBackground2,

    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorBrandForeground1,
      ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
    },
  },
})
