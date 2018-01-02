# react-modal-es
Easy to control the Modal everywhere.

[![Build Status](https://circleci.com/gh/GA-MO/react-modal-es.png)](https://circleci.com/gh/GA-MO/react-modal-es)
[![npm version](https://badge.fury.io/js/react-modal-es.png)](https://badge.fury.io/js/react-modal-es)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
  * Step1: [Create Modal](#create-modal)
  * Step2: [Connect Modal](#connect-modal)
  * Step3: [Modal Component](#modal-component)
* [Props](#props)


## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install react-modal-es
    $ yarn add react-modal-es


## Usage

- ## Step1:
### Create modal
Create file `modal.js` and import `createModal` to create modal functions:
 - `openModal(modalName)` to show the Modal
 - `closeModal(modalName)` to hide the Modal
 - `closeAllModal()` to hide all Modals
 - `connectModal` to [Connect Modal](#connect-modal) at root app
```jsx
import { createModal } from 'react-modal-es'

const modal = createModal()
export const openModal = modal.openModal
export const closeModal = modal.closeModal
export const closeAllModal = modal.closeAllModal
export const connectModal = modal.connectModal
```



- ## Step2:
### Connect Modal

import `connectModal` from `modal.js` and connect modal at root app.


```jsx
...
import { connectModal } from './modal'

@connectModal
class App extends React.Component {
  render() {
    return (
      <div>
        ...
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```


- ## Step3:
### Modal Component
The Modal has one required prop:

- `name` to switch show and hide.

```jsx
import Modal from 'react-modal-es'
import 'react-modal-es/css/style.css' // Default style
import { openModal, closeModal, closeAllModal } from './modal'

class Page extends React.Component {
  render() {
    return (
      <div>
        <Modal name='myModal' title='Title Modal'>Content</Modal>
        <button onClick={() => openModal('myModal')}>Open Modal</button>
      </div>
    )
  }
}
```

#### Open multiple Modals


```jsx
import Modal from 'react-modal-es'
import 'react-modal-es/css/style.css' // Default style
import { openModal, closeModal, closeAllModal } from './modal'

class Page extends React.Component {
  onOpenModal = () => {
    openModal('modal1')
    openModal('modal2')
  }
  render() {
    return (
      <div>
        <Modal name='modal1' title='Title Modal 1'>Content 1</Modal>
        <Modal name='modal2' title='Title Modal 2'>Content 2</Modal>
        <button onClick={this.onOpenModal}>Open Modal</button>
      </div>
    )
  }
}
```

## Props

```jsx
<Modal
  name='myModal'
  title='Modal Title'
  zIndex='1'
  maxWidth='600px'
  center={false}
  willUnmount={() => null}
>
...
</Modal>
```