import { createContext, useContext } from 'react'

/**
 * Shared motion state for a single Demo instance. Demo (Demo.tsx)
 * provides this; any demo content nested inside it (in project data
 * files) can read it via useDemoMotion() to gate its OWN
 * JavaScript-driven animation logic (timers, state machines, etc.).
 *
 * `stopped` — true while a non-interactive (autoplay) demo's StopButton
 * is in its stopped state. Demo content should read this and decide how
 * to pause or stop its own animation. Always false for `interactive`
 * demos (they don't have a stopped state).
 *
 * `replayToken` — increments every time a restart is requested (a
 * manual ReplayButton click, or Demo's own auto-run-once-on-scroll-
 * into-view for `interactive` demos). Demo content stays mounted
 * continuously across replays (Demo does NOT remount it via `key` for
 * the interactive path — see Demo.tsx's docstring for why), so demo
 * content with its own JS-driven sequencing (e.g. InputPositionDemo's
 * click-Send-wait-click-New-chat sequence, or GroundingMenuDemo's
 * tab-cycling) must watch for `replayToken` CHANGING via a useEffect —
 * comparing against a ref that captures the value it has already run
 * for (not just truthiness, since the exact same replay can be
 * requested again) — and then drive its own state setters directly to
 * play out the sequence. A component that instead skips its "first
 * run" via a mount-time ref/flag would never actually run, since it's
 * never remounted in the first place — every replay is a plain
 * dependency-array change on an already-mounted component, not a fresh
 * mount.
 *
 * `onReplayStateChange` — call with `false` once a scripted sequence
 * actually finishes, so ReplayButton can stop spinning and settle
 * before Demo's own fallback timeout. Demos that don't implement a
 * scripted sequence can simply ignore this.
 */
export interface DemoMotionState {
	stopped: boolean
	replayToken: number
	onReplayStateChange?: (running: boolean) => void
}

export const DemoMotionContext = createContext<DemoMotionState>({ stopped: false, replayToken: 0 })

export const useDemoMotion = (): DemoMotionState => useContext(DemoMotionContext)
