import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { IProject } from './data/IProject.ts'
import { allProjects } from './data/index.ts'
import { configureProjects } from './components/shared/configureProjects.tsx'
const projects: IProject[] = configureProjects(allProjects)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App projects={projects} />
	</BrowserRouter>
)

// Removes the "preload" class (see index.html / GlobalStyles.ts) that
// suppresses every CSS transition for the very first paint only -- so
// loading straight into a saved/system dark-mode preference doesn't
// visibly fade in from a flash of the light theme. Two nested rAFs
// (not one, and not a fixed setTimeout) guarantee the browser has
// actually PAINTED at least once with the no-transition class still
// applied before it's removed: the first rAF fires before the next
// paint, so its callback still runs pre-paint; the second rAF's
// callback is guaranteed to run only after that paint has happened.
// Removing it any earlier risks the correct starting theme never
// visually landing before transitions re-enable, which would bring
// the exact flash/fade this exists to prevent right back.
requestAnimationFrame(() => {
	requestAnimationFrame(() => {
		document.body.classList.remove('preload')
	})
})
