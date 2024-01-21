import { useModal } from '@/Components/Contexts/ModalContext';

import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
 import GoogleMap from './GoogleMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMapLocationDot, faLocationDot, faSquareParking, faSquareH } from '@fortawesome/free-solid-svg-icons';




export default function Locations({

    data,
    newData,
 
}){
    const { toggleDrawer } = useModal();
    const handleLogout = () => {
        toggleDrawer('locationDetails');  
    };




    const [locationData, setLocationData] = useState(null);
    const [parkingLocationData, setParkingLocationData] = useState(null);
    const [hospitalLocationData, setHospitalLocationData] = useState(null);

  
    useEffect(() => {
        // Check if newData has location properties and is not empty
        if (newData && newData.locationData) {
            setLocationData({
                street_address: newData.locationData.street_address || '',
                zip_code: newData.locationData.zip_code || '',
                latitude: newData.locationData.latitude || '',
                longitude: newData.locationData.longitude || '',
            });
        } else if (data.film_location && data.film_location.location) {
            // Fallback to using data if newData is not available
            setLocationData({
                street_address: data.film_location.location.street_address || '',
                zip_code: data.film_location.location.zip_code || '',
                latitude: data.film_location.location.latitude || '',
                longitude: data.film_location.location.longitude || '',
            });
        } else {
            // Set to null if neither newData nor data has location info
            setLocationData(null); 
        }
    }, [data, newData]);
 

    useEffect(() => {
        // Check if newData has parking location properties and is not empty
        if (newData && newData.parking_location) {
          setParkingLocationData({
            parking_instructions: newData.parking_location.parking_instructions || '',
            street_address: newData.parking_location.location?.street_address || '',
            city: newData.parking_location.location?.city || '',
            state: newData.parking_location.location?.state || '',
            zip_code: newData.parking_location.location?.zip_code || '',
            latitude: newData.parking_location.location?.latitude || '',
            longitude: newData.parking_location.location?.longitude || '',
          });
        } else if (data && data.parking_location) {
          // Fallback to using data if newData is not available
          setParkingLocationData({
            parking_instructions: data.parking_location.parking_instructions || '',
            street_address: data.parking_location.location?.street_address || '',
            city: data.parking_location.location?.city || '',
            state: data.parking_location.location?.state || '',
            zip_code: data.parking_location.location?.zip_code || '',
            latitude: data.parking_location.location?.latitude || '',
            longitude: data.parking_location.location?.longitude || '',
          });
        } else {
          // Set to null if neither newData nor data has parking location info
          setParkingLocationData(null);
        }
      }, [data, newData]);
      
      useEffect(() => {
        // Check if newData has hospital location properties and is not empty
        if (newData && newData.hospital_location) {
          setHospitalLocationData({
            hospital_instructions: newData.hospital_location.hospital_instructions || '',
            street_address: newData.hospital_location.location?.street_address || '',
            city: newData.hospital_location.location?.city || '',
            state: newData.hospital_location.location?.state || '',
            zip_code: newData.hospital_location.location?.zip_code || '',
            latitude: newData.hospital_location.location?.latitude || '',
            longitude: newData.hospital_location.location?.longitude || '',
          });
        } else if (data && data.hospital_location) {
          // Fallback to using data if newData is not available
          setHospitalLocationData({
            hospital_instructions: data.hospital_location.hospital_instructions || '',
            street_address: data.hospital_location.location?.street_address || '',
            city: data.hospital_location.location?.city || '',
            state: data.hospital_location.location?.state || '',
            zip_code: data.hospital_location.location?.zip_code || '',
            latitude: data.hospital_location.location?.latitude || '',
            longitude: data.hospital_location.location?.longitude || '',
          });
        } else {
          // Set to null if neither newData nor data has hospital location info
          setHospitalLocationData(null);
        }
      }, [data, newData]);
      
  









     return(

        <CardContainer
            className='h-full grow'
            header="Location Details"
            onClick={handleLogout}
        >

            <div className='flex flex-col gap-4 h-full'>
                {locationData !== null ? (
                    // Render this content when locationData is available
                    <div className="justify-start rounded-xl h-full overflow-hidden">
                        <GoogleMap locationData={locationData} parkingLocationData={parkingLocationData} hospitalLocationData={hospitalLocationData} style={{ width: '100%', height: '100%' }} />
                    </div>
                ) : (
                    // Render this content when locationData is null
                    <div className="justify-start justify-center rounded-xl h-full overflow-hidden flex flex-col gap-4 text-center bg-slate-50 text-slate-400 p-6">
                        <FontAwesomeIcon className='text-3xl' icon={faMapLocationDot}></FontAwesomeIcon>
                        Location data is not available. Please add a location to view the map.
                    </div>
                )}

                <div className="h-full flex flex-col gap-4">
                    <div className="bg-slate-50 h-full rounded-xl py-4 px-6 text-center text-slate-400">
                        {!parkingLocationData ? (
                            <p className='text-sm'>You have not added any parking instructions.</p>
                        ) : (
                            
                            <div className='flex  flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='text-left'>Parking Address</h4>
                                    <div className='text-left flex flex-row gap-4'>
                                        <FontAwesomeIcon className='text-3xl text-sky-600 flex justify-center text-center my-auto' icon={faSquareParking}></FontAwesomeIcon>
                                        
                                        {parkingLocationData.street_address || parkingLocationData.city || parkingLocationData.state || parkingLocationData.zip_code ? (

                                            <div>
                                                <p>{parkingLocationData.street_address}</p>
                                                <p>{parkingLocationData.city} {parkingLocationData.state}, {parkingLocationData.zip_code}</p>
                                            </div>

                                        ) : (
                                            <div className='text-slate-50 p-5 pl-2 w-full rounded-md'>
                                                <p className='text-slate-300'>Parking Address</p>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {parkingLocationData.parking_instructions ? (
                                    <div className='flex flex-col text-left gap-2'>
                                        <h4>Parking Instructions</h4>
                                        <p className='text-sm'>"{parkingLocationData.parking_instructions}"</p>
                                    </div>
                                ) : (
                                    <div className='bg-slate-100 w-full py-8 rounded-md'>
                                        <p className='text-slate-300'>Parking Instructions</p>
                                    </div>
                                )}                
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-50 h-full rounded-xl py-4 px-6 text-center text-slate-400">
                        {!hospitalLocationData ? (
                                <p className='text-sm'>You have not added any hospital instructions.</p>
                            ) : (
                            <div className='flex  flex-col gap-4'>                          
                                <div className='flex flex-col gap-2'>
                                    <h4 className='text-left'>Hospital Address</h4>
                                    <div className='text-left flex flex-row gap-4'>
                                        <FontAwesomeIcon className='text-3xl text-red-600 flex justify-center text-center my-auto' icon={faSquareH}></FontAwesomeIcon>
                                        {hospitalLocationData.street_address || hospitalLocationData.city || hospitalLocationData.state || hospitalLocationData.zip_code ? (

                                            <div>
                                                <p>{hospitalLocationData.street_address}</p>
                                                <p>{hospitalLocationData.city} {hospitalLocationData.state}, {hospitalLocationData.zip_code}</p>
                                            </div>

                                        ) : (
                                            <div className='w-full p-5 pl-2 rounded-md'>
                                                <p className='text-slate-300'>Hospital Address</p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                                {hospitalLocationData.hospital_instructions ? (
                                    <div className='flex flex-col text-left gap-2'>
                                        <h4>Hospital Instructions</h4>
                                        <p className='text-sm'>"{hospitalLocationData.hospital_instructions}"</p>
                                    </div>
                                ) : (
                                    <div className='bg-slate-100 w-full py-8 rounded-md'>
                                        <p className='text-slate-300'>Hospital Instructions</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>

            </div>

        </CardContainer>

    );





}
