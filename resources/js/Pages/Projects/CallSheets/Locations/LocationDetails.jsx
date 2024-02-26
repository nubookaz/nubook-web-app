import PropTypes from 'prop-types';
import { useCallSheetLocation } from '@/Components/Contexts/CallSheetLocationContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import React, { useState, useEffect } from 'react';
import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSquareH, faSquareParking } from '@fortawesome/free-solid-svg-icons';
import EmptyContent from '@/Components/Layouts/EmptyContent';

const LocationDetails = ({ 
    
    callSheet 

}) => {

    const { currentCallSheetLocation } = useCallSheetLocation();
    const { toggleModal } = useModal();
    const handleAddLocationClick = () => {
        toggleModal({ type: 'newLocationForm' });
    };
    console.log(callSheet);

    // Extract film_locations from callSheet
    const filmLocations = callSheet && Array.isArray(callSheet.film_locations) ? callSheet.film_locations : [];
    const maxLocations = 5; // Maximum number of locations allowed

    // Normalize currentCallSheetLocation data to match filmLocations structure
    let normalizedCurrentCallSheetLocation = null;
    if (currentCallSheetLocation) {
        normalizedCurrentCallSheetLocation = {
            name: currentCallSheetLocation.location.name,
            location: {
                street_address: currentCallSheetLocation.location.location.street_address,
                city: currentCallSheetLocation.location.location.city,
                state: currentCallSheetLocation.location.location.state,
                zip_code: currentCallSheetLocation.location.location.zip_code,
            },
            parking_location: currentCallSheetLocation.parking,
            hospital_location: currentCallSheetLocation.hospital,
        };
    }

    // Combine filmLocations and normalized currentCallSheet into one array
    const combinedData = [...filmLocations];
    if (normalizedCurrentCallSheetLocation) {
        combinedData.push(normalizedCurrentCallSheetLocation);
    }

    // Click event handler for adding a new location
    const handleEditLocationClick = (location, callSheetId, locationType) => {
        toggleModal({ 
            type: 'editLocationForm', 
            data: { location, callSheetId, locationType }
        });
    };

 
 
     return (
        <CardContainer header='Location Details' className={`h-full ${combinedData?.length ? 'bg-slate-300' : ''}`}>
                {combinedData.length > 0 ? (
                    <div className='flex flex-col gap-4'>
                        {combinedData.map((location, index) => (
                            <div key={index} className="p-4 bg-white shadow-sm rounded-xl flex flex-col gap-2">
                                <div className='flex justify-between items-center'>
                                    <h3 className="text-slate-500 font-bold text-lg">{location.name}</h3>
                                    <FontAwesomeIcon
                                        onClick={() => handleEditLocationClick(location, location.callSheetId, 'location')}
                                        icon={faPencil}
                                        className='hover:text-emerald-500 duration-500 transition-all cursor-pointer'
                                    />
                                </div>
                                <p>{location.location.street_address}, {location.location.city}, {location.location.state}, {location.location.zip_code}</p>
                                <div className='flex flex-row gap-6'>
                                    <span className='flex items-center gap-1'>
                                        <FontAwesomeIcon 
                                            onClick={() => location.parking_location && handleEditLocationClick(location.parking_location, location.callSheetId, 'parking')} 
                                            icon={faSquareParking} 
                                            className={location.parking_location ? 'text-cyan-500 cursor-pointer' : 'text-slate-300'} 
                                        />
                                    </span>

                                    <span onClick={() => location.hospital_location && handleEditLocationClick(location.hospital_location, location.callSheetId, 'hospital')}  
                                        className={`flex items-center gap-1 ${location.hospital_location ? 'text-cyan-500 cursor-pointer' : 'text-slate-300'}`}>
                                        <FontAwesomeIcon 
                                            icon={faSquareH} 
                                            className='mr-2'
                                        />
                                        {location.hospital_location && <span className='text-sm text-cyan-500 font-semibold'>{location.hospital_location.name}</span>}
                                    </span>
                                </div>
                            </div>
                        ))}

                    {combinedData.length < maxLocations ? 
                        (

                            <div onClick={handleAddLocationClick} className='cursor-pointer px-[4rem] text-sm border-2 border-dashed border-slate-50 duration-500 transition-all hover:bg-slate-400 hover:text-slate-50 rounded-xl flex justify-center items-center bg-slate-200 text-slate-400 font-semibold h-[4rem] text-center'>
                                {combinedData.length >= maxLocations ? 
                                'Maximum number of locations reached.' :
                                `Click here to add another location to your project. ${combinedData.length} / ${maxLocations} Remaining `}
                            </div>

                        ) : null    
                    }

                </div>
            
            ) : (
                <EmptyContent
                    className='saturate-0'
                    imageUrl='location.svg'
                    buttonText='Add a Location'
                    onClick={handleAddLocationClick}
                    svgClass='max-w-[13rem]'
                >
                    {{
                        description: (
                            <p className='text-slate-300'>Add a location to your project</p>
                        )
                    }}
                </EmptyContent>
            )}

        </CardContainer>
    );
};

    LocationDetails.propTypes = {
        callSheet: PropTypes.shape({
            film_locations: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                location: PropTypes.shape({
                    street_address: PropTypes.string,
                    city: PropTypes.string,
                    state: PropTypes.string,
                    zip_code: PropTypes.string,
                }),
                parking_location: PropTypes.object,
                hospital_location: PropTypes.object,
            })),
        }),
    };

export default LocationDetails;