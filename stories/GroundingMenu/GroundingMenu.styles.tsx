import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useGroundingMenuStyles = makeStyles({
  root: {
    display: 'flex',
    width: '788px',
    maxWidth: '812px',
    ...shorthands.padding(0, 0),
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    ...shorthands.borderRadius('24px'),
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
  },
  listContainer: {
    height: '272px',
    maxHeight: '272px',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    ...shorthands.padding('8px', '12px', '8px', '12px'),
  },
})
