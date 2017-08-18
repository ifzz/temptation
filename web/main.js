import React from 'react'
import { render } from 'react-dom'
import injectTabEvent from 'react-tap-event-plugin'
import createHashHistory from 'history/createHashHistory'

import reducers from './reducers/index'
import configureStore from './store'
import Root from './containers/Root'

require('./styles/main.scss')

// inject react tab event
injectTabEvent()

// 根据窗体宽度计算初始化的字体大小
const initFontSize = function () {
  let fs = (document.body.clientWidth + 16) / 25.875
  document.body.parentElement.style.fontSize = `${fs > 16 ? 16 : fs}px`
}

window.onresize = initFontSize
initFontSize()

// ========================================================
// Render Setup
// ========================================================

const customHistory = createHashHistory()
const MOUNT_NODE = document.getElementById('root')

const { userInfo } = window.__INIT_STATE

const store = configureStore(reducers, {
  userInfo: userInfo,
  userLogin: userInfo && !!(userInfo.id),
}, customHistory)

let renderIndex = () => {
  render(
    <Root
      store={store}
      history={customHistory}
    />,
    MOUNT_NODE,
  )
}

renderIndex()

// This code is excluded from production bundle
if (module.hot) {

  module.hot.accept('./reducers/index', () => {
    /* eslint-disable */
    store.replaceReducer(require('./reducers/index').default)
  })

  module.hot.accept('./containers/Root', () => {
    renderIndex()
  })
}
