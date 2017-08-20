import { connect } from 'react-redux'
import {
  Dialog,
  Avatar,
} from 'material-ui'
import ListItem from 'material-ui/List/ListItem'

import { toggleUserInfoDialog } from '../actions/global'

class UserInfoDialog extends React.Component {

  static propTypes = {
    userInfoDialogOpened: PropTypes.bool.isRequired,
    toggleUserInfoDialog: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.closeDialog = this.closeDialog.bind(this)
  }

  closeDialog() {
    this.props.toggleUserInfoDialog(false)
  }

  render() {
    return (
      <Dialog
        open={this.props.userInfoDialogOpened}
        onRequestClose={this.closeDialog}
        modal={false}
        autoScrollBodyContent
        title={this.props.userInfo.username}
        titleStyle={{
          color: '#fafafa',
          backgroundColor: '#1BBFB7',
          padding: '.8rem 1.4rem',
          fontSize: '1.5rem',
          transition: 'all .4s ease',
        }}
      >
        <ListItem
          primaryText="昵称"
          secondaryText={this.props.userInfo.nickname}
          leftAvatar={
            <Avatar
              src={this.props.userInfo.avatar}
              style={{
                left: '0',
              }}
            />
          }
          className="text-right"
          disabled
        />
      </Dialog >
    )
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo,
    userInfoDialogOpened: state.userInfoDialogOpened,
  }), {
    toggleUserInfoDialog,
  },
)(UserInfoDialog)
