import React, { ReactNode } from 'react';
import '../../styles/index.css';

export interface ModalProps {
  show: boolean;
  handleClose: () => void;
  children: ReactNode

}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children }: ModalProps) => (
  <div className={show ? 'modal__show ' : 'modal__hide'}>
    <p>im a modal</p>
    <button type="button" onClick={handleClose}>next round</button>
    {children}
  </div>
);
export default Modal;
