import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useGroundingMenuListItemStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding('6px', '8px'),
    height: '48px',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius('12px'),

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },

    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },

    ':focus-visible': {
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
      outlineOffset: '-2px',
    },
  },

  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    flexShrink: 0,
    color: tokens.colorNeutralForeground3,
    backgroundColor: tokens.colorNeutralBackground5,
    borderRadius: '100%',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0, // Allows text truncation
  },

  title: {
    ...shorthands.margin(0),
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    ...shorthands.overflow('hidden'),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  subtitle: {
    ...shorthands.margin(0),
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase100,
    color: tokens.colorNeutralForeground2,
    ...shorthands.overflow('hidden'),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})
