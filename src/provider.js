import React from 'react'
import ModalContext from './ModalContext'

export default modal => ({ customUI = () => false }) => props => {
  if (!modal) return null

  const contextData = {
    isModalActive: modal.isModalActive,
    openModal: modal.openModal,
    closeModal: modal.closeModal,
    closeAllModal: modal.closeAllModal,
    subscriber: modal.subscriber,
    customUI
  }

  return <ModalContext.Provider value={contextData}>{props.children}</ModalContext.Provider>
}
