import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import Settings from 'material-ui/svg-icons/action/settings'
import Share from 'material-ui/svg-icons/social/share'
import Divider from 'material-ui/Divider'
import Logout from 'material-ui/svg-icons/maps/directions-run'

const Logged = props => (
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
    <MenuItem primaryText="登出" leftIcon={<Logout />} />
  </IconMenu>
)

Logged.muiName = 'IconMenu'

export default Logged
