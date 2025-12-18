import { useCallback, useEffect } from 'react';
import { useSessionStorage } from './useSessionStorage';
import type { ModalOptions } from '../interfaces/types';
import type { ModalProviderOptions } from '../components/ModalProvider';

export type ModalContent = React.ReactNode | string;

export type ModalContentCombined = {
  content: ModalContent;
  onClose?: (value?: any) => any;
  options?: ModalOptions;
};

export interface ModalQueueItem {
  id: string;
  modal: ModalContentCombined;
  layer: number;
  onClose: () => void;
  options?: ModalOptions;
}

export const useModalContext = ({
  options,
}: {
  options?: ModalProviderOptions;
}): {
  queueModal: ({
    content,
    onClose,
    options,
  }: {
    content: ModalContent;
    onClose?: (value?: any) => any;
    options?: ModalOptions;
  }) => void;
  currentModals: ModalQueueItem[];
  closeAllModals: () => void;
} => {
  const [activeModals, setActiveModals] = useSessionStorage('modals', []);
  const { universalLogs = false, rethrowOnCloseError = true } = options || {};
  console.log('activeModals', activeModals);

  useEffect(() => {
    if(universalLogs)
    console.log('[UPDATED MODAL LIST]-->', activeModals);
  }, [activeModals])

  /** Closes a modal with the given ID.
   * @param id The ID of the modal to close.
   */
  const closeGivenModal = useCallback(
    (id: string) => {
      console.log('fireclose');
      
      setActiveModals((prev: ModalQueueItem[]) => {
        if (universalLogs) {
          console.log('[CLOSE MODAL]-->', id);
          if (prev.length === 0) {
            console.error('[CLOSE MODAL]-->', `No modals to close. List of current active modals is empty.`);
          }
          if (!prev.some((am) => am.id === id)) {
            console.error('[CLOSE MODAL]-->', `Modal ${id} not found.`);
          }
        }
        return prev.filter((am: ModalQueueItem) => am.id !== id);
      });
      // setActiveModals(activeModals.filter((am: ModalQueueItem) => am.id !== id));
    },
    [activeModals, universalLogs, setActiveModals]
  );

  const closeAllModals = () => {
    if (universalLogs) {
      if (activeModals.length === 0) {
        console.warn('[CLOSE ALL MODALS]-->', 'No modals to close.');
      }
    }
    setActiveModals([]);
  };

  /**
   * Adds a new modal to the queue.
   * @param content Content of the modal, can be string for default modal, or ReactNode for custom modal.
   * @param onClose Optional callback function to be called when the modal is closed.
   * @param options Optional settings for modal appearance and behavior.
   */
  const queueModal = ({ content, onClose, options }: ModalContentCombined) => {
    const id = crypto.randomUUID();
    let closeGuard = false;
    const safeOnClose = async () => {
      if (closeGuard) return;
      closeGuard = true;
      try {
        await onClose?.();
      } catch (error) {
        console.error(`[ERROR IN MODAL ${id} onClose CALLBACK]:`, error);
        console.warn('Consider enabling universalLogs in ModalProvider options for more details.');
        if (rethrowOnCloseError) {
          throw error;
        }
      } finally {
        closeGivenModal(id);
      }
    };

    setActiveModals((prev: ModalQueueItem[]) => {
      const newModal: ModalQueueItem = {
        id: id,
        modal: { content, onClose },
        layer: prev.length,
        onClose: safeOnClose,
        options: options,
      }
      if (universalLogs) {
        console.log('[NEW MODAL ADDED]-->', newModal);
      }
      return [...prev, newModal];
    })

    // const newModal: ModalQueueItem = {
    //   id: id,
    //   modal: { content, onClose },
    //   layer: activeModals.length,
    //   onClose: safeOnClose,
    //   options: options,
    // };

    // const updatedModals = [...activeModals, newModal];

    // // console.log('updatedModals', updatedModals);
    // setActiveModals(updatedModals);
  };

  return { queueModal, currentModals: activeModals, closeAllModals };
};
