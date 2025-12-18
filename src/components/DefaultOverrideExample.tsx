import type { PropsWithChildren } from "react";
import type { ModalGeneric } from "../interfaces/types";



export const DefaultOverrideExample: React.FC<PropsWithChildren<{} & ModalGeneric>> = ({ children, onClose }) => {
  return (
    <div onClick={() => console.log('aaaaaaaaa')} style={{background: 'teal'}}>
        <h1 onClick={onClose} >Default Override Example</h1>
        {children}
    </div>
  );
};
