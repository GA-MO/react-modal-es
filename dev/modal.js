// import React from 'react'
import { createModal } from 'react-modal-es'

// const customUI = (title, children, onClose) => (
//   <React.Fragment>
//     <button onClick={onClose}>close</button>
//     {title}
//     {children}
//   </React.Fragment>
// )

const configs = {
  // customUI
}

const modal = createModal(configs)
export const openModal = modal.openModal
export const closeModal = modal.closeModal
export const closeAllModal = modal.closeAllModal
export const ModalProvider = modal.ModalProvider
