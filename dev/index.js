import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal-es'
import { ModalProvider, openModal } from './modal'
import '../css/style.css'

class App extends React.Component {
  render() {
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
      </ModalProvider>
    )
  }
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
