import styled from 'styled-components'

// Vite doesn't have any native inline svg support, so we have to use a workaround
export const CogIcon = () => {
	return (
		<Wrapper>
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
				<path
					d="M28.62,14.68l-1.9-1L26.42,12l1.45-1.6A1,1,0,0,0,28,9.24L26.38,6.45A1,1,0,0,0,25.31,6l-2.11.46L21.9,5.34,22,3.19a1,1,0,0,0-.65-1l-3-1.1a1,1,0,0,0-1.13.32l-1.32,1.7h-1.7l-1.32-1.7a1,1,0,0,0-1.13-.32l-3,1.1a1,1,0,0,0-.65,1L8.1,5.34,6.8,6.43,4.7,6a1,1,0,0,0-1.08.48L2,9.24a1,1,0,0,0,.12,1.17L3.58,12l-.3,1.66-1.9,1a1,1,0,0,0-.52,1.06l.56,3.17a1,1,0,0,0,.85.82L4.4,20l.85,1.47-.81,2a1,1,0,0,0,.28,1.15L7.19,26.7a1,1,0,0,0,1.17.08l1.83-1.15,1.59.58.66,2.05a1,1,0,0,0,1,.69h3.22a1,1,0,0,0,.95-.69l.66-2.05,1.59-.58,1.83,1.15a1,1,0,0,0,1.17-.08l2.47-2.07a1,1,0,0,0,.28-1.15l-.81-2L25.6,20l2.13-.29a1,1,0,0,0,.85-.82l.56-3.17A1,1,0,0,0,28.62,14.68Zm-7.56,3-1.58.21L18.54,19l.08,1.59-1.84.84-1.14-1.11-1.47,0L13,21.34l-1.8-.92.15-1.58-.89-1.17-1.57-.28-.41-2,1.33-.87.36-1.43-.76-1.4,1.29-1.55,1.51.49,1.34-.61.61-1.46,2,0,.56,1.49,1.31.67,1.53-.44L20.78,12,20,13.32c.11.55.18.89.3,1.44l1.29.93C21.31,16.64,21.3,16.69,21.06,17.65Z"
					fill="white"
				/>
			</svg>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	svg {
		path {
			fill: ${({ theme }) => theme.sidebarText};
		}
	}
`
