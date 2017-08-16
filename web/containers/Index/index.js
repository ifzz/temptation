import React from 'react'
import styles from './styles.scss'

import userApis from '../../../apis/users'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userList: [],
    }
  }

  componentDidMount() {
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
      <div className={styles.app}>
        大家好，我是你们的INDEX！
        <ul>
          {
            this.state.userList.map(user => (
              <li key={user._id}>
                <span>Username {user.username}</span>
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

export default Index
