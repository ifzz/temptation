import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AppBar } from 'material-ui'

class App extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
        className="container"
      >
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title={this.props.title}
        />
        {this.props.children}
      </div>
    )
  }
}

export default connect(state => ({
  title: state.title,
}), null)(App)
