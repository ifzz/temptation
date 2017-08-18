import { connect } from 'react-redux'
import {
  Dialog,
  TextField,
  FlatButton,
} from 'material-ui'

import { toggleLoginDialog } from '../actions/global'
import { login, register } from '../actions/users'
import { toast } from '../actions/toast'

class LoginDialog extends React.Component {

  static propTypes = {
    loginDialogOpened: PropTypes.bool.isRequired,
    toggleLoginDialog: PropTypes.func.isRequired,
    toast: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
    }

    this.closeDialog = this.closeDialog.bind(this)
    this.changeToReg = this.changeToReg.bind(this)
    this.changeToLogin = this.changeToLogin.bind(this)
    this.submit = this.submit.bind(this)
  }

  submit() {
    let username = this.txtUsername.getValue()
    let pwd = this.txtPwd.getValue()
    let confirmPwd = this.txtConfirmPwd.getValue()
    if (!username) {
      this.props.toast('请填写用户名!')
      return
    } else if (!pwd) {
      this.props.toast('请填写密码!')
      return
    } else if (!this.state.isLogin) {
      if (!confirmPwd) {
        this.props.toast('请填写确认密码!')
        return
      } else if (confirmPwd !== pwd) {
        this.props.toast('两次输入的密码不一致!')
        return
      }
    }

    if (this.state.isLogin) {
      // 注册
      this.props.login(username, pwd, this.closeDialog)
    } else {
      // 登录
      this.props.register(username, pwd, confirmPwd, this.closeDialog)
    }
  }

  changeToLogin() {
    this.setState({
      isLogin: true,
    })
  }

  changeToReg() {
    this.setState({
      isLogin: false,
    })
  }

  closeDialog() {
    this.props.toggleLoginDialog(false)
  }

  render() {
    return (
      <Dialog
        open={this.props.loginDialogOpened}
        onRequestClose={this.closeDialog}
        modal={false}
        autoScrollBodyContent
        title="欢迎使用 Temptation"
        titleStyle={{
          backgroundColor: this.state.isLogin ? '#00bcd4' : '#00d4b8',
          color: this.state.isLogin ? '#fafafa' : '#fffa42',
          padding: this.state.isLogin ? '.8rem 1.4rem' : '.4rem 1.4rem',
          fontSize: this.state.isLogin ? '1.5rem' : '1.2rem',
          transition: 'all .4s ease',
        }}
      >
        <div>
          <TextField
            ref={(ref) => { this.txtUsername = ref }}
            hintText="请输入用户名"
            fullWidth
            style={{
              margin: '1rem auto 0 auto',
            }}
          />
          <TextField
            ref={(ref) => { this.txtPwd = ref }}
            hintText="请输入密码"
            fullWidth
            type="password"
          />
          <TextField
            ref={(ref) => { this.txtConfirmPwd = ref }}
            hintText="请输入确认密码"
            fullWidth
            type="password"
            className="animated fadeIn"
            style={{
              display: this.state.isLogin ? 'none' : 'block',
            }}
          />
          <FlatButton
            fullWidth
            keyboardFocused
            primary
            style={{
              margin: '1.5rem auto 0 auto',
              backgroundColor: this.state.isLogin ? '#c8feff' : '#fffbc8',
            }}
            onClick={this.submit}
          >
            {this.state.isLogin ? '登录' : '注册'}
          </FlatButton>

          <div
            className="w-100 m-t-10 text-right"
          >
            <span
              className="label hand-cursor"
              role="button"
              tabIndex="-1"
              onClick={this.state.isLogin ? this.changeToReg : this.changeToLogin}
            >{this.state.isLogin ? '没有账号?' : '已有账号'}</span>
          </div>
        </div>
      </Dialog >
    )
  }
}

export default connect(
  state => ({
    loginDialogOpened: state.loginDialogOpened,
  }), {
    toggleLoginDialog,
    toast,
    login,
    register,
  },
)(LoginDialog)
