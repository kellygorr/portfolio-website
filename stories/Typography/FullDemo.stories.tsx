import type { Meta, StoryObj } from '@storybook/react-vite'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { useState } from 'react'
import { BreakpointLine, SettingsCheckbox, SettingsPanel } from './SettingsPanel'

type FullDemoArgs = {
	showReadouts: boolean
	showTypeSystem: boolean
	showBreakpoint: boolean
}

const typeStyles = {
	functional: {
		label: 'Functional',
		color: 'rgba(0, 120, 212, 0.12)',
		title: { fontSize: '20px', lineHeight: '28px', fontWeight: 600 },
		body: { fontSize: '14px', lineHeight: '22px', fontWeight: 400 },
		input: { fontSize: '16px', lineHeight: '24px', fontWeight: 400 },
	},
	content: {
		label: 'Content',
		color: 'rgba(16, 124, 16, 0.12)',
		title: { fontSize: '32px', lineHeight: '44px', fontWeight: 600 },
		body: { fontSize: '16px', lineHeight: '28px', fontWeight: 400 },
		input: { fontSize: '20px', lineHeight: '28px', fontWeight: 400 },
	},
}

export const FullDemo = ({ showReadouts, showTypeSystem }: FullDemoArgs) => {
	const [currentShowReadouts, setCurrentShowReadouts] = useState(showReadouts)
	const [currentShowTypeSystem, setCurrentShowTypeSystem] = useState(showTypeSystem)
	const [currentShowBreakpoint, setCurrentShowBreakpoint] = useState(false)
	const [mode, setMode] = useState<'functional' | 'content'>('content')
	const titleStyle = typeStyles.content.title
	const bodyStyle = typeStyles.content.body
	const inputStyle = typeStyles[mode].input

	return (
		<FluentProvider theme={webLightTheme}>
			<div style={{ minHeight: '100vh', display: 'flex', background: '#f7f2e3', color: '#242424', fontFamily: 'Segoe UI, Arial, sans-serif', position: 'relative' }}>
			<SettingsPanel>
				<SettingsCheckbox label="Show font sizes" checked={currentShowReadouts} onChange={setCurrentShowReadouts} />
				<SettingsCheckbox label="Show type system" checked={currentShowTypeSystem} onChange={setCurrentShowTypeSystem} />
				<SettingsCheckbox label="Show breakpoint" checked={currentShowBreakpoint} onChange={setCurrentShowBreakpoint} />
			</SettingsPanel>
			{currentShowBreakpoint && <BreakpointLine breakpoints={[320, 1440]} />}
			<aside style={{ width: 240, borderRight: '1px solid #d8cfbf', padding: 16, boxSizing: 'border-box', background: '#efe7d8' }}>
				<NavItem label="New chat" />
				<NavItem label="Search" />
				<NavItem label="Agents" />
				<div style={{ margin: '24px 0 8px', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b6258' }}>Chats</div>
				<NavItem label="Relocation benefits" />
				<NavItem label="Sales Forecast FY25" />
				<NavItem label="New capabilities in Copilot" />
			</aside>
			<main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
				<section style={{ flex: 1, padding: '48px 32px 24px', overflow: 'auto' }}>
					<div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
						<div style={{ alignSelf: 'flex-end', maxWidth: 560, padding: '10px 16px', borderRadius: 14, background: '#fff', ...bodyStyle }}>
							What typography scale should Copilot use for long-form generated answers?
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
							<h1 style={{ margin: 0, ...titleStyle, background: currentShowTypeSystem ? typeStyles.content.color : undefined }}>
								Typography needs to support both product UI and generated content
								{currentShowReadouts && <Readout value="32px / 44px" />}
							</h1>
							<p style={{ margin: 0, ...bodyStyle, background: currentShowTypeSystem ? typeStyles.content.color : undefined }}>
								In Copilot, typography has to carry dense product controls, conversational input, and long-form generated answers in the same experience. This prototype tested how functional and content-oriented type ramps could coexist in one product surface.
								{currentShowReadouts && <Readout value="16px / 28px" />}
							</p>
							<p style={{ margin: 0, ...bodyStyle, background: currentShowTypeSystem ? typeStyles.content.color : undefined }}>
								The goal was to make hierarchy, readability, and implementation tradeoffs visible in a browser rather than relying only on static design comps.
							</p>
						</div>
					</div>
				</section>
				<section style={{ padding: '18px 32px 48px' }}>
					<div style={{ maxWidth: 720, margin: '0 auto' }}>
						<div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
							<button type="button" onClick={() => setMode('functional')} style={buttonStyle(mode === 'functional')}>Functional input</button>
							<button type="button" onClick={() => setMode('content')} style={buttonStyle(mode === 'content')}>Content input</button>
						</div>
						<div style={{ borderBottom: '1px solid #9b9185', paddingBottom: 8, background: currentShowTypeSystem ? typeStyles[mode].color : undefined }}>
							<div style={{ ...inputStyle, color: '#6b6258' }}>
								Ask Copilot anything
								{currentShowReadouts && <Readout value={mode === 'functional' ? '16px / 24px' : '20px / 28px'} />}
							</div>
						</div>
					</div>
				</section>
			</main>
			</div>
		</FluentProvider>
	)
}

const Readout = ({ value }: { value: string }) => <span style={{ marginLeft: 8, font: '600 12px/1 monospace', color: '#94664f' }}>{value}</span>

const NavItem = ({ label }: { label: string }) => (
	<div style={{ padding: '7px 8px', borderRadius: 8, fontSize: 14, lineHeight: '20px' }}>{label}</div>
)

const buttonStyle = (active: boolean): React.CSSProperties => ({
	border: '1px solid #9b9185',
	borderRadius: 8,
	padding: '6px 10px',
	background: active ? '#242424' : '#fff',
	color: active ? '#fff' : '#242424',
	cursor: 'pointer',
})

const meta = {
	title: 'Typography/Full Demo',
	component: FullDemo,
	parameters: {
		layout: 'fullscreen',
		hideRecreatedBadge: true,
	},
	args: {
		showReadouts: true,
		showTypeSystem: true,
		showBreakpoint: false,
	} as FullDemoArgs,
} satisfies Meta<FullDemoArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
