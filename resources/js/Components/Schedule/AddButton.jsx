import React, { useState } from 'react';

import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddButton({ onAddSchedule, containerClass }) {



    return (
        <div className={`bg-[#FBFCFE] w-full ${containerClass}`}>
            <div className="flex flex-row gap-14 mx-auto justify-center space-x-2">
                <button 
                    className="py-2 px-4 rounded-md group hover:bg-slate-100" 
                    onClick={() => onAddSchedule('scene')}>
                    <FontAwesomeIcon className='mr-2 text-sm text-slate-300 group-hover:text-slate-500' icon={faSquarePlus} /> <span className='text-slate-300 group-hover:text-slate-500 text-sm'>Add a Scene</span>
                </button>
                <button 
                    className="py-2 px-4 rounded-md group hover:bg-slate-100" 
                    onClick={() => onAddSchedule('break')}>
                    <FontAwesomeIcon className='mr-2 text-sm text-slate-300 group-hover:text-slate-500' icon={faSquarePlus} /> <span className='text-slate-300 group-hover:text-slate-500 text-sm'>Add a Break</span>
                </button>
                <button 
                    className="py-2 px-4 rounded-md group hover:bg-slate-100" 
                    onClick={() => onAddSchedule('move')}>
                    <FontAwesomeIcon className='mr-2 text-sm text-slate-300 group-hover:text-slate-500' icon={faSquarePlus} /> <span className='text-slate-300 group-hover:text-slate-500 text-sm'>Add a Company Move</span>
                </button>
                <button 
                    className="py-2 px-4 rounded-md group hover:bg-slate-100" 
                    onClick={() => onAddSchedule('eod')}>
                    <FontAwesomeIcon className='mr-2 text-sm text-slate-300 group-hover:text-slate-500' icon={faSquarePlus} /> <span className='text-slate-300 group-hover:text-slate-500 text-sm'>End the Day</span>
                </button>
            </div>
        </div>
        
    );
}

