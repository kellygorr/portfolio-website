import { LinePathMotionOvershoot } from '../v1/LinePathMotionOvershoot'

// Rectangle AE JSON (Trim Paths):
// head (e): o=(0.266, 0), i=(0.298, 1)
// tail (s): o=(0.542, 0), i=(0.453, 1)
const AE_HEAD_TIMING: [number, number, number, number] = [0.266, 0, 0.298, 1]
const AE_TAIL_TIMING: [number, number, number, number] = [0.542, 0, 0.453, 1]
const AE_TAIL_START_FRACTION = 8 / 110
const AE_HEAD_END_FRACTION = 98 / 110
const AE_TAIL_END_FRACTION = 1

interface LinePathMotionOvershootV3CssProps {
  width?: number
  height?: number
  duration?: number
  strokeWidth?: number
  color?: string
  feather?: number
}

/**
 * Rectangle V3 (CSS engine)
 *
 * This is a V3 wrapper over the current CSS renderer so we can lock
 * AE defaults now and swap in final JSON-calibrated timing/geometry next.
 * The end point should be updated to hide the angle limitation with CSS.
 */
export const LinePathMotionOvershootV3Css = ({
  // Med rectangle 1833ms, Large rectangle 2000ms
  width = 240,
  height = 60,
  duration = 1833,
  strokeWidth = 2,
  color = '#5940ff',
  feather = 3,
}: LinePathMotionOvershootV3CssProps = {}) => {
  return (
    <LinePathMotionOvershoot
      width={width}
      height={height}
      duration={duration}
      strokeWidth={strokeWidth}
      color={color}
      feather={feather}
      headTiming={AE_HEAD_TIMING}
      tailTiming={AE_TAIL_TIMING}
      tailStartFraction={AE_TAIL_START_FRACTION}
      headEndFraction={AE_HEAD_END_FRACTION}
      tailEndFraction={AE_TAIL_END_FRACTION}
    />
  )
}

export type { LinePathMotionOvershootV3CssProps }
