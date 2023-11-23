import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

import MainLocationForm from '@/Pages/Projects/CallSheets/Locations/Forms/LocationForm';

import RightPanel from '@/Components/Layouts/DrawerPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import DangerButton from '@/Components/Buttons/DangerButton';









export default function MainLocationEdit({ callSheet, locations, isUpdate, ...props }) {
    const initialLocationIndex = 0;
    const initialMainLocation = locations[initialLocationIndex];
  
    const { isRightPanelOpen, toggleRightPanel } = props;
    const [mainLocationValid, setMainLocationValid] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [mainLocation, setMainLocation] = useState({
      name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
    });



    useEffect(() => {
        // Set the initial values when the component mounts
        setMainLocation(initialMainLocation);
    }, [initialMainLocation]);
    
    const handleMainLocationChange = (event) => {
        const { name, value } = event.target;
        setMainLocation({ ...mainLocation, [name]: value });
    };



    const handleCloseButtonClick = () => {
        console.log("Close");
        toggleRightPanel(false);
    };












    // Function to validate the main location
    const validateMainLocation = () => {
        const { name, street_address, city, state, zip_code } = mainLocation;
        const isMainLocationValid = name.trim() !== '' && street_address.trim() !== '' && city.trim() !== '' && state.trim() !== '' && zip_code.trim() !== '';
        setMainLocationValid(isMainLocationValid);
        return isMainLocationValid;
    };


   // Function to prepare main location data
const prepareMainLocationData = () => {
    return {
        name: mainLocation.name,
        street_address: mainLocation.street_address,
        city: mainLocation.city,
        state: mainLocation.state,
        zip_code: mainLocation.zip_code,
        country: mainLocation.country,
    };
};








const handleUpdate = async () => {
    setIsSubmitClicked(true);

    const isMainLocationValid = validateMainLocation();

    if (isMainLocationValid) {
        try {
            const mainLocationData = prepareMainLocationData();

            const routeName = 'locations.updateMainLocation';
            const idRoute = { id: callSheet.project_id };
            const callSheetIdRoute = { callSheetId: callSheet.id };
            const locationIdRoute = { locationId: mainLocation.id };  

            const locationResponse = await router.patch(
                route(routeName, { ...idRoute, ...callSheetIdRoute, ...locationIdRoute }),
                mainLocationData
            );

            console.log('Location data updated successfully:', locationResponse);

            // Depending on your application, you might want to notify the user of the successful update.

            toggleRightPanel(false);
        } catch (locationError) {
            console.error('Error updating location data:', locationError);
            console.error('Error updating location data:', locationError.data);

            const errorMessage =
                locationError.response?.data?.message || 'An error occurred while updating location data.';
            console.error('Error updating location data:', errorMessage);

            // Display an error message to the user if needed.
        }
    } else {
        console.error('Main location is not valid');
        // Display an error message to the user if needed.
    }
};












        return (
            <RightPanel
            isRightPanelOpen={isRightPanelOpen}
            showSlideOutPanel={false}
            panel_header={ 
                <div>
                    <h3>Edit Location</h3>
                    <p className="p-base">Edit location details here</p>
                    
                </div> 
            }



            
            panel_footer={
                <div className='flex flex-row gap-4 justify-between'>
                    <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />
                    <SecondaryButton className="-ml-[17rem]" onClick={handleUpdate}>Update Location</SecondaryButton>
                    <DangerButton className='justify-end'>
                        <FontAwesomeIcon icon={faTrash} />
                    </DangerButton>
                </div>
              }
            >
                





                <div>
                    <div className="mb-10 form-group">
                        <MainLocationForm 
                            mainLocation={mainLocation} 
                            onMainLocationChange={handleMainLocationChange} 
                            isUpdate={isUpdate} 
                        />
                    </div>
                </div>









             </RightPanel>









    );
}
