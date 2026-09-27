import { makeStyles, shorthands } from '@fluentui/react-components'

export const useGroundingMenuListStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    ...shorthands.gap('4px'),
    alignSelf: 'stretch',
  },
})
