import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { FontFaceDemo } from './FontFaceDemo'
import aptosWoff2Url from '../../../src/assets/fonts/aptos/Aptos.woff2?url'
import aptosWoffUrl from '../../../src/assets/fonts/aptos/Aptos.woff?url'

export const FontFaceDemoIsolated = () => (
	<div className="font-face-demo-scope">
		<style>{`
			@font-face {
				font-family: 'Segoe UI';
				src:
					url('https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2') format('woff2'),
					url('https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff') format('woff');
				font-weight: 400;
			}

			@font-face {
				font-family: 'Segoe UI';
				src:
					url('https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2') format('woff2'),
					url('https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff') format('woff');
				font-weight: 600;
			}

			@font-face {
				font-family: 'Aptos';
				src:
					url('${aptosWoff2Url}') format('woff2'),
					url('${aptosWoffUrl}') format('woff');
				font-weight: 400;
				font-style: normal;
			}

			html {
				font-size: 62.5%;
				line-height: 1.15;
			}

			.font-face-demo-scope *,
			.font-face-demo-scope *::before,
			.font-face-demo-scope *::after {
				box-sizing: border-box;
			}

			.font-face-demo-scope * {
				margin: 0;
			}

			.font-face-demo-scope {
				position: relative;
				width: 100%;
				min-height: 100vh;
			}
		`}</style>
		<FluentProvider theme={webLightTheme}>
			<FontFaceDemo />
		</FluentProvider>
	</div>
)
