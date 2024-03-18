import React from 'react';
import Time from '@/Pages/Profile/Forms/Time';
import Address from '@/Pages/Profile/Forms/Address';

const LiveEventDetails = ({ liveEventDetails, setLiveEventDetails }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLiveEventDetails({
            ...liveEventDetails,
            [name]: value,
        });
    };

    const handleAddressChange = (newAddress) => {
        setLiveEventDetails({
            ...liveEventDetails,
            venueAddress: newAddress,
        });
    };

    const handleTimeChange = (newTime) => {
        setLiveEventDetails({
            ...liveEventDetails,
            eventTime: newTime,
        });
    };

    return (
        <div className="my-12 flex flex-row gap-6 mx-auto w-[70rem]">
            <div className='w-1/2'>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">Event Name</label>
                        <input
                            type="text"
                            name="eventName"
                            id="eventName"
                            placeholder="Event Name"
                            value={liveEventDetails.eventName || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalCameras">Total Cameras Needed</label>
                        <input
                            type="number"
                            name="totalCameras"
                            id="totalCameras"
                            placeholder="Total Cameras Needed"
                            value={liveEventDetails.totalCameras || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    {/* Additional inputs like custom graphics and network availability */}
                </div>

                <h3 className="text-lg font-medium text-gray-700">Venue Details</h3>
                <Address
                    data={liveEventDetails.venueAddress}
                    onAddressChange={handleAddressChange}
                />
            </div>

            <div className="w-1/2">
                <div className='flex flex-row gap-4'>
                    <div className="mb-4 w-1/2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                            Event Date
                        </label>
                        <input
                            type="date"
                            name="eventDate"
                            id="eventDate"
                            value={liveEventDetails.eventDate || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                            Event Time
                        </label>
                        <Time
                            initialTime={liveEventDetails.eventTime || '12:00 PM'}
                            onTimeChange={handleTimeChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveEventDetails;
