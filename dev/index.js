import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal-es'
import { connectModal, openModal } from './modal'
import '../css/style.css'

@connectModal
class App extends React.Component {
  render () {
    return (
      <div>
        <Modal
          name='firstModal'
          title='Title Modal'
          zIndex={1}
          className='your-classname'
          maxWidth='600px'
          overlayColor='rgba(0, 0, 0, 0.7)'
          // center={true}
          closeOverlayDisabled={false}
          didOpen={() => console.log('didOpen')}
          willUnmount={() => console.log('willUnmount')}
          willClose={() => console.log('willClose')}
        >
          Content
        </Modal>
        <button onClick={() => openModal('firstModal')}>Open Modal</button>
      </div>
    )
  }
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
