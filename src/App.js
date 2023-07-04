import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Router from './routes'
import ThemeConfig from './theme'

function App() {
  return (
    <RecoilRoot>
      <ThemeConfig>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeConfig>
    </RecoilRoot>
  )
}

export default App
