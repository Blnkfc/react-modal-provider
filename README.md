# @qnit/react-modal-manager

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
## Customization
You can customize your modal two different ways (_excluding passing a modal into queueModal_)

### Inline styles
Just pass the styles into ModalProvider component, and they will be applied to the default modal component:
```
<ModalProvider styles={{ background: 'red'}}>
  <App />
</ModalProvider>
```

### Custom default component
You can also create a component for provider to use by default using ``` ModalOverride ``` prop like so:
```
<ModalProvider ModalOverride={DefaultOverrideExample}>
  <App />
</ModalProvider>
```

Inside your component, import ```ModalGeneric``` type
```
import type { ModalGeneric } from "react-modal-provider";
```

And set props for your component as:
```
const DefaultOverrideExample: React.FC<PropsWithChildren<{} & ModalGeneric>> = ({ children, onClose, styles })
```

```children``` prop will be used as a slot for content you pass to the modal and 
```onClose``` will execute closing and additional callback, if you added them from _queueModal_

Every modal will automatically open on top of the old one and close when you press on the background.


## License
MIT © 2025 Pavlo Zabuha