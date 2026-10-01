/**
 * Fluent Flex Motion tokens — the real duration and easing values from the
 * Fluent Flex Motion system (the `flex-motion` agent guidance plugin), used
 * by the Storybook token-reference demos under `stories/MotionTokens`.
 *
 * These are intentionally kept separate from `src/styles/motionTokens.ts`,
 * which holds a different, older set of duration/curve values already used
 * by several existing motion demos (Blocks Latency, GroundingMenu, etc.).
 * Renaming or merging those would risk visually changing demos that were
 * tuned against those specific values — this file exists purely to give the
 * new Fluent Design System Motion token-reference stories the *actual*
 * Fluent Flex Motion values to demonstrate, pulled directly from the
 * `flex-motion` plugin's `motion-foundations` reference docs
 * (`skills/motion-foundations/reference/durations.md` and `easings.md`).
 */

export interface FluentMotionDuration {
	/** CSS custom property name, e.g. `--gnrc-motion-duration-base-200`. */
	token: string
	/** Short label shown in the UI, e.g. `base-200`. */
	label: string
	/** Duration in milliseconds. */
	ms: number
	/** Recommended-use description, verbatim (lightly trimmed) from the
	 *  duration scale reference doc. */
	use: string
}

export const fluentMotionDurations: FluentMotionDuration[] = [
	{
		token: '--gnrc-motion-duration-base-50',
		label: 'base-50',
		ms: 50,
		use: 'Instant response, micro-feedback, press states, and very small visual adjustments',
	},
	{
		token: '--gnrc-motion-duration-base-100',
		label: 'base-100',
		ms: 100,
		use: 'Fast feedback, hover states, focus chrome, lightweight reveals, and compact control updates',
	},
	{
		token: '--gnrc-motion-duration-base-200',
		label: 'base-200',
		ms: 200,
		use: 'Standard component transitions, simple enter/exit motion, and common UI state changes',
	},
	{
		token: '--gnrc-motion-duration-base-300',
		label: 'base-300',
		ms: 300,
		use: 'Panel transitions, layout changes, and spatial movement that preserves orientation',
	},
	{
		token: '--gnrc-motion-duration-base-500',
		label: 'base-500',
		ms: 500,
		use: 'Large transitions, expressive moments, AI transformations, and complex state changes',
	},
	{
		token: '--gnrc-motion-duration-base-1000',
		label: 'base-1000',
		ms: 1000,
		use: 'Extended AI sequences, deliberate transformations, and choreographed high-attention moments',
	},
]

export interface FluentMotionEasing {
	/** CSS custom property name, e.g. `--gnrc-motion-easing-functional-enter`. */
	token: string
	/** Short label shown in the UI, e.g. `functional-enter`. */
	label: string
	/** The 4 cubic-bezier control point values, in `cubic-bezier()` order. */
	points: [number, number, number, number]
	/** CSS `cubic-bezier(...)` string, derived from `points`. */
	curve: string
	/** `functional` (routine product UI) or `expressive` (higher-attention,
	 *  brand/editorial/AI/celebration moments only). */
	tone: 'functional' | 'expressive'
	/** Intent/usage description from the easing reference doc. */
	intent: string
}

const bezierCurve = (p: [number, number, number, number]) => `cubic-bezier(${p.join(', ')})`

export const fluentMotionEasings: FluentMotionEasing[] = [
	{
		token: '--gnrc-motion-easing-functional-enter',
		label: 'functional-enter',
		points: [0, 0, 0, 1],
		curve: bezierCurve([0, 0, 0, 1]),
		tone: 'functional',
		intent: 'Responsive functional entrance — decelerates into place',
	},
	{
		token: '--gnrc-motion-easing-functional-exit',
		label: 'functional-exit',
		points: [0.6, 0, 0.75, 0.4],
		curve: bezierCurve([0.6, 0, 0.75, 0.4]),
		tone: 'functional',
		intent: 'Functional dismissal or cleanup — accelerates out',
	},
	{
		token: '--gnrc-motion-easing-functional-transition',
		label: 'functional-transition',
		points: [0.33, 0, 0, 1],
		curve: bezierCurve([0.33, 0, 0, 1]),
		tone: 'functional',
		intent: 'Functional in-place transition or continuity motion',
	},
	{
		token: '--gnrc-motion-easing-functional-linear',
		label: 'functional-linear',
		points: [0, 0, 1, 1],
		curve: bezierCurve([0, 0, 1, 1]),
		tone: 'functional',
		intent: 'Opacity, loading, progress, and continuous motion — no acceleration',
	},
	{
		token: '--gnrc-motion-easing-expressive-enter',
		label: 'expressive-enter',
		points: [0, 0, 0, 1],
		curve: bezierCurve([0, 0, 0, 1]),
		tone: 'expressive',
		intent: 'Expressive entrance — higher-attention moments only',
	},
	{
		token: '--gnrc-motion-easing-expressive-exit',
		label: 'expressive-exit',
		points: [0.6, 0, 0.75, 0.4],
		curve: bezierCurve([0.6, 0, 0.75, 0.4]),
		tone: 'expressive',
		intent: 'Expressive content dismissal without lingering',
	},
	{
		token: '--gnrc-motion-easing-expressive-transition',
		label: 'expressive-transition',
		points: [0.33, 0, 0, 1],
		curve: bezierCurve([0.33, 0, 0, 1]),
		tone: 'expressive',
		intent: 'Expressive transition for meaningful context shifts',
	},
]
