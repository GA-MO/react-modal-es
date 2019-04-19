import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Animation from './Animation'
import styles from './defaultStyles'
import { canUseDOM } from './helper'

class Modal extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    center: PropTypes.bool,
    className: PropTypes.string,
    maxWidth: PropTypes.string,
    zIndex: PropTypes.number,
    overlayColor: PropTypes.string,
    closeOverlayDisabled: PropTypes.bool,
    didOpen: PropTypes.func,
    willUnmount: PropTypes.func,
    willClose: PropTypes.func
  }

  static defaultProps = {
    zIndex: 0,
    className: '',
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    closeOverlayDisabled: false,
    didOpen: () => false,
    willUnmount: () => false,
    willClose: () => false
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
    this.unsubscribe = this.context.subscriber(this.subscriber)

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
    this.unsubscribe()
  }

  subscriber = () => {
    const { didOpen, willClose, name } = this.props
    const isActive = this.context.isModalActive(name)

    this.setState({
      isActive
    })

    if (isActive) didOpen()
    if (!isActive) willClose()
  }

  getStyles = name => {
    const { center, maxWidth, zIndex, overlayColor } = this.props
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
        return { ...styles.overlay, background: overlayColor }
      }
      case 'bodyWrapper': {
        return { ...styles.bodyWrapper }
      }
      case 'body': {
        if (maxWidth) {
          return { ...styles.body, width: '100%', maxWidth }
        }
        return { ...styles.body }
      }
      case 'title': {
        return { ...styles.title }
      }
      case 'content': {
        return { ...styles.content }
      }
      case 'buttonArrow': {
        return { ...styles.buttonArrow }
      }
      case 'arrowLeft': {
        return { ...styles.arrow, transform: 'rotate(45deg)' }
      }
      case 'arrowRight': {
        return { ...styles.arrow, transform: 'rotate(-45deg)' }
      }
    }
  }

  onCloseModal = () => {
    this.context.closeModal(this.props.name)
  }

  handleClickCloseOverlay = () => {
    const { closeOverlayDisabled } = this.props
    if (closeOverlayDisabled) return false
    this.onCloseModal()
  }

  renderCustomUI = () => {
    const { title, children } = this.props
    return this.context.customUI(title, children, this.onCloseModal)
  }

  render() {
    const { isActive } = this.state
    const { title, children, className } = this.props

    const element = (
      <Animation show={isActive}>
        {({ opacity, opacityModal, y }) => (
          <div role='wrapper' style={this.getStyles('wrapper')}>
            <div
              role='overlay'
              style={{
                ...this.getStyles('overlay'),
                opacity
              }}
              onClick={this.handleClickCloseOverlay}
            />
            <div
              role='dialog'
              style={{
                ...this.getStyles('bodyWrapper'),
                opacity: opacityModal,
                transform: `translate3d(0px, ${y}px, 0px)`
              }}
            >
              <Body>
                {this.renderCustomUI()}
                {!this.renderCustomUI() && (
                  <div
                    role='dialog-body'
                    className={className}
                    style={{ ...this.getStyles('body') }}
                  >
                    <div
                      role='content'
                      style={this.getStyles('buttonArrow')}
                      onClick={this.onCloseModal}
                    >
                      <div style={this.getStyles('arrowLeft')} />
                      <div style={this.getStyles('arrowRight')} />
                    </div>
                    {title !== '' && (
                      <div role='dialog-title' style={this.getStyles('title')}>
                        {title}
                      </div>
                    )}
                    <div
                      role='dialog-content'
                      style={this.getStyles('content')}
                    >
                      {children}
                    </div>
                  </div>
                )}
              </Body>
            </div>
          </div>
        )}
      </Animation>
    )

    return ReactDOM.createPortal(element, this.modal)
  }
}

const Body = ({ children }) => (
  <div
    style={{
      pointerEvents: 'auto'
    }}
  >
    {children}
  </div>
)

export default Modal
