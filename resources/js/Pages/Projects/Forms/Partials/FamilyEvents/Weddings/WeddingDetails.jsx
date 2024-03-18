import React from 'react';
import Time from '@/Pages/Profile/Forms/Time';
import Address from '@/Pages/Profile/Forms/Address';

 
const WeddingDetails = ({ weddingDetails = {}, setWeddingDetails }) => {

    const handleAddressChange = (newAddress) => {
         setWeddingDetails({
            ...weddingDetails,
            venueAddress: newAddress,
        });
    };

    const handleTimeChange = (timeType, newTime) => {
        setWeddingDetails({
            ...weddingDetails,
            [timeType]: newTime,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWeddingDetails({
            ...weddingDetails,
            [name]: value
        });
    };

    return (
        <div className="my-12 flex flex-row gap-6 mx-auto w-[70rem]">
            <div className='w-1/2'>
                <h3 className="text-lg font-medium text-gray-700">Couples Personal Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partner1FirstName">Partner #1 First Name</label>
                        <input
                            type="text"
                            name="partner1FirstName"
                            id="partner1FirstName"
                            placeholder="Partner #1 First Name"
                            value={weddingDetails.partner1FirstName || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partner2FirstName">Partner #2 First Name</label>
                        <input
                            type="text"
                            name="partner2FirstName"
                            id="partner2FirstName"
                            placeholder="Partner #2 First Name"
                            value={weddingDetails.partner2FirstName || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="couplesSurname">Couples Surname</label>
                        <input
                            type="text"
                            name="couplesSurname"
                            id="couplesSurname"
                            placeholder="Couples Surname"
                            value={weddingDetails.couplesSurname || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <h3 className="text-lg font-medium text-gray-700">Venue Details</h3>
                <Address
                    data={weddingDetails.venueAddress}
                    onAddressChange={handleAddressChange}
                />
            </div>

            <div className="w-1/2">
                <h3 className="text-lg font-medium text-gray-700">Wedding Date and Time</h3>
                <div className='flex flex-row gap-4'>
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weddingDate">
                            Wedding Date
                        </label>
                        <input
                            type="date"
                            name="weddingDate"
                            id="weddingDate"
                            value={weddingDetails.weddingDate || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weddingTime">
                            Wedding Time
                        </label>
                        <Time
                            initialTime={weddingDetails.weddingTime || '12:00 PM'}
                            onTimeChange={(newTime) => handleTimeChange('weddingTime', newTime)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeddingDetails;
