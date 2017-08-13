import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

const configureStore = (reducers, preloadedState, history) => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      createLogger(),
    ),
  )

  return store
}

export default configureStore
