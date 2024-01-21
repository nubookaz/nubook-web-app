import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faDiagramProject, faCog, faPaperPlane, faCaretDown, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons

const PageNavigation = ({ 
    
    project,
    isVisible, 
    activePage, 
    onLinkClick 

}) => {

    const { createNewProject } = useAuth();




    const projectId = project?.id; 

    const initialSubitemVisibility = {
        'projects.callSheets.index': activePage.startsWith('projects.callSheets.edit.page')
        // Add similar lines for other items with subitems if needed
    };

    const [visibleSubitems, setVisibleSubitems] = useState(initialSubitemVisibility);

 
    const header = 'text-2xl text-slate-400';
    const isActive = (route) => {
        // Check if the current activePage starts with the provided route
        if (activePage.startsWith(route)) {
            return true;
        }
    
        // Additional check for specific cases, like sub-pages of 'Call Sheets'
        if (route === 'projects.callSheets.index' && activePage.startsWith('projects.callSheets.edit.page')) {
            return true;
        }
    
        return false;
    };
    const activeClass = 'font-bold text-emerald-500';
 
    const toggleSubitems = (itemRouteName) => {
        setVisibleSubitems(prevState => ({
            ...prevState,
            [itemRouteName]: !prevState[itemRouteName]
        }));
    };

    // Define navigation items for each section
    const projectNavItems = [
        {
            label: 'Overview',
            routeName: 'projects.index',
            icon: faCircleInfo,
        },
        {
            label: 'Projects',
            routeName: 'projects.list',
            icon: faDiagramProject,
        },
     ];

    // Navigation items for 'projects.details' section
    const productionBookNavItems = [
        {
            label: 'Details',
            routeName: 'projects.details',
            icon: faCircleInfo,
        },
        {
            label: 'Call Sheets',
            routeName: 'projects.callSheets.index',
            icon: faPaperPlane,
            subitems: projectId && activePage.startsWith('projects.callSheets.edit.page') ? [
                {
                    label: 'Subitem 1',
                    routeName: `projects.callSheets.details.${projectId}.subitem1`,
                    icon: faPaperPlane,

                },
                {
                    label: 'Subitem 2',
                    routeName: `projects.callSheets.details.${projectId}.subitem2`,
                    icon: faPaperPlane,

                },
                // ... more subitems as needed
            ] : [],

        },
    ];
    
    const settingsNavItems = [
        {
            label: 'Profile Settings',
            routeName: 'profile.settings',
            icon: faCog,
        },
        {
            label: 'Account Settings',
            routeName: 'settings.account',
            icon: faCog,
        },
     ];
 
    
     const renderNavItems = (navItems) => {
        return navItems.map((item, index) => {
            let routeParams = {};
    
            // Set route parameters for specific items if needed
            if (item.routeName.startsWith('projects.details') || item.routeName === 'projects.callSheets.index') {
                routeParams = { id: projectId };
            }
    
            const hasSubitems = item.subitems && item.subitems.length > 0;
            const subitemsVisible = visibleSubitems[item.routeName];
    
            return (
                <React.Fragment key={index}>
                    <li className={`cursor-pointer justify-between w-full ${hasSubitems ? 'flex flex-row' : '' } ${isActive(item.routeName) ? activeClass : ''}`}>
                        <div className={`flex flex-row gap-4`} onClick={(e) => {
                            e.preventDefault();
                            if (!hasSubitems) {
                                onLinkClick(e, route(item.routeName, routeParams));
                            }
                        }}>
                            <FontAwesomeIcon className='my-auto text-xl' icon={item.icon} />
                            <span className={`w-full flex text-left shrink text-xl ${isActive(item.routeName) ? activeClass : ''}`}>
                                {item.label}
                            </span>
                        </div>
                        {hasSubitems && (
                            <FontAwesomeIcon 
                                icon={faCaretLeft}
                                style={{ 
                                    transform: subitemsVisible ? 'rotate(-90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.5s ease'
                                }}
                                className="my-auto text-xl cursor-pointer"
                                onClick={() => toggleSubitems(item.routeName)}
                            />
                        )}
                    </li>
                    {/* Render subitems if they are present and their visibility is toggled on */}
                    {hasSubitems && (
                        <ul className={`pl-4 flex flex-col gap-6 mt-4 transition-all duration-500 ${subitemsVisible ? 'opacity-1' : 'opacity-0'}`}>
                            {item.subitems.map((subitem, subIndex) => {
                                return (
                                    <li
                                        key={subIndex}
                                        className={`cursor-pointer flex flex-row gap-8 justify-between w-full ${isActive(subitem.routeName) ? activeClass : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onLinkClick(e, route(subitem.routeName, routeParams));
                                        }}
                                    >
                                        <span className="pl-4">{subitem.label}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </React.Fragment>
            );
        });
    };
    
    
    

    const isProjectDetailsActive = activePage.includes('projects.details') || activePage.includes('projects.callSheets');
 

    return (
        <div className={`page-navigation transition-all duration-300 h-full  bg-white shadow-xl rounded-2xl ${isVisible ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`p-8 w-full delay-300 duration-500 h-full ${isVisible ? 'opacity-1' : 'opacity-0'}`}>
                <div className={`fade-in ${activePage === 'dashboard' ? '' : 'hidden'}`}>
                    <h2 className={header}>Dashboard</h2>
                 </div>

                <div className={`fade-in flex flex-col h-full justify-between ${activePage.includes('projects') && !isProjectDetailsActive ? '' : 'hidden'}`}>
                    <h2 className={header}>Projects</h2>
                    <ul className='my-8 flex flex-col gap-6 ml-4 justify-start grow'>
                        {renderNavItems(projectNavItems)}
                    </ul>
                    <button onClick={createNewProject}>New Project</button>
                    {activePage === 'projects.list' && (
                        <div className='filters flex flex-col gap-4 pr-8 justify-end'>
                            <select
                                className='bg-slate-200 text-sm px-2 py-1'
                            >
                                <option value="">View All</option>
                                <option value="">Published</option>
                            </select>

                            <select
                                className='bg-slate-200 text-sm px-2 py-1'
                                >
                                <option value="">View All</option>
                                <option value="">Published</option>
                            </select>
                    </div>
                    )}
                </div>

                 <div className={`fade-in ${isProjectDetailsActive ? '' : 'hidden'}`}>
                    <h2 className={header}>Production Book</h2>
                    <ul className='my-8 flex flex-col gap-6 ml-4'>
                        {renderNavItems(productionBookNavItems)}
                    </ul>
                    {activePage === 'projects.callSheets.edit.page' && (
                        <div className='filters flex flex-col gap-4 pr-8 justify-end'>
 
                        </div>
                    )}
                </div>

                <div className={`fade-in ${activePage === 'profile.settings' ? '' : 'hidden'}`}>
                    <h2 className={header}>Settings</h2>
                    <ul className='my-8 flex flex-col gap-6 ml-4'>
                        {renderNavItems(settingsNavItems)}
                    </ul>
                </div>
 
             </div>
        </div>
    );
};

export default PageNavigation;
