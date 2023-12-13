import React, { useState } from 'react'; // Import useState from react
import NavLink from '@/Components/Navigations/NavLink';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal, faMagnifyingGlass, faProjectDiagram, faBars } from '@fortawesome/free-solid-svg-icons';
import ApplicationLogo from '@/Components/Branding/ApplicationLogo';
import ResponsiveNavLink from '@/Components/Navigations/ResponsiveNavLink';

import ProfilePicture from '@/Pages/Profile/Partials/ProfilePicture';

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import MenuItem from '@mui/joy/MenuItem';



function Sidebar({ toggleSearch, isOpen }) {

    // Create a state variable to manage tooltip visibility
    const [tooltipVisible, setTooltipVisible] = useState(false);

    // Define a function to toggle tooltip visibility
    const toggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };

    return (

        <>
          <div className='fixed top-5 left-5'>
            <FontAwesomeIcon className="text-3xl top-2" icon={faBars}></FontAwesomeIcon>
          </div>
          <div className="sidebar"
            onMouseLeave={() => {
            // Delay in milliseconds (e.g., 1000ms = 1 second)
            const delay = 800;
        
            setTimeout(() => {
                setTooltipVisible(false);
            }, delay);
          }}
        >
            
            {/* Sidebar Content */}
            <ApplicationLogo />

            <div className="sidebar-content">
                <nav className="nav-links">
                    {/* Centered Navigation Links with Icons */}
                    <ul>
                        <li className={`search-btn ${isOpen ? 'open' : ''}`}>
                            <button onClick={() => { toggleSearch(); }} >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </li>
                        <li>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')} activeClass="active-link" icon={faSquarePollHorizontal} />
                        </li>
                        <li>
                            <NavLink href={route('projects.index')} active={route().current('projects.*') || route().current('projects.*.call-sheets') } activeClass="active-link" icon={faProjectDiagram}/>
                        </li>
                        {/* <li>
                            <NavLink href="/social" icon={faComments}/>
                        </li>
                        <li>
                            <NavLink href="/budget" icon={faMoneyCheckDollar}/>
                        </li>
                        <li>
                            <NavLink href="/jobs" icon={faBriefcase}/>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div className="sidebar-footer">

                <Dropdown>
                    <MenuButton className="!bg-transparent w-full !p-0 !border-0">
                        <ProfilePicture alt="User's Profile" className="!h-[3rem]" onClick={toggleTooltip} />
                    </MenuButton>

                    <Menu className='!ml-[1rem] !mb-2'>
                        <ResponsiveNavLink href={route('profile.edit') + '#profile-settings'} as="button">
                            Account Settings
                        </ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>    
                    </Menu>
                </Dropdown>

            </div>
        </div>
        </>
      
    );
}

export default Sidebar;
