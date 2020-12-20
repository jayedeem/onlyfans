import { BrowserRouter, Switch } from 'react-router-dom'
import './App.css'
import Main from './components/Main'
import { UsersDataProvider } from './context'

const App = () => {
  return (
    <BrowserRouter>
      <UsersDataProvider>
        {/* <ProfilePageProvider> */}
        <Switch>
          <Main />
        </Switch>
        {/* </ProfilePageProvider> */}
      </UsersDataProvider>
    </BrowserRouter>
  )
}
export default App
