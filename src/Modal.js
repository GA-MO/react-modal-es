import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Animation from './Animation'
import getStyles from './getStyles'
import { canUseDOM } from './helper'
import ModalContext from './ModalContext'

let modal = canUseDOM() && document.createElement('div')
const id = 'body-modal-es'
let container = null

const Modal = props => {
  const {
    closeOverlayDisabled,
    title,
    className,
    didOpen,
    willClose,
    willUnmount,
    name,
    children
  } = props

  const context = useContext(ModalContext)
  const [isActive, setActive] = useState(context.isModalActive(name))

  const subscriber = () => {
    const isActive = context.isModalActive(name)

    setActive(isActive)

    if (isActive) didOpen()
  }

  useEffect(() => {
    if (canUseDOM()) {
      modal.id = props.name
      container = document.getElementById(id)

      if (!container) {
        container = document.createElement('div')
        container.id = id
        container.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 99;
        `
        document.body.appendChild(container)
      }

      container.appendChild(modal)
    }

    const unsubscribe = context.subscriber(subscriber)

    return () => {
      willUnmount()
      container.removeChild(modal)
      unsubscribe()
    }
  }, [])

  const onCloseModal = () => {
    willClose()
    context.closeModal(name)
  }

  const handleClickCloseOverlay = () => {
    if (closeOverlayDisabled) return false
    onCloseModal()
  }

  const renderCustomUI = () => {
    return context.customUI(title, children, onCloseModal)
  }

  const style = getStyles(props)

  const element = (
    <Animation show={isActive}>
      {({ opacity, opacityModal, y }) => (
        <div role='wrapper' style={style('wrapper')}>
          <div
            role='overlay'
            style={{
              ...style('overlay'),
              opacity
            }}
            onClick={handleClickCloseOverlay}
          />
          <div
            role='modal'
            style={{
              ...style('bodyWrapper'),
              opacity: opacityModal,
              transform: `translate3d(0px, ${y}px, 0)`
            }}
          >
            <Body>
              {renderCustomUI()}
              {!renderCustomUI() && (
                <div role='modal-body' className={className} style={style('body')}>
                  <div role='content' style={style('buttonArrow')} onClick={onCloseModal}>
                    <div style={style('arrowLeft')} />
                    <div style={style('arrowRight')} />
                  </div>
                  {title !== '' && (
                    <div role='modal-title' style={style('title')}>
                      {title}
                    </div>
                  )}
                  <div role='modal-content' style={style('content')}>
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

  return ReactDOM.createPortal(element, modal)
}

Modal.propTypes = {
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

Modal.defaultProps = {
  zIndex: 0,
  className: '',
  overlayColor: 'rgba(0, 0, 0, 0.7)',
  closeOverlayDisabled: false,
  didOpen: () => false,
  willUnmount: () => false,
  willClose: () => false
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
