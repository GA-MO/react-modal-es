import React from 'react'
import PropTypes from 'prop-types'

export default (modal) => ({ customUI = () => false }) => Component => {
  if (!modal) return null
  if (!Component) return null

  class Provider extends React.Component {
    static childContextTypes = {
      isModalActive: PropTypes.func,
      openModal: PropTypes.func,
      closeModal: PropTypes.func,
      closeAllModal: PropTypes.func,
      subscriber: PropTypes.func,
      customUI: PropTypes.func
    }

    getChildContext() {
      return {
        isModalActive: modal.isModalActive,
        openModal: modal.openModal,
        closeModal: modal.closeModal,
        closeAllModal: modal.closeAllModal,
        subscriber: modal.subscriber,
        customUI
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return Provider
}
