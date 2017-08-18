import React from 'react'

import {
  TextField,
} from 'material-ui'

export default class Chatroom extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <div>
          ...
        </div>
        <TextField
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine
          rows={2}
        />
      </div>
    )
  }
}
