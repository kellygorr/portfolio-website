import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { EditorialClamp } from '../../../stories/Typography/EditorialClampOriginal/EditorialClamp'
import { FontFaceDemo } from '../../../stories/Typography/FontFaceDemo/FontFaceDemo'
import { MIN_WIDTH } from '../../styles/GlobalStyles'
import aptosWoff2Url from '../../assets/fonts/aptos/Aptos.woff2?url'
import aptosWoffUrl from '../../assets/fonts/aptos/Aptos.woff?url'
import aptosSerifWoff2Url from '../../assets/fonts/aptos/AptosSerif.woff2?url'
import aptosSerifWoffUrl from '../../assets/fonts/aptos/AptosSerif.woff?url'

const TypographyFonts = () => (
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

		@font-face {
			font-family: 'Aptos Serif';
			src:
				url('${aptosSerifWoff2Url}') format('woff2'),
				url('${aptosSerifWoffUrl}') format('woff');
			font-weight: 400;
			font-style: normal;
		}
	`}</style>
)

const TypographyDemoShell = ({ background, children }: { background: string; children: ReactNode }) => (
	<Shell $background={background}>
		<TypographyFonts />
		<FluentProvider theme={webLightTheme} style={{ background }}>
			<Content>{children}</Content>
		</FluentProvider>
	</Shell>
)

export const EditorialClampEmbed = ({ accentColor, background }: { accentColor?: string; background: string }) => (
	<TypographyDemoShell background={background}>
		<EditorialClamp accentColor={accentColor} fillViewport={false} />
	</TypographyDemoShell>
)

export const FontFaceDemoEmbed = ({
	segoeColor,
	aptosColor,
	accentColor,
	background,
}: {
	segoeColor: string
	aptosColor: string
	accentColor: string
	background: string
}) => (
	<TypographyDemoShell background={background}>
		<FontFaceDemo segoeColor={segoeColor} aptosColor={aptosColor} accentColor={accentColor} />
	</TypographyDemoShell>
)

const Shell = styled.div<{ $background: string }>`
	position: relative;
	width: 100%;
	min-width: ${MIN_WIDTH}px;
	min-height: 100%;
	overflow: hidden;
	isolation: isolate;
	contain: layout paint;
	background: ${({ $background }) => $background};
`

const Content = styled.div`
	position: relative;
	width: 100%;
	min-height: 100%;

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	* {
		margin: 0;
	}
`
