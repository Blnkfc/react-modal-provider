// import React from 'react';
import './DefaultModal.css';
import type { ModalGeneric, position } from '../interfaces/types';

const position: Record<position | 'default', React.CSSProperties> = {
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  top: {
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  bottom: {
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  left: {
    top: '50%',
    left: 0,
    transform: 'translate(0, -50%)',
  },
  right: {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
  },
  'top-left': {
    top: 0,
    left: 0,
    transform: 'none',
  },
  'top-right': {
    top: 0,
    right: 0,
    transform: 'none',
  },
  'bottom-left': {
    bottom: 0,
    left: 0,
    transform: 'none',
  },
  'bottom-right': {
    bottom: 0,
    right: 0,
    transform: 'none',
  },
  default: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const DefaultModalWindow = ({ content, onClose, styles, options }: ModalGeneric & { content: string }) => {

  const traverseStyle = (value: string | number | undefined, defaultValue: string) => {
    if (value === undefined) return defaultValue;
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: options?.backgroundAlpha !== undefined ? options.backgroundAlpha : 1,
          backgroundColor: options?.backgroundColor ? options.backgroundColor : 'rgba(0,0,0,0.5)',
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: traverseStyle(options?.borderRadius, '8px'),
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: traverseStyle(options?.padding, '16px'),
          maxWidth: '500px',
          margin: traverseStyle(options?.margin, '0 auto'),
          color: 'black',
          minWidth: '100px',
          minHeight: '100px',
          width: traverseStyle(options?.width, 'auto'),
          height: traverseStyle(options?.height, 'auto'),
          ...position[options?.position || 'default'],
          ...styles,
        }}
      >
        {content}
      </div>
    </>
  );
};
