import { createGlobalStyle, keyframes } from 'styled-components'
import './fonts.css'
import { AccentColors, Theme } from './theme'

export const GRID_WIDTH = 350
export const GRID_GAP = 20
export const SIDE_GAP = '3vw'
export const SIDE_GAP_SMALL_SCREEN = '5vw'
export const BOTTOM_GAP = '40px'

/** SCREEN SIZE */
export const LARGE_SCREEN = 1366
export const MEDIUM_SCREEN = 1024
export const MEDIUM_SMALL_SCREEN = 768
export const SMALL_SCREEN = 640

/**For non-home screen thumbnails */
export const THUMBNAIL_SINGLE_COLUMN = 779

export const AnimateIn = keyframes`
	from { opacity: 0;}
	to { opacity: 1; }
`

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`

	* {
        position: relative;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		border-spacing: 0px;
		font-weight: normal;
		font-size: inherit;
	}

	*:before,
	*:after {
		box-sizing: inherit;
	}

	html,
	body, #root {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;

		font-family: 'open_sansregular';
		font-size: 1rem;
		color: ${({ theme }) => theme.text};
	}

	*:focus {
		outline: 0;

		&:after {
			content: '';
			position: absolute;
			top: -2px;
			left: -3px;
			right: -3px;
			bottom: -2px;
			border-radius: inherit;
			box-shadow: 0 0 0 2px ${AccentColors.white}, 0 0 0 5px ${AccentColors.darkPink};

		}

		&:not(:focus-visible) {
			outline: 0 !important;
			border-color: transparent !important;

			&:after {

				box-shadow: none !important;
			}

		}

	
	}

	button {
		cursor: pointer;
		border-radius: 0;
		border-width: 0;
		background: transparent;
		color: inherit;
	}

	a {
		color: inherit;
		text-decoration: inherit;

		&:hover {
			cursor: pointer;
			text-decoration: underline;
		}
	}

	ul {
		list-style-type:none;
	}

	hr {
		border: none;
	}

`
