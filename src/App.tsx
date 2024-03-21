import * as React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { allProjects } from './data'
import { BOTTOM_GAP, GlobalStyles, LARGE_SCREEN, MIN_WIDTH, SIDE_GAP, SIDE_GAP_SMALL_SCREEN, SMALL_SCREEN } from './styles/GlobalStyles'
import { Header as HeaderContent } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import { Page } from './components/Page'
import { SearchBar, SearchResults } from './components/Search'
import { themeLight, themeDark } from './styles/theme'
import { useDarkMode } from './components/shared'
import { AnimatePresence, motion } from 'framer-motion'
import { IProject } from './data/IProject'
import { useMediaQuery } from './components/shared/hooks/useMediaQuery'

interface Props {
	projects: IProject[]
}

const App = ({ projects }: Props): JSX.Element => {
	const location = useLocation()
	const searchQuery = new URLSearchParams(location.search).get('q')
	const [isDarkMode, toggleDarkMode] = useDarkMode()
	const [isSearching, setIsSearching] = React.useState(false)
	// Let's not use a search page.  Google is indexing search pages, and this is not a place I want people to land for the first time
	const [query, setQuery] = React.useState(searchQuery)

	const isSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN}px)`)

	React.useEffect(() => {
		if (query) {
			setIsSearching(true)
		}
	}, [query])

	React.useEffect(() => {
		setQuery(searchQuery)
	}, [searchQuery])

	const thumbnailClick = () => {
		setIsSearching(false)
		setQuery(null)
	}

	return (
		<ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
			<AnimatePresence>
				<AppContainer>
					<GlobalStyles theme={isDarkMode ? themeDark : themeLight} />

					<Header>
						{/* ToDo Do not handle closing search from header, use location/route */}
						<HeaderContent setIsSearchOpen={setIsSearching} />
					</Header>

					<SearchBar
						isSearching={isSearching}
						isSmallScreen={isSmallScreen}
						setIsSearching={setIsSearching}
						query={query}
						setQuery={setQuery}
						pathname={location.pathname}
					/>

					<Canvas>
						<AnimateContent
							key={location.pathname + query}
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: {
									delay: 0.25,
								},
							}}
							exit={{ opacity: 0 }}
						>
							{
								// Search results occur ontop of the current page
								isSearching && (
									<ResultsWrapper>
										<SearchResults
											projects={projects}
											query={query}
											thumbnailClick={thumbnailClick}
											setQuery={setQuery}
										/>
									</ResultsWrapper>
								)
							}

							{!isSearching && (
								<Routes>
									<Route
										path="/page/:title?"
										element={
											<PageWrapper>
												<Page projects={projects} setQuery={setQuery} />
											</PageWrapper>
										}
									/>
									<Route
										path="/"
										element={
											<HomeWrapper>
												<Home projects={projects} isDarkMode={isDarkMode} setQuery={setQuery} />
											</HomeWrapper>
										}
									/>
								</Routes>
							)}
						</AnimateContent>
					</Canvas>

					<Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isSmallScreen={isSmallScreen} />
				</AppContainer>
			</AnimatePresence>
		</ThemeProvider>
	)
}

export default App

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	min-width: ${MIN_WIDTH}px;
	background: ${({ theme }) => theme.background};

	transition: background 0.5s ease-in;
`
const Header = styled.header`
	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
`
const Canvas = styled.main`
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 250px; // This prevents footer from crowding search when it is empty and window is height is small
`

const HomeWrapper = styled.div`
	padding: 70px ${SIDE_GAP_SMALL_SCREEN} 8% ${SIDE_GAP_SMALL_SCREEN};
	transition: padding 0.5s ease-out;

	@media (min-width: ${SMALL_SCREEN}px) {
		padding: 70px ${SIDE_GAP} 8% ${SIDE_GAP};
	}

	@media (min-width: ${LARGE_SCREEN}px) {
		padding: 20px 8% 8% 8%;
	}
`
const PageWrapper = styled.div`
	display: flex;
	justify-content: center;

	padding: 70px 0 ${BOTTOM_GAP} 0;
	transition: padding 0.5s ease-out;

	@media (min-width: ${LARGE_SCREEN}px) {
		padding-top: 20px;
	}
`
const ResultsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	padding: 150px ${SIDE_GAP} ${BOTTOM_GAP} ${SIDE_GAP};
`
const AnimateContent = styled(motion.div)`
	display: flex;
	flex-direction: column;
	flex: 1;
`
