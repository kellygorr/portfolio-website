import './LogoFauxCutout.css'

// (for storybook only) - noBackground allows transparent scene for custom backgrounds
interface LogoFauxCutoutProps {
  noBackground?: boolean
}

export const LogoFauxCutout = ({ noBackground }: LogoFauxCutoutProps) => {
  return (
    <div className={noBackground ? 'lfc-scene lfc-scene--no-bg' : 'lfc-scene'}>
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
