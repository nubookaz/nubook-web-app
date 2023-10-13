import Input from '@mui/joy/Input';


 const ParkingLocationForm = ({ parkingLocation, onParkingLocationChange }) => {

    const defaultParkingLocation = {
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    };

    const currentParkingLocation = parkingLocation || defaultParkingLocation;

    return (
        
            <div>
                <h3 className='mb-4'>Parking Details</h3>
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="name"
                            value={currentParkingLocation.name}
                            onChange={onParkingLocationChange}
                            placeholder="Name"
                        />
                </div>                       
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="street_address"
                            value={currentParkingLocation.street_address}
                            onChange={onParkingLocationChange}
                            placeholder="Street Address"
                        />
                </div>                      
                <div className='flex flex-row gap-2 mb-2 input-group'>

                    <div className='w-full'>
                            <Input
                                type="text"
                                name="city"
                                value={currentParkingLocation.city}
                                onChange={onParkingLocationChange}
                                placeholder="City"
                            />
                    </div>                       
                    <div className='w-[9rem]'>
                            <Input
                                type="text"
                                name="state"
                                value={currentParkingLocation.state}
                                onChange={onParkingLocationChange}
                                placeholder="State"
                            />
                    </div>                       
                    <div className='w-[10rem]'>
                            <Input
                                type="text"
                                name="zip_code"
                                value={currentParkingLocation.zip_code}
                                onChange={onParkingLocationChange}
                                placeholder="ZIP Code"
                            />
                    </div>
                </div>
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="country"
                            value={currentParkingLocation.country}
                            onChange={onParkingLocationChange}
                            placeholder="Country"
                        />
                </div>    
            </div>

    );

}

export default ParkingLocationForm;
