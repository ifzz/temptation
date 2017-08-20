import {
  Drawer,
  AppBar,
  MenuItem,
} from 'material-ui'
import { connect } from 'react-redux'

import { toggleSideMenu } from '../actions/global'
import LINKS from '../routes/maps'

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
            key={link.path}
            onClick={() => {
              toggleSideMenu(false)
              history.replace(link.path)
            }}
            leftIcon={link.icon}
            primaryText={link.text}
            style={{
              margin: '.8rem auto 0 auto',
            }}
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
