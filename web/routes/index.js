import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'

import RouteTypes from '../enums/routeTypes'

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
const RouteMaps = ({ history, setMainTitle }) => (
  <ConnectedRouter history={history}>
    <div className="container">
      {
        routes.map(({ type, ...rest }) => (
          type === RouteTypes.PRIVATE
            ? <PrivateRoute
              {...rest}
              setTitle={setMainTitle}
            />
            : <CommonRoute {...rest} setTitle={setMainTitle} />
        ))
      }
    </div>
  </ConnectedRouter>
)

RouteMaps.propTypes = {
  history: PropTypes.object.isRequired,
  setMainTitle: PropTypes.func.isRequired,
}

export default RouteMaps
