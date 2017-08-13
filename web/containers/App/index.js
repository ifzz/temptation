import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, RaisedButton } from 'material-ui'
import styles from './styles.scss'

class App extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor() {
    super()
    this.clearTodo = this.clearTodo.bind(this)
  }

  clearTodo() {
    this.todo.clear()
  }

  render() {
    return (
      <div className={styles.app}>
        <AppBar iconClassNameRight="muidocs-icon-navigation-expand-more" />
        {this.props.children}
        <RaisedButton label="清空TODO" onClick={this.clearTodo} />
      </div>
    )
  }
}

export default App
