import type { Meta, StoryObj } from '@storybook/react-vite'
import aptosWoff2Url from '../../src/assets/fonts/aptos/Aptos.woff2?url'
import aptosWoffUrl from '../../src/assets/fonts/aptos/Aptos.woff?url'
import aptosItalicWoff2Url from '../../src/assets/fonts/aptos/Aptos-Italic.woff2?url'
import aptosItalicWoffUrl from '../../src/assets/fonts/aptos/Aptos-Italic.woff?url'
import aptosSerifWoff2Url from '../../src/assets/fonts/aptos/AptosSerif.woff2?url'
import aptosSerifWoffUrl from '../../src/assets/fonts/aptos/AptosSerif.woff?url'

const typeScale = [
	{ name: 'Display', size: 72, lineHeight: 80, sample: 'Responsive type for AI experiences' },
	{ name: 'Title', size: 48, lineHeight: 56, sample: 'Typography systems need rhythm' },
	{ name: 'Heading', size: 32, lineHeight: 40, sample: 'Clear hierarchy across surfaces' },
	{ name: 'Subhead', size: 24, lineHeight: 32, sample: 'Readable, scalable, consistent' },
	{ name: 'Body', size: 16, lineHeight: 24, sample: 'Fallback fonts should preserve spacing while the intended font loads.' },
	{ name: 'Caption', size: 12, lineHeight: 16, sample: 'Metadata, labels, and compact interface text' },
]

const AptosTypeRamp = () => (
	<div className="aptos-specimen">
		<style>{`
			@font-face {
				font-family: 'Aptos Specimen';
				src:
					url('${aptosWoff2Url}') format('woff2'),
					url('${aptosWoffUrl}') format('woff');
				font-weight: 400;
				font-style: normal;
			}

			@font-face {
				font-family: 'Aptos Specimen';
				src:
					url('${aptosItalicWoff2Url}') format('woff2'),
					url('${aptosItalicWoffUrl}') format('woff');
				font-weight: 400;
				font-style: italic;
			}

			@font-face {
				font-family: 'Aptos Serif Specimen';
				src:
					url('${aptosSerifWoff2Url}') format('woff2'),
					url('${aptosSerifWoffUrl}') format('woff');
				font-weight: 400;
				font-style: normal;
			}

			.aptos-specimen {
				min-height: 100vh;
				box-sizing: border-box;
				padding: 0;
				background: #fbf3dc;
				color: #24190f;
				font-family: 'Aptos Specimen', 'Segoe UI', Arial, sans-serif;
			}

			.aptos-specimen * {
				box-sizing: border-box;
			}

			.sheet {
				display: grid;
				grid-template-columns: 0.92fr 1.08fr;
				gap: 0;
				max-width: none;
				min-height: 100vh;
				margin: 0;
				border: 0;
				background:
					linear-gradient(90deg, rgba(76, 45, 29, 0.08) 1px, transparent 1px),
					linear-gradient(0deg, rgba(76, 45, 29, 0.08) 1px, transparent 1px),
					#fffaf0;
				background-size: 32px 32px;
			}

			.left,
			.right {
				padding: 16px 20px;
			}

			.left {
				border-right: 1px solid #4c2d1d;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: flex-start;
				gap: 12px;
				text-align: right;
			}

			.kicker {
				margin: 0 0 6px;
				font-size: 12px;
				line-height: 1;
				font-weight: 700;
				letter-spacing: 0.18em;
				text-transform: uppercase;
				color: #a85d2f;
			}

			.family-name {
				margin: 0;
				font-size: clamp(110px, 18vw, 240px);
				line-height: 0.8;
				letter-spacing: -0.085em;
				font-weight: 400;
				color: #4c2d1d;
			}

			.family-serif {
				display: block;
				font-family: 'Aptos Serif Specimen', Georgia, serif;
				font-size: 0.72em;
				line-height: 0.88;
				letter-spacing: -0.055em;
				color: #c8843d;
			}

			.alphabet {
				margin: 0;
				max-width: 520px;
				font-size: clamp(18px, 2.1vw, 28px);
				line-height: 1.25;
				letter-spacing: -0.03em;
				color: #4c2d1d;
			}

			.poem-title {
				margin: 0;
				font-family: 'Aptos Serif Specimen', Georgia, serif;
				font-size: clamp(100px, 11vw, 180px);
				line-height: 0.82;
				font-weight: 400;
				letter-spacing: -0.07em;
				color: rgba(76, 45, 29, 0.22);
			}

			.poem {
				margin: 0;
				display: grid;
				color: #342318;
			}

			.poem-line {
				margin: 0;
			}

			.poem-line:nth-child(1) {
				font-size: clamp(50px, 6vw, 104px);
				line-height: 0.98;
				letter-spacing: -0.06em;
				color: #24190f;
			}

			.poem-line-inline-italic-stack {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				vertical-align: middle;
			}

			.poem-line-inline-italic-stack span {
				white-space: nowrap;
				font-style: italic;
				font-size: clamp(14px, 1.8vw, 26px);
				line-height: 1.15;
				letter-spacing: -0.03em;
				color: #a85d2f;
			}

			.poem-line-inline-serif {
				font-family: 'Aptos Serif Specimen', Georgia, serif;
				font-size: clamp(42px, 5.4vw, 92px);
				letter-spacing: -0.045em;
				color: #4c2d1d;
			}

			.poem-line-inline-bold {
				font-size: clamp(24px, 3vw, 48px);
				letter-spacing: -0.035em;
				font-weight: 700;
				color: #342318;
			}

			.poem-line-inline-bold-stack {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				vertical-align: middle;
				margin-top: -30px;
			}

			.poem-line-inline-bold-stack span {
				white-space: nowrap;
				font-size: clamp(24px, 3vw, 48px);
				line-height: 1.05;
				letter-spacing: -0.035em;
				font-weight: 700;
				color: #342318;
			}

			.poem-line-flow {
				font-size: clamp(16px, 1.6vw, 24px);
				line-height: 1;
				letter-spacing: 0.01em;
				color: #5f5147;
				max-width: 620px;
			}

			.specimen-grid {
				display: grid;
				grid-template-columns: repeat(2, minmax(0, 1fr));
				gap: 18px;
				margin-top: 32px;
			}

			.specimen-card {
				border: 1px solid rgba(76, 45, 29, 0.24);
				background: rgba(251, 243, 220, 0.7);
				padding: 18px;
				min-height: 132px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.label {
				margin: 0;
				font-size: 11px;
				line-height: 1;
				font-weight: 700;
				letter-spacing: 0.12em;
				text-transform: uppercase;
				color: #a85d2f;
			}

			.sample {
				margin: 18px 0 0;
				font-size: 30px;
				line-height: 1.1;
				color: #4c2d1d;
			}

			.italic {
				font-style: italic;
			}

			.bold {
				font-weight: 700;
			}

			.serif {
				font-family: 'Aptos Serif Specimen', Georgia, serif;
			}

			.scale {
				display: grid;
				gap: 0;
				border-top: 1px solid rgba(76, 45, 29, 0.24);
				margin-top: 28px;
			}

			.scale-row {
				display: grid;
				grid-template-columns: 112px 1fr 88px;
				gap: 18px;
				align-items: baseline;
				padding: 16px 0;
				border-bottom: 1px solid rgba(76, 45, 29, 0.18);
			}

			.scale-name,
			.scale-meta {
				font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
				font-size: 12px;
				line-height: 1;
				color: #6b6258;
			}

			.scale-meta {
				justify-self: end;
			}

			.scale-sample {
				margin: 0;
				color: #24190f;
				letter-spacing: -0.02em;
			}

			.numerals {
				margin: 0;
				font-size: clamp(38px, 6vw, 88px);
				line-height: 0.98;
				letter-spacing: -0.055em;
				color: #a85d2f;
			}

			.footer-line {
				margin: 24px 0 0;
				font-size: 14px;
				line-height: 1.4;
				color: #6b6258;
			}

			@media (max-width: 980px) {
				.aptos-specimen {
					padding: 28px;
				}

				.sheet {
					grid-template-columns: 1fr;
				}

				.left {
					border-right: 0;
					border-bottom: 1px solid #4c2d1d;
				}
			}
		`}</style>

		<main className="sheet">
			<section className="left">
				<div>
					<p className="kicker">Typeface study</p>
					<h1 className="family-name">
						Aptos
						<span className="family-serif">Serif</span>
					</h1>
					<p className="alphabet">
						Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz{' '}
						<span style={{ color: '#a85d2f' }}>0 1 2 3 4 5 6 7 8 9</span>
					</p>
					<p className="numerals">0123456789</p>
					<p className="footer-line">.,:;!? &amp; @ # $ % / * ( ) [ ] {'{ }'}</p>
				</div>
			</section>

			<section className="right">
				<p className="kicker">Public domain text sample</p>
				<h2 className="poem-title">The Raven</h2>
				<div className="poem">
					<p className="poem-line">
						Once upon a midnight dreary,{' '}
						<span className="poem-line-inline-italic-stack">
							<span>while I pondered, weak and weary, Over</span>
							<span>many a quaint and curious volume of</span>
						</span>
					</p>
					<p className="poem-line poem-line-flow">
						<span className="poem-line-inline-serif">forgotten lore, while I nodded,</span>{' '}
						<span className="poem-line-inline-bold-stack">
							<span>nearly napping, suddenly</span>
							<span>there came a tapping, as</span>
						</span>
					</p>
					<p className="poem-line poem-line-flow">of some one gently rapping, rapping at my chamber door.</p>
				</div>
			</section>
		</main>
	</div>
)

const meta = {
	title: 'Typography/Aptos Type Ramp',
	component: AptosTypeRamp,
	parameters: {
		layout: 'fullscreen',
		hideRecreatedBadge: true,
	},
} satisfies Meta<typeof AptosTypeRamp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
