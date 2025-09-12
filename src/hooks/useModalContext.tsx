import { useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from './useSessionStorage';

export type ModalContent = React.ReactNode | string;

export interface ModalQueueItem {
  id: string;
  content: ModalContent;
  layer: number;
  onClose: () => void;
}

export const useModalContext = (): {
  queueModal: (modal: ModalContent) => void;
  currentModals: ModalQueueItem[];
} => {
  const [activeModals, setActiveModals] = useSessionStorage('modals', []);

  console.log('activeModals', activeModals);

  /** Closes a modal with the given ID.
   * @param id The ID of the modal to close.
   */
  const closeGivenModal = (id: string) => {
    setActiveModals(activeModals.filter((am: ModalQueueItem) => am.id !== id));
  };

  /**
   * Adds a new modal to the queue.
   * @param modal Content of the modal, can be string for default modal, or ReactNode for custom modal.
   */
  const queueModal = (modal: ModalContent) => {
    const id = Date.now().toString();
    const newModal: ModalQueueItem = {
      id: id,
      content: modal,
      layer: activeModals.length,
      onClose: () => closeGivenModal(id),
    };

    const updatedModals = [...activeModals, newModal];

    console.log('updatedModals', updatedModals);
    setActiveModals(updatedModals);
  };

  return { queueModal, currentModals: activeModals };
};
