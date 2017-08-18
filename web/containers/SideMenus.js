import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'

import { toggleSideMenu } from '../actions/global'

const LINKS = [
  {
    text: '首页',
    to: '/',
  },
]

class SideMenus extends React.Component {

  static propTypes = {
    toggleSideMenu: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.closeSideMenu = this.closeSideMenu.bind(this)
  }

  closeSideMenu() {
    this.props.toggleSideMenu(false)
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.sideMenuOpened}
        onRequestChange={this.closeSideMenu}
      >
        {
          LINKS.map(link => (
            <Link
              to={link.to}
              key={link.to}
            >
              <MenuItem
                onClick={this.closeSideMenu}
              >
                {link.text}
              </MenuItem>
            </Link>
          ))
        }
      </Drawer>
    )
  }
}

export default connect(
  state => ({
    sideMenuOpened: state.sideMenuOpened,
  }), {
    toggleSideMenu,
  },
)(SideMenus)
