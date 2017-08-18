import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import uuid from 'uuid/v4'

import App from '../containers/App'
import Index from '../containers/Index'
import Chatroom from '../containers/Chatroom'

const routes = [
  {
    path: '/',
    title: '首页',
    component: Index,
  },
  {
    path: '/chatroom',
    title: '聊天室',
    component: Chatroom,
  },
]

// application routes map
const RouteMaps = ({ history, setTitle }) => (
  <App history={history}>
    <ConnectedRouter history={history}>
      <div className="page-container">
        {
          routes.map(({ type, path, title, component: Component, ...rest }) => (
            <Route
              exact
              path={path}
              key={uuid()}
              {...rest}
              render={(props) => {
                console.log(props)
                setTimeout(() => setTitle(title))
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
