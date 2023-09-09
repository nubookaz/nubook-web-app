import React, { useState } from 'react'; // Import useState from react
import NavLink from '@/Components/Navigations/NavLink';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal, faComments, faMoneyCheckDollar, faBriefcase, faMagnifyingGlass, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import ApplicationLogo from '@/Components/Branding/ApplicationLogo';
import ResponsiveNavLink from '@/Components/Navigations/ResponsiveNavLink';

import ProfilePicture from '@/Components/ProfilePicture';
import Tooltip from '@/Components/Containers/ToolTip';

function Sidebar({ toggleSearch, isOpen }) {

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
                        <li className={`search-btn ${isOpen ? 'open' : ''}`}>
                            <button onClick={() => { toggleSearch(); }} >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </li>
                        <li>
                            <NavLink href={route('dashboard')} active={route().current('dashboard')} activeClass="active-link" icon={faSquarePollHorizontal} />
                        </li>
                        <li>
                            <NavLink href={route('projects')} active={route().current('projects')} activeClass="active-link" icon={faProjectDiagram}/>
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

                <ProfilePicture alt="User's Profile" onClick={toggleTooltip}/>

                {tooltipVisible && (
                    <Tooltip customClassName="account-tooltip">
                        <ul>
                            <ResponsiveNavLink href={route('profile.edit')} as="button">
                                Account Settings
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </ul>
                    </Tooltip>
                 )}
            </div>
        </div>
    );
}

export default Sidebar;
