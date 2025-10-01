import { useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from './useSessionStorage';
import type { ModalOptions } from '../interfaces/types';

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

export const useModalContext = (): {
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

  // console.log('activeModals', activeModals);

  /** Closes a modal with the given ID.
   * @param id The ID of the modal to close.
   */
  const closeGivenModal = (id: string) => {
    console.log('closeGivenModal', id);

    setActiveModals(activeModals.filter((am: ModalQueueItem) => am.id !== id));
  };

  const closeAllModals = () => {
    setActiveModals([]);
  };

  /**
   * Adds a new modal to the queue.
   * @param content Content of the modal, can be string for default modal, or ReactNode for custom modal.
   * @param onClose Optional callback function to be called when the modal is closed.
   * @param options Optional settings for modal appearance and behavior.
   */
  const queueModal = ({ content, onClose, options }: ModalContentCombined) => {
    const id = Date.now().toString();
    const newModal: ModalQueueItem = {
      id: id,
      modal: { content, onClose },
      layer: activeModals.length,
      onClose: () => {
        onClose?.();
        closeGivenModal(id);
      },
      options: options,
    };

    const updatedModals = [...activeModals, newModal];

    // console.log('updatedModals', updatedModals);
    setActiveModals(updatedModals);
  };

  return { queueModal, currentModals: activeModals, closeAllModals };
};
