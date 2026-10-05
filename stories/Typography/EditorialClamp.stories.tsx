import type { Meta, StoryObj } from '@storybook/react-vite'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { EditorialClamp } from './EditorialClampOriginal/EditorialClamp'
import aptosWoff2Url from '../../src/assets/fonts/aptos/Aptos.woff2?url'
import aptosWoffUrl from '../../src/assets/fonts/aptos/Aptos.woff?url'
import aptosSerifWoff2Url from '../../src/assets/fonts/aptos/AptosSerif.woff2?url'
import aptosSerifWoffUrl from '../../src/assets/fonts/aptos/AptosSerif.woff?url'

const EditorialClampStory = () => (
	<div>
		<style>{`
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

			html {
				font-size: 100%;
				line-height: 1.15;
			}

			* {
				margin: 0;
				box-sizing: border-box;
			}
		`}</style>
		<FluentProvider theme={webLightTheme}>
			<EditorialClamp />
		</FluentProvider>
	</div>
)

const meta = {
	title: 'Typography/Editorial Clamp',
	component: EditorialClampStory,
	parameters: {
		layout: 'fullscreen',
		hideRecreatedBadge: true,
	},
} satisfies Meta<typeof EditorialClampStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
