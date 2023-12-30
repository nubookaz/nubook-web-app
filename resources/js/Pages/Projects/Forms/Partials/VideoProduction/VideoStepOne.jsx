// StepOne.js
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faVideo, faCamera, faTv, faFilm, faMusic, 
    faTheaterMasks, faBroadcastTower, faBusinessTime, 
    faCalendarAlt, faBullhorn 
} from '@fortawesome/free-solid-svg-icons';


 
export default function VideoStepTwo({ onVideoTypeClick, activeVideoType }) {

    const videoType = [
        { name: 'Feature Film', icon: faVideo, active: true },
        { name: 'Short Film', icon: faCamera, active: true },
        { name: 'Documentary', icon: faTv, active: true },
        { name: 'Music Video', icon: faMusic, active: true },
        { name: 'Web Series', icon: faBroadcastTower, active: true },
        { name: 'Animation', icon: faFilm, active: false },
        { name: 'Corporate Videos', icon: faBusinessTime, active: false },
        { name: 'Event Videos', icon: faCalendarAlt, active: false },
        { name: 'Commercial Film', icon: faBullhorn, active: false },
        { name: 'Experimental Film', icon: faFilm, active: false },
        { name: 'Student Film', icon: faCamera, active: false },
        { name: 'Travel & Adventure', icon: faCamera, active: false },
     ];



    return (
        <div className="flex flex-row gap-4 text-slate-500 justify-center flex-wrap">
            {videoType.map((type, index) => (
                <div key={index} className="flex flex-col items-center ">
                    <div 
                        className={`w-[10rem] h-[10rem] p-4 border bg-white border-slate-100 rounded-md flex items-center justify-center flex-col ${type.active ? 'cursor-pointer hover:shadow-2xl hover:bg-primary-green-color transition-all duration-300' : 'opacity-50'}`}
                        onClick={() => onVideoTypeClick(type)}
                    >
                        <FontAwesomeIcon className='text-2xl' icon={type.icon} />
                        <span className="text-sm text-center mt-2">{type.name}</span>
                        {!type.active && <span className="text-xs text-center mt-1 italic">Coming Soon</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}

 
 