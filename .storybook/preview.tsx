import type { Preview } from '@storybook/react-vite'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import React from 'react'

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
		(Story, context) => (
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
							background: 'rgba(0, 0, 0, 0.65)',
							color: '#fff',
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
		),
	],
}

export default preview
