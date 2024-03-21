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
