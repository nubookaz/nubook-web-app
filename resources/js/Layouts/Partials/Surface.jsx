import React from 'react';
import { useModal } from '@/Components/Contexts/ModalContext';
import { useSnack } from '@/Components/Contexts/SnackContext';

import Modal from '@/Components/Modals/Modal';
import Snackbar from '@mui/joy/Snackbar';

import ProjectForm from '@/Pages/Projects/Forms/ProjectForm';
import CallSheetForm from '@/Pages/Projects/CallSheets/Forms/CallSheetForm';
import GeneralCallTimeForm from '@/Pages/Projects/CallSheets/Forms/GeneralCallTimeForm';
import CallSheetProductionSchedule from '@/Pages/Projects/CallSheets/CallSheetProductionSchedule';
import CallSheetRecipientList from '@/Pages/Projects/CallSheets/CallSheetRecipientList';
import CallSheetLocationForm from '@/Pages/Projects/CallSheets/Forms/CallSheetLocationForm';
import ProjectImagePreview from '@/Pages/Projects/Components/ProjectImagePreview';
import LogOutForm from '@/Pages/Auth/LogOutForm';
import LocationForm from '@/Pages/Projects/CallSheets/Locations/Forms/LocationForm';

export default function Surface({ project, callSheet }) {
    const { isModalOpen, toggleModal, modalContent } = useModal();
    const { isSnackOpen, setIsSnackOpen, snackContent } = useSnack();

    const renderContent = () => {
        switch (modalContent?.type) {
            case 'projectForm':
                return <ProjectForm />;
            case 'locationForm':
                return <LocationForm onClose={handleCloseClick} />;
            case 'projectImage':
                return <ProjectImagePreview data={modalContent.imageUrl || '/images/movie_posters/coming_soon_poster.jpg'} />;
            case 'generalCallTime':
                return <GeneralCallTimeForm callSheet={callSheet} data={modalContent.data} />;
            case 'productionDetails':
                return <CallSheetForm callSheet={callSheet} onClose={handleCloseClick} />;
            case 'productionSchedule':
                return <CallSheetProductionSchedule callSheet={callSheet} />;
            case 'locationDetails':
                return <CallSheetLocationForm callSheet={callSheet} />;
            case 'recipientForm':
                return <CallSheetRecipientList callSheet={callSheet} />;
            case 'logOut':
                return <LogOutForm />;
            default:
                return null; // Or some default content
        }
    };

    const shouldShowCloseButton = !['logOut', 'generalCallTime'].includes(modalContent?.type);

    const handleCloseClick = () => {
        if (isModalOpen) {
            toggleModal(false);
        }
    };

 
    return (
        <>
            <Modal
                show={isModalOpen}
                onClose={toggleModal}
                showCloseButton={shouldShowCloseButton}
            >
                {renderContent()}
            </Modal>

            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isSnackOpen}
                variant='outlined'
                size="lg"
                color="success"
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setIsSnackOpen(false);
                }}
                slotProps={{
                    root: {
                        sx: {
                            backgroundColor: 'rgb(52 211 153)',
                            borderColor: 'rgb(16 185 129)',
                            borderWidth: '.15rem',
                            color: '#fff',
                            fontWeight: 'bold',
                            bottom: '2rem',
                            right: '2rem',
                            minWidth: '400px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
                        }
                    }
                }}
            >
                {snackContent} 
            </Snackbar>
        </>
    );
}
