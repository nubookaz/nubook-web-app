import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCamera, faFilm, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';

const CreativeEntertainmentTypeSelector = ({ selectedType, onSelectType }) => {
    const creativeTypes = {
        'Music Videos': {
            description: 'Create visually captivating music videos to complement your sound.',
            icon: faMusic,
        },
        'Documentary Films': {
            description: 'Tell real-life stories with compelling documentary filmmaking.',
            icon: faCamera,
        },
        'Short Films': {
            description: 'Bring your short stories to life on screen.',
            icon: faFilm,
        },
        'Fashion Shows': {
            description: 'Capture the glamour and artistry of your fashion events.',
            icon: faTheaterMasks,
        },
        'Feature Films': {
            description: 'Produce cinematic feature films with compelling narratives and stunning visuals.',
            icon: faFilm,
        },
    };

    const disabledTypes = ['Music Videos', 'Fashion Shows']; // Add any other types you wish to disable

    const isTypeDisabled = (type) => disabledTypes.includes(type);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
            {Object.entries(creativeTypes).map(([type, { description, icon }]) => (
                <div
                    key={type}
                    className={`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[8rem] rounded-xl duration-500 
                                ${selectedType === type ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100'}
                                ${isTypeDisabled(type) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !isTypeDisabled(type) && onSelectType(type)}
                >
                    <FontAwesomeIcon icon={icon} className={`text-2xl mx-8 duration-500 
                        ${selectedType === type ? 'text-emerald-400' : 'text-slate-300'}
                        ${isTypeDisabled(type) ? 'opacity-50' : ''}`} />
                    <div>
                        <h3 className={`text-lg font-semibold ${isTypeDisabled(type) ? 'text-gray-400' : 'text-slate-500'}`}>{type}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CreativeEntertainmentTypeSelector;
