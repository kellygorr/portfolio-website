import { useEffect, useRef, useState } from 'react'
import './DAB.css'

export interface DABProps {
  size?: number
  duration?: number
  strokeWidth?: number
  cornerRadius?: number
  backgroundColor?: string
  /** When true, shows a continuous spinning animation */
  isThinking?: boolean
  /** When false, renders a static (non-animated) frame */
  play?: boolean
  /** Called when the intro animation completes (after fade out), or when the thinking exit fade-out completes */
  onAnimationEnd?: () => void
}

type RenderMode = 'none' | 'intro' | 'thinking' | 'thinking-exit'

/**
 * DAB: GPU-Accelerated Gradient Border Animation
 *
 * Uses transform: rotate() on pseudo-elements (instead of animating the
 * conic-gradient()'s angle directly) so the rotation runs on the GPU
 * compositor thread instead of the main thread.
 *
 * - Gradient angle is STATIC (from 145deg)
 * - Pseudo-elements are oversized (150%) to avoid corner clipping
 * - transform: rotate() animates the entire pseudo-element
 * - will-change: transform promotes to compositor layer
 * - Both ends of the arc feather to transparent for a soft comet-trail look
 * - Stopping "thinking" fades out (still rotating) instead of vanishing abruptly
 */
export const DAB = ({
  size = 44,
  duration = 3000,
  strokeWidth = 2,
  cornerRadius = 16,
  backgroundColor = '#fff',
  isThinking = false,
  play = true,
  onAnimationEnd,
}: DABProps = {}) => {
  const [renderMode, setRenderMode] = useState<RenderMode>(play ? (isThinking ? 'thinking' : 'intro') : 'none')
  const wasThinkingRef = useRef(isThinking)

  useEffect(() => {
    if (play) {
      setRenderMode(isThinking ? 'thinking' : 'intro')
    } else if (wasThinkingRef.current) {
      // Was actively "thinking" and got stopped: fade out gracefully
      // (still spinning) instead of vanishing abruptly.
      setRenderMode('thinking-exit')
    } else {
      setRenderMode('none')
    }
    wasThinkingRef.current = isThinking
  }, [play, isThinking])

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName !== 'dab-fade-out') return
    if (renderMode === 'thinking-exit') {
      setRenderMode('none')
    }
    onAnimationEnd?.()
  }

  const borderClass = renderMode === 'none' ? null : `dab-border dab-${renderMode}`

  const logoSize = Math.round(size * 0.5)

  return (
    <div
      className="dab-container"
      style={
        { width: size, height: size, '--dab-duration': `${duration}ms` } as React.CSSProperties
      }
      aria-label="Animated stroke"
    >
      {backgroundColor && (
        <div className="dab-background" style={{ borderRadius: cornerRadius, backgroundColor }} />
      )}

      {borderClass && (
        <div
          className={borderClass}
          style={{ padding: strokeWidth, borderRadius: cornerRadius }}
          onAnimationEnd={handleAnimationEnd}
        />
      )}

      <svg
        className="dab-logo"
        width={logoSize}
        height={logoSize}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="dab-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          	<stop offset="0%" stopColor="#0078d4" />
          	<stop offset="30%" stopColor="#2db4ff" />
          	<stop offset="60%" stopColor="#d660ff" />
          	<stop offset="100%" stopColor="#fea874" />
          </linearGradient>
        </defs>
        <path
          fill="url(#dab-logo-gradient)"
          d="M12 0c0 5.523 1.477 7 7 7-5.523 0-7 1.477-7 7 0-5.523-1.477-7-7-7 5.523 0 7-1.477 7-7z
          	M19.5 15c0 2.485.665 3.15 3.15 3.15-2.485 0-3.15.665-3.15 3.15
          	0-2.485-.665-3.15-3.15-3.15 2.485 0 3.15-.665 3.15-3.15z
          	M5 16c0 2.21.79 3 3 3-2.21 0-3 .79-3 3 0-2.21-.79-3-3-3 2.21 0 3-.79 3-3z"
        />
      </svg>
    </div>
  )
}
