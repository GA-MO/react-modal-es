export default () => {
  let modalNameActiveObj = {}
  let listeners = []

  const isModalActive = modalName => modalNameActiveObj[modalName]

  const callListeners = modalNameActiveObj => {
    listeners.forEach(listner => {
      listner(modalNameActiveObj)
    })
  }

  const toggleModal = status => modalName => {
    modalNameActiveObj = {
      ...modalNameActiveObj,
      [modalName]: status
    }
    callListeners(modalNameActiveObj)
  }

  const openModal = toggleModal(true)
  const closeModal = toggleModal(false)
  const closeAllModal = () => {
    for (let key in modalNameActiveObj) {
      modalNameActiveObj = {
        ...modalNameActiveObj,
        [key]: false
      }
    }
  }

  const subscriber = listener => {
    listeners = [...listeners, listener]
  }

  return {
    isModalActive,
    openModal,
    closeModal,
    closeAllModal,
    subscriber
  }
}
