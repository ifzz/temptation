import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../containers/App'
import RouteMaps from '../routes/index'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App>
        <RouteMaps
          history={history}
        />
      </App>
    </MuiThemeProvider>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
