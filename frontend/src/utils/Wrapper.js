import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

const queryClient = new QueryClient()

export const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          <Switch>{children}</Switch>
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
