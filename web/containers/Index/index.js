import React from 'react'
import styles from './styles.scss'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className={styles.app}>
        大家好，我是你们的INDEX！
      </div>
    )
  }
}

export default Index
