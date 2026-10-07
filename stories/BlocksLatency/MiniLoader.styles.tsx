import { makeStyles } from '@fluentui/react-components'
import { curves } from '../../src/styles/motionTokens'

/*
  Mini Loader — one block rolling into place, then rolling back
  https://app.motionspec.io/spec/GhZREM9APcBmyQ7IGVzX

  This is a SINGLE continuously-rolling element (not a handoff between 4
  separate static elements) — ported directly from the isolated,
  independently-verified Roll Test story (BlocksLatency/RollTest.*).
  See that file's comments for the full derivation.

  Timing matches the ORIGINAL 4-element MiniLoader animation's
  percentages EXACTLY: kick 0-7%, roll1 10-20%, roll2 20-30%, roll3
  30-40% (rolls are back-to-back, no pause between them — only ONE long
  hold happens, at the far end), long hold 40-51%, arrival wobble 51-57%,
  short hold 57-60%, rollback3 60-70%, rollback2 70-80%, rollback1
  80-90%, hold at start 90-100%.

  Roll geometry verified with exact corner-position math before writing
  this: a SINGLE fixed pivot/transform-origin CANNOT keep a square glued
  to the floor line across more than ~1 hop of accumulated rotation (the
  bounding box provably drifts below the floor line at the 2nd hop).
  Real rolling requires the pivot's effective anchor to advance to a new
  contact point each quarter-turn — reproduced here by animating `left`
  in lockstep with `transform`: `left` steps to a new anchor at each hop
  boundary, and `transform` resets to the IDENTICAL -GAP/-90deg -> 0/0deg
  sweep relative to that new anchor every time (forward), or the
  MIRRORED +GAP/+90deg -> 0/0deg sweep with transformOrigin flipped to
  'right bottom' (backward). Verified via corner math that every kickoff
  pose exactly equals the immediately-preceding rest pose's bounding box
  — zero discontinuity anywhere across the whole cycle. The origin only
  flips once, during the wobble segment (while the box is at rest,
  theta=0) — the only visually-safe instant to change pivot corner.

  Every hold uses a DISTINCT epsilon-offset end percentage rather than
  reusing the exact same number as the following segment's start — two
  different keyframe declarations sharing one literal percentage caused
  ambiguous/incorrect interpolation (verified: the browser blended
  toward the WRONG keyframe during what should have been a static hold).
  Never repeat a bare percentage across two different rule blocks. Every
  "visually identical but numerically different" transition (a rest
  pose immediately followed by the next segment's kickoff pose) uses
  `steps(1, jump-end)` so it snaps instantly instead of raw-interpolating
  through a brief, visible blended flash.
*/

const CELL = 'var(--mini-loader-cell-size, 80px)'
const GAP = 'var(--mini-loader-gap-size, 25px)' // space between blocks = translation during roll
const NEGATIVE_GAP = 'calc(var(--mini-loader-gap-size, 25px) * -1)'
const SLOT_1 = 'calc(var(--mini-loader-cell-size, 80px) + var(--mini-loader-gap-size, 25px))'
const SLOT_2 = 'calc((var(--mini-loader-cell-size, 80px) + var(--mini-loader-gap-size, 25px)) * 2)'
const SLOT_3 = 'calc((var(--mini-loader-cell-size, 80px) + var(--mini-loader-gap-size, 25px)) * 3)'
const DURATION = 'var(--mini-loader-duration, 5117ms)'
const EASE = curves.accelerateMin
const STEP = 'steps(1, jump-end)'

const ROLLER = 'var(--roller-color, currentColor)'
const TRACK1 = 'var(--track-color-1, currentColor)'
const TRACK2 = 'var(--track-color-2, currentColor)'
const TRACK3 = 'var(--track-color-3, currentColor)'

export const MINI_LOADER_CELL = 80
export const MINI_LOADER_GAP = 25

export const useMiniLoaderStyles = makeStyles({
  container: {
    position: 'relative',
    width: 'calc(var(--mini-loader-cell-size, 80px) * 4 + var(--mini-loader-gap-size, 25px) * 3)',
    height: CELL,
  },

  /* The single rolling block. Always the roller color — it's the one
     element that's ever actively moving/kicking. */
  block: {
    position: 'absolute',
    top: '0',
    width: CELL,
    height: CELL,
    backgroundColor: ROLLER,
    zIndex: 2,
    willChange: 'left, transform',
    animationDuration: DURATION,
    animationIterationCount: 'infinite',
    animationTimingFunction: EASE,
    animationName: {
      // kick: 0% -> 7%
      '0%': { left: '0', transform: 'translateX(0) rotate(0deg)', transformOrigin: 'left bottom', animationTimingFunction: 'linear' },
      '0.88%': { left: '0', transform: 'translateX(0) rotate(-23.5deg)', transformOrigin: 'left bottom' },
      '1.75%': { left: '0', transform: 'translateX(0) rotate(-30.3deg)', transformOrigin: 'left bottom' },
      '2.63%': { left: '0', transform: 'translateX(0) rotate(-33.2deg)', transformOrigin: 'left bottom' },
      '3.5%': { left: '0', transform: 'translateX(0) rotate(-34deg)', transformOrigin: 'left bottom' },
      '4.38%': { left: '0', transform: 'translateX(0) rotate(-32.7deg)', transformOrigin: 'left bottom' },
      '5.25%': { left: '0', transform: 'translateX(0) rotate(-27.6deg)', transformOrigin: 'left bottom' },
      '6.13%': { left: '0', transform: 'translateX(0) rotate(-14.6deg)', transformOrigin: 'left bottom' },
      // hold: 7% -> 9.9% (settle after kick, before first roll)
      '7%, 9.9%': {
        left: '0',
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'left bottom',
        animationTimingFunction: STEP,
      },
      // roll1: 10% -> 19.9% (kickoff at 10%, rest at 19.9%)
      '10%': {
        left: SLOT_1,
        transform: `translateX(${NEGATIVE_GAP}) rotate(-90deg)`,
        transformOrigin: 'left bottom',
        animationTimingFunction: EASE,
      },
      '19.9%': {
        left: SLOT_1,
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'left bottom',
        animationTimingFunction: STEP,
      },
      // roll2: 20% -> 29.9% (back-to-back, no hold between rolls)
      '20%': {
        left: SLOT_2,
        transform: `translateX(${NEGATIVE_GAP}) rotate(-90deg)`,
        transformOrigin: 'left bottom',
        animationTimingFunction: EASE,
      },
      '29.9%': {
        left: SLOT_2,
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'left bottom',
        animationTimingFunction: STEP,
      },
      // roll3: 30% -> 39.9% (back-to-back, no hold between rolls)
      '30%': {
        left: SLOT_3,
        transform: `translateX(${NEGATIVE_GAP}) rotate(-90deg)`,
        transformOrigin: 'left bottom',
        animationTimingFunction: EASE,
      },
      // long hold: 40% -> 50.9% (settle before arrival wobble at 51%)
      '40%, 50.9%': {
        left: SLOT_3,
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'left bottom',
      },
      // wobble: 51% -> 57% (arrival kick, mirrors initial kick, pivots
      // on the corner the reverse roll will use next)
      '51%': {
        left: SLOT_3,
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'right bottom',
        animationTimingFunction: 'linear',
      },
      '51.75%': { transform: 'translateX(0) rotate(28.3deg)', transformOrigin: 'right bottom' },
      '52.5%': { transform: 'translateX(0) rotate(36.5deg)', transformOrigin: 'right bottom' },
      '53.25%': { transform: 'translateX(0) rotate(40deg)', transformOrigin: 'right bottom' },
      '54%': { transform: 'translateX(0) rotate(41deg)', transformOrigin: 'right bottom' },
      '54.75%': { transform: 'translateX(0) rotate(39.4deg)', transformOrigin: 'right bottom' },
      '55.5%': { transform: 'translateX(0) rotate(33.3deg)', transformOrigin: 'right bottom' },
      '56.25%': { transform: 'translateX(0) rotate(17.6deg)', transformOrigin: 'right bottom' },
      // short hold: 57% -> 59.9% (settle after wobble, before rollback starts)
      '57%, 59.9%': {
        left: SLOT_3,
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'right bottom',
        animationTimingFunction: STEP,
      },
      // rollback3: 60% -> 69.9%
      '60%': {
        left: SLOT_2,
        transform: `translateX(${GAP}) rotate(90deg)`,
        transformOrigin: 'right bottom',
        animationTimingFunction: EASE,
      },
      '69.9%': {
        left: SLOT_2,
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'right bottom',
        animationTimingFunction: STEP,
      },
      // rollback2: 70% -> 79.9% (back-to-back)
      '70%': {
        left: SLOT_1,
        transform: `translateX(${GAP}) rotate(90deg)`,
        transformOrigin: 'right bottom',
        animationTimingFunction: EASE,
      },
      '79.9%': {
        left: SLOT_1,
        transform: 'translateX(0) rotate(0deg)',
        transformOrigin: 'right bottom',
        animationTimingFunction: STEP,
      },
      // rollback1: 80% -> 90% (back-to-back)
      '80%': {
        left: '0',
        transform: `translateX(${GAP}) rotate(90deg)`,
        transformOrigin: 'right bottom',
        animationTimingFunction: EASE,
      },
      // hold at start: 90% -> 100%
      '90%, 100%': { left: '0', transform: 'translateX(0) rotate(0deg)', transformOrigin: 'right bottom' },
    },
  },

  /* Dropped/picked-up box at slot 0 (the start/kick position) — appears
     the instant the roller leaves on its first roll (10%, roll1's
     kickoff — the roller is no longer covering this slot from that
     point on), disappears the instant the roller returns to rest here
     at the very end (90%, rollback1's landing). */
  dropped0: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: CELL,
    height: CELL,
    backgroundColor: TRACK1,
    zIndex: 1,
    animationDuration: DURATION,
    animationIterationCount: 'infinite',
    animationTimingFunction: STEP,
    animationName: {
      '0%, 9.9%': { opacity: 0 },
      '10%, 89.9%': { opacity: 1 },
      '90%, 100%': { opacity: 0 },
    },
  },

  /* Dropped/picked-up box at slot 1 — appears the instant the roller
     reaches its rest position at this slot (19.9%, matching roll1's
     landing), disappears the instant the roller returns to rest at this
     same slot on the way back (79.9%, matching rollback2's landing).
     Always behind the roller (lower z-index) so it never visually
     overlaps the roller mid-transition. */
  dropped1: {
    position: 'absolute',
    top: '0',
    left: SLOT_1,
    width: CELL,
    height: CELL,
    backgroundColor: TRACK2,
    zIndex: 1,
    animationDuration: DURATION,
    animationIterationCount: 'infinite',
    animationTimingFunction: STEP,
    animationName: {
      '0%, 19.8%': { opacity: 0 },
      '19.9%, 79.8%': { opacity: 1 },
      '79.9%, 100%': { opacity: 0 },
    },
  },

  /* Dropped/picked-up box at slot 2 — same technique: appears when the
     roller lands at rest here (29.9%, roll2's landing), disappears when
     the roller returns to rest here on the way back (69.9%, rollback3's
     landing). */
  dropped2: {
    position: 'absolute',
    top: '0',
    left: SLOT_2,
    width: CELL,
    height: CELL,
    backgroundColor: TRACK3,
    zIndex: 1,
    animationDuration: DURATION,
    animationIterationCount: 'infinite',
    animationTimingFunction: STEP,
    animationName: {
      '0%, 29.8%': { opacity: 0 },
      '29.9%, 69.8%': { opacity: 1 },
      '69.9%, 100%': { opacity: 0 },
    },
  },
})
