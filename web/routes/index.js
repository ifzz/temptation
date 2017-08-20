import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import uuid from 'uuid/v4'

import App from '../containers/App'
import Routes from './maps'

// application routes map
const RouteMaps = ({ history, setTitle }) => (
  <App history={history}>
    <ConnectedRouter history={history}>
      <div className="page-container">
        {
          Routes.map(({ path, text, component: Component, ...rest }) => (
            <Route
              exact
              path={path}
              key={uuid()}
              {...rest}
              render={(props) => {
                setTimeout(() => setTitle(text))
                return (<Component {...props} />)
              }}
            />
          ))
        }
      </div>
    </ConnectedRouter>
  </App>
)

RouteMaps.propTypes = {
  history: PropTypes.object.isRequired,
  setTitle: PropTypes.func.isRequired,
}

export default RouteMaps
