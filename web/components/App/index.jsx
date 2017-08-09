import React from 'react'
import { AppBar, RaisedButton } from 'material-ui'
import styles from './App.scss'
import Todo from '../Todo/index.jsx'

class App extends React.Component {

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
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <Todo ref={(ref) => { this.todo = ref }} />
        <RaisedButton label="清空TODO" onClick={this.clearTodo} />
      </div>
    )
  }
}

export default App
