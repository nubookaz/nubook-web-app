import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHome, faFilm, faBroadcastTower, faLaptop } from '@fortawesome/free-solid-svg-icons';

const ProjectTypeSelector = ({ selectedProjectType, onProjectTypeSelect }) => {
    const projectTypes = [ 
        'Corporate & Commercial - Conferences/Seminars, Training Videos, Product Launches, Commercials/Advertisements',
        'Family Events & Celebrations - Weddings, Birthday Parties, Anniversary Celebrations, Fundraisers/Charity Events',
        'Creative & Entertainment - Music Videos, Documentary Films, Short Films, Behind-the-Scenes Footage, Fashion Shows',
        'Live Broadcast - Live Events/Concerts, Sports Events',  
        'Digital Content - Social Media Content, Educational Videos, Real Estate Showcases'
    ];

    const projectTypeIcons = {
        'Corporate & Commercial': faBriefcase,
        'Family Events & Celebrations': faHome,
        'Creative & Entertainment': faFilm,
        'Live Broadcast': faBroadcastTower, 
        'Digital Content': faLaptop,
    };

    const disabledTypes = ['Corporate & Commercial', 'Live Broadcast', 'Digital Content', 'Family Events & Celebrations' ];
    const isDisabled = (type) => disabledTypes.includes(type.split(' - ')[0]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
            {projectTypes.map((type, index) => {
                const [title, description] = type.split(' - ');
                const iconKey = Object.keys(projectTypeIcons).find(key => title.includes(key));
                const icon = projectTypeIcons[iconKey];
                const disabled = isDisabled(type);

                return (
                    <div
                        key={index}
                        className={`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[8rem] rounded-xl duration-500 ${selectedProjectType === type ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => !disabled && onProjectTypeSelect(type)}
                    >
                        <FontAwesomeIcon icon={icon} className={`text-2xl mx-8 duration-500 ${selectedProjectType === type ? 'text-emerald-400' : 'text-slate-300'} ${disabled ? 'opacity-50' : ''}`} />
                        <div>
                            <h3 className={`text-lg font-semibold text-slate-500 ${disabled ? 'text-gray-400' : ''}`}>{title}</h3>
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProjectTypeSelector;