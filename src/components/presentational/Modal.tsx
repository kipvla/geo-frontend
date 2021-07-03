import React from 'react';
import { GrClose } from 'react-icons/gr';

export interface ModalProps {
  show: boolean;
  handleClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children }) => (
  <div className={`${show ? 'modal__show ' : 'modal__hide'} container`}>
    {handleClose ? (
      <button
        type="button"
        onClick={handleClose}
        className="button__primary" // charley removed the other class
      >
        <GrClose />
      </button>
    ) : null}
    {children}
  </div>
);
export default Modal;
