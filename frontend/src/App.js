import { BrowserRouter, Switch } from 'react-router-dom'
import './App.css'
import Main from './components/Main'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Main />
      </Switch>
    </BrowserRouter>
  )
}
export default App
