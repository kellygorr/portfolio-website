import { makeStyles } from '@fluentui/react-components'

/*
  Grounding Menu root — cheerful rounded card. Background is the palette's
  darkest accent token (colors[3], same value as darkestColor(palette))
  so the whole card is tied to the theme, not a hardcoded white shell with
  colored accents on top. No outer border, no drop shadow — the card
  reads as one flat, solid themed surface.
*/

export const useGroundingMenuStyles = makeStyles({
  root: {
    display: 'flex',
    width: '500px',
    maxWidth: '812px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderRadius: '24px',
    backgroundColor: 'var(--gm-card-bg, #fff)',
    overflow: 'hidden',
  },
  listContainer: {
    height: '200px',
    maxHeight: '200px',
    width: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '8px',
  },
})
