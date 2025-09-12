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
  queueModal('My Modal!!')
}
```

Every modal will automatically open on top of the old one and close when you press on the background.
