/*
 * LinePathMotionOvershootV2: OffscreenCanvas + Web Worker version of
 * the snake-around-rectangle motion.
 *
 * The worker owns the canvas and runs the animation loop independently
 * of the main thread. Main-thread jank (heavy React renders, scroll
 * thrash, long tasks) does not affect frame timing or smoothness.
 *
 * Trade-offs vs. the CSS mask approach (v1):
 *   + True stroke geometry — endpoints are perpendicular butt caps by
 *     definition, no diagonal-head artifact on long edges.
 *   + Immune to main-thread jank.
 *   + Matches Lottie's trim-path semantics 1:1 (dashLen + dashOffset).
 *   - One canvas per instance (cheap, but not nothing).
 *   - No CSS-based color theming via `currentColor` etc. (color must
 *     be passed through to the worker via postMessage).
 *
 * ─────────────────────────────────────────────────────────────────
 * NOTE: Storybook-driven worker recreation
 * ─────────────────────────────────────────────────────────────────
 * The useEffect below tears down and re-creates the worker on every
 * visual-prop change. This pattern exists primarily so Storybook
 * controls (`duration`, `pauseMs`, `width`, `height`, etc.) can
 * re-init the animation as the user drags sliders.
 *
 * In production usage where these props are fixed, the worker would
 * init exactly once on mount and clean up on unmount — the broad
 * dependency array on the useEffect is what makes the controls feel
 * live in Storybook.
 *
 * Look for `[STORYBOOK]` markers below.
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'

interface LinePathMotionOvershootV2Props {
  width?: number
  height?: number
  duration?: number
  strokeWidth?: number
  color?: string
  /** Tail feather length in pixels. */
  feather?: number
  /** Pause between sweeps in ms. */
  pauseMs?: number
  /** Optional head easing override as cubic-bezier control points. */
  headTiming?: [number, number, number, number]
  /** Optional tail easing override as cubic-bezier control points. */
  tailTiming?: [number, number, number, number]
  /** Optional timeline override for when tail starts moving (0..1). */
  tailStartFraction?: number
  /** Optional timeline override for when head reaches its end (0..1). */
  headEndFraction?: number
  /** Optional timeline override for when tail reaches its end (0..1). */
  tailEndFraction?: number
}

const DEFAULT_COLOR = '#5940ff'
const CORNER_RADIUS_RATIO = 0.2

export const LinePathMotionOvershootV2 = ({
  width = 240,
  height = 60,
  duration = 1750,
  strokeWidth = 2,
  color = DEFAULT_COLOR,
  feather = 3,
  pauseMs = 1000,
  headTiming,
  tailTiming,
  tailStartFraction,
  headEndFraction,
  tailEndFraction,
}: LinePathMotionOvershootV2Props = {}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const teardownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const buildConfig = () => {
    const cornerRadius = Math.min(width, height) * CORNER_RADIUS_RATIO
    return {
      dpr: self.devicePixelRatio || 1,
      width,
      height,
      cornerRadius,
      strokeWidth,
      color,
      feather,
      durationMs: duration,
      pauseMs,
      headTiming,
      tailTiming,
      tailStartFraction,
      headEndFraction,
      tailEndFraction,
    }
  }

  useEffect(() => {
    // In React StrictMode, effects mount/cleanup/mount in development.
    // Defer teardown so the immediate re-mount can cancel it and reuse
    // the already-transferred canvas instead of transferring twice.
    if (teardownTimerRef.current) {
      clearTimeout(teardownTimerRef.current)
      teardownTimerRef.current = null
    }

    if (workerRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const offscreen = canvas.transferControlToOffscreen()
    const worker = new Worker(new URL('./LinePathMotionOvershootV2.worker.ts', import.meta.url), {
      type: 'module',
    })
    workerRef.current = worker

    worker.postMessage(
      {
        type: 'init',
        canvas: offscreen,
        ...buildConfig(),
      },
      [offscreen]
    )

    return () => {
      teardownTimerRef.current = setTimeout(() => {
        worker.terminate()
        if (workerRef.current === worker) {
          workerRef.current = null
        }
      }, 0)
    }
  }, [])

  useEffect(() => {
    if (!workerRef.current) return
    workerRef.current.postMessage({
      type: 'update',
      ...buildConfig(),
    })
  }, [
    width,
    height,
    duration,
    strokeWidth,
    color,
    feather,
    pauseMs,
    headTiming,
    tailTiming,
    tailStartFraction,
    headEndFraction,
    tailEndFraction,
  ])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        display: 'block',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}

export type { LinePathMotionOvershootV2Props }
