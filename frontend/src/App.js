import { BrowserRouter, Switch } from 'react-router-dom'
import './App.css'
import Main from './components/Main'
import { ContextWrapper } from './context/'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ContextWrapper>
          <Main />
        </ContextWrapper>
      </Switch>
    </BrowserRouter>
  )
}
export default App
