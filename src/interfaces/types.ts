export type ModalGeneric = {
  onClose: () => void;
  styles?: React.CSSProperties;
  options?: ModalOptions;
}

export type position = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type animation = 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleUp'
  
export type ModalOptions = {
  backgroundAlpha?: number; // Opacity of the background overlay (0 to 1)
  backgroundColor?: string; // Color of the background overlay
  borderRadius?: string | number; // Border radius of the modal window
  position?: position; // Position of the modal on the screen
  height?: string | number; // Height of the modal window
  width?: string | number; // Width of the modal window
  padding?: string | number; // Padding inside the modal window
  margin?: string | number; // Margin around the modal window
  boxShadow?: string; // Box shadow for the modal window
  hideCloseButton?: boolean; // Whether to show a close button
  popupAnimation?: animation; // Animation when the modal appears
}

