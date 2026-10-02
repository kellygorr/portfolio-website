import { makeStyles } from '@fluentui/react-components'

export const useStretchyCirclesStyles = makeStyles({
  svg: {
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  ball: {
    transformBox: 'fill-box',
    transformOrigin: 'center',
  },
  container: {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '70%': { transform: 'rotate(-90deg)' },

      '100%': { transform: 'rotate(0deg)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
    transform: 'rotate(0)',
  },
  left: {
    animationName: {
      '0%': { transform: 'translateX(0)' },
      '25%': { transform: 'translateX(calc(-1 * var(--distance)))' },
      '50%': { transform: 'translateX(calc(-1 * var(--distance)))' },
      '85%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(0)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
  },
  right: {
    animationName: {
      '0%': { transform: 'translateX(0)' },
      '25%': { transform: 'translateX(var(--distance))' },
      '50%': { transform: 'translateX(var(--distance))' },
      '85%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(0)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
  },
  bridge: {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    animationName: {
      '0%': { transform: 'scale(1, 1)' },
      '25%': { transform: 'scale(2.65, calc(1 + (var(--scale-bridge-height) - 1) * 0.25))' },
      '50%': { transform: 'scale(2.65, calc(1 + (var(--scale-bridge-height) - 1) * 0.625))' },
      '85%': { transform: 'scale(1, var(--scale-bridge-height))' },
      '100%': { transform: 'scale(1, 1)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
  },
})
