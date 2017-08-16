import React from 'react'

import userApis from '../../apis/users'

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userList: [],
    }
  }

  componentDidMount() {
    console.log('wtf?')
    userApis
      .userList()
      .then(({ userList }) => {
        if (userList) {
          this.setState({
            userList,
          })
        }
      })
  }

  render() {
    return (
      <div>
        大家好，我是你们的INDEX！
        <ul>
          {
            this.state.userList.map(user => (
              <li key={user.id}>
                <span>昵称 {user.nickname}</span>
                <img
                  alt="avatar"
                  src={user.avatar}
                  width={30}
                  height={30}
                />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
