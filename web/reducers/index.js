import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import * as dialogReducers from './dialogReducers'
import * as authReducers from './userReducers'
import toastMessage from './toastReducers'

const rootReducer = combineReducers({
  toastMessage: toastMessage,
  alertMessage: dialogReducers.alertMessage,
  confirmMessage: dialogReducers.confirmMessage,
  userInfo: authReducers.userInfo,
  userLogin: authReducers.userLogin,
  router,
})

export default rootReducer
