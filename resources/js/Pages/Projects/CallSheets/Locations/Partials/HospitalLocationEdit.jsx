import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

import HospitalLocationForm from '@/Pages/Projects/CallSheets/Locations/Forms/HospitalLocationForm';

import RightPanel from '@/Components/Layouts/DrawerPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import DangerButton from '@/Components/Buttons/DangerButton';

export default function HospitalLocationEdit({ callSheet, locations, isUpdate, ...props }) {
    const initialLocationIndex = 0;
    const initialHospitalLocation = locations[initialLocationIndex].hospital_location;

    const { isRightPanelOpen, toggleRightPanel } = props;
    const [hospitalLocationValid, setHospitalLocationValid] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [hospitalLocation, setHospitalLocation] = useState({
        ...initialHospitalLocation,
    });

    useEffect(() => {
        // Set the initial values when the component mounts
        setHospitalLocation(initialHospitalLocation);
    }, [initialHospitalLocation]);

    const handleHospitalLocationChange = (event) => {
        const { name, value } = event.target;
        setHospitalLocation({ ...hospitalLocation, [name]: value });
    };

    const handleCloseButtonClick = () => {
        toggleRightPanel(false);
    };

    // Function to validate the hospital location
    const validateHospitalLocation = () => {
        const { name, street_address, city, state, zip_code } = hospitalLocation;
        const isHospitalLocationValid =
            name.trim() !== '' &&
            street_address.trim() !== '' &&
            city.trim() !== '' &&
            state.trim() !== '' &&
            zip_code.trim() !== '';
        setHospitalLocationValid(isHospitalLocationValid);
        return isHospitalLocationValid;
    };

    // Function to prepare hospital location data
    const prepareHospitalLocationData = () => {
        return {
            name: hospitalLocation.name,
            street_address: hospitalLocation.street_address,
            city: hospitalLocation.city,
            state: hospitalLocation.state,
            zip_code: hospitalLocation.zip_code,
            country: hospitalLocation.country,
        };
    };

    const handleUpdate = async () => {
        setIsSubmitClicked(true);

        const isHospitalLocationValid = validateHospitalLocation();

        if (isHospitalLocationValid) {
            try {
                const hospitalLocationData = prepareHospitalLocationData();

                const routeName = initialHospitalLocation.id
                    ? 'locations.updateHospitalLocation'
                    : 'locations.storeHospitalLocation';

                const idRoute = { id: callSheet.project_id };
                const callSheetIdRoute = { callSheetId: callSheet.id };

                // If it's an update, include the locationId in the route
                const locationIdRoute = initialHospitalLocation.id
                    ? { locationId: initialHospitalLocation.id }
                    : {};

                const hospitalLocationResponse = await router.patch(
                    route(routeName, { ...idRoute, ...callSheetIdRoute, ...locationIdRoute }), // Adjust the route as needed
                    hospitalLocationData
                );

                console.log('Hospital location data updated successfully:', hospitalLocationResponse);

                // Assuming you want to close the panel after successful update or store
                toggleRightPanel(false);
            } catch (locationError) {
                console.error('Error updating/storing hospital location data:', locationError);
                console.error('Error updating/storing hospital location data:', locationError.data);

                const errorMessage =
                    locationError.response?.data?.message ||
                    'An error occurred while updating/storing hospital location data.';
                console.error('Error updating/storing hospital location data:', errorMessage);

                // Display an error message to the user if needed
            }
        } else {
            console.error('Hospital location is not valid');
            // Display an error message to the user if needed
        }
    };

    return (
        <RightPanel
            isRightPanelOpen={isRightPanelOpen}
            showSlideOutPanel={false}
            panel_header={
                <div>
                    <h3>Edit Hospital Location</h3>
                    <p className="p-base">Edit hospital location details here</p>
                </div>
            }
            panel_footer={
                <div className="flex flex-row gap-4 justify-between">
                    <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />
                    <SecondaryButton className="-ml-[11rem]" onClick={handleUpdate}>
                        Update Hospital Location
                    </SecondaryButton>
                    <DangerButton className="justify-end">
                        <FontAwesomeIcon icon={faTrash} />
                    </DangerButton>
                </div>
            }
        >
            <div>
                <div className="mb-10 form-group">
                    <HospitalLocationForm
                        hospitalLocation={hospitalLocation}
                        onHospitalLocationChange={handleHospitalLocationChange}
                        isUpdate={isUpdate}
                    />
                </div>
            </div>
        </RightPanel>
    );
}
