
import './App.css'
import { useModalQueue } from './components/ModalProvider';

function App() {
  const { modals, queueModal } = useModalQueue()


  // const addModal = () => {
  //   const newModal = (
  //     <div>
  //       <h1>New Modal</h1>
  //       <p>This is a new modal window.</p>
  //     </div>
  //   )
  //   queueModal({ content: newModal, onClose: () => { console.log('Modal closed'); } });
  // }


  return (
    <>
     HELLO
     <div onClick={() => {
      // addModal();
      queueModal({content: 'hihihi', options: { position: 'top-right' }, onClose: () => { console.log('Modal closed'); } });
     }}>
       Open Modal
     </div>
    </>
  )
}

export default App
