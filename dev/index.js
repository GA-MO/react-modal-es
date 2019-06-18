import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal-es'
import { ModalProvider, openModal } from './modal'
import '../css/style.css'

const App = () => {
  return (
    <ModalProvider>
      <Modal
        name='firstModal'
        title='Title Modal'
        zIndex={1}
        className='your-classname'
        maxWidth='600px'
        overlayColor='rgba(0, 0, 0, 0.7)'
        // center
        // closeOverlayDisabled
        didOpen={() => console.log('didOpen')}
        willUnmount={() => console.log('willUnmount')}
        willClose={() => console.log('willClose')}
      >
        Content
      </Modal>
      <button onClick={() => openModal('firstModal')}>Open Modal</button>
      <Modal
        name='secoundModal'
        title='Title Modal 2'
        zIndex={1}
        className='your-classname'
        maxWidth='600px'
        overlayColor='rgba(0, 0, 0, 0.7)'
        // center
        // closeOverlayDisabled
        didOpen={() => console.log('didOpen')}
        willUnmount={() => console.log('willUnmount')}
        willClose={() => console.log('willClose')}
      >
        Content
      </Modal>
      <button onClick={() => openModal('secoundModal')}>Open Modal 2</button>
    </ModalProvider>
  )
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
