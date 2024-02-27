import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
     
    const toggleModal = (data = {}) => {
        if (isModalOpen) {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
            setModalContent(data);
        }
    };
    
    return (
        <ModalContext.Provider value={{
            isModalOpen,
            toggleModal,
            modalContent,
        }}>
            {children}
        </ModalContext.Provider>
    );
};
