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
      <div className="container">
        <h2>人见人爱的首页</h2>
      </div>
    )
  }
}
