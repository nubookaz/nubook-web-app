 
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

const Hospitals = ({ existingHospitalData, locationAddress, onSelectHospital }) => {
 

  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Check if any of the coordinates are not numbers (which includes `undefined`)
    if ([lat1, lon1, lat2, lon2].some(coord => typeof coord !== 'number')) {
      return 'Distance not available'; // or simply return 'N/A'
    }
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (lon2 - lon1) * (Math.PI / 180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(
      Math.sin(difflat / 2) * Math.sin(difflat / 2) +
      Math.cos(rlat1) * Math.cos(rlat2) *
      Math.sin(difflon / 2) * Math.sin(difflon / 2)
    ));
    return d.toFixed(2); // Two decimal places
  };


  const fetchNearbyHospitals = async () => {
    if (!locationAddress || !locationAddress.latitude || !locationAddress.longitude) {
      setNearbyHospitals([]);
      return;
    }

    const url = `/nearby-hospitals?latitude=${locationAddress.latitude}&longitude=${locationAddress.longitude}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNearbyHospitals(data.results || []);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setNearbyHospitals([]);
    }
  };

  useEffect(() => {
      if (existingHospitalData) {
          setSelectedHospital({
              name: existingHospitalData.name,
              vicinity: existingHospitalData.street_address,
              place_id: existingHospitalData.place_id, // Convert to string if necessary
              geometry: {
                  location: {
                      lat: parseFloat(existingHospitalData.latitude || 0),
                      lng: parseFloat(existingHospitalData.longitude || 0),
                  },
              },
          });
      }
      fetchNearbyHospitals();
  }, [locationAddress, existingHospitalData]);


  const handleSelectHospital = (hospital) => {
      setSelectedHospital(hospital);
      onSelectHospital && onSelectHospital(hospital);
  };

  

    return (
      <div>
          <div className='flex flex-row justify-between items-center w-full mb-4 '>
              <h3 className='text-slate-400'>Nearby Hospitals</h3>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {nearbyHospitals.length > 0 ? (
                  <ul className='flex flex-col gap-4'>
                      {nearbyHospitals.map((hospital, index) => (
                          <li
                              key={index}
                              className={`flex flex-row gap-4 justify-between items-center px-4 py-2 bg-slate-50 shadow-md rounded-xl cursor-pointer ${selectedHospital?.place_id === hospital.place_id ? 'duration-500 transition-all border-emerald-500 border-2' : ''}`}
                              onClick={() => handleSelectHospital(hospital)}
                          >
 
                              <div>

                                  {selectedHospital?.place_id === hospital.place_id && (
                                      <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                                  )}
                              </div>

                              <div className='flex flex-row w-full justify-between'>
                                  <div className='flex flex-col'>
                                      <p className='text-slate-500 font-bold text-sm'>{hospital.name}</p>
                                      <span className='text-sm text-slate-400'>{hospital.vicinity || hospital.address}</span>
                                  </div>
                                  <div>
                                      <span className='text-sm text-slate-400 ml-2'>
                                        {calculateDistance(
                                            locationAddress?.latitude, 
                                            locationAddress?.longitude, 
                                            hospital.geometry?.location?.lat, 
                                            hospital.geometry?.location?.lng
                                        )} miles
                                      </span>
                                  </div>
                              </div>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p>No nearby hospitals found.</p>
              )}
          </div>
      </div>
    );
};

export default Hospitals;
