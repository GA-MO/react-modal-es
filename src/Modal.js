import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './defaultStyles'
import { canUseDOM } from './helper'

class Modal extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    center: PropTypes.bool,
    maxWidth: PropTypes.string,
    zIndex: PropTypes.number,
    overlayColor: PropTypes.string,
    willUnmount: PropTypes.func
  }

  static defaultProps = {
    maxWidth: '600px',
    zIndex: 0,
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    willUnmount: () => false
  }

  static contextTypes = {
    isModalActive: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    closeAllModal: PropTypes.func,
    customUI: PropTypes.func,
    subscriber: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      isActive: false
    }

    if (canUseDOM()) {
      this.modal = document.createElement('div')
      this.modal.id = props.name
    }
  }

  isActive = () => {
    const { modalNameActive } = this.state
    const { name } = this.props
    return modalNameActive === name
  }

  componentDidMount() {
    this.setState({
      isActive: this.context.isModalActive(this.props.name)
    })
    this.context.subscriber(this.subscriber)

    if (canUseDOM()) {
      const id = 'body-modal-es'
      this.container = document.getElementById(id)

      if (!this.container) {
        this.container = document.createElement('div')
        this.container.id = id
        this.container.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 99;
        `
        document.body.appendChild(this.container)
      }

      this.container.appendChild(this.modal)
    }
  }

  componentWillUnmount() {
    this.props.willUnmount()
    this.container.removeChild(this.modal)
  }

  subscriber = () => {
    this.setState({
      isActive: this.context.isModalActive(this.props.name)
    })
  }

  getStyles = name => {
    const { center, maxWidth, zIndex } = this.props
    switch (name) {
      case 'wrapper': {
        let style = {
          ...styles.wrapper,
          zIndex
        }

        if (center) {
          style = { ...style, ...styles.center }
        }

        return style
      }
      case 'overlay': {
        return { ...styles.overlay }
      }
      case 'body': {
        return { ...styles.body, maxWidth }
      }
    }
  }

  onCloseModal = () => {
    this.context.closeModal(this.props.name)
  }

  renderCustomUI = () => {
    const { title, children } = this.props
    return this.context.customUI(title, children, this.onCloseModal)
  }

  render() {
    const { isActive } = this.state
    const { title, children, overlayColor } = this.props
    if (!isActive) return null

    const element = (
      <div style={this.getStyles('wrapper')}>
        <div
          style={{ ...this.getStyles('overlay'), background: overlayColor }}
          onClick={this.onCloseModal}
        />
        <div style={this.getStyles('body')}>
          {this.renderCustomUI()}
          {!this.renderCustomUI() && (
            <React.Fragment>
              <div className='modal-es-close-button' onClick={this.onCloseModal} />
              {title !== '' && <div className='modal-es-title'>{title}</div>}
              <div className='modal-es-content'>{children}</div>
            </React.Fragment>
          )}
        </div>
      </div>
    )

    return ReactDOM.createPortal(element, this.modal)
  }
}

export default Modal
