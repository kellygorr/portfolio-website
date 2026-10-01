# Input Position Demo — required behavior

Source of truth for how `InputPositionDemo` + `InputPositionAnimation` must
behave. Read this BEFORE making any change to either file. This spec came
directly from the project owner — do not deviate from it based on guesses
about what "looks better."

## The two states

- **Centered**: no conversation yet. Input sits vertically centered on the
  page. No top border, no background — fully blended into the page.
- **Anchored**: conversation started. Input docks to the bottom. Top border
  visible (accent color), background tint visible.

The Send/New-chat button itself animates up/down (icon rotate) on click —
that part is already correct and must be left alone.

## Replay/restart icon (Demo's "Click below to interact" badge)

Clicking the interactive demo's restart icon (NOT the footer's own Send
button — this is Demo/DemoSlide's separate restart control, which bumps
`replayToken` via `useDemoMotion()`) must start the forward motion
**immediately**. An earlier version waited a full `SEQUENCE_STEP_MS` (1.4s)
after the click before doing anything at all, which read as broken (nothing
visibly happens for over a second after clicking). Only the time spent
VIEWING the anchored state before auto-reverting should ever be delayed —
never the initial motion kicked off by the click itself.

## Exact required sequence

### Forward: centered → anchored (click Send)

1. Click Send.
2. The top border starts fading in (opacity, not a literal `border-color`
   transition — implemented as its own thin line with an opacity-only
   transition for compositor performance) **while** the box FLIP-travels to
   the anchored position. Border fade and position slide run **simultaneously**,
   both starting the instant Send is clicked — no delay on either direction.
3. Once the footer **settles** (the slide has fully finished), the background
   fades in. The background must NOT be visible, even partially, before the
   slide has completely finished.

### Reverse: anchored → centered (click Send again / "New chat")

1. Click Send (now showing as "New chat", rotated icon).
2. The background fades out **quickly** — this must complete (or at least
   be far enough along to read as "quickly gone") BEFORE the position slide
   is allowed to start.
3. **The chat input must not start moving until the background is hidden.**
   This is sequential, not parallel — there is a real delay between "background
   starts fading out" and "position slide starts."
4. Once the background is gone, the slide back to center starts, and the
   border fades out **during** this return slide (simultaneously with the
   position change, same as the border fade-in on the way out).
5. When the slide finishes: border fully gone, background fully gone, input
   centered. Back to the exact starting state.

## Implementation notes (why it's built this way)

- **Border** is driven directly by `isAnchored` in the exact same render that
  starts the FLIP slide (`<BorderLine $visible={isAnchored} />`), with a plain
  CSS `transition: opacity`. This is what makes it "ride along" with the
  slide for free in both directions, matching steps 2 (forward) and 4
  (reverse) above.
- **Background** is a SEPARATE piece of state (`backgroundVisible`), because
  its timing relationship to the slide is NOT symmetric with the border:
  - Forward: set `true` only in `onAnimationComplete` (after the slide has
    fully finished).
  - Reverse: set `false` immediately on click, with the actual
    `setIsAnchored(false)` (which starts the return slide) delayed by
    `BG_FADE_OUT_MS` via `setTimeout` — this is what makes the position
    change wait for the background to finish disappearing first.

## The one real landmine in this file: the zero-distance bug

`InputPositionAnimation`'s FLIP implementation has a `useIsomorphicLayoutEffect`
with **no dependency array** (intentional, so it can track layout from any
cause) that captures the footer's position on every render:
```
prevTopRef.current = curTopRef.current
curTopRef.current = ref.current.getBoundingClientRect().top
```
If a React state update causes a re-render **while the WAAPI slide animation
is still actively interpolating** (i.e. the CSS transform has NOT yet
returned to `none`), this effect re-measures the box's position mid-flight —
`getBoundingClientRect()` reflects the live, not-yet-arrived transform — and
that bogus position silently becomes the new baseline. The next time a slide
is triggered, `distance = prevTop - curTop` computes to (near) zero, and NO
animation plays at all — the box just snaps.

**This has broken multiple times during development of this feature.** The
rule that avoids it:

- A state change that happens the instant the user clicks, BEFORE any slide
  has started (nothing is animating yet) → safe.
- A state change that happens inside `onAnimationComplete` → safe, because by
  definition the slide has already fully finished by the time that callback
  fires (transform is back to `none`).
- A state change that happens inside `onAnimationStart`, or on any timer/event
  that can fire WHILE a slide is actively running → **unsafe**. Never do this.

Both `isAnchored` (driving border + position) and `backgroundVisible` (driving
the background) in the current implementation satisfy this rule. If you add
anything new that touches state around these transitions, verify it against
this rule before considering it done.

## How to test a change before declaring it fixed

1. Open `/page/copilot-interaction-systems` — **NOT** `copilot-motion-systems`,
   which does not resolve to this page. The actual slug is derived from the
   project's `header` field ("Copilot Interaction Systems").
2. Screenshots in this dev environment have multi-second, unpredictable
   latency — they are NOT reliable for inspecting a ~100-300ms animation
   frame-by-frame. Do not rely on them alone.
3. In the browser (via Playwright `page.evaluate` or devtools console), patch
   `Element.prototype.animate` to log every call's keyframes before
   interacting, so you can see real FLIP distances instead of guessing:
   ```js
   const orig = Element.prototype.animate;
   window.__log = [];
   Element.prototype.animate = function (kf, opts) {
     window.__log.push({ kf: JSON.parse(JSON.stringify(kf)), t: performance.now() });
     return orig.call(this, kf, opts);
   };
   ```
4. Click Send, wait for it to fully settle, click New chat, wait for it to
   fully settle, and repeat at least once more (verifies the bug above isn't
   silently corrupting the second/third transition). Confirm every click
   logged a non-zero `translateY` keyframe animation.
5. To verify the sequencing (border/background timing), poll both
   `getComputedStyle(borderEl).opacity` and
   `getComputedStyle(wrapperEl).transform` together at short intervals (e.g.
   every 30-40ms) through a full click-to-settle cycle, for BOTH directions.
   Confirm:
   - Forward: background opacity stays 0 until transform returns to `none`.
   - Reverse: transform does not start changing from `none` until background
     opacity has reached (or is very close to) 0.
