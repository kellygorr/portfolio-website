import { useState, useEffect, type JSX } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { BOTTOM_GAP, GlobalStyles, LARGE_SCREEN, MIN_WIDTH, SIDE_GAP, SIDE_GAP_SMALL_SCREEN, SMALL_SCREEN } from './styles/GlobalStyles'
import { Header as HeaderContent } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import { Page } from './components/Page'
import { SearchBar, SearchResults } from './components/Search'
import { themeLight, themeDark } from './styles/theme'
import { useDarkMode } from './components/shared'
import { AnimatePresence, motion } from 'motion/react'
import { IProject } from './data/IProject'
import { useMediaQuery } from './components/shared/hooks/useMediaQuery'

interface Props {
	projects: IProject[]
}

const App = ({ projects }: Props): JSX.Element => {
	const location = useLocation()
	const navigate = useNavigate()
	const searchQuery = new URLSearchParams(location.search).get('q')
	const [isDarkMode, toggleDarkMode] = useDarkMode()
	// Let's not use a search page.  Google is indexing search pages, and this is not a place I want people to land for the first time
	const [query, setQuery] = useState(searchQuery)

	const isSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN}px)`)

	// isSearching is DERIVED from the URL/history entry rather than its own
	// independent state — this is what makes the browser Back button work
	// correctly. Every search-state change (opening the bar, typing+Enter a
	// query, clicking a tag/skill/idea anywhere) pushes its own history
	// entry (see setIsSearching below and Tag.tsx / SearchBar.tsx's
	// navigate() calls), so Back naturally steps back through them and
	// ends up on a real, non-searching entry — instead of search staying
	// stuck open while Back silently navigates the page underneath it.
	// `location.state.searching` covers the "opened, no query typed yet"
	// case (no visible query param for that state, so a plain open doesn't
	// clutter the URL bar) — `query` covers every state that has one.
	const isSearching = Boolean(query) || Boolean((location.state as { searching?: boolean } | null)?.searching)

	useEffect(() => {
		setQuery(searchQuery)
	}, [searchQuery])

	/** Closes search by asking the browser to go back one entry — since
	 *  every way of opening/changing search pushed its own entry, going
	 *  back always lands exactly on the real page that was showing
	 *  underneath, with no extra bookkeeping needed. Falls back to a
	 *  same-pathname `replace` (dropping the query) only when the current
	 *  entry is the very first one this tab ever loaded (e.g. someone
	 *  opened a shared link with `?q=...` directly) — `navigate(-1)` there
	 *  would leave the site entirely instead of just closing search. */
	const closeSearch = () => {
		if (location.key === 'default') {
			navigate(location.pathname, { replace: true })
		} else {
			navigate(-1)
		}
	}

	/** Passed to SearchBar/Header as `setIsSearching` — opening pushes a
	 *  new history entry (so Back has something of ours to land on);
	 *  closing hands off to `closeSearch` above. Kept as a single
	 *  `(open: boolean) => void` function (rather than two separately
	 *  named props) so existing callers — SearchBar's icon/X toggle —
	 *  don't need to change how they call it. */
	const setIsSearching = (open: boolean) => {
		if (open) {
			navigate(location.pathname + location.search, { state: { searching: true } })
		} else {
			closeSearch()
		}
	}

	const thumbnailClick = () => {
		// No navigation here on purpose — the thumbnail itself is wrapped
		// in a <Link> that's already navigating to the project page in
		// this same click, so calling closeSearch() (which would push its
		// own navigate(-1)/replace) would race that Link and double
		// navigate. The project page's URL has no `?q=`, so `isSearching`
		// above resolves to false on its own as soon as that navigation
		// lands — this just clears the local `query` a little earlier for
		// a snappier transition.
		setQuery(null)
	}

	return (
		<ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
			<AnimatePresence>
				<AppContainer>
					<GlobalStyles theme={isDarkMode ? themeDark : themeLight} />

					<Header>
						<HeaderContent />
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

	@media (min-width: ${SMALL_SCREEN + 1}px) {
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
	padding: 70px ${SIDE_GAP_SMALL_SCREEN} ${BOTTOM_GAP} ${SIDE_GAP_SMALL_SCREEN};

	@media (min-width: ${SMALL_SCREEN + 1}px) {
		padding: 150px ${SIDE_GAP} ${BOTTOM_GAP} ${SIDE_GAP};
	}
`
const AnimateContent = styled(motion.div)`
	display: flex;
	flex-direction: column;
	flex: 1;
`
