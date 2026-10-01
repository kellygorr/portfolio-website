import { makeStyles } from '@fluentui/react-components'
import { curves } from '../../src/styles/motionTokens'

/*
  Box latency from motionspec.io, recreated in React and CSS based on the original animation
  https://app.motionspec.io/spec/0UagFn8BzY2wrLnoQlQq

  Blocks 1, 3, and 4 hand off position to one another during a single base
  cycle (1 ends where 4 starts, 4 ends where 3 starts, 3 ends where 1
  started). With a single shared color this is invisible — any square
  looks the same regardless of which DOM element is "playing" it. But once
  each block is given its own distinct color (see Blocks.tsx `colors` prop),
  the loop restart becomes visible as a hard color swap at the 3 handoff
  cells, because each block's CSS animation instantly resets to its own
  0% position/color when the base cycle repeats.

  Fix: blocks 1, 3, and 4 use an EXTENDED (3x) keyframe timeline that chains
  all three original hand-off motions in sequence (phase-shifted per block)
  so each element travels through all 3 positions and returns to its own
  start by the end of the extended cycle — a truly seamless loop with no
  color pop. The overall 3-square choreography at any instant is
  mathematically identical to the original design (this is a re-timing, not
  a redesign); only the extended duration and per-block starting phase
  differ. Blocks 2 and 5 already return to their own start within one base
  cycle, so they're left untouched and simply repeat 3x within the same
  wall-clock window.
*/

const CELL = 4
const EASE = curves.easyEaseMax

const block = {
  position: 'absolute' as const,
  width: `${CELL}px`,
  height: `${CELL}px`,
  backgroundColor: 'currentColor',
  willChange: 'transform',
  animationDuration: 'var(--blocks-duration, 3567ms)', // total duration timing from motionspec.io
  animationIterationCount: 'infinite',
  animationTimingFunction: EASE,
}

// Blocks 1/3/4 share this extended duration (3x base) so their unrolled,
// hand-off-chaining keyframes stay in sync with blocks 2/5's unchanged
// base-duration loop (3 short cycles line up exactly with 1 extended cycle).
const extendedBlock = {
  ...block,
  animationDuration: 'calc(var(--blocks-duration, 3567ms) * 3)',
}

export const useBlocksStyles = makeStyles({
  container: {
    position: 'relative',
    width: `${CELL * 3}px`,
    height: `${CELL * 3}px`,
  },

  /* Box 1 — starts at col 0, row 0. Extended (3x) keyframe: plays its own
     original move, then continues as box 4's move, then box 3's move,
     returning home — seamless loop, no color pop at restart. */
  block1: {
    ...extendedBlock,
    top: '0',
    left: '0',
    animationName: {
      '0%': { transform: 'translate(0, 0)' },
      '2.333%': { transform: `translate(0, ${CELL}px)` },
      '16.833%': { transform: `translate(0, ${CELL}px)` },
      '19.167%': { transform: `translate(0, ${CELL * 2}px)` },
      '43.133%': { transform: `translate(0, ${CELL * 2}px)` },
      '45.467%': { transform: `translate(${CELL}px, ${CELL * 2}px)` },
      '59.967%': { transform: `translate(${CELL}px, ${CELL * 2}px)` },
      '62.3%': { transform: `translate(${CELL}px, ${CELL}px)` },
      '73.2%': { transform: `translate(${CELL}px, ${CELL}px)` },
      '75.533%': { transform: `translate(${CELL}px, 0)` },
      '86.767%': { transform: `translate(${CELL}px, 0)` },
      '89.1%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(0, 0)' },
    },
  },

  /* Box 2 — starts at col 1, row 0 — moves right 1 cell, then back.
     Already returns to its own start within one base cycle — unchanged. */
  block2: {
    ...block,
    top: '0',
    left: `${CELL}px`,
    animationName: {
      '0%, 9.8%': { transform: 'translate(0, 0)' },
      '16.8%': { transform: `translate(${CELL}px, 0)` },
      '70.1%': { transform: `translate(${CELL}px, 0)` },
      '77.1%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(0, 0)' },
    },
  },

  /* Box 3 — starts at col 1, row 1. Extended (3x) keyframe: plays its own
     original move, then continues as box 1's move, then box 4's move,
     returning home — seamless loop, no color pop at restart. */
  block3: {
    ...extendedBlock,
    top: `${CELL}px`,
    left: `${CELL}px`,
    animationName: {
      '0%, 6.533%': { transform: 'translate(0, 0)' },
      '8.867%': { transform: `translate(0, ${-CELL}px)` },
      '20.1%': { transform: `translate(0, ${-CELL}px)` },
      '22.433%': { transform: `translate(${-CELL}px, ${-CELL}px)` },
      '33.333%': { transform: `translate(${-CELL}px, ${-CELL}px)` },
      '35.667%': { transform: `translate(${-CELL}px, 0)` },
      '50.167%': { transform: `translate(${-CELL}px, 0)` },
      '52.5%': { transform: `translate(${-CELL}px, ${CELL}px)` },
      '76.467%': { transform: `translate(${-CELL}px, ${CELL}px)` },
      '78.8%': { transform: `translate(0, ${CELL}px)` },
      '93.3%': { transform: `translate(0, ${CELL}px)` },
      '95.633%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(0, 0)' },
    },
  },

  /* Box 4 — starts at col 0, row 2. Extended (3x) keyframe: plays its own
     original move, then continues as box 3's move, then box 1's move,
     returning home — seamless loop, no color pop at restart. */
  block4: {
    ...extendedBlock,
    top: `${CELL * 2}px`,
    left: '0',
    animationName: {
      '0%, 9.8%': { transform: 'translate(0, 0)' },
      '12.133%': { transform: `translate(${CELL}px, 0)` },
      '26.633%': { transform: `translate(${CELL}px, 0)` },
      '28.967%': { transform: `translate(${CELL}px, ${-CELL}px)` },
      '39.867%': { transform: `translate(${CELL}px, ${-CELL}px)` },
      '42.2%': { transform: `translate(${CELL}px, ${-CELL * 2}px)` },
      '53.433%': { transform: `translate(${CELL}px, ${-CELL * 2}px)` },
      '55.767%': { transform: `translate(0, ${-CELL * 2}px)` },
      '66.667%': { transform: `translate(0, ${-CELL * 2}px)` },
      '69%': { transform: `translate(0, ${-CELL}px)` },
      '83.5%': { transform: `translate(0, ${-CELL}px)` },
      '85.833%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(0, 0)' },
    },
  },

  /* Box 5 — starts at col 2, row 2 — moves up 1 cell, then back.
     Already returns to its own start within one base cycle — unchanged. */
  block5: {
    ...block,
    top: `${CELL * 2}px`,
    left: `${CELL * 2}px`,
    animationName: {
      '0%, 39.3%': { transform: 'translate(0, 0)' },
      '47.7%': { transform: `translate(0, ${-CELL}px)` },
      '89.7%': { transform: `translate(0, ${-CELL}px)` },
      '96.7%': { transform: 'translate(0, 0)' },
      '100%': { transform: 'translate(0, 0)' },
    },
  },
})
