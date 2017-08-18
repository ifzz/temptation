import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { closeToast } from '../actions/toast'

import ToastLayer from '../components/Toast'

let itv = -1
const TIME_SPAN = 2200

class Toast extends React.Component {

  static defaultProps = {
    className: undefined,
    toastMessage: '',
  }

  static propTypes = {
    // Injected by React Redux
    toastMessage: PropTypes.string,
    className: PropTypes.string,
    closeToast: PropTypes.func.isRequired,
  }

  render() {
    const {
      className,
    } = this.props

    if (this.props.toastMessage) {
      clearTimeout(itv)
      itv = setTimeout(this.props.closeToast, TIME_SPAN)
    }

    return (
      <ToastLayer
        className={className}
        message={this.props.toastMessage}
        show={!!this.props.toastMessage}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  toastMessage: state.toastMessage,
})

export default connect(mapStateToProps, {
  closeToast,
})(Toast)
