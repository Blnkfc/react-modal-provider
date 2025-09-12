import { useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from './useSessionStorage';

export type ModalContent = React.ReactNode | string;

export type ModalContentCombined = {
  content: ModalContent;
  onClose?: (value?: any) => any;
}

export interface ModalQueueItem {
  id: string;
  modal: ModalContentCombined;
  layer: number;
  onClose: () => void;
}

export const useModalContext = (): {
  queueModal: ({ content, onClose }: { content: ModalContent; onClose?: (value?: any) => any }) => void;
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
   * @param content Content of the modal, can be string for default modal, or ReactNode for custom modal.
   * @param onClose Optional callback function to be called when the modal is closed.
   */
  const queueModal = ({ content, onClose }: ModalContentCombined) => {
    const id = Date.now().toString();
    const newModal: ModalQueueItem = {
      id: id,
      modal: { content, onClose },
      layer: activeModals.length,
      onClose: () => {
        onClose?.();
        closeGivenModal(id);
      },
    };

    const updatedModals = [...activeModals, newModal];

    console.log('updatedModals', updatedModals);
    setActiveModals(updatedModals);
  };




  return { queueModal, currentModals: activeModals };
};
