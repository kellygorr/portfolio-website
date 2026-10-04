import type { Meta, StoryObj } from '@storybook/react-vite'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BreakpointLine, SettingsCheckbox, SettingsPanel, SettingsSwitch } from './SettingsPanel'

type ClampBreakpointArgs = {
	showReadouts: boolean
	showTable: boolean
	showBreakpoint: boolean
}

const breakpoints = [480, 768, 1024]

const typeRows = [
	{ label: 'H1', values: ['28px', '32px', '48px'], className: 'h1' },
	{ label: 'H2', values: ['22px', '24px', '32px'], className: 'h2' },
	{ label: 'H3', values: ['18px', '20px', '26px'], className: 'h3' },
	{ label: 'Body', values: ['14px', '16px', '20px'], className: 'body' },
] as const

export const ClampBreakpoint = ({ showReadouts, showTable, showBreakpoint }: ClampBreakpointArgs) => {
	const [currentShowReadouts, setCurrentShowReadouts] = useState(showReadouts)
	const [currentShowTable, setCurrentShowTable] = useState(showTable)
	const [currentShowBreakpoint, setCurrentShowBreakpoint] = useState(showBreakpoint)
	const [usePxUnits, setUsePxUnits] = useState(true)
	const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)
	const [mounted, setMounted] = useState(false)
	const h1Ref = useRef<HTMLHeadingElement>(null)
	const h2Ref = useRef<HTMLHeadingElement>(null)
	const h3Ref = useRef<HTMLHeadingElement>(null)
	const bodyRef = useRef<HTMLParagraphElement>(null)

	// When embedded via the portfolio site's Demo wrapper, the parent
	// page passes the SAME randomized palette color it uses for the
	// "recreated for portfolio"/"Click below to interact" badges, as a
	// `heroColor` query param — so this hero section's background always
	// matches those badges instead of using its own unrelated hardcoded
	// brown. Falls back to that original hardcoded value when viewed
	// directly in Storybook (no query param present).
	const heroColor = new URLSearchParams(window.location.search).get('heroColor') || '#4c2d1d'
	// Same mechanism for the page's own light background — matches the
	// palette's `background` field instead of a hardcoded '#fbf3dc'
	// (which only coincidentally matched the Golden Hour family).
	const pageBackground = new URLSearchParams(window.location.search).get('pageBackground') || '#fbf3dc'
	// This demo's own randomized theme color, for the settings gear's
	// hover tint.
	const accentColor = new URLSearchParams(window.location.search).get('accentColor') || undefined

	useEffect(() => {
		const update = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', update)
		return () => window.removeEventListener('resize', update)
	}, [])

	// Refs are still null during the FIRST render (they're only attached
	// to the DOM after that render commits), so `readout()` below would
	// silently return '' on initial mount even when `showReadouts` is on
	// by default. Flipping `mounted` forces one extra render right after
	// mount, re-running `readout()` once the refs are populated.
	useEffect(() => {
		setMounted(true)
	}, [])

	const readout = useCallback(
		(ref: React.RefObject<HTMLElement | null>) => {
			if (!currentShowReadouts || !ref.current) return ''
			const px = parseFloat(window.getComputedStyle(ref.current).fontSize)
			return usePxUnits ? ` - ${px.toFixed(1)}px` : ` - ${(px / 16).toFixed(2)}rem`
		},
		[currentShowReadouts, windowWidth, mounted, usePxUnits]
	)


	return (
		<FluentProvider theme={webLightTheme}>
			<div
			style={{
				minHeight: '100vh',
				background: pageBackground,
				color: '#242424',
				fontFamily: 'Segoe UI, Arial, sans-serif',
				position: 'relative',
				overflow: 'hidden',
			}}
			>
				<style>{styles}</style>
				<SettingsPanel hoverIconColor={accentColor}>
					<SettingsCheckbox label="Show font sizes" checked={currentShowReadouts} onChange={setCurrentShowReadouts} accentColor={accentColor} />
					<SettingsCheckbox label="Show table" checked={currentShowTable} onChange={setCurrentShowTable} accentColor={accentColor} />
					<SettingsCheckbox label="Show breakpoint" checked={currentShowBreakpoint} onChange={setCurrentShowBreakpoint} accentColor={accentColor} />
					<SettingsSwitch label="rem/px" checked={usePxUnits} onChange={setUsePxUnits} accentColor={accentColor} />
				</SettingsPanel>
				{currentShowBreakpoint && <BreakpointLine breakpoints={breakpoints} />}
				<header className="hero" style={{ background: heroColor }}>
					<h1 ref={h1Ref} className="h1">
						Heading 1{readout(h1Ref)}
					</h1>
				</header>
				<main className="content">
				<h2 ref={h2Ref} className="h2">
					Heading 2{readout(h2Ref)}
				</h2>
				<div className="controls-row">
					<div className="breakpoints">
						<strong>Breakpoints:</strong>
						{breakpoints.map((breakpoint) => (
							<span key={breakpoint}>{breakpoint}px</span>
						))}
					</div>
				</div>
				{currentShowTable && (
					<div>
						<table className="type-table">
							<thead>
								<tr>
									<th>Element</th>
									{breakpoints.map((breakpoint) => (
										<th key={breakpoint}>{breakpoint}px</th>
									))}
								</tr>
							</thead>
							<tbody>
								{typeRows.map((row) => (
									<tr key={row.label}>
										<td>{row.label}</td>
										{row.values.map((value) => (
											<td key={value}>{value}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
						<p className="table-note">* These values are not meant to reflect Bebop typography and are for testing clamp() functions only.</p>
					</div>
				)}
				<section className="single-column">
					<p ref={bodyRef} className="body">
						Body text{readout(bodyRef)}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante
						venenatis dapibus posuere velit aliquet.
					</p>
				</section>
				<section className="two-column">
					<div>
						<h3 ref={h3Ref} className="h3">
							Heading 3{readout(h3Ref)}
						</h3>
						<p className="body">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.
						</p>
					</div>
					<div>
						<h3 className="h3">Heading 3</h3>
						<p className="body">
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
						</p>
						<p className="body">
							Cras mattis consectetur purus sit amet fermentum. Etiam porta sem malesuada magna mollis euismod.
						</p>
					</div>
				</section>
				</main>
			</div>
		</FluentProvider>
	)
}

const styles = `
	.hero {
		min-height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		background: #4c2d1d;
		color: white;
		text-align: center;
	}

	.content {
		max-width: 1120px;
		margin: 0 auto;
		padding: 48px 24px 72px;
		display: flex;
		flex-direction: column;
		gap: 36px;
	}

	.h1 {
		margin: 0;
		font-size: clamp(28px, calc(28px + (4 * ((100vw - 480px) / 288))), 32px);
		font-weight: 700;
		line-height: 1.15;
	}

	.h2 {
		margin: 0;
		text-align: center;
		font-size: clamp(22px, calc(22px + (2 * ((100vw - 480px) / 288))), 24px);
		font-weight: 650;
		line-height: 1.25;
	}

	.h3 {
		margin: 0 0 16px;
		font-size: clamp(18px, calc(18px + (2 * ((100vw - 480px) / 288))), 20px);
		font-weight: 650;
		line-height: 1.35;
	}

	.body {
		margin: 0 0 18px;
		font-size: clamp(14px, calc(14px + (2 * ((100vw - 480px) / 288))), 16px);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.h1 {
			font-size: clamp(32px, calc(32px + (16 * ((100vw - 768px) / 256))), 48px);
		}

		.h2 {
			font-size: clamp(24px, calc(24px + (8 * ((100vw - 768px) / 256))), 32px);
		}

		.h3 {
			font-size: clamp(20px, calc(20px + (6 * ((100vw - 768px) / 256))), 26px);
		}

		.body {
			font-size: clamp(16px, calc(16px + (4 * ((100vw - 768px) / 256))), 20px);
		}
	}

	.controls-row,
	.breakpoints {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.breakpoints span {
		display: inline-block;
		padding: 4px 8px;
		border-radius: 4px;
		background: #242424;
		color: white;
		font: 700 12px/1 monospace;
	}

	.type-table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		overflow: hidden;
		border: 1px solid #d1c7b8;
		border-radius: 12px;
		background: white;
	}

	.type-table th,
	.type-table td {
		padding: 10px 12px;
		border-right: 1px solid #d1c7b8;
		border-bottom: 1px solid #d1c7b8;
		text-align: left;
	}

	.type-table th:last-child,
	.type-table td:last-child {
		border-right: 0;
	}

	.type-table tr:last-child td {
		border-bottom: 0;
	}

	.type-table th {
		background: #efe7d8;
	}

	.table-note {
		margin-top: 8px;
		font-size: 12px;
		font-style: italic;
		color: #6b6258;
	}

	.two-column {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
	}

	@media (max-width: 700px) {
		.two-column {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}
`

const meta = {
	title: 'Typography/Clamp Breakpoint',
	component: ClampBreakpoint,
	parameters: {
		layout: 'fullscreen',
		hideRecreatedBadge: true,
	},
	args: {
		showReadouts: true,
		showTable: true,
		showBreakpoint: true,
	} as ClampBreakpointArgs,
} satisfies Meta<ClampBreakpointArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
