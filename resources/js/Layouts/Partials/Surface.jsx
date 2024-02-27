import React from 'react';
import { useModal } from '@/Components/Contexts/ModalContext';
import { useSnack } from '@/Components/Contexts/SnackContext';
 
import Modal from '@/Components/Modals/Modal';
import Snackbar from '@mui/joy/Snackbar';

import ProjectForm from '@/Pages/Projects/Forms/ProjectForm';
import CreateCallSheet from '@/Pages/Projects/CallSheets/Forms/CreateCallSheet';
import UpdateCallSheet from '@/Pages/Projects/CallSheets/Forms/UpdateCallSheet';
import GeneralCallTimeForm from '@/Pages/Projects/CallSheets/Forms/GeneralCallTimeForm';
import CallSheetProductionSchedule from '@/Pages/Projects/CallSheets/ProductionSchedule/CallSheetProductionSchedule';
import CallSheetRecipientForm from '@/Pages/Projects/CallSheets/Recipients/CreateRecipient';
import ProjectImagePreview from '@/Pages/Projects/Components/ProjectImagePreview';
import LogOutForm from '@/Pages/Auth/LogOutForm';
import LocationForm from '@/Pages/Projects/CallSheets/Locations/Forms/LocationForm';
import AddTaskModal from '@/Pages/Tasks/Modals/AddTaskModal';

export default function Surface({ user, project, callSheet, roles }) {
    const { isModalOpen, toggleModal, modalContent } = useModal();
    const { isSnackOpen, setIsSnackOpen, snackContent } = useSnack();
 
    const renderContent = () => {
        switch (modalContent?.type) {
            case 'projectForm':
                return <ProjectForm />;
            case 'addTask':
                return <AddTaskModal onClose={handleCloseClick}/>;
            case 'newLocationForm':
                return <LocationForm project={project} callSheet={callSheet} onClose={handleCloseClick} />;
            case 'editLocationForm':
                return <LocationForm project={project} callSheet={modalContent?.data} mode='edit' onClose={handleCloseClick} />;
            case 'projectImage':
                return <ProjectImagePreview data={modalContent?.imageUrl || '/images/movie_posters/coming_soon_poster.jpg'} />;
            case 'generalCallTime':
                return <GeneralCallTimeForm callSheet={callSheet} data={modalContent?.data} />;
            case 'newCallSheetForm':
                return <CreateCallSheet user={user} roles={roles} project={project} callSheet={callSheet} data={modalContent?.data}  onClose={handleCloseClick} /> ;
            case 'editCallSheetForm':
                return <UpdateCallSheet mode='edit' data={modalContent?.data} onClose={handleCloseClick} />;   
            case 'productionSchedule':
                return <CallSheetProductionSchedule project={project} callSheet={callSheet} />;
            case 'recipientForm':
                return <CallSheetRecipientForm roles={roles} project={project} callSheet={callSheet} onClose={handleCloseClick} />;
            case 'editRecipientForm':
                return <CallSheetRecipientForm roles={roles} project={project} callSheet={callSheet} recipient={modalContent?.data} onClose={handleCloseClick} />;
            case 'logOut':
                return <LogOutForm />;
            default:
                return null;  
        }
    };
 
    const shouldShowCloseButton = !['logOut'].includes(modalContent?.type);
    
    const handleCloseClick = () => {
        if (isModalOpen) {
            toggleModal(false);
        }
    };

    const getModalSize = () => {
        switch (modalContent?.type) {
            case 'productionSchedule':
                return { width: 'full', height: 'full' };
            default:
                return { width: 'auto', height: 'auto' };
        }
    };
 
    const { width, height } = getModalSize();
 
    const getModalBackgroundColor = () => {
        switch (modalContent?.type) {
            case 'productionSchedule':
                return '!bg-slate-100'; 
            default:
                return 'bg-white';  
        }
    };

    return (
        <>
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseClick} 
                showCloseButton={shouldShowCloseButton}
                className={`w-${width} h-${height} ${getModalBackgroundColor()}`}  
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
