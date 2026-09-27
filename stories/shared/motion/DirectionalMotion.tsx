/*
 * DirectionalMotion - A wrapper for sequential slide animations using Fluent UI Motion
 *
 * FLUENT UI MOTION LIMITATIONS:
 * Fluent UI Motion's PresenceGroup and createPresenceComponent are designed for parallel animations
 * (not sequential "exit-then-enter" transitions.
 * Fluent's PresenceGroup expects all children to exist simultaneously and manages their enter/exit states in parallel.
 * It doesn't have a concept of "wait for this to finish before starting that" - which is exactly what we needed for smooth content transitions.
 * Key limitations:
 *
 * 1. No built-in "mode=wait" equivalent (like Framer Motion) for sequential animations
 * 2. PresenceGroup creates multiple DOM elements simultaneously instead of proper sequencing
 * 3. Presence components don't handle content swapping during transitions
 * 4. Manual state orchestration required for exit → swap content → enter flow
 *
 * This component works around these limitations by:
 * - Using a single presence component with manual visible state control
 * - Managing content swapping in onMotionFinish callbacks
 * - Using useReducer to coordinate the complex state transitions
 *
 * For simple parallel animations, use Fluent's components directly.
 * For sequential transitions like this, manual orchestration is required.
 */

import { ReactNode, useEffect, useReducer } from 'react'
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion'

const FadeSlidePresence = createPresenceComponent({
  exit: [
    {
      keyframes: [{ transform: 'translateX(0px)' }, { transform: 'translateX(var(--exit-to))' }],
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveDecelerateMin,
    },
    {
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      delay: 100,
      duration: motionTokens.durationUltraFast,
      easing: motionTokens.curveLinear,
    },
  ],
  enter: [
    {
      keyframes: [{ transform: 'translateX(var(--enter-from))' }, { transform: 'translateX(0px)' }],
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveDecelerateMin,
    },
    {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: motionTokens.durationFaster,
      delay: 0, // delay = 0, starts at 150ms (end of exit animation)
      easing: motionTokens.curveLinear,
    },
  ],
})

export interface DirectionalMotionProps {
  children: ReactNode
  contentKey: string | number
  direction?: 'left' | 'right'
  onDirectionChange?: (currentKey: string | number, newKey: string | number) => 'left' | 'right'
  animationDistance?: number
}

interface MotionState {
  currentKey: string | number
  currentChildren: ReactNode
  direction: 'left' | 'right'
  isVisible: boolean
  pendingKey: string | number | null
  pendingChildren: ReactNode | null
  isExiting: boolean
}

type MotionAction =
  | {
      type: 'EXIT_START'
      key: string | number
      children: ReactNode
      direction: 'left' | 'right'
    }
  | { type: 'EXIT_COMPLETE' }

function motionReducer(state: MotionState, action: MotionAction): MotionState {
  switch (action.type) {
    case 'EXIT_START':
      return {
        ...state,
        pendingKey: action.key,
        pendingChildren: action.children,
        direction: action.direction,
        isVisible: false,
        isExiting: true,
      }
    case 'EXIT_COMPLETE':
      return {
        ...state,
        currentKey: state.pendingKey!,
        currentChildren: state.pendingChildren!,
        pendingKey: null,
        pendingChildren: null,
        isVisible: true,
        isExiting: false,
      }
    default:
      return state
  }
}

export const DirectionalMotion = ({
  children,
  contentKey,
  direction = 'right',
  onDirectionChange,
  animationDistance = 30,
}: DirectionalMotionProps) => {
  const [state, dispatch] = useReducer(motionReducer, {
    currentKey: contentKey,
    currentChildren: children,
    direction,
    isVisible: true,
    isExiting: false,
    pendingKey: null,
    pendingChildren: null,
  })

  useEffect(() => {
    if (contentKey !== state.currentKey) {
      const newDirection = onDirectionChange
        ? onDirectionChange(state.currentKey, contentKey)
        : direction

      dispatch({
        type: 'EXIT_START',
        key: contentKey,
        children,
        direction: newDirection,
      })
    }
  }, [contentKey, children, state.currentKey, onDirectionChange, direction])

  const handleMotionFinish = (_: unknown, data: { direction: 'enter' | 'exit' }) => {
    if (data.direction === 'exit' && state.pendingKey !== null) {
      dispatch({ type: 'EXIT_COMPLETE' })
    }
  }

  const enterOffset = state.direction === 'left' ? -animationDistance : animationDistance
  const exitOffset = state.direction === 'left' ? animationDistance : -animationDistance

  return (
    <div
      style={
        {
          width: 'inherit',
          '--enter-from': `${enterOffset}px`,
          '--exit-to': `${exitOffset}px`,
        } as React.CSSProperties
      }
    >
      <FadeSlidePresence visible={state.isVisible} onMotionFinish={handleMotionFinish}>
        <div style={{ opacity: state.isExiting ? undefined : 0 }}>{state.currentChildren}</div>
      </FadeSlidePresence>
    </div>
  )
}
