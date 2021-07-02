import React from 'react';

export interface ModalProps {
  show: boolean;
  handleClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children }) => (
  <div className={`${show ? 'modal__show ' : 'modal__hide'} container`}>

    {
      handleClose ? (
        <button type="button" onClick={handleClose} className="button__primary">
          x
        </button>
      )
        : null
    }
    {children}
  </div>
);
export default Modal;
