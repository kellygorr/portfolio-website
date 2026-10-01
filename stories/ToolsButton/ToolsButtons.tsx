import {
  Button,
  createPresenceComponent,
  mergeClasses,
  tokens,
} from '@fluentui/react-components'
import { bundleIcon, Options24Filled, Options24Regular } from '@fluentui/react-icons'
import { useToolsButtonStyles } from './ToolsButton.styles'
import { durationsMs } from '../../src/styles/motionTokens'
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
  /** Background color for the Expand/Collapse toggle button. */
  toggleBg?: string
  /** Background color for the Tools button on hover/active. */
  bgHoverColor?: string
  /** Icon color for the Tools button on hover/active. */
  iconHoverColor?: string
}

const TriggerButtonIcon = bundleIcon(Options24Filled, Options24Regular)

export const ToolsButton = ({
  widthTransitionDuration = durationsMs.faster + 'ms',
  textFadeInDuration = durationsMs.ultraFast,
  textFadeOutDuration = durationsMs.ultraFast,
  toggleBg,
  bgHoverColor,
  iconHoverColor,
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
    <div
      className={mergeClasses(styles.wrapper)}
      style={
        {
          '--tb-toggle-bg': toggleBg,
          '--tb-bg-hover': bgHoverColor,
          '--tb-icon-hover': iconHoverColor,
        } as React.CSSProperties
      }
    >
      <div style={{ height: '42px', display: 'flex', alignItems: 'center' }}>
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
            height: minimizeButton ? '40px' : undefined,
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
      <button className={styles.toggleButton} onClick={handleClick}>
        {minimizeButton ? 'Expand' : 'Collapse'}
      </button>
    </div>
  )
}
