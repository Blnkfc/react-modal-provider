// import React from 'react';
import './DefaultModal.css';
import type { ModalGeneric } from '../interfaces/types';



export const DefaultModalWindow = ({
  content,
  onClose,
  styles,
}: ModalGeneric & { content: string }) => {
  // console.log('check modal', Overrides && React.isValidElement(Overrides), Overrides);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
        }}
      ></div>
      <div className="default-modal" style={styles}>
        {content}
      </div>
    </>
  );
};
