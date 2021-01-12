import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { Wrapper } from './utils/Wrapper'

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById('root')
)
