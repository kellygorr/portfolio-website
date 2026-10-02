import { makeStyles } from '@fluentui/react-components'

export const useStretchyCirclesStyles = makeStyles({
  // Transparent, not an opaque fill — unlike many "CSS goo" tutorials
  // that put a solid background behind the blurred/contrast-boosted
  // shapes, this one works fine without it: `contrast()` only touches
  // RGB channels (per the CSS Filter Effects spec, alpha is
  // untouched), so the blurred circles' own soft ALPHA falloff at
  // their edges is what the browser's rendering pipeline uses to snap
  // them together — no backdrop needed for that part of the effect.
  // An earlier version gave this an opaque `backgroundColor` (then a
  // styled white "card" wrapper) to make that fill look intentional,
  // but `contrast(13)` crunches almost any light/near-white color to
  // literal `#ffffff` regardless of what's passed in — so it always
  // rendered as a plain white box that visibly mismatched whatever
  // (non-white) color sat behind the demo. Transparent avoids that
  // entirely: no box, no mismatch, same stretch/merge motion as the
  // SVG (V1) version, which also has no visible background of its own.
  wrapper: {
    position: 'relative',
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    transformOrigin: 'center',
    animationName: {
      '0%': { transform: 'rotate(0deg)' },
      '70%': { transform: 'rotate(-90deg)' },
      '100%': { transform: 'rotate(0deg)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
  },
  obj1: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#000',
    animationName: {
      '0%': { transform: 'translate3d(-50%, -50%, 0)' },
      '25%': { transform: 'translate3d(calc(-50% + var(--left-offset, -12.5px)), -50%, 0)' },
      '50%': { transform: 'translate3d(calc(-50% + var(--left-offset, -12.5px)), -50%, 0)' },
      '85%': { transform: 'translate3d(-50%, -50%, 0)' },
      '100%': { transform: 'translate3d(-50%, -50%, 0)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
  },
  obj2: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#000',
    animationName: {
      '0%': { transform: 'translate3d(-50%, -50%, 0)' },
      '25%': { transform: 'translate3d(calc(-50% + var(--right-offset, 12.5px)), -50%, 0)' },
      '50%': { transform: 'translate3d(calc(-50% + var(--right-offset, 12.5px)), -50%, 0)' },
      '85%': { transform: 'translate3d(-50%, -50%, 0)' },
      '100%': { transform: 'translate3d(-50%, -50%, 0)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
  },
  bridge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000',
    borderRadius: '9999px',
    transformOrigin: 'center',
    animationName: {
      '0%': { transform: 'translate(-50%, -50%) scale(1, 1)' },
      '25%': { transform: 'translate(-50%, -50%) scale(2.65, calc(1 + (var(--scale-bridge-height) - 1) * 0.25))' },
      '50%': { transform: 'translate(-50%, -50%) scale(2.65, calc(1 + (var(--scale-bridge-height) - 1) * 0.625))' },
      '85%': { transform: 'translate(-50%, -50%) scale(1, var(--scale-bridge-height))' },
      '100%': { transform: 'translate(-50%, -50%) scale(1, 1)' },
    },
    animationDuration: 'var(--duration)',
    animationTimingFunction: 'cubic-bezier(0.668, 0, 0.401, 1)',
    animationIterationCount: 'infinite',
  },
})
