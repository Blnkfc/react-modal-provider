import React, { createContext, useContext, type PropsWithChildren } from 'react';
import { useModalContext, type ModalContent, type ModalQueueItem } from '../hooks/useModalContext';
import { DefaultModalWindow } from './DefaultModalWindow';
import type { ModalGeneric, ModalOptions } from '../interfaces/types';

export interface ModalProviderProps {
  modals: ModalQueueItem[];
  queueModal: ({ content, onClose, options }: { content: ModalContent; onClose?: (value?: any) => any; options?: ModalOptions }) => void;
}

const ModalContext = createContext<ModalProviderProps | undefined>(undefined);

export const ModalProvider = ({ children, styles, ModalOverride }: { children: React.ReactNode; styles?: React.CSSProperties; ModalOverride?: React.ComponentType<PropsWithChildren<ModalGeneric>> }) => {
  const { currentModals, queueModal } = useModalContext();
  console.log(
    'currentModals',
    currentModals,
    Array.isArray(currentModals),
    currentModals.length > 0,
    currentModals.length
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {currentModals.length > 0 ? (
          <>
            {currentModals.map((modal) => {
              switch (typeof modal.modal.content) {
                case 'string':
                  return (
                    <div
                      key={modal.id}
                      style={{
                        zIndex: 100 + modal.layer,
                        pointerEvents: 'auto',
                      }}
                    >
                      {ModalOverride ? (
                        <ModalOverride  onClose={modal.onClose} styles={styles}>{modal.modal.content}</ModalOverride>
                      ) : (
                        <DefaultModalWindow content={modal.modal.content} onClose={modal.onClose} styles={styles} options={modal.options} />
                      )}
                    </div>
                  );
                default:
                  if (React.isValidElement(modal.modal.content)) {
                    return (
                      <div
                        key={modal.id}
                        style={{
                          zIndex: 100 + modal.layer,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100vw',
                          height: '100vh',
                        }}
                      >
                        <div
                          onClick={modal.onClose}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto',
                            ...styles,
                          }}
                        ></div>
                        <div style={{ display: 'absolute', zIndex: 2 }}>{modal.modal.content}</div>
                      </div>
                    );
                  }
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
};
