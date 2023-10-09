import Input from '@mui/joy/Input';


 const ParkingLocationForm = ({ parkingLocation, onParkingLocationChange }) => {

    return (
        
            <div>
                <h3 className='mb-4'>Parking Details</h3>
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="name"
                            value={parkingLocation.name}
                            onChange={onParkingLocationChange}
                            placeholder="Name"
                        />
                </div>                       
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="street_address"
                            value={parkingLocation.street_address}
                            onChange={onParkingLocationChange}
                            placeholder="Street Address"
                        />
                </div>                      
                <div className='flex flex-row gap-2 mb-2 input-group'>

                    <div className='w-full'>
                            <Input
                                type="text"
                                name="city"
                                value={parkingLocation.city}
                                onChange={onParkingLocationChange}
                                placeholder="City"
                            />
                    </div>                       
                    <div className='w-[9rem]'>
                            <Input
                                type="text"
                                name="state"
                                value={parkingLocation.state}
                                onChange={onParkingLocationChange}
                                placeholder="State"
                            />
                    </div>                       
                    <div className='w-[10rem]'>
                            <Input
                                type="text"
                                name="zip_code"
                                value={parkingLocation.zip_code}
                                onChange={onParkingLocationChange}
                                placeholder="ZIP Code"
                            />
                    </div>
                </div>
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="country"
                            value={parkingLocation.country}
                            onChange={onParkingLocationChange}
                            placeholder="Country"
                        />
                </div>    
            </div>

    );

}

export default ParkingLocationForm;
