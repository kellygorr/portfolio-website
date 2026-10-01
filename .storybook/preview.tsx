import type { Preview } from '@storybook/react-vite'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import React from 'react'
import { resolveMotionTheme } from '../stories/shared/motionTheme'
import { darkestColor } from '../src/styles/motionPalettes'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
	decorators: [
		(Story, context) => {
			// Match the badge's background to the current story's own last
			// (darkest) motion-palette token, if it has a motionTheme arg —
			// falls back to the original translucent black for stories
			// with no motion theme selected. Text uses the palette's own
			// `text` token (white for all 9 palettes today) so it always
			// reads legibly against that background.
			//
			// Stories whose own canvas background IS a palette's dark
			// background (full-bleed dark-mode demos, e.g. Motion Tokens/
			// Durations and Easings) opt in via
			// `parameters.motionBadgeStyle: 'onDark'` — otherwise the
			// badge would use the same dark pairing as the page behind it
			// and blend in. In that case the pairing inverts: badge uses
			// the palette's own light background token with `textDark`
			// (the same hand-tuned dark tone used as the page background
			// itself) so it still stands out.
			const motionTheme = context.args?.motionTheme as string | undefined
			const palette = motionTheme ? resolveMotionTheme(motionTheme) : undefined
			const onDark = context.parameters.motionBadgeStyle === 'onDark'
			const badgeBackground = onDark ? (palette?.background ?? '#fff') : palette ? darkestColor(palette) : 'rgba(0, 0, 0, 0.65)'
			const badgeText = onDark ? (palette?.textDark ?? '#000') : palette ? palette.text : '#fff'
			return (
				<FluentProvider theme={webLightTheme} style={{ background: 'transparent' }}>
					{!context.parameters.hideRecreatedBadge && (
						<div
							style={{
								position: 'fixed',
								top: 8,
								left: 8,
								zIndex: 9999,
								padding: '4px 10px',
								borderRadius: 6,
								background: badgeBackground,
								color: badgeText,
								fontFamily: 'sans-serif',
								fontSize: 11,
								fontWeight: 600,
								letterSpacing: 0.2,
								pointerEvents: 'none',
							}}
						>
							Motion Interaction — recreated for portfolio
						</div>
					)}
					<Story />
				</FluentProvider>
			)
		},
	],
}

export default preview
