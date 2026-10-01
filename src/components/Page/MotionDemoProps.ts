import type { MotionPaletteName } from '../../styles/motionPalettes'

export interface MotionDemoProps {
	/** Motion palette name (see src/styles/motionPalettes.ts, or the
	 *  MotionPaletteNames constants for autocomplete). Drives the demo's
	 *  own colors and the "recreated for portfolio" badge together, so
	 *  both always match. Controlled by the caller (the project page),
	 *  not hardcoded per-demo. */
	theme: MotionPaletteName
}
