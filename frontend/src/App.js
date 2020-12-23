import { BrowserRouter, Switch } from 'react-router-dom'
import './App.css'
import Main from './components/Main'
import { QueryClientProvider, QueryClient } from 'react-query'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <Switch>{children}</Switch>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

const App = () => {
  return (
    <Wrapper>
      <Main />
    </Wrapper>
  )
}
export default App
