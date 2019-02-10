export default () => {
  let modalNameActiveObj = {}
  let listeners = []

  const isModalActive = (modalName) => {
    if (modalNameActiveObj[modalName] === undefined) return false
    return modalNameActiveObj[modalName]
  }

  const callListeners = (modalNameActiveObj) => {
    listeners.forEach((listener) => {
      listener(modalNameActiveObj)
    })
  }

  const toggleModal = (status) => (modalName) => {
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

  const subscriber = (listener) => {
    listeners = [ ...listeners, listener ]
    // console.log('listeners', listeners)
    return () => {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
      // console.log('listeners', listeners)
    }
  }

  return {
    isModalActive,
    openModal,
    closeModal,
    closeAllModal,
    subscriber
  }
}
