# React Modal Provider

A simple tool for organized modals in your application.

Usage:

1. Import the proivider component

```
import { ModalProvider } from 'react-modal-provider';
```

2. Wrap your App in ModalProvider:

```
<ModalProvider>
  <App />
</ModalProvider>
```

3. Import useModalQueue hook in the component where you whant your modal to be:

```
import { useModalQueue } from 'react-modal-provider';

const { modals, queueModal } = useModalQueue()
```

4. Use queueModal function to add a modal to a tree with either string for default modal, or react node:

```
const showModal = () => {
  queueModal({content: 'My Modal!'})
}

const showModal2 = () => {
  const newModal = (
    <div>
      <h1>New Modal</h1>
      <p>This is a new modal window.</p>
    </div>
  )
  queueModal({ content: newModal, onClose: () => { console.log('Modal closed'); } });
}

```

Every modal will automatically open on top of the old one and close when you press on the background.
