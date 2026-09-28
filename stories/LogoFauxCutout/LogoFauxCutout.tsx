import './LogoFauxCutout.css'

// (for storybook only) - noBackground allows transparent scene for custom backgrounds
interface LogoFauxCutoutProps {
  noBackground?: boolean
  /** Scene background color, and the punch/cutout color (must match the
   *  scene background exactly, since the punch is a hole revealing it —
   *  e.g. palette.background). */
  backgroundColor?: string
  /** Shape fill color (e.g. palette.colors[2], "token2"). */
  fillColor?: string
  /** Duration of one full animation cycle in ms. Default: 3400 (CSS fallback) */
  duration?: number
}

export const LogoFauxCutout = ({ noBackground, backgroundColor, fillColor, duration }: LogoFauxCutoutProps) => {
  const themeVars = {
    '--lfc-bg': backgroundColor,
    '--lfc-fill': fillColor,
    '--lfc-duration': duration !== undefined ? `${duration}ms` : undefined,
  } as React.CSSProperties

  return (
    <div className={noBackground ? 'lfc-scene lfc-scene--no-bg' : 'lfc-scene'} style={themeVars}>
      {/* Shape A */}
      <div className="lfc-shape lfc-shape--a">
        <div className="lfc-clip">
          <div className="lfc-fill" />
          <div className="lfc-punch" />
        </div>
      </div>

      {/* Shape B */}
      <div className="lfc-shape lfc-shape--b">
        <div className="lfc-clip">
          <div className="lfc-fill" />
          <div className="lfc-punch" />
        </div>
      </div>
    </div>
  )
}
