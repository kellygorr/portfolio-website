import { makeStyles } from '@fluentui/react-components'

/*
  Single Square — a square rotates with overshoot/bounce
  https://motion-specs.azurewebsites.net/dev/f618562b-072c-454f-a283-96434e42094c
*/

const CELL = 8

export const DURATION_MS = 1166

/* Relative offsets within the active portion (0–1 range) */
const ACTIVE_OFFSETS = [0, 0.574, 0.787, 1]
const ROTATIONS = ['0deg', '105deg', '75deg', '90deg']
const EASINGS = [
  'cubic-bezier(0.522,-0.881,0.78,1)',
  'cubic-bezier(0.159,0.066,0.566,1)',
  'cubic-bezier(0.45,0,0.667,1)',
  'linear',
]

export const SINGLE_SQUARE_CELL = CELL

/**
 * Build the @keyframes CSS string for the active rotation.
 * Storybook controls only — can be removed and replaced with static keyframes in production.
 */
export function buildKeyframes(name: string, delay: number, duration: number = DURATION_MS): string {
  const total = delay + duration

  const pctStart = (delay / total) * 100
  const pctEnd = 100

  let css = `@keyframes ${name} {\n`
  css += `  0% { transform: rotate(0deg); animation-timing-function: linear; }\n`

  for (let i = 0; i < ACTIVE_OFFSETS.length; i++) {
    const pct = pctStart + ACTIVE_OFFSETS[i] * (pctEnd - pctStart)
    const rounded = Math.round(pct * 10) / 10
    css += `  ${rounded}% { transform: rotate(${ROTATIONS[i]}); animation-timing-function: ${EASINGS[i]}; }\n`
  }

  css += `  100% { transform: rotate(90deg); }\n`
  css += `}`
  return css
}

/**
 * Compute total duration for a given delay.
 * Storybook controls only — can be removed and replaced with a constant in production.
 */
export function totalDuration(delay: number, duration: number = DURATION_MS): number {
  return delay + duration
}

export const useSingleSquareStyles = makeStyles({
  container: {
    position: 'relative',
    width: `${CELL}px`,
    height: `${CELL}px`,
    contain: 'layout style',
  },

  square: {
    position: 'absolute',
    width: `${CELL}px`,
    height: `${CELL}px`,
    backgroundColor: 'currentColor',
    willChange: 'transform',
    animationIterationCount: 'infinite',
  },
})
