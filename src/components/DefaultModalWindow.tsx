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
      <div style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '16px',
        maxWidth: '500px',
        margin: '0 auto',
        color: 'black',
        minWidth: '100px',
        minHeight: '100px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        ...styles
      }} >
        {content}
      </div>
    </>
  );
};
