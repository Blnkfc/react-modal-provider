import './DefaultModal.css'

export const DefaultModalWindow = ({ content, onClose, styles }: { content: string; onClose: () => void; styles?: React.CSSProperties }) => {
    console.log('onClose', onClose);
    
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
          ...styles
        }}
      ></div>
      <div
        className="default-modal"
        style={styles}
      >
        {content}
      </div>
    </>
  );
};
