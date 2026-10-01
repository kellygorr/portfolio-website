/**
 * Our own motion tokens — durations and easing curves used across the
 * themed Storybook motion demos (Blocks Latency, GroundingMenu,
 * ToolsButton, ProgressBar, DirectionalMotion, etc).
 *
 * These replace direct usage of @fluentui/react-components' `motionTokens`.
 * Durations there are typed as raw numbers (ms), not CSS duration strings
 * (e.g. `durationUltraFast: 50`, not `"50ms"`), which is fine for JS-driven
 * animation (Web Animations API, framer/motion) but breaks Griffel's CSS-in-JS
 * `transitionDuration`, which requires a string — this caused a real
 * TypeScript error in MenuTab.styles.tsx / GroundingMenuListItem.styles.tsx.
 *
 * Values are intentionally the same as Fluent's motionTokens (so nothing
 * visually changes), just correctly typed/shaped for both use cases:
 * - `durations.*Ms` — raw numbers, for JS-driven animation (Web Animations
 *   API keyframes, delay math, etc).
 * - `durations.*` — CSS duration strings (e.g. "50ms"), for styled-components
 *   and Griffel `transitionDuration`.
 */

export const durationsMs = {
	ultraFast: 50,
	faster: 100,
	normal: 200,
} as const

export const durations = {
	ultraFast: `${durationsMs.ultraFast}ms`,
	faster: `${durationsMs.faster}ms`,
	normal: `${durationsMs.normal}ms`,
} as const

export const curves = {
	linear: 'cubic-bezier(0,0,1,1)',
	accelerateMin: 'cubic-bezier(0.8,0,0.78,1)',
	decelerateMin: 'cubic-bezier(0.33,0,0.1,1)',
	easyEaseMax: 'cubic-bezier(0.8,0,0.2,1)',
} as const
