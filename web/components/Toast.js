import React from 'react'

import styles from './Toast.scss'

export default ({ className, message, show }) => (
  <div
    className={[
      styles.container,
      'animated',
      'fadeIn',
    ].concat(className).join(' ')}
    style={{ display: show ? 'block' : 'none' }}
  >
    {message}
  </div>
)
