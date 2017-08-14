import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../containers/App'
import RouteMaps from '../routes/index'
import { setTitle } from '../actions/global'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App>
        <RouteMaps
          history={history}
          // 之所以在这里传入 setMainTitle 是为了使 webpack-hot-module 生效
          setTitle={title => store.dispatch(setTitle(title))}
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
