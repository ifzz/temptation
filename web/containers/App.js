import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  AppBar,
  Dialog,
  IconButton,
  FlatButton,
} from 'material-ui'
import AccountIcon from 'material-ui/svg-icons/social/person'

import Logged from './NavLogged'
import SideMenus from './SideMenus'
import LoginDialog from './LoginDialog'
import UserInfoDialog from './UserInfoDialog'
import Toast from './Toast'

import { toggleSideMenu, toggleLoginDialog } from '../actions/global'
import { closeDialog } from '../actions/dialog'

class App extends React.Component {

  static defaultProps = {
    alertMessagePayload: {},
    confirmMessagePayload: {},
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    toggleSideMenu: PropTypes.func.isRequired,
    alertMessagePayload: PropTypes.object,
    confirmMessagePayload: PropTypes.object,
    closeDialog: PropTypes.func.isRequired,
    // history: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {}
    this.renderDialog = this.renderDialog.bind(this)
  }

  // 渲染弹窗
  renderDialog() {
    const {
      alertMessagePayload,
      confirmMessagePayload,
     } = this.props

    if (alertMessagePayload) {  // 警告弹窗
      let actions = [
        <FlatButton
          label={alertMessagePayload.btnText}
          primary
          keyboardFocused
          onClick={() => {
            this.props.closeDialog()
            // execute the callback function
            if (typeof alertMessagePayload.callback === 'function') {
              alertMessagePayload.callback()
            }
          }}
        />,
      ]

      return (
        <Dialog
          title={alertMessagePayload.title}
          titleStyle={{
            backgroundColor: '#faf1ba',
            padding: '.8rem 1.4rem',
            marginBottom: '1rem',
          }}
          actions={actions}
          open
          onRequestClose={this.props.closeDialog}
        >
          {alertMessagePayload.msg}
        </Dialog>
      )
    }

    if (confirmMessagePayload) {  // confirm 弹窗
      let actions = [
        <FlatButton
          label={confirmMessagePayload.cancelText}
          onClick={() => {
            this.props.closeDialog()
            if (typeof confirmMessagePayload.cancelCallback === 'function') {
              confirmMessagePayload.cancelCallback()
            }
          }}
          primary
        />,
        <FlatButton
          label={confirmMessagePayload.confirmText}
          onClick={() => {
            this.props.closeDialog()
            // execute the callback function
            if (typeof confirmMessagePayload.confirmCallback === 'function') {
              confirmMessagePayload.confirmCallback()
            }
          }}
          keyboardFocused
          primary
        />,
      ]
      return (
        <Dialog
          title={confirmMessagePayload.title}
          titleStyle={{
            backgroundColor: '#baf1fa',
            padding: '.8rem 1.4rem',
            marginBottom: '1rem',
          }}
          actions={actions}
          modal
          open
        >
          {confirmMessagePayload.msg}
        </Dialog>
      )
    }

    return null
  }

  render() {
    return (
      <div
        className="container"
      >
        {this.renderDialog()}
        <Toast />
        <AppBar
          title={this.props.title}
          titleStyle={{ textAlign: 'center' }}
          iconElementRight={
            this.props.userLogin
              ? <Logged style={{ marginLeft: '8px' }} />
              : <IconButton style={{ marginLeft: '8px' }}>
                <AccountIcon
                  label="登录"
                  onClick={() => { this.props.toggleLoginDialog(true) }}
                />
              </IconButton>
          }
          onLeftIconButtonTouchTap={() => { this.props.toggleSideMenu(true) }}
        />
        <SideMenus history={this.props.history} />
        <LoginDialog />
        <UserInfoDialog />
        {this.props.children}
      </div>
    )
  }
}

export default connect(
  state => ({
    title: state.title,
    userLogin: state.userLogin,
    alertMessagePayload: state.alertMessage,
    confirmMessagePayload: state.confirmMessage,
  }), {
    toggleLoginDialog,
    toggleSideMenu,
    closeDialog,
  },
)(App)
