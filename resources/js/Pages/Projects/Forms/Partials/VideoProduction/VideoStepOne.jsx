// StepOne.js
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faVideo, faCamera, faTv, faFilm, faMusic, 
    faTheaterMasks, faBroadcastTower, faBusinessTime, 
    faCalendarAlt, faBullhorn, faCircleExclamation 
} from '@fortawesome/free-solid-svg-icons';


 
export default function VideoStepOne({ 
    
    onVideoTypeClick, 
    showError,
    activeVideoType

}) {

    const videoType = [
        { name: 'Feature Film', icon: faVideo, active: true },
        { name: 'Short Film', icon: faCamera, active: true },
        { name: 'Documentary', icon: faTv, active: false },
        { name: 'Music Video', icon: faMusic, active: false },
        { name: 'Web Series', icon: faBroadcastTower, active: false },
        { name: 'Animation', icon: faFilm, active: false },
        { name: 'Corporate Videos', icon: faBusinessTime, active: false },
        { name: 'Event Videos', icon: faCalendarAlt, active: false },
        { name: 'Commercial Film', icon: faBullhorn, active: false },
        { name: 'Experimental Film', icon: faFilm, active: false },
        { name: 'Student Film', icon: faCamera, active: false },
        { name: 'Travel & Adventure', icon: faCamera, active: false },
     ];

     const isActiveType = (type) => activeVideoType === type.name;

     return (
        <div>
            <div className="flex flex-row gap-4 text-slate-500 justify-center flex-wrap">
                {videoType.map((type, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div 
                            className={`w-[10rem] h-[10rem] p-4 border bg-white border-slate-100 rounded-md flex items-center justify-center flex-col 
                            ${type.active ? 'cursor-pointer hover:shadow-2xl transition-all duration-300' : 'opacity-50'} 
                            ${isActiveType(type) ? '!bg-emerald-50 shadow-2xl !border-emerald-400 border-2 shadow-emerald-200 text-emerald-500' : ''}`} 
                            onClick={() => onVideoTypeClick(type)}
                        >
                            <FontAwesomeIcon className='text-2xl' icon={type.icon} />
                            <span className="text-sm text-center mt-2">{type.name}</span>
                            {!type.active && <span className="text-xs text-center mt-1 italic">Coming Soon</span>}
                        </div>
                    </div>
                ))}
            </div>
            {showError && (
                <div className="mt-[6rem] text-center p-4 bg-red-100 max-w-[30rem] rounded-md mx-auto w-full">
                    <p className='text-red-500 font-bold'>Please select a video type to continue.</p>
                </div>
            )}
        </div>
    );
}

 
 