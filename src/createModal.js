import modalState from './modalState'
import provider from './provider'

export default (configs = {}) => {
  const modal = modalState()

  return {
    openModal: modal.openModal,
    closeModal: modal.closeModal,
    closeAllModal: modal.closeAllModal,
    ModalProvider: provider(modal)(configs)
  }
}
