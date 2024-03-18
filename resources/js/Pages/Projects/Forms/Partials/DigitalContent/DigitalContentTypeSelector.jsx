import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faChalkboardTeacher, faHouseUser, faPodcast, faVideo } from '@fortawesome/free-solid-svg-icons';

const DigitalContentTypeSelector = ({ selectedType, onSelectType }) => {
    const digitalContentTypes = {
        'Social Media Content': {
            description: 'Craft compelling narratives for various social media platforms, tailored to engage and grow your following.',
            icon: faBlog,
        },
        'Educational Videos': {
            description: 'Develop informative and educational content that makes learning accessible and engaging.',
            icon: faChalkboardTeacher,
        },
        'Real Estate Showcases': {
            description: 'Create immersive and visually stunning virtual tours for properties, highlighting key selling points.',
            icon: faHouseUser,
        },
        'Podcasts': {
            description: 'Produce and edit podcast episodes that captivate with clear audio and engaging visuals.',
            icon: faPodcast,
        },
        'Tutorial Videos': {
            description: 'Share your expertise by creating step-by-step tutorial videos that educate and inspire.',
            icon: faVideo,
        },
    };

    // Internally defined disabled types
    const disabledTypes = ['Podcasts', 'Tutorial Videos'];

    const isTypeDisabled = (type) => disabledTypes.includes(type);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
            {Object.entries(digitalContentTypes).map(([type, { description, icon }]) => (
                <div
                    key={type}
                    className={`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[10rem] rounded-xl duration-500 
                                ${selectedType === type ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100'}
                                ${isTypeDisabled(type) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !isTypeDisabled(type) && onSelectType(type)}
                >
                    <FontAwesomeIcon icon={icon} className={`text-2xl mx-8 duration-500 
                        ${selectedType === type ? 'text-emerald-400' : 'text-slate-300'}
                        ${isTypeDisabled(type) ? 'opacity-50' : ''}`}/>
                    <div>
                        <h3 className={`text-lg font-semibold ${isTypeDisabled(type) ? 'text-gray-400' : 'text-slate-500'}`}>{type}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DigitalContentTypeSelector;
