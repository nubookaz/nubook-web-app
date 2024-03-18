import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faChalkboardTeacher, faBullhorn, faVideo, faAd } from '@fortawesome/free-solid-svg-icons';

const CorporateProjectTypeSelector = ({ selectedType, onSelectType }) => {
    const corporateTypes = {
        'Corporate Events': 'Showcase your event\'s energy and professionalism with our dynamic photo and video coverage',
        'Conferences/Seminars': 'Document every insightful moment with our expert visual storytelling',
        'Training Videos': 'Elevate your training with engaging, impactful video content',
        'Product Launches': 'Highlight your product\'s innovation with compelling launch coverage',
        'Commercials/Advertisements': 'Strengthen brand connections with our stunning, effective production',
    };

    const corporateTypeIcons = {
        'Corporate Events': faBriefcase,
        'Conferences/Seminars': faChalkboardTeacher,
        'Training Videos': faVideo,
        'Product Launches': faBullhorn,
        'Commercials/Advertisements': faAd,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(corporateTypes).map(([type, description]) => (
                <div
                    key={type}
                    className={`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[8rem] rounded-xl duration-500 ${selectedType === type ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100'}`}
                    onClick={() => onSelectType(type)}
                >
                    <FontAwesomeIcon icon={corporateTypeIcons[type]} className={`text-2xl mx-8 duration-500 ${selectedType === type ? 'text-emerald-400' : 'text-slate-300'}`} />
                    <div>
                        <h3 className="text-lg font-semibold text-slate-500">{type}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CorporateProjectTypeSelector;
