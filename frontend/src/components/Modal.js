import React from 'react';
import "./Modal.css"

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
