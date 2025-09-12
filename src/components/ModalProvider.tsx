import { createContext, useContext } from 'react';
import { useModalContext, type ModalContent, type ModalQueueItem } from '../hooks/useModalContext';
import { DefaultModalWindow } from './DefaultModalWindow';

export interface ModalProviderProps {
  modals: ModalQueueItem[];
  queueModal: (modal: ModalContent) => void;
}

const ModalContext = createContext<ModalProviderProps | undefined>(undefined);

export const ModalProvider = ({ children, styles }: { children: React.ReactNode, styles?: React.CSSProperties }) => {
  const { currentModals, queueModal } = useModalContext();
  console.log(
    'currentModals',
    currentModals,
    Array.isArray(currentModals),
    currentModals.length > 0,
    currentModals.length,
  );

  return (
    <ModalContext.Provider value={{ modals: currentModals, queueModal }}>
      <div
        id="modal-root"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
          // display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        {currentModals.length > 0 ? (
          <>
            {currentModals.map((modal) => {
              switch (typeof modal.content) {
                case 'string':
                  return (
                    <div
                      key={modal.id}
                      style={{
                        zIndex: 100 + modal.layer,
                      }}
                    >
                      <DefaultModalWindow content={modal.content} onClose={modal.onClose} styles={styles} />
                    </div>
                  );
                default:
                  return <></>;
              }
            })}
          </>
        ) : null}
      </div>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalQueue = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalQueue must be used within a ModalProvider');
  }
  return context;
}
