export default () => {
  let modalNameActiveObj = {}
  let listeners = []

  const isModalActive = modalName => modalNameActiveObj[modalName]

  const callListeners = modalNameActiveObj => {
    listeners.forEach(listner => {
      listner(modalNameActiveObj)
    })
  }

  const toggleModal = modalName => {
    modalNameActiveObj = {
      ...modalNameActiveObj,
      [modalName]: !modalNameActiveObj[modalName]
    }
    callListeners(modalNameActiveObj)
  }

  const openModal = toggleModal
  const closeModal = toggleModal
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
