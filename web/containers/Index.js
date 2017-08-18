import React from 'react'

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userList: [],
    }
  }

  componentDidMount() { }

  render() {
    return (
      <div>
        大家好，我是你们的INDEX
      </div>
    )
  }
}
