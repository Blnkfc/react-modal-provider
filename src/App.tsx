
import './App.css'
import { useModalQueue } from './components/ModalProvider';

function App() {
  const { modals, queueModal } = useModalQueue()

  return (
    <>
     HELLO
     <div onClick={() => {
      console.log('Stuff');
      queueModal('Stuff')}} >
      queue
     </div>
    </>
  )
}

export default App
