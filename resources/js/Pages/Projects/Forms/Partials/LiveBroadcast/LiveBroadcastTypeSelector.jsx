import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

  faSatelliteDish,
  faMicrophone,
  faSoccerBall,
  faChalkboard,
  faGraduationCap,
  faGuitar,
  faCameraRetro,

} from '@fortawesome/free-solid-svg-icons';

const LiveBroadcastTypeSelector = ({ selectedType, onSelectType }) => {
    const liveTypes = {
        'Concerts': {
            description: 'Capture the energy and excitement of live concerts, ensuring every beat is felt on screen.',
            icon: faSatelliteDish,
        },
        'Sports Events': {
            description: 'Document the dynamic and fast-paced action of sports events, delivering every moment with precision.',
            icon: faSoccerBall,
        },
        'Talk Shows/Podcasts': {
            description: 'Produce engaging talk shows, capturing the essence of dialogue and guest interactions.',
            icon: faMicrophone,
        },
        'Conferences': {
            description: 'Stream conferences with clarity, focusing on the key speakers and their messages.',
            icon: faChalkboard,
        },
        'Graduations': {
            description: 'Elevate graduation ceremonies with cinematic quality, celebrating each graduate’s moment.',
            icon: faGraduationCap,
        },
        'Music Jams': {
            description: 'Record the spontaneity of music jams, mixing audio and visuals for an immersive experience.',
            icon: faGuitar,
        },
    };
    
    const disabledTypes = ['Talk Shows/Podcasts', 'Music Jams', 'Sports Events'];
    const isDisabled = (type) => disabledTypes.includes(type);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
            {Object.entries(liveTypes).map(([type, { description, icon }]) => (
                <div
                    key={type}
                    className={`flex items-center space-x-3 py-4 px-6 border cursor-pointer min-h-[10rem] rounded-xl duration-500 
                                ${selectedType === type ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100'}
                                ${isDisabled(type) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !isDisabled(type) && onSelectType(type)}
                >
                    <FontAwesomeIcon icon={icon} className={`text-2xl mx-8 duration-500 
                        ${selectedType === type ? 'text-emerald-400' : 'text-slate-300'}
                        ${isDisabled(type) ? 'opacity-50' : ''}`}/>
                    <div>
                        <h3 className={`text-lg font-semibold text-slate-500 ${isDisabled(type) ? 'text-slate-400' : 'text-slate-500'}`}>{type}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LiveBroadcastTypeSelector;