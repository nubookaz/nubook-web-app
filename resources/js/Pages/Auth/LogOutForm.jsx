import { useModal } from '@/Components/Contexts/ModalContext';

import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';



export default function LogOutForm(){
    const { toggleModal } = useModal();

    const handleLogout = () => {
        toggleModal(false);  
    };


    return(
        <div className='flex flex-col gap-8 w-full'>
            <div className='flex flex-row gap-4 px-8 pt-8'>
                <FontAwesomeIcon className='flex justify-center my-auto text-2xl text-rose-500' icon={faTriangleExclamation}></FontAwesomeIcon>
                <h2 className='text-lg flex font-semibold flex-wrap text-center'>Are you sure you want to logout? </h2>
            </div>
            <div className='border-[.1rem] border-solid m-0 p-0'></div>
            <div className='flex flex-row gap-2 px-8 pb-8'>
                <button className='default-btn w-full bg-white text-slate-400 hover:bg-slate-100 duration-500' onClick={handleLogout}>Cancel</button>
                <Link className='default-btn w-full bg-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white duration-500' onClick={handleLogout} method="post" href={route('logout')} as="button">Yes, Logout</Link>
            </div>
        </div>
    );

}