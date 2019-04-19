# react-modal-es

Easy to control the Modal everywhere.

[![Build Status](https://circleci.com/gh/GA-MO/react-modal-es.svg)](https://circleci.com/gh/GA-MO/react-modal-es)
[![npm version](https://badge.fury.io/js/react-modal-es.svg)](https://badge.fury.io/js/react-modal-es)

**Note:** Version 2.x is require React 16.8.x

[Migrating from 1.x](https://github.com/GA-MO/react-modal-es/blob/master/Migrating-from-1x.md)

[1.x docs](https://github.com/GA-MO/react-modal-es/blob/master/Document-v1.md)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - Step1: [Create Modal](#create-modal)
  - Step2: [Modal Provider](#modal-provider)
  - Step3: [Modal Component](#modal-component)
- [Props](#props)
- [Config options](#config-options)
  - [Custom UI](#custom-ui)
- [Demo](#demo)
  - [Basic Modal](https://codesandbox.io/s/lpl3524q8z)
  - [Multiple Modal](https://codesandbox.io/s/301k3j55pq)
  - [Custom UI Modal](https://codesandbox.io/s/p970p0484m)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install react-modal-es
    $ yarn add react-modal-es

## Usage

### Step1:

### Create modal

Create file `modal.js` and import `createModal` to create modal functions:

- `openModal(modalName)` to show the Modal
- `closeModal(modalName)` to hide the Modal
- `closeAllModal()` to hide all Modals
- `ModalProvider` makes the Modal state available to any nested components [Example Usage](#modal-provider)

```jsx
import { createModal } from 'react-modal-es';

const modal = createModal();
export const openModal = modal.openModal;
export const closeModal = modal.closeModal;
export const closeAllModal = modal.closeAllModal;
export const ModalProvider = modal.ModalProvider;
```

### Step2:

### Modal Provider

import `ModalProvider` from `modal.js` and connect modal at root app.

```jsx
...
import { ModalProvider } from './modal';

const App = () => {
  return (
    <ModalProvider>
      ...
    </ModalProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### Step3:

### Modal Component

The Modal has one required prop [Demo](https://codesandbox.io/s/lpl3524q8z):

- `name` to switch show and hide.

```jsx
import Modal from 'react-modal-es';
import { openModal, closeModal, closeAllModal } from './modal';

const Page = () => {
  return (
    <>
      <Modal name='myModal' title='Title Modal'>
        Content
      </Modal>
      <button onClick={() => openModal('myModal')}>Open Modal</button>
    </>
  );
};
```

#### Open multiple Modals

Support open multilple modal [demo](https://codesandbox.io/s/301k3j55pq)

Use prop `zIndex` to make a layer of Modal

```jsx
import Modal from 'react-modal-es';
import { openModal, closeModal, closeAllModal } from './modal';

const Page = () => {
  const onOpenModal = () => {
    openModal('modal1');
    openModal('modal2');
  };

  return (
    <>
      <Modal name='modal1' title='Title Modal 1' zIndex={1}>
        Content 1
      </Modal>
      <Modal name='modal2' title='Title Modal 2' zIndex={2}>
        Content 2
      </Modal>
      <button onClick={onOpenModal}>Open Modal</button>
    </>
  );
};
```

## Props

```jsx
<Modal
  name='myModal'
  title='Modal Title'
  zIndex={1}
  className='your-classname'
  maxWidth='600px'
  overlayColor='rgba(0, 0, 0, 0.7)'
  center={false}
  closeOverlayDisabled={false}
  didOpen={() => null}
  willUnmount={() => null}
  willClose={() => null}
>
  ...
</Modal>
```

## Config options

### Custom UI

Building your own custom UI and Style [demo](https://codesandbox.io/s/p970p0484m)

3 parameters of `customUI`

- `title` type string
- `children` type node
- `onClose` type function

```jsx
import React from 'react'
import { createModal } from 'react-modal-es'

const customStyles = {
  body: {
    fontFamily: 'arial',
    background: '#222',
    color: '#eee',
    padding: '40px',
    textAlign: 'center'
  },
 ...
}

const customUIComponent = (title, children, onClose) => (
  <div style={customStyles.body}>
    <div style={customStyles.title}>{title}</div>
    <div style={customStyles.content}>{children}</div>
    <button style={customStyles.button} onClick={onClose}>
      close
    </button>
  </div>
)

const configs = {
  customUI: customUIComponent
}

const modal = createModal(configs)
...
```
