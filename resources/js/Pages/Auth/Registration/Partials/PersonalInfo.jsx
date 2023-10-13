import { useForm } from '@inertiajs/react';





export default function PersonalInfo({ onUpdatePersonalInfo }) {
    const { data, setData } = useForm({
        first_name: '',
        last_name: '',
        middle_initial: '',
        phone: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
    });

    const handleChange = (field, value) => {
        setData(field, value);

        // Notify the parent about the updated personal info
        onUpdatePersonalInfo({
            ...data,
            [field]: value,
        });
    };



    return (

        <div>
            <div className='form-group'>   
                <div className='flex flex-row gap-2 form-group'>
                    <input
                        id="first_name"
                        name="first_name"
                        placeholder="Your First Name"
                        value={data.first_name}
                        autoComplete="given-name"
                        onChange={(e) => handleChange('first_name', e.target.value)}
                        required
                    />
                    <input
                        id="middle_initial"
                        className='max-w-[6rem]'
                        name="middle_initial"
                        placeholder="MI"
                        value={data.middle_initial}
                        autoComplete="additional-name"
                        onChange={(e) => handleChange('middle_initial', e.target.value)}
                    />
                </div>
                <input
                    id="last_name"
                    name="last_name"
                    placeholder="Your Last Name"
                    value={data.last_name}
                    autoComplete="family-name"
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    required
                />              
            </div>
            
            <div className='form-group'>
                <input
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={data.phone}
                    autoComplete="tel"
                    onChange={(e) => handleChange('phone', e.target.value)}
                /> 
            </div>
        
            <div className='form-group'>
                <input
                    id="street_address"
                    className='mb-4'
                    name="street_address"
                    placeholder="Street Address"
                    value={data.street_address}
                    autoComplete="street-address"
                    onChange={(e) => handleChange('street_address', e.target.value)}
                />
                <div className='flex flex-row gap-2 form-group'>
                    <input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={data.city}
                        autoComplete="address-level2"
                        onChange={(e) => handleChange('city', e.target.value)}
                    />
                    <input
                        id="state"
                        name="state"
                        placeholder="State"
                        value={data.state}
                        autoComplete="address-level1"
                        onChange={(e) => handleChange('state', e.target.value)}
                    />
                    <input
                        id="zip_code"
                        name="zip_code"
                        placeholder="Zip Code"
                        value={data.zip_code}
                        autoComplete="postal-code"
                        onChange={(e) => handleChange('zip_code', e.target.value)}
                    />
                </div>
            </div>                

    </div> 

    );

}
