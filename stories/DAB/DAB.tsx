import { useEffect, useRef, useState } from 'react'
import { Rocket24Filled } from '@fluentui/react-icons'
import './DAB.css'

export interface DABProps {
  size?: number
  duration?: number
  strokeWidth?: number
  cornerRadius?: number
  backgroundColor?: string
  /** Color of the center rocket icon. Defaults to a light neutral. */
  iconColor?: string
  /** First color of the partial-arc gradient sweep (::before layer,
   *  visible in both Intro and Thinking modes). */
  gradientColor1?: string
  /** Second color of the partial-arc gradient sweep (::before layer). */
  gradientColor2?: string
  /** First color of the full-ring gradient (::after layer, only visible
   *  during Intro). Falls back to gradientColor1 if omitted. */
  gradientColor3?: string
  /** Second color of the full-ring gradient (::after layer, only
   *  visible during Intro). Falls back to gradientColor2 if omitted. */
  gradientColor4?: string
  /** Third color of the full-ring gradient (::after layer). Falls back
   *  to gradientColor3 if omitted — set for a richer, 4-color ring. */
  gradientColor5?: string
  /** Fourth color of the full-ring gradient (::after layer). Falls back
   *  to gradientColor4 if omitted. */
  gradientColor6?: string
  /** When true, shows a continuous spinning animation */
  isThinking?: boolean
  /** When false, renders a static (non-animated) frame */
  play?: boolean
  /** Called when the intro animation completes (after fade out), or when the thinking exit fade-out completes */
  onAnimationEnd?: () => void
}

type RenderMode = 'none' | 'intro' | 'thinking' | 'thinking-exit'

/** Dynamic Action Bar — GPU-accelerated rotating gradient border. See DAB.css for the implementation approach. */
export const DAB = ({
  size = 44,
  duration = 3000,
  strokeWidth = 2,
  cornerRadius = 16,
  backgroundColor = '#fff',
  iconColor,
  gradientColor1,
  gradientColor2,
  gradientColor3,
  gradientColor4,
  gradientColor5,
  gradientColor6,
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
    // 'dab-fade-out' signals the thinking-exit fade completing.
    // 'dab-partial-gradient-fade' signals the intro's ::before layer
    // completing its own fade-to-0 (the intro no longer runs a separate
    // trailing fade-out — its whole-layer opacity keyframes already end
    // at 0 by the end of --dab-duration).
    if (e.animationName !== 'dab-fade-out' && e.animationName !== 'dab-partial-gradient-fade') return
    if (renderMode === 'thinking-exit') {
      setRenderMode('none')
    }
    onAnimationEnd?.()
  }

  const borderClass = renderMode === 'none' ? null : `dab-border dab-${renderMode}`

  const logoSize = Math.round(size * 0.5)

  const gradientVars = {
    ...(gradientColor1 ? { '--dab-color-1': gradientColor1 } : {}),
    ...(gradientColor2 ? { '--dab-color-2': gradientColor2 } : {}),
    // Full-ring (::after, intro-only) layer falls back to the partial
    // arc's colors if not explicitly set, so passing only 1/2 still
    // works exactly as before.
    ...(gradientColor3 ?? gradientColor1
      ? { '--dab-color-3': gradientColor3 ?? gradientColor1 }
      : {}),
    ...(gradientColor4 ?? gradientColor2
      ? { '--dab-color-4': gradientColor4 ?? gradientColor2 }
      : {}),
    // Additional full-ring colors (3rd/4th stops) — fall back to
    // gradientColor3/4 respectively so a 2-color ring still works if
    // these are omitted.
    ...(gradientColor5 ?? gradientColor3 ?? gradientColor1
      ? { '--dab-color-5': gradientColor5 ?? gradientColor3 ?? gradientColor1 }
      : {}),
    ...(gradientColor6 ?? gradientColor4 ?? gradientColor2
      ? { '--dab-color-6': gradientColor6 ?? gradientColor4 ?? gradientColor2 }
      : {}),
  }

  return (
    <div
      className="dab-container"
      style={
        {
          width: size,
          height: size,
          '--dab-duration': `${duration}ms`,
          ...gradientVars,
        } as React.CSSProperties
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

      <Rocket24Filled
        className="dab-logo"
        style={{ width: logoSize, height: logoSize, color: iconColor }}
        aria-hidden="true"
      />
    </div>
  )
}
