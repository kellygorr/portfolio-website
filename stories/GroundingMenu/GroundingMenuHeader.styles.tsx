import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useGroundingMenuHeaderStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.padding('12px', '16px'),
    alignItems: 'center',
    alignSelf: 'stretch',
    ...shorthands.gap('8px'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
})
