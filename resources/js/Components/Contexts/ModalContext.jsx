import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);

    const toggleModal = (data = {}, delay = 300) => {
        if (isModalOpen) {
 
            setTimeout(() => {
                setModalContent(null);
            }, delay);

            setIsModalOpen(false);

        } else {
            // Open immediately
            setIsModalOpen(true);
            setModalContent(data);
        }
    };

    const toggleDrawer = (content = null) => {
        setIsDrawerOpen(!isDrawerOpen);
        setDrawerContent(content);
    };

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            toggleModal,
            modalContent,
            isDrawerOpen,
            toggleDrawer,
            drawerContent,
        }}>
            {children}
        </ModalContext.Provider>
    );
};
