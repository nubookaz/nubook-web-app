import Input from '@mui/joy/Input';


 const HospitalLocationForm = ({ hospitalLocation, onHospitalLocationChange }) => {

    return (
        
            <div>
                <h3 className='mb-4'>Nearest Hospital</h3>

                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="name"
                            value={hospitalLocation.name}
                            onChange={onHospitalLocationChange}
                            placeholder="Name"
                        />
                </div>                       
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="street_address"
                            value={hospitalLocation.street_address}
                            onChange={onHospitalLocationChange}
                            placeholder="Street Address"
                        />
                </div>                       
                <div className='flex flex-row gap-2 mb-2 input-group'>

                    <div className='w-full'>
                            <Input
                                type="text"
                                name="city"
                                value={hospitalLocation.city}
                                onChange={onHospitalLocationChange}
                                placeholder="City"
                            />
                    </div>                       
                    <div className='w-[9rem]'>
                            <Input
                                type="text"
                                name="state"
                                value={hospitalLocation.state}
                                onChange={onHospitalLocationChange}
                                placeholder="State"
                            />
                    </div>                       
                    <div className='w-[10rem]'>
                            <Input
                                type="text"
                                name="zip_code"
                                value={hospitalLocation.zip_code}
                                onChange={onHospitalLocationChange}
                                placeholder="ZIP Code"
                            />
                    </div>
                </div>
                <div className='w-full mb-2 input-group'>
                        <Input
                            type="text"
                            name="country"
                            value={hospitalLocation.country}
                            onChange={onHospitalLocationChange}
                            placeholder="Country"
                        />
                </div>  
            </div>

    );

}

export default HospitalLocationForm;
