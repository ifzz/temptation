import {
  Drawer,
  AppBar,
  MenuItem,
} from 'material-ui'

import Home from 'material-ui/svg-icons/action/home'
import Chat from 'material-ui/svg-icons/communication/chat'

import { connect } from 'react-redux'

import { toggleSideMenu } from '../actions/global'

const LINKS = [
  {
    text: '首页',
    to: '/',
    icon: <Home />,
  },
  {
    text: '聊天室',
    to: '/chatroom',
    icon: <Chat />,
  },
]

const SideMenus = ({
  history,
  toggleSideMenu,
  sideMenuOpened,
}) =>
  (
    <Drawer
      docked={false}
      width={200}
      open={sideMenuOpened}
      onRequestChange={() => { toggleSideMenu(false) }}
    >
      <AppBar
        title="Temptation"
        titleStyle={{
          fontSize: '1.4rem',
        }}
        showMenuIconButton={false}
        className="bg-green"
      />
      {
        LINKS.map(link => (
          <MenuItem
            key={link.to}
            onClick={() => {
              toggleSideMenu(false)
              history.replace(link.to)
            }}
            leftIcon={link.icon}
            primaryText={link.text}
          />
        ))
      }
    </Drawer>
  )

SideMenus.propTypes = {
  history: PropTypes.object.isRequired,
  toggleSideMenu: PropTypes.func.isRequired,
  sideMenuOpened: PropTypes.bool.isRequired,
}


export default connect(
  state => ({
    sideMenuOpened: state.sideMenuOpened,
  }), {
    toggleSideMenu,
  },
)(SideMenus)
