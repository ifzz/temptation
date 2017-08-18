import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import Share from 'material-ui/svg-icons/social/share'
import Divider from 'material-ui/Divider'
import Logout from 'material-ui/svg-icons/maps/directions-run'
import Switch from 'material-ui/svg-icons/action/compare-arrows'
import { connect } from 'react-redux'

import { logout } from '../actions/users'
import { toggleLoginDialog } from '../actions/global'

const Logged = ({ logout, toggleLoginDialog, ...props }) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="账户" leftIcon={<Settings />} />
    <MenuItem primaryText="分享" leftIcon={<Share />} />
    <Divider />
    <MenuItem
      primaryText="切换账户"
      onClick={() => {
        toggleLoginDialog(true)
      }}
      leftIcon={<Switch />}
    />
    <MenuItem
      primaryText="注销"
      onClick={logout}
      leftIcon={<Logout />}
    />
  </IconMenu>
)

Logged.propTypes = {
  logout: PropTypes.func.isRequired,
}

Logged.muiName = 'IconMenu'

export default connect(
  null,
  {
    logout,
    toggleLoginDialog,
  },
)(Logged)
