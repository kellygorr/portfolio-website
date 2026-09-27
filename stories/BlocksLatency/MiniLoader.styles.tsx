import { makeStyles, motionTokens } from '@fluentui/react-components'

/*
  Mini Loader — blocks roll into place one at a time, then roll back
  https://app.motionspec.io/spec/GhZREM9APcBmyQ7IGVzX
*/

const CELL = 80
const GAP = 25 // space between blocks = translation during roll
const DURATION = 'var(--mini-loader-duration, 5117ms)'
const EASE = motionTokens.curveAccelerateMin 
const block = {
  position: 'absolute' as const,
  width: `${CELL}px`,
  height: `${CELL}px`,
  backgroundColor: 'currentColor',
  willChange: 'transform, opacity',
  animationDuration: DURATION,
  animationIterationCount: 'infinite',
  animationTimingFunction: EASE,
  transformOrigin: 'left bottom',
}

export const MINI_LOADER_CELL = CELL

export const useMiniLoaderStyles = makeStyles({
  container: {
    position: 'relative',
    width: `${CELL * 4 + GAP * 3}px`,
    height: `${CELL}px`,
  },

  /* Block 1 wrapper — kick from left bottom */
  block1Kick: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: `${CELL}px`,
    height: `${CELL}px`,
    willChange: 'transform',
    transformOrigin: 'left bottom',
    animationDuration: DURATION,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '0.88%': { transform: 'rotate(-23.5deg)' },
      '1.75%': { transform: 'rotate(-30.3deg)' },
      '2.63%': { transform: 'rotate(-33.2deg)' },
      '3.5%': { transform: 'rotate(-34deg)' },
      '4.38%': { transform: 'rotate(-32.7deg)' },
      '5.25%': { transform: 'rotate(-27.6deg)' },
      '6.13%': { transform: 'rotate(-14.6deg)' },
      '7%, 100%': { transform: 'rotate(0deg)' },
    },
  },

  /* Block 1 inner — static square, kick handled by wrapper */
  block1: {
    position: 'relative' as const,
    width: `${CELL}px`,
    height: `${CELL}px`,
    backgroundColor: 'currentColor',
  },

  /* Block 2 — rolls in 10–20%, holds, rolls back 80–90% */
  block2: {
    ...block,
    top: '0',
    left: `${CELL + GAP}px`,
    animationName: {
      '0%, 10%': { opacity: 0, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '10.1%': { opacity: 1, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '20%': { opacity: 1, transform: 'translateX(0) rotate(0deg)' },
      '80%': { opacity: 1, transform: 'translateX(0) rotate(0deg)' },
      '89.9%': { opacity: 1, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '90%, 100%': { opacity: 0, transform: `translateX(${-GAP}px) rotate(-90deg)` },
    },
  },

  /* Block 3 — rolls in 20–30%, holds, rolls back 70–80% */
  block3: {
    ...block,
    top: '0',
    left: `${(CELL + GAP) * 2}px`,
    animationName: {
      '0%, 20%': { opacity: 0, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '20.1%': { opacity: 1, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '30%': { opacity: 1, transform: 'translateX(0) rotate(0deg)' },
      '70%': { opacity: 1, transform: 'translateX(0) rotate(0deg)' },
      '79.9%': { opacity: 1, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '80%, 100%': { opacity: 0, transform: `translateX(${-GAP}px) rotate(-90deg)` },
    },
  },

  /* Block 4 wrapper — positioned, handles the kick from right bottom */
  block4Kick: {
    position: 'absolute',
    top: '0',
    left: `${(CELL + GAP) * 3}px`,
    width: `${CELL}px`,
    height: `${CELL}px`,
    willChange: 'transform',
    transformOrigin: 'right bottom',
    animationDuration: DURATION,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationName: {
      '0%, 51%': { transform: 'rotate(0deg)' },
      '51.75%': { transform: 'rotate(28.3deg)' },
      '52.5%': { transform: 'rotate(36.5deg)' },
      '53.25%': { transform: 'rotate(40deg)' },
      '54%': { transform: 'rotate(41deg)' },
      '54.75%': { transform: 'rotate(39.4deg)' },
      '55.5%': { transform: 'rotate(33.3deg)' },
      '56.25%': { transform: 'rotate(17.6deg)' },
      '57%, 100%': { transform: 'rotate(0deg)' },
    },
  },

  /* Block 4 inner — rolls in 30–40%, holds, rolls back 60–70% */
  block4: {
    ...block,
    position: 'relative',
    top: '0',
    left: '0',
    animationName: {
      '0%, 30%': { opacity: 0, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '30.1%': { opacity: 1, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '40%': { opacity: 1, transform: 'translateX(0) rotate(0deg)' },
      '60%': { opacity: 1, transform: 'translateX(0) rotate(0deg)' },
      '69.9%': { opacity: 1, transform: `translateX(${-GAP}px) rotate(-90deg)` },
      '70%, 100%': { opacity: 0, transform: `translateX(${-GAP}px) rotate(-90deg)` },
    },
  },
})
