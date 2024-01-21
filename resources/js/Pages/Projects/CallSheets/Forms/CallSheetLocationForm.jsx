import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import DrawerPanel from '@/Components/Layouts/DrawerPanel';
import CircularButton from '@/Components/Buttons/CircularButton';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@mui/joy/Textarea';
import { inputGroupClass, formGroupClass } from '@/Components/Scripts/Form';
import { fetchGeocodeData } from '@/Components/UtilityFunctions/Geocoding';
import Typography from '@mui/joy/Typography';

 
import Address from '@/Components/Forms/Address';
 

export default function CallSheetLocationForm({
  
  callSheet, 
  newData, 
  ...props

}) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
    fetchCallSheetData(callSheet.id);

  }, []);
 
 
  
  const { isDrawerPanelOpen, toggleDrawerPanel } = props;
  const [emptyFields, setEmptyFields] = useState({});
  const [processing, setProcessing] = useState(false);

  const today = new Date().toISOString().split('T')[0];


  const [parkingInstructions, setParkingInstructions] = useState('');
  const [hospitalInstructions, setHospitalInstructions] = useState('');
  
  const [parkingAddress, setParkingAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
  });

  const [hospitalAddress, setHospitalAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
  });
 
  
  const handleUpdateFormData = (field, value) => {
    if (field.startsWith('parking_')) {
      const fieldName = field.replace('parking_', '');
      setParkingAddress(prevData => ({
        ...prevData,
        [fieldName]: value
      }));
    } else if (field.startsWith('hospital_')) {
      const fieldName = field.replace('hospital_', '');
      setHospitalAddress(prevData => ({
        ...prevData,
        [fieldName]: value
      }));
    }
  };
  


  const handleCloseButtonClick = () => {
      console.log("close");
      toggleDrawerPanel(false);
  };


  const handleGeocode = async (streetAddress, zipCode) => {
    if (streetAddress && zipCode) {
      try {
        const geoData = await fetchGeocodeData(streetAddress, zipCode);
        return geoData ? { latitude: geoData.lat, longitude: geoData.lng } : null;
      } catch (err) {
        console.error('Error fetching geocode:', err);
        return null; // Return null instead of throwing an error
      }
    } else {
      // Return null if address or zip code is not provided
      return null;
    }
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
  
    try {
      const parkingGeoData = await handleGeocode(parkingAddress.street_address, parkingAddress.zip_code);
      const hospitalGeoData = await handleGeocode(hospitalAddress.street_address, hospitalAddress.zip_code);
  
      // Update the address states with geocoding data
      if (parkingGeoData) {
        setParkingAddress(prevData => ({
          ...prevData,
          ...parkingGeoData
        }));
      }
  
      if (hospitalGeoData) {
        setHospitalAddress(prevData => ({
          ...prevData,
          ...hospitalGeoData
        }));
      }
  
      // Prepare the data to be sent
      const formData = {
        parking_address: { ...parkingAddress, ...parkingGeoData },
        parking_instructions: parkingInstructions,
        hospital_address: { ...hospitalAddress, ...hospitalGeoData },
        hospital_instructions: hospitalInstructions,
      };
  
      // Send a POST request to your API endpoint
      const response = await axios.post(route('callSheets.location.store', { 
        id: callSheet.project_id,
        callSheetId: callSheet.id,
      }), formData);

 
      newData(response.data.callSheet); 
      toggleDrawerPanel(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setProcessing(false);
    }
  };
  


  const fetchCallSheetData = async (callSheetId) => {
    try {

      if (callSheet.parking_location) {
        setParkingInstructions(callSheet.parking_location.parking_instructions || '');
        setHospitalInstructions(callSheet.hospital_location.hospital_instructions || '');
        
        // Check if parking and hospital data exist before setting them
        if (callSheet.parking_location.location) {
          setParkingAddress({
            street_address: callSheet.parking_location.location.street_address || '',
            city: callSheet.parking_location.location.city || '',
            state: callSheet.parking_location.location.state || '',
            zip_code: callSheet.parking_location.location.zip_code || '',
            latitude: callSheet.parking_location.location.latitude || '',
            longitude: callSheet.parking_location.location.longitude || '',
          });
        }

        if (callSheet.hospital_location.location) {
          setHospitalAddress({
            street_address: callSheet.hospital_location.location.street_address || '',
            city: callSheet.hospital_location.location.city || '',
            state: callSheet.hospital_location.location.state || '',
            zip_code: callSheet.hospital_location.location.zip_code || '',
            latitude: callSheet.hospital_location.location.latitude || '',
            longitude: callSheet.hospital_location.location.longitude || '',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching call sheet data:', error);
    }
  };



  const maxParkingLength = 150; 
  const remainingParkingCharacters = maxParkingLength - parkingInstructions.length;

  const maxHospitalLength = 150;  
  const remainingHospitalCharacters = maxHospitalLength - hospitalInstructions.length;
  



  return (
 
      <div className='max-w-[60rem] w-full flex flex-col gap-10 px-8 pb-8'>

          <div className='flex flex-col text-center'>
              <h2 className='text-2xl font-bold text-slate-500'>Add Location Details</h2>
              <p className="text-md">
                  Add parking and hospital details here.
              </p>
          </div>
      
          <div className='flex flex-row gap-10'>
              <div className='flex flex-col gap-4'>

                  <div className='flex flex-col gap-2'>
                      <h4>Parking Location Address</h4>
                      <p className="leading-6">
                          To guarantee a hassle-free parking experience on the day of production, it’s essential to provide the full address of the parking location. Kindly include the street name, city, state, and ZIP code. Precise parking details will help the crew and cast park swiftly and close to the set.
                      </p>
                  </div>
                  <div className={formGroupClass}>
                      <div className={inputGroupClass}>
                        <label htmlFor="parking_instructions" 
                          className='text-gray-400 text-sm'>Parking Instructions</label>
                        <Textarea 
                            name="parking_instructions"
                            minRows={2} 
                            maxRows={4}
                            placeholder="Add parking instructions here...." 
                            value={parkingInstructions}
                            maxLength={maxParkingLength}
                            slotProps={{
                              root: {
                                sx: {
                                  backgroundColor: 'rgba(241, 245, 249)',
                                }
                              }
                            }}
                            onChange={(event) => {
                                if (event.target.value.length <= maxParkingLength) {
                                    setParkingInstructions(event.target.value);
                                }
                            }}   
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault(); 
                                }
                            }}
                            endDecorator={
                                <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                    {parkingInstructions.length} / {maxParkingLength} character(s) ({remainingParkingCharacters} remaining)
                                </Typography>
                            }
                        />
                      </div>
                  </div>

                  <Address
                      data={parkingAddress}
                      // onUpdateInfo={(field, value) => handleUpdateFormData(`parking_${field}`, value)}
                      // emptyFields={emptyFields}
                      // setEmptyFields={setEmptyFields}
                  />
                
                </div>


          <div className='flex flex-col gap-4 '>
              <div className='flex flex-col gap-2'>
                  <h4>Hospital Location Address</h4>
                  <p className="leading-6">
                      For quick access in case of an emergency, a complete address of the nearest hospital is necessary. Please specify the hospital's street, city, state, and ZIP code. Having this information readily available ensures the safety of everyone on set and allows for immediate action if needed.
                  </p>
              </div>
              <div className={formGroupClass}>
                  <div className={inputGroupClass}>
                      <label htmlFor="hospital_instructions" className='text-gray-400 text-sm'>Hospital Instructions</label>
                      <Textarea 
                          name="hospital_instructions"
                          minRows={2} 
                          maxRows={4}
                          placeholder="Add hospital instructions here...." 
                          value={hospitalInstructions}
                          maxLength={maxHospitalLength} 
                          slotProps={{
                            root: {
                              sx: {
                                backgroundColor: 'rgba(241, 245, 249)',
                              }
                            }
                          }}
                          onChange={(event) => {
                            if (event.target.value.length <= maxHospitalLength) {
                              setHospitalInstructions(event.target.value);
                            }
                          }}   
                          onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                  event.preventDefault(); 
                              }
                          }}
                          endDecorator={
                              <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                  {hospitalInstructions.length} / {maxHospitalLength} character(s) ({remainingHospitalCharacters} remaining)
                              </Typography>
                          }
                      />
                  </div>
              </div>
  
              <Address
                data={hospitalAddress}
                  onUpdateInfo={(field, value) => handleUpdateFormData(`hospital_${field}`, value)}
                  emptyFields={emptyFields}
                  setEmptyFields={setEmptyFields}
              />
              
          </div>



          </div>
  
          <div className="flex flex-row gap-4 justify-center max-w-[25rem] mx-auto w-full">
              <SecondaryButton
                  onClick={handleCloseButtonClick}
                  className='w-full'
              >
                  Cancel  
              </SecondaryButton>
              <PrimaryButton buttonType="submit" className='w-full bg-emerald-500 text-white' onSubmit={handleSubmit}>
                  Update Location
              </PrimaryButton>
          </div>

      </div>

  );
}
 