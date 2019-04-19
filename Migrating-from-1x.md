# Migrating from v1 to v2

We change lagacy react context to used new context api

### Remove `createModal` to use `ModalProvider`

Create file `modal.js` and import `createModal` to create

```jsx
// V1

import { createModal } from 'react-modal-es';

const modal = createModal();
export const openModal = modal.openModal;
export const closeModal = modal.closeModal;
export const closeAllModal = modal.closeAllModal;
export const connectModal = modal.connectModal; // remove
```

to

```jsx
// V2

import { createModal } from 'react-modal-es';

const modal = createModal();
export const openModal = modal.openModal;
export const closeModal = modal.closeModal;
export const closeAllModal = modal.closeAllModal;
export const ModalProvider = modal.ModalProvider; // add
```

### Use `ModalProvider` instead of `createModal`

```jsx
// V1

import { connectModal } from './modal';

@connectModal
class App extends React.Component {
  render() {
    return <div>...</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

to

```jsx
// V2

import { ModalProvider } from './modal';

const App = () => {
  return <ModalProvider>...</ModalProvider>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
