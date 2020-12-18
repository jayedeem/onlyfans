import Main from './components/Main'

import { BrowserRouter, Switch } from 'react-router-dom'
import './App.css'

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
