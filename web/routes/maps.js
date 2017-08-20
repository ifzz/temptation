import Home from 'material-ui/svg-icons/action/home'
import Chat from 'material-ui/svg-icons/communication/chat'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import StrategiesIcon from 'material-ui/svg-icons/action/assessment'
import Rank from 'material-ui/svg-icons/editor/monetization-on'
import IntroIcon from 'material-ui/svg-icons/action/info'

import Index from '../containers/Index'
import Chatroom from '../containers/Chatroom'
import BenifitRank from '../containers/BenifitRank'
import Strategies from '../containers/Strategies'
import Settings from '../containers/Settings'
import Intro from '../containers/Intro'

export default [
  {
    text: '首页',
    path: '/',
    icon: <Home />,
    component: Index,
  },
  {
    text: '聊天室',
    path: '/chatroom',
    icon: <Chat />,
    component: Chatroom,
  },
  {
    text: '收益排行',
    path: '/benifitRank',
    icon: <Rank />,
    component: BenifitRank,
  },
  {
    text: '策略管理',
    path: '/strategies',
    icon: <StrategiesIcon />,
    component: Strategies,
  },
  {
    text: '授权设置',
    path: '/settings',
    icon: <SettingsIcon />,
    component: Settings,
  },
  {
    text: '使用说明',
    path: '/intro',
    icon: <IntroIcon />,
    component: Intro,
  },
]
