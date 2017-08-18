import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import uuid from 'uuid/v4'

import RouteTypes from '../enums/routeTypes'

import App from '../containers/App'
import Index from '../containers/Index'

import { CommonRoute, PrivateRoute } from './extensions'

const routes = [
  {
    path: '/',
    title: '首页',
    component: Index,
    type: RouteTypes.COMMON,
  },
]

// application routes map
const RouteMaps = ({ history, setTitle }) => (
  <ConnectedRouter history={history}>
    <App history={history}>
      {
        routes.map(({ type, ...rest }) => (
          type === RouteTypes.PRIVATE
            ? <PrivateRoute
              {...rest}
              setTitle={setTitle}
              key={uuid()}
            />
            : <CommonRoute
              {...rest}
              setTitle={setTitle}
              key={uuid()}
            />
        ))
      }
    </App>
  </ConnectedRouter>
)

RouteMaps.propTypes = {
  history: PropTypes.object.isRequired,
  setTitle: PropTypes.func.isRequired,
}

export default RouteMaps
