import {
  Button,
  createPresenceComponent,
  mergeClasses,
  motionTokens,
  tokens,
} from '@fluentui/react-components'
import { bundleIcon, Options24Filled, Options24Regular } from '@fluentui/react-icons'
import { useToolsButtonStyles } from './ToolsButton.styles'
import { useState, useEffect, useRef, useMemo } from 'react'

interface ToolsButtonProps {
  /** Duration for width transition animation in ms (e.g. "500ms" or "1s") */
  widthTransitionDuration?: string
  /** Duration for text fade in animation in ms */
  textFadeInDuration?: number
  /** Duration for text fade out animation in ms */
  textFadeOutDuration?: number
  /** Button text content */
  buttonText?: string
}

const TriggerButtonIcon = bundleIcon(Options24Filled, Options24Regular)

export const ToolsButton = ({
  widthTransitionDuration = motionTokens.durationFaster + 'ms',
  textFadeInDuration = motionTokens.durationUltraFast,
  textFadeOutDuration = motionTokens.durationUltraFast,
}: ToolsButtonProps = {}) => {
  // Recreate TextFade whenever durations change
  const TextFade = useMemo(
    () =>
      createPresenceComponent({
        enter: {
          keyframes: [{ opacity: 0 }, { opacity: 1 }],
          duration: textFadeInDuration,
          easing: 'linear',
          delay: (() => {
            const value = parseFloat(widthTransitionDuration)
            const unit = widthTransitionDuration.replace(value.toString(), '')
            return unit === 's' ? value * 1000 : value
          })(),
        },
        exit: {
          keyframes: [{ opacity: 1 }, { opacity: 0 }],
          duration: textFadeOutDuration,
          easing: 'linear',
        },
      }),
    [textFadeInDuration, textFadeOutDuration, widthTransitionDuration]
  )

  const styles = useToolsButtonStyles()
  const [minimizeButton, setMinimizeButton] = useState(false)
  const [expandedWidth, setExpandedWidth] = useState<number | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setMinimizeButton(!minimizeButton)
  }

  useEffect(() => {
    // Measure the button's natural width when it first renders (expanded state)
    if (buttonRef.current && expandedWidth === null) {
      const naturalWidth = buttonRef.current.offsetWidth
      setExpandedWidth(naturalWidth)
    }
  }, [expandedWidth])

  return (
    <div className={mergeClasses(styles.wrapper)}>
      <div>
        <Button
          ref={buttonRef}
          className={mergeClasses(styles.root)}
          size="large"
          icon={<TriggerButtonIcon />}
          appearance="subtle"
          shape={minimizeButton ? 'circular' : 'rounded'}
          onClick={handleClick}
          style={{
            width: minimizeButton ? '40px' : expandedWidth ? `${expandedWidth}px` : 'auto',
            transition: minimizeButton
              ? `width ${widthTransitionDuration} linear ${textFadeOutDuration}ms` // Delay when collapsing
              : `width ${widthTransitionDuration} linear`, // No delay when expanding
            borderRadius: minimizeButton ? tokens.borderRadiusCircular : '12px', // Match Figma border radius
          }}
        >
          <TextFade visible={!minimizeButton} unmountOnExit>
            <span style={{ opacity: 0 }}>Tools</span>
          </TextFade>
        </Button>
      </div>
      <button onClick={handleClick}>{minimizeButton ? 'Expand' : 'Collapse'}</button>
    </div>
  )
}
