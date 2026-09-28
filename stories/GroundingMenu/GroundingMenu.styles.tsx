import { makeStyles } from '@fluentui/react-components'

/*
  Grounding Menu root — cheerful rounded card. Background is the palette's
  darkest accent token (colors[3], same value as darkestColor(palette))
  so the whole card is tied to the theme, not a hardcoded white shell with
  colored accents on top. No outer border — the card reads as one solid
  themed surface. Drop shadow stays a neutral translucent gray — shadows
  are inherently translucent, unlike every other color in this component
  which is a solid, undiluted palette token.
*/

export const useGroundingMenuStyles = makeStyles({
  root: {
    display: 'flex',
    width: '788px',
    maxWidth: '812px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderRadius: '24px',
    backgroundColor: 'var(--gm-card-bg, #fff)',
    boxShadow: '0 12px 28px 0 rgba(0, 0, 0, 0.14)',
    overflow: 'hidden',
  },
  listContainer: {
    height: '272px',
    maxHeight: '272px',
    width: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '8px',
  },
})
