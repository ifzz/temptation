import React from 'react'
import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import {
  Avatar,
  TextField,
  RaisedButton,
  List,
  ListItem,
} from 'material-ui'

import { alert } from '../actions/dialog'

const SERVICE_NAME_PREFIX = 'chatroom:'
const CHARACTER_LENGTH_LIMITATION = 60
const GO_BOTTOM = () => {
  document.querySelector('#chat-container').scrollTop = Number.MAX_SAFE_INTEGER
}

class Chatroom extends React.Component {

  static propTypes = {
    userLogin: PropTypes.bool.isRequired,
    userInfo: PropTypes.object.isRequired,
    alert: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      msgPayloadCollection: [],
      onlineUserCount: 0,
    }
    this.client = null
    this.onPress = this.onPress.bind(this)
    this.sendMsg = this.sendMsg.bind(this)
  }

  componentDidMount() {
    let setUserCount = ({ numUsers }) => {
      this.setState({
        onlineUserCount: numUsers,
      })
    }

    this.client = socketIOClient()
    // init socket user
    this.client.on('connect', () => {
      this.client.emit(`${SERVICE_NAME_PREFIX}add user`)
    })
    // receive new message...
    this.client.on(`${SERVICE_NAME_PREFIX}new message`, (dataPayload) => {
      this.setState((prev) => {
        prev.msgPayloadCollection[prev.msgPayloadCollection.length] = dataPayload
        return {
          msgPayloadCollection: prev.msgPayloadCollection,
        }
      }, GO_BOTTOM)
    })
    // chatroom users
    this.client.on(`${SERVICE_NAME_PREFIX}login`, setUserCount)
    this.client.on(`${SERVICE_NAME_PREFIX}user joined`, setUserCount)
    this.client.on(`${SERVICE_NAME_PREFIX}user left`, setUserCount)
    this.client.on(`${SERVICE_NAME_PREFIX}recent message`, ({ messages }) => {
      if (messages) {
        this.setState({
          msgPayloadCollection: messages.reverse(),
        }, GO_BOTTOM)
      }
    })
    return null
  }

  componentWillUnmount() {
    if (this.client) {
      this.client.disconnect()
    }
  }

  onPress(event) {
    if (event.key === 'Enter') {
      this.sendMsg()
    }
  }

  sendMsg() {
    let msg = this.txtMsg.getValue()
    if (msg.trim() === '') {
      this.props.alert({
        title: '错误',
        msg: '消息内容不得为空',
      })
    } else if (msg.length > CHARACTER_LENGTH_LIMITATION) {
      this.props.alert({
        title: '错误',
        msg: `消息内容不得大于${CHARACTER_LENGTH_LIMITATION}字`,
      })
    } else {
      let dataPayload = {
        sender: this.props.userInfo,
        message: msg,
        uuid: uuid(),
      }
      this.txtMsg.input.value = ''
      this.client.emit(`${SERVICE_NAME_PREFIX}new message`, dataPayload)
    }
  }

  render() {
    return (
      <div
        className="container dis-flex"
        style={{
          flexDirection: 'column',
        }}
      >
        <div
          className="w-100 bg-green"
          style={{
            lineHeight: '2rem',
            textAlign: 'center',
          }}
        >Current Online : {this.state.onlineUserCount}</div>
        <List
          id="chat-container"
          className="w-100 dis-flex scrolling"
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            height: 'calc(100% - 4rem - 2rem)',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}>
          {
            this.state.msgPayloadCollection.map(({ sender, message, uuid }) => (
              <ListItem
                className="animated fadeIn"
                key={uuid}
                disabled
                leftAvatar={
                  <Avatar src={sender.avatar} />
                }
                primaryText={this.props.userInfo.id === sender.id ? '' : sender.nickname}
                secondaryText={message}
                secondaryTextLines={2}
              />
            ))
          }
        </List>
        <div
          className="dis-flex"
          style={{
            height: '4rem',
            width: '92%',
          }}
        >
          <TextField
            ref={(ref) => { this.txtMsg = ref }}
            hintText={this.props.userLogin ? `消息内容(${CHARACTER_LENGTH_LIMITATION}字以内)` : '登录后才能发言'}
            className="flex-1"
            disabled={!this.props.userLogin}
            onKeyPress={this.onPress}
          />
          <RaisedButton
            primary
            keyboardFocused
            className="m-l-10"
            label="发送"
            disabled={!this.props.userLogin}
            onClick={this.sendMsg}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    userLogin: state.userLogin,
    userInfo: state.userInfo,
  }), {
    alert,
  },
)(Chatroom)
