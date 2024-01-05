import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faVideo, faCamera, faTv } from '@fortawesome/free-solid-svg-icons'; 


const ProjectSelector = ({ onProjectClick, activeProject }) => {


    const projects = [
        { name: 'Video Production', icon: faVideo, active: true },
        { name: 'Photography', icon: faCamera, active: false },
        { name: 'TV Production', icon: faTv, active: false },
    ];

    const isActiveType = (project) => activeProject === project.name;



    return (
        <div className="flex flex-row gap-4 text-slate-500 justify-center">
            {projects.map((project, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div 
                        className={`w-[10rem] h-[10rem] p-4 border bg-white border-slate-100 rounded-md flex items-center justify-center flex-col 
                            ${project.active ? 'cursor-pointer hover:shadow-2xl hover:bg-primary-green-color transition-all duration-300' : 'opacity-50'}
                            ${isActiveType(project) ? '!bg-emerald-50 shadow-2xl !border-emerald-400 border-2 shadow-emerald-200 text-emerald-500' : ''}
                        `}
                        onClick={() => onProjectClick(project)}
                    >
                        <FontAwesomeIcon className='text-2xl' icon={project.icon} />
                        <span className="text-sm text-center mt-2">{project.name}</span>
                        {!project.active && <span className="text-xs text-center mt-1 italic">Coming Soon</span>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectSelector;