import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import RightPanel from '@/Components/Layouts/RightPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Input from '@mui/joy/Input';
import Tooltip from '@mui/joy/Tooltip';
import axios from 'axios';











export default function NewLocationForm({ callSheet, ...props }) {

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
    
      const [parkingLocation, setParkingLocation] = useState({
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
      });
    
      const [hospitalLocation, setHospitalLocation] = useState({
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
      });














    const handleMainLocationChange = (event) => {
        const { name, value } = event.target;
        setMainLocation({ ...mainLocation, [name]: value });
    };

    const handleParkingLocationChange = (event) => {
        const { name, value } = event.target;
        setParkingLocation({ ...parkingLocation, [name]: value });
    };

    const handleHospitalLocationChange = (event) => {
        const { name, value } = event.target;
        setHospitalLocation({ ...hospitalLocation, [name]: value });
    };


    const handleCloseButtonClick = () => {
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

// Function to prepare parking location data (if available)
const prepareParkingLocationData = () => {
    if (parkingLocation.name !== undefined && parkingLocation.name.trim() !== '') {
        return {
            name: parkingLocation.name,
            street_address: parkingLocation.street_address,
            city: parkingLocation.city,
            state: parkingLocation.state,
            zip_code: parkingLocation.zip_code,
            country: parkingLocation.country,
        };
    }
    return null;
};

// Function to prepare hospital location data (if available)
const prepareHospitalLocationData = () => {
    if (hospitalLocation.name !== undefined && hospitalLocation.name.trim() !== '') {
        return {
            name: hospitalLocation.name,
            street_address: hospitalLocation.street_address,
            city: hospitalLocation.city,
            state: hospitalLocation.state,
            zip_code: hospitalLocation.zip_code,
            country: hospitalLocation.country,
        };
    }
    return null;
};

// Function to handle saving the location
const handleSave = async () => {
    setIsSubmitClicked(true);

    const isMainLocationValid = validateMainLocation();

    if (isMainLocationValid) {
        try {
            const mainLocationData = prepareMainLocationData();
            const parkingLocationData = prepareParkingLocationData();
            const hospitalLocationData = prepareHospitalLocationData();

            const locationData = {
                ...mainLocationData,
                parking_location: parkingLocationData,
                hospital_location: hospitalLocationData,
            };

            const routeName = 'locations.store';
            const idRoute = { id: callSheet.project_id };
            const callSheetRoute = { callSheetId: callSheet.id };

            const locationResponse = await router.post(
                route(routeName, { ...idRoute, ...callSheetRoute }),
                locationData
            );

            console.log('Location data saved successfully:', locationResponse);
            toggleRightPanel(false);
        } catch (locationError) {
            console.error('Error saving location data:', locationError);
            console.error('Error saving location data:', locationError.data);

            console.error('Error saving location data:', locationError.response.data.message);

            // Display an error message to the user if needed
        }
    } else {
        console.error('Main location is not valid');
        // Display an error message to the user if needed
    }
};












        return (
            <RightPanel
            isRightPanelOpen={isRightPanelOpen}
            showSlideOutPanel={false}
            panel_header={ 
                <div>
                    <h3>Add a Location</h3>
                    <p className="p-base">Add location details here</p>
                    
                </div> 
            }
            panel_footer={
                <div className='flex flex-row gap-4'>
                    <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />
                    <SecondaryButton onClick={handleSave}>Add Location</SecondaryButton>
                </div>
              }
            >









                <div>
                    <div className="mb-10 form-group">
                        <div className='w-full mb-2 input-group'>
                            <Tooltip
                                title="Location Name is required"
                                placement="top"
                                arrow
                                open={isSubmitClicked && !mainLocationValid}
                                >
                                <Input
                                    type="text"
                                    name="name"
                                    value={mainLocation.name}
                                    onChange={handleMainLocationChange}
                                    placeholder="Name"
                                />
                            </Tooltip>
                        </div>                       
                        <div className='w-full mb-2 input-group'>
                            <Tooltip
                                title="Street Address is required"
                                placement="top"
                                arrow
                                >
                                <Input
                                    type="text"
                                    name="street_address"
                                    value={mainLocation.street_address}
                                    onChange={handleMainLocationChange}
                                    placeholder="Street Address"
                                />
                            </Tooltip>
                        </div>              
                        <div className='flex flex-row gap-2 mb-2 input-group'>
         
                            <div className='w-full'>
                                <Tooltip
                                    title="City is required"
                                    placement="top"
                                    arrow
                                    >
                                    <Input
                                        type="text"
                                        name="city"
                                        value={mainLocation.city}
                                        onChange={handleMainLocationChange}
                                        placeholder="City"
                                    />
                                </Tooltip>
                            </div>                       
                            <div className='w-[9rem]'>
                                <Tooltip
                                    title="State is required"
                                    placement="top"
                                    arrow
                                    >
                                    <Input
                                        type="text"
                                        name="state"
                                        value={mainLocation.state}
                                        onChange={handleMainLocationChange}
                                        placeholder="State"
                                    />
                                </Tooltip>
                            </div>                       
                            <div className='w-[10rem]'>
                                <Tooltip
                                    title="ZIP Code is required"
                                    placement="top"
                                    arrow
                                    >
                                    <Input
                                        type="text"
                                        name="zip_code"
                                        value={mainLocation.zip_code}
                                        onChange={handleMainLocationChange}
                                        placeholder="ZIP Code"
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className='w-full mb-2 input-group'>
                            <Tooltip
                                title="Street Address is required"
                                placement="top"
                                arrow
                                >
                                <Input
                                    type="text"
                                    name="country"
                                    value={mainLocation.country}
                                    onChange={handleMainLocationChange}
                                    placeholder="Country"
                                />
                            </Tooltip>
                        </div>    
                    </div>
                    <div className="mb-10 form-group">
                        <h3 className='mb-4'>Parking Details</h3>
                        <div className='w-full mb-2 input-group'>
                                <Input
                                    type="text"
                                    name="name"
                                    value={parkingLocation.name}
                                    onChange={handleParkingLocationChange}
                                    placeholder="Name"
                                />
                        </div>                       
                        <div className='w-full mb-2 input-group'>
                                <Input
                                    type="text"
                                    name="street_address"
                                    value={parkingLocation.street_address}
                                    onChange={handleParkingLocationChange}
                                    placeholder="Street Address"
                                />
                        </div>                      
                        <div className='flex flex-row gap-2 mb-2 input-group'>
         
                            <div className='w-full'>
                                    <Input
                                        type="text"
                                        name="city"
                                        value={parkingLocation.city}
                                        onChange={handleParkingLocationChange}
                                        placeholder="City"
                                    />
                            </div>                       
                            <div className='w-[9rem]'>
                                    <Input
                                        type="text"
                                        name="state"
                                        value={parkingLocation.state}
                                        onChange={handleParkingLocationChange}
                                        placeholder="State"
                                    />
                            </div>                       
                            <div className='w-[10rem]'>
                                    <Input
                                        type="text"
                                        name="zip_code"
                                        value={parkingLocation.zip_code}
                                        onChange={handleParkingLocationChange}
                                        placeholder="ZIP Code"
                                    />
                            </div>
                        </div>
                        <div className='w-full mb-2 input-group'>
                                <Input
                                    type="text"
                                    name="country"
                                    value={parkingLocation.country}
                                    onChange={handleParkingLocationChange}
                                    placeholder="Country"
                                />
                        </div>    
                    </div>
                    <div className="mb- form-group">
                        <h3 className='mb-4'>Nearest Hospital</h3>

                        <div className='w-full mb-2 input-group'>
                                <Input
                                    type="text"
                                    name="name"
                                    value={hospitalLocation.name}
                                    onChange={handleHospitalLocationChange}
                                    placeholder="Name"
                                />
                        </div>                       
                        <div className='w-full mb-2 input-group'>
                                <Input
                                    type="text"
                                    name="street_address"
                                    value={hospitalLocation.street_address}
                                    onChange={handleHospitalLocationChange}
                                    placeholder="Street Address"
                                />
                        </div>                       
                        <div className='flex flex-row gap-2 mb-2 input-group'>
         
                            <div className='w-full'>
                                    <Input
                                        type="text"
                                        name="city"
                                        value={hospitalLocation.city}
                                        onChange={handleHospitalLocationChange}
                                        placeholder="City"
                                    />
                            </div>                       
                            <div className='w-[9rem]'>
                                    <Input
                                        type="text"
                                        name="state"
                                        value={hospitalLocation.state}
                                        onChange={handleHospitalLocationChange}
                                        placeholder="State"
                                    />
                            </div>                       
                            <div className='w-[10rem]'>
                                    <Input
                                        type="text"
                                        name="zip_code"
                                        value={hospitalLocation.zip_code}
                                        onChange={handleHospitalLocationChange}
                                        placeholder="ZIP Code"
                                    />
                            </div>
                        </div>
                        <div className='w-full mb-2 input-group'>
                                <Input
                                    type="text"
                                    name="country"
                                    value={hospitalLocation.country}
                                    onChange={handleHospitalLocationChange}
                                    placeholder="Country"
                                />
                        </div>  
                    </div>
                </div>

             </RightPanel>









    );
}
