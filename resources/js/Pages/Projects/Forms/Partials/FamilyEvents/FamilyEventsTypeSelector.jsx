import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBirthdayCake, faRing, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

const FamilyEventsTypeSelector = ({ selectedType, onSelectType }) => {
    const familyEventTypes = {
        'Wedding': {
            description: 'Celebrate the start of your forever after with our comprehensive event coverage.',
            icon: faHeart,
        },
        'Birthday Party': {
            description: 'Capture the joy and fun as you mark another year of life and happiness.',
            icon: faBirthdayCake,
        },
        'Anniversary Celebrations': {
            description: 'Commemorate your love and commitment throughout the years with our special event services.',
            icon: faRing,
        },
        'Fundraisers/Charity Events': {
            description: 'Support your cause with our professional coverage to spread awareness and encourage generosity.',
            icon: faHandHoldingHeart,
        },
    };

    return (
        <div className="my-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
                {Object.entries(familyEventTypes).map(([eventType, { description, icon }]) => (
                    <div
                        key={eventType}
                        className={`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[8rem] rounded-xl duration-500 ${selectedType === eventType ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100'}`}
                        onClick={() => onSelectType(eventType)}
                    >
                        <FontAwesomeIcon icon={icon} className={`text-2xl mx-8 duration-500 ${selectedType === eventType ? 'text-emerald-400' : 'text-slate-300'}`} />
                        <div>
                            <h3 className="text-lg font-semibold text-slate-500">{eventType}</h3>
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FamilyEventsTypeSelector;
