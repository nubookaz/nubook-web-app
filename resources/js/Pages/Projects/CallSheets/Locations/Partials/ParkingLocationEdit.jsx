import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

import ParkingLocationForm from '@/Pages/Projects/CallSheets/Locations/Forms/ParkingLocationForm';

import RightPanel from '@/Components/Layouts/DrawerPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import DangerButton from '@/Components/Buttons/DangerButton';

export default function ParkingLocationEdit({ callSheet, locations, isUpdate, ...props }) {
    const initialLocationIndex = 0;
    const initialParkingLocation = locations[initialLocationIndex].parking_location;

    const { isRightPanelOpen, toggleRightPanel } = props;
    const [parkingLocationValid, setParkingLocationValid] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [parkingLocation, setParkingLocation] = useState({
        ...initialParkingLocation,

    });

    useEffect(() => {
        // Set the initial values when the component mounts
        setParkingLocation(initialParkingLocation);
    }, [initialParkingLocation]);

    const handleParkingLocationChange = (event) => {
        const { name, value } = event.target;
        setParkingLocation({ ...parkingLocation, [name]: value });
    };

    const handleCloseButtonClick = () => {
        toggleRightPanel(false);
    };

    // Function to validate the parking location
    const validateParkingLocation = () => {
        const { name, street_address, city, state, zip_code } = parkingLocation;
        const isParkingLocationValid =
            name.trim() !== '' &&
            street_address.trim() !== '' &&
            city.trim() !== '' &&
            state.trim() !== '' &&
            zip_code.trim() !== '';
        setParkingLocationValid(isParkingLocationValid);
        return isParkingLocationValid;
    };

    // Function to prepare parking location data
    const prepareParkingLocationData = () => {
        return {
            name: parkingLocation.name,
            street_address: parkingLocation.street_address,
            city: parkingLocation.city,
            state: parkingLocation.state,
            zip_code: parkingLocation.zip_code,
            country: parkingLocation.country,
        };
    };

    const handleUpdate = async () => {
        setIsSubmitClicked(true);
    
        const isParkingLocationValid = validateParkingLocation();
    
        if (isParkingLocationValid) {
            try {
                const parkingLocationData = prepareParkingLocationData();
                const routeName = initialParkingLocation?.id ? 'locations.updateParkingLocation' : 'locations.storeParkingLocation';
                
                const idRoute = { id: callSheet.project_id };
                const callSheetIdRoute = { callSheetId: callSheet.id };
    
                // If it's an update, include the locationId in the route
                const locationIdRoute = initialParkingLocation?.id ? { locationId: initialParkingLocation.id } : {};
    
                const parkingLocationResponse = await router.patch(
                    route(routeName, { ...idRoute, ...callSheetIdRoute, ...locationIdRoute }), // Adjust the route as needed
                    parkingLocationData
                );
    
                console.log('Parking location data updated successfully:', parkingLocationResponse);
                
                // Assuming you want to close the panel after successful update or store
                toggleRightPanel(false);
            } catch (locationError) {
                console.error('Error updating/storing parking location data:', locationError);
                console.error('Error updating/storing parking location data:', locationError.data);
    
                const errorMessage =
                    locationError.response?.data?.message || 'An error occurred while updating/storing parking location data.';
                console.error('Error updating/storing parking location data:', errorMessage);
    
                // Display an error message to the user if needed
            }
        } else {
            console.error('Parking location is not valid');
            // Display an error message to the user if needed
        }
    };
    
    return (
        <RightPanel
            isRightPanelOpen={isRightPanelOpen}
            showSlideOutPanel={false}
            panel_header={
                <div>
                    <h3>Edit Parking Location</h3>
                    <p className="p-base">Edit parking location details here</p>
                </div>
            }
            panel_footer={
                <div className='flex flex-row gap-4 justify-between'>
                    <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />
                    <SecondaryButton className="-ml-[11rem]" onClick={handleUpdate}>
                        Update Parking Location
                    </SecondaryButton>
                    <DangerButton className='justify-end'>
                        <FontAwesomeIcon icon={faTrash} />
                    </DangerButton>
                </div>
            }
        >
            <div>
                <div className="mb-10 form-group">
                    <ParkingLocationForm
                        parkingLocation={parkingLocation}
                        onParkingLocationChange={handleParkingLocationChange}
                        isUpdate={isUpdate}
                    />
                </div>
            </div>
        </RightPanel>
    );
}
