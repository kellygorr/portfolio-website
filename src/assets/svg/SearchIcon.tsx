import styled from 'styled-components'

// Vite doesn't have any native inline svg support, so we have to use a workaround
export const SearchIcon = () => {
	return (
		<Wrapper>
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
				<path
					d="M25.42,26.6l-5.07-6.93.39-.29a2.07,2.07,0,0,0,.45-2.81,1.89,1.89,0,0,0-1.8-.82,10.11,10.11,0,1,0-8.74,5,10,10,0,0,0,3-.44A2.07,2.07,0,0,0,13.9,22a1.9,1.9,0,0,0,1.57.84,1.88,1.88,0,0,0,1.12-.37L17.2,22l5.11,7a2,2,0,0,0,1.56.81A1.87,1.87,0,0,0,25,29.4,2.06,2.06,0,0,0,25.42,26.6ZM4,10.68a6.63,6.63,0,1,1,6.62,6.62A6.62,6.62,0,0,1,4,10.68Z"
					fill="#231f20"
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
