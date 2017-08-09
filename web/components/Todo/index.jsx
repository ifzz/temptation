import React from 'react'
import TextField from 'material-ui/TextField'
import { List, ListItem } from 'material-ui/List'
import uuid from 'uuid/v4'
import styles from './styles.scss'

class Todo extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      txt: '',
    }
    this.inputOnChange = this.inputOnChange.bind(this)
    this.inputOnKeydown = this.inputOnKeydown.bind(this)
  }

  clear() {
    this.setState({
      items: [],
    })
  }

  inputOnKeydown(event) {
    if (event.keyCode === 13) {
      let value = event.target.value
      if (value === '' || value.length === 0) {
        return true
      } else {
        this.setState(prev => ({
          items: prev.items.concat({
            text: value,
            done: false,
          }),
          txt: '',
        }))
      }
    }
  }

  inputOnChange(event) {
    let value = event.target.value
    this.setState({
      txt: value,
    })
  }

  changeItemStatus(id) {
    this.setState(prev => ({
      items: prev.items.map((item) => {
        if (item.id === id) {
          item.done = !item.done
        }
        return item
      }),
    }))
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            value={this.state.txt}
            floatingLabelText="请输入待完成事项"
            onKeyDown={this.inputOnKeydown}
            onChange={this.inputOnChange}
          />
        </div>
        <div className={styles.list}>
          <List>
            {
              this.state.items.map((item) => {
                item.id = uuid()
                return (
                  <ListItem
                    key={item.id}
                    onClick={() => this.changeItemStatus(item.id)}
                    className={item.done ? styles.itemDone : styles.itemUndone}>
                    {item.text}
                  </ListItem>
                )
              })
            }
          </List>
        </div>
      </div >
    )
  }
}

export default Todo
