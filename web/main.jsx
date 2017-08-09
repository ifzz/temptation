import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/App/index.jsx'

require('./styles/main.scss')

// ========================================================
// Render Setup
// ========================================================

const MOUNT_NODE = document.getElementById('root')

let render = (Component) => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Component />
    </MuiThemeProvider>,
    MOUNT_NODE,
  )
}

render(App)

// This code is excluded from production bundle
if (module.hot) {
  module.hot.accept(() => {
    render(App)
  })
}
