import React, { useState } from 'react'; // Import useState from react
import NavLink from '@/Components/NavLink';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal, faComments, faMoneyCheckDollar, faBriefcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ApplicationLogo from '@/Components/ApplicationLogo';

import ProfilePicture from '@/Components/ProfilePicture';
import Tooltip from '@/Components/ToolTip';

function Sidebar() {

    // Create a state variable to manage tooltip visibility
    const [tooltipVisible, setTooltipVisible] = useState(false);

    // Define a function to toggle tooltip visibility
    const toggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };

    return (
        <div className="sidebar shadow-md"
        onMouseLeave={() => setTooltipVisible(false)}
        >
            
            {/* Sidebar Content */}
            <ApplicationLogo />

            <div className="sidebar-content">
                <nav className="nav-links">
                    {/* Centered Navigation Links with Icons */}
                    <ul>
                        <li className='search-btn'>
                            <NavLink href="/search" icon={faMagnifyingGlass}/>
                        </li>
                        <li>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}  activeClass="active-link" icon={faSquarePollHorizontal} />
                        </li>
                        <li>
                            <NavLink href="/social" icon={faComments}/>
                        </li>
                        <li>
                            <NavLink href="/budget" icon={faMoneyCheckDollar}/>
                        </li>
                        <li>
                            <NavLink href="/jobs" icon={faBriefcase}/>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="sidebar-footer">

            <div
                    className="profile-picture-container"
                >
                    <ProfilePicture alt="User's Profile" onClick={toggleTooltip}/>
                </div>

                {tooltipVisible && (
                    <Tooltip customClassName="tooltip">
                        <ul>
                            <li>Account Settings</li>
                        </ul>
                    </Tooltip>
                 )}
            </div>
        </div>
    );
}

export default Sidebar;
