import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import RightPanel from '@/Components/Layouts/RightPanel';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularButton from '@/Components/Buttons/CircularButton';
import DangerButton from '@/Components/Buttons/DangerButton';
import LocationForm from '@/Pages/Projects/CallSheets/Locations/Forms/LocationForm';

export default function LocationEdit({ callSheet, locations = [], isUpdate, ...props }) {
  const { isRightPanelOpen, toggleRightPanel } = props;
  const [locationValid, setLocationValid] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [location, setLocation] = useState({
    name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    parking_location: {
      // parking location properties
    },
    hospital_location: {
      // hospital location properties
    },
  });


  const clearForm = () => {
    // Reset the location state to its initial values
    setLocation({
      name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
    });
  };

  useEffect(() => {
    setLocation(locations[0] || {
      name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      parking_location: {
        // parking location properties
      },
      hospital_location: {
        // hospital location properties
      },
    });
  }, [locations]);

  const handleLocationChange = (event, locationType) => {
    const { name, value } = event.target;
  
    const setLocationData = (location) => ({
      ...(location || {
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
      }),
      [name]: value,
    });
  
    switch (locationType) {
      case 'main':
        setLocation(setLocationData);
        break;
      case 'parking':
        setLocation((prevLocation) => ({
          ...prevLocation,
          parking_location: setLocationData(prevLocation.parking_location),
        }));
        break;
      case 'hospital':
        setLocation((prevLocation) => ({
          ...prevLocation,
          hospital_location: setLocationData(prevLocation.hospital_location),
        }));
        break;
      default:
        break;
    }
  };
  

  const handleCloseButtonClick = () => {
    clearForm();
    toggleRightPanel(false);
  };

  const validateLocation = () => {
    const { name, street_address, city, state, zip_code } = location || {};
    const isLocationValid = name?.trim() !== '' && street_address?.trim() !== '' && city?.trim() !== '' && state?.trim() !== '' && zip_code?.trim() !== '';
    setLocationValid(isLocationValid);
    return isLocationValid;
  };
  

  const prepareLocationData = () => {
    const baseLocationData = {
      name: location.name || '',
      street_address: location.street_address || '',
      city: location.city || '',
      state: location.state || '',
      zip_code: location.zip_code || '',
      country: location.country || '',
    };
  
    const parkingLocationData =
      location.parking_location && typeof location.parking_location === 'object'
        ? {
            name: location.parking_location.name || '',
            street_address: location.parking_location.street_address || '',
            city: location.parking_location.city || '',
            state: location.parking_location.state || '',
            zip_code: location.parking_location.zip_code || '',
            country: location.parking_location.country || '',
            // Add other fields as needed
          }
        : {};
  
    return {
      ...baseLocationData,
      parking_location: parkingLocationData,
      // Add other fields as needed
    };
  };
  

  // const prepareParkingLocationData = () => {
  //   // Assuming your parking form has inputs with names like 'parking_name', 'parking_street_address', etc.
  //   const parkingData = {
  //     name: location.parking_location?.name || '', // Get parking name from location state, if available
  //     street_address: location.parking_location?.street_address || '',
  //     city: location.parking_location?.city || '',
  //     state: location.parking_location?.state || '',
  //     zip_code: location.parking_location?.zip_code || '',
  //     country: location.parking_location?.country || '',
  //     // Add other fields as needed
  //   };
  
  //   return parkingData;
  // };
  

const renderLocationForms = () => {
  if (locations.length > 0) {
    return locations.map((existingLocation) => (
      <div key={existingLocation.id} className="mb-10 form-group">
        <LocationForm
          location={existingLocation}
          onLocationChange={(e) => handleLocationChange(e, 'main')}
          isUpdate={isUpdate}
        />
      </div>
    ));
  } else if (location.name) {
    // Render forms for parking and hospital only if a main location exists
    return (
      <>
        <div className="mb-10 form-group">
          <LocationForm
            location={location}
            onLocationChange={(e) => handleLocationChange(e, 'main')}
            isUpdate={isUpdate}
          />
        </div>
        <div className="mb-10 form-group">
          <h3 className='mb-4'>Add a Parking Location</h3>
          <LocationForm
            location={location.parking_location}
            onLocationChange={(e) => handleLocationChange(e, 'parking')}
            isUpdate={isUpdate}
          />
        </div>
        <div className="mb-10 form-group">
          <h3 className='mb-4'>Add a Hospital Location</h3>
          <LocationForm
            location={location.hospital_location}
            onLocationChange={(e) => handleLocationChange(e, 'hospital')}
            isUpdate={isUpdate}
          />
        </div>
      </>
    );
  } else {
    // Render only the main location form if no existing locations and no main location data
    return (
      <div className="mb-10 form-group">
        <LocationForm
          location={location}
          onLocationChange={(e) => handleLocationChange(e, 'main')}
          isUpdate={isUpdate}
        />
      </div>
    );
  }
};


const handleLocation = async () => {
  setIsSubmitClicked(true);

  const isLocationValid = validateLocation();

  if (isLocationValid) {
    try {
      const locationData = prepareLocationData();

      // Include parking location data in the main location payload
      if (locationData.parking_location) {
        locationData.parking_location = {
          // Update to match your new structure for parking location
          name: location.parking_location?.name || '',
          street_address: location.parking_location?.street_address || '',
          city: location.parking_location?.city || '',
          state: location.parking_location?.state || '',
          zip_code: location.parking_location?.zip_code || '',
          country: location.parking_location?.country || '',
          // Add other fields as needed
        };
      }
      console.log("Location Info", locationData);

      const routeName = locations.length > 0 ? 'locations.update' : 'locations.store'; // Use 'store' route if no existing location

      const idRoute = { id: callSheet.project_id };
      const callSheetIdRoute = { callSheetId: callSheet.id };
      const locationIdRoute = locations.length > 0 ? { locationId: location.id } : {}; // Provide locationId only if it exists

      // Show loading indicator if applicable

      const locationResponse = await router[locations.length > 0 ? 'patch' : 'post']( // Use 'post' method for 'store' route
        route(routeName, { ...idRoute, ...callSheetIdRoute, ...locationIdRoute }),
        locationData
      );

      // Depending on your application, you might want to update the UI to indicate success
      console.log('Location data updated or stored successfully:', locationResponse);

      // Clear the form after a successful submit or update
      clearForm();

      toggleRightPanel(false);
    } catch (locationError) {
      console.error('Error updating or storing location data:', locationError);

      // Show a user-friendly error message or notification
      const errorMessage =
        locationError.response?.data?.message || 'An error occurred while updating or storing location data.';
      console.error('Error updating or storing location data:', errorMessage);

      // Display an error message to the user if needed.
    }
  } else {
    console.error('Location is not valid');
    // Display an error message to the user if needed.
  }
};



  

  const handleDeleteLocation = async () => {
    try {
      const routeName = 'locations.destroy';
      const idRoute = { id: callSheet.project_id };
      const callSheetIdRoute = { callSheetId: callSheet.id };
      const locationIdRoute = { locationId: location.id };

      await router.delete(route(routeName, { ...idRoute, ...callSheetIdRoute, ...locationIdRoute }));

      console.log('Location deleted successfully');
      toggleRightPanel(false);
      clearForm();
    } catch (deleteError) {
      console.error('Error deleting location:', deleteError);

      const errorMessage = deleteError.response?.data?.message || 'An error occurred while deleting location.';
      console.error('Error deleting location:', errorMessage);
    }
  };

  return (
    <RightPanel
      isRightPanelOpen={isRightPanelOpen}
      showSlideOutPanel={false}
      panel_header={
        <div>
          <h3>{isUpdate ? 'Edit Location' : 'Create Location'}</h3>
          <p className="p-base">{isUpdate ? 'Edit location details here' : 'Create new location details here'}</p>
        </div>
      }
      panel_footer={
        <div className="flex flex-row gap-4 justify-between">
          <CircularButton icon={faXmark} size="small" onClick={handleCloseButtonClick} />
          <SecondaryButton className="-ml-[17rem]" onClick={handleLocation}>
            Update Location
          </SecondaryButton>
          <DangerButton className="justify-end" onClick={handleDeleteLocation}>
            <FontAwesomeIcon icon={faTrash} />
          </DangerButton>
        </div>
      }
    >
      <div>
        <div className="mb-10 form-group">{renderLocationForms()}</div>
      </div>
    </RightPanel>
  );
}
