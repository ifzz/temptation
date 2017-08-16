import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import RouteMaps from '../routes/index'
import { setTitle } from '../actions/global'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <RouteMaps
        history={history}
        setTitle={title => store.dispatch(setTitle(title))}
      />
    </MuiThemeProvider>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
