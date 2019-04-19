import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Animation from './Animation'
import getStyles from './getStyles'
import { canUseDOM } from './helper'
import ModalContext from './ModalContext'

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
  let modal = null

  if (canUseDOM()) {
    modal = document.createElement('div')
    modal.id = props.name
  }

  const context = useContext(ModalContext)
  const [isActive, setActive] = useState(true)

  useEffect(() => {
    const subscriber = () => {
      const isActive = context.isModalActive(name)

      setActive(isActive)

      if (isActive) didOpen()
      if (!isActive) willClose()
    }

    const unsubscribe = context.subscriber(subscriber)
    const id = 'body-modal-es'
    let container = null

    if (canUseDOM()) {
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
    return () => {
      willUnmount()
      container.removeChild(modal)
      unsubscribe()
    }
  }, [])

  const onCloseModal = () => {
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
    <div className='kkk'>
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
                transform: `translate3d(0px, ${y}px, 0px)`
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
    </div>
  )

  console.log('modal', modal)
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
