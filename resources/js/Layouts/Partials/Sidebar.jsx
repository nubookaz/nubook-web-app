import { useModal } from '@/Components/Contexts/ModalContext';
import { useDarkMode } from '@/Components/Contexts/DarkModeContext';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal, faProjectDiagram, faQuestionCircle, faHardDrive, faPlus, faDoorOpen, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ApplicationLogo from '@/Components/Branding/ApplicationLogo';
import PageNavigation from './PageNavigation';
import { router } from '@inertiajs/react';

export default function Sidebar({

    project,
 
}) {
    const { toggleModal } = useModal();
    const { darkModeSetting, setDarkModeSetting } = useDarkMode();

    const handleNewProjectClick = () => {
        toggleModal({type: 'projectForm'});  
    };
    const handleLogoutClick = () => {
        toggleModal({type: 'logOut'});  
    };

    const handleDarkModeClick = () => {
        const newSetting = darkModeSetting === 'light' ? 'dark' : 'light'; // Example toggle, adjust based on your logic
        setDarkModeSetting(newSetting);
    };

    const activeLink = darkModeSetting === 'dark'
        ? '!text-emerald-500 !bg-slate-900 duration-500' // Dark mode active link classes
        : '!text-emerald-500 !bg-slate-50 duration-500';
    
    const getLinkClass = useMemo(() => (routeName, baseClass, activeClass) => 
        `${route().current(routeName) ? activeClass : ''} ${baseClass}`,
    []);

    const [activePage, setActivePage] = useState('');
    const [isPageNavVisible, setIsPageNavVisible] = useState(false);

    const navigationRef = useRef();
    const openNavRef = useRef();

    const openPageNavigation = () => {
        const currentRoute = route().current();
        setActivePage(currentRoute);
        setIsPageNavVisible(prev => !prev);
    };



    useEffect(() => {
        function handleClickOutside(event) {
            if (navigationRef.current && !navigationRef.current.contains(event.target) &&
                !openNavRef.current.contains(event.target)) {
                setIsPageNavVisible(false);
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                setIsPageNavVisible(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleLinkClick = (event, url) => {
        event.preventDefault();
        setIsPageNavVisible(false);
        setTimeout(() => {
            router.visit(url);
        }, 200);
    };



    return (
        <div id='sidebar' className={` fixed left-[1rem] top-[1rem] h-[97%] flex flex-row ${isPageNavVisible ? 'max-w-[25rem] gap-4' : 'gap-0'} duration-500`}>
            <div className={`py-6 z-50 rounded-2xl duration-500 ${darkModeSetting === 'dark' ? 'bg-slate-900' : 'bg-white'} w-[4rem] flex flex-col gap-4 justify-between`}>
                <ApplicationLogo className='text-emerald-500'/>
                <div ref={openNavRef}  className='open-nav cursor-pointer flex flex-col justify-start justify-center items-center py-8' onClick={openPageNavigation}>
                    <FontAwesomeIcon 
                        icon={faHardDrive} 
                        className={`rounded-lg duration-500 rotate-90 h-[1.2rem] w-[1.2rem] p-[.75rem]
                            ${isPageNavVisible 
                                ? 'bg-slate-100 text-emerald-500' 
                                : `${darkModeSetting === 'dark' 
                                    ? 'duration-800 text-white bg-rose-600 hover:bg-white hover:text-rose-500' 
                                    : 'bg-rose-400 text-white hover:bg-rose-600 hover:text-white'}`
                            } 
                        `}
                    />
                </div>
                <div className='w-full py-[2rem] flex justify-center items-center'>
                    <div  onClick={handleNewProjectClick} className='p-[.7rem] border-white border-[.15rem] bg-emerald-500 hover:border-emerald-500 hover:bg-white duration-500 shadow-md rounded-full cursor-pointer group'>
                        <FontAwesomeIcon icon={faPlus} className={`${darkModeSetting === 'dark' ? '' : ''} h-[1.2rem] w-[1.2rem] text-white group-hover:text-emerald-500 rounded-full duration-500 flex justify-center text-center`} />
                    </div>
                </div>   
                <div className="sidebar-content grow justify-center pb-[8rem] flex flex-col gap-[8rem]">
                    <nav className="nav-links cursor-pointer flex flex-col gap-4">
                        <Link 
                            href={route('dashboard')} 
                            className='cursor-pointer'        
                        >
                            <FontAwesomeIcon 
                            icon={faSquarePollHorizontal} 
                            className={getLinkClass('dashboard', `${darkModeSetting === 'dark' ? 'duration-800 hover:bg-slate-600 hover:text-slate-300 text-slate-500' : 'text-slate-300 hover:bg-slate-100 hover:text-slate-500' } duration-500 h-[1.2rem] w-[1.2rem] p-[.75rem]`, activeLink)} />
                        </Link>
                        <Link 
                            href={route('projects.index')} 
                        >
                            <FontAwesomeIcon 
                            icon={faProjectDiagram} 
                            className={getLinkClass('projects.*', `${darkModeSetting === 'dark' ? 'duration-800 hover:bg-slate-600 hover:text-slate-300 text-slate-500' : 'text-slate-300 hover:bg-slate-100 hover:text-slate-500' } duration-500 h-[1.2rem] w-[1.2rem] p-[.75rem]`, activeLink)} />

                        </Link>
                    </nav>             
                </div>

                <div className='w-full flex flex-col gap-6 justify-end items-center '>
                    <FontAwesomeIcon 
                        icon={darkModeSetting === 'dark' ? faSun : faMoon} 
                        onClick={handleDarkModeClick} 
                        className={`${
                            darkModeSetting === 'dark' ? 'text-rose-200' : 'text-slate-300 hover:text-slate-600'
                        } cursor-pointer duration-500 rounded-md h-[1.2rem] w-[1.2rem] p-[.75rem]`}
                    />
                    <FontAwesomeIcon icon={faDoorOpen} onClick={handleLogoutClick} className={`${darkModeSetting === 'dark' ? 'duration-800 text-slate-700 hover:bg-slate-600' : 'text-slate-200 hover:bg-slate-50'} hover:text-rose-500 cursor-pointer duration-500 rounded-md h-[1.2rem] w-[1.2rem] p-[.75rem]`} />
                    <FontAwesomeIcon icon={faQuestionCircle} className={`${darkModeSetting === 'dark' ? 'duration-800 text-slate-700 ' : 'text-slate-200'} hover:text-blue-500 cursor-pointer duration-500 ease-in-out w-full text-2xl `} />
                </div>
 
            </div>
            <div ref={navigationRef} className={`page-nav-container ${isPageNavVisible ? 'visible' : ''}`}>
                <PageNavigation project={project} activePage={activePage} isVisible={isPageNavVisible} onLinkClick={handleLinkClick}/>
            </div>
         </div>
    );
}
