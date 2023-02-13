import React, { useState } from "react";
import Modal from "react-modal";

export default function CustomModal({
    buttonName,
    onSubmitFun,
    labelName,
    inputType,
}) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <>
            <button className='dropdown-modal' onClick={openModal}>
                {buttonName}
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <label>{labelName}</label>
                <form onSubmit={onSubmitFun}>
                    <input type={inputType} className='modal-input' />
                    <button className='modal-button'>Submit</button>
                </form>
            </Modal>
        </>
    );
}
