import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

export const CommonRoute = ({
  component: Component,
  title,
  path,
  setTitle,
  ...rest
 }) =>
  (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => {
        setTimeout(() => setTitle(title))
        return (<Component {...props} />)
      }}
    />
  )

// auth required routes
export class PrivateRoute extends React.Component {
  render() {
    let { component: Component, setTitle, path, ...rest } = this.props
    return (
      <Route
        exact
        path={path}
        {...rest}
        render={(props) => {
          if (this._reactInternalInstance._context.store.getState()['userLogin']) {
            return (
              <CommonRoute
                component={Component}
                setTitle={setTitle}
                {...rest}
              />
            )
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: {
                      pathname: path,
                    },
                  },
                }}
              />
            )
          }
        }}
      />
    )
  }
}
