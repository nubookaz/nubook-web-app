import React from 'react';

import { faListCheck, faProjectDiagram, faMoneyCheckDollar, faComments, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { usePage } from '@inertiajs/react'

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import ProfilePicture from '@/Components/ProfilePicture'; 
import PageButton from '@/Components/Buttons/PageButton';
import ProjectNavigation from '@/Components/Projects/ProjectNavigation';

function Banner({ project, backgroundImage, size, showGreeting, showProfilePhoto }) {

const { auth } = usePage().props
const {
  projectID = '',
  projectName = '',
  projectType = '',
  projectDescription = '',
  projectBudget = 0,
  categoryType = '',
  projectStage = '',
  projectDays = 0,
  projectMonths = 0,
  projectYears = 0,
} = project || {}; 


  // Define the default image path format
  const defaultImagePathFormat = '/images/background_images/bg_image_%d.jpg';

  // Define the total number of default images
  const totalImages = 16;

  // Function to calculate the image index based on the current day of the week
  const calculateImageIndex = () => {
    const dayOfWeek = new Date().getDay();
    return (dayOfWeek % totalImages) + 1;
  };

  // Use the current day to set the initial image index
  const initialImageIndex = calculateImageIndex();

  // Construct the image URL
  const imageUrl = backgroundImage || defaultImagePathFormat.replace('%d', initialImageIndex);

  // Get today's date
  const today = new Date();

  // Get the abbreviated day of the week (e.g., "Mon")
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' });

  // Get the full month (e.g., "January")
  const month = today.toLocaleDateString('en-US', { month: 'long' });

  const year = today.getFullYear();

  // Get the date with a subscript (e.g., "1st", "2nd", "3rd", "4th", etc.)
  const date = today.getDate();
  const dateWithSuffix = date + (date % 10 === 1 && date !== 11
    ? 'st'
    : date % 10 === 2 && date !== 12
    ? 'nd'
    : date % 10 === 3 && date !== 13
    ? 'rd'
    : 'th'
  );
  
  // Construct the formatted date string
  const formattedDate = `${dayOfWeek}, ${month} ${dateWithSuffix} ${year}`;

    // Function to get the time of day greeting
  const getTimeOfDayGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 0 && currentHour < 12) {
      return 'Good Morning';
      } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
      } else {
      return 'Good Evening';
      }
  };

  // Get the time of day greeting
  const timeOfDayGreeting = getTimeOfDayGreeting();
  
  let contentStyle = {};

    return (
        <div className={`banner relative ${size}-height`} style={{ backgroundImage: `url(${imageUrl})` }}>
          {/* Overlay */}
          <div className="overlay"></div>
    
          <div className="banner-content flex flex-col h-full" style={contentStyle}>
            <div className='top-bar flex flex-row justify-between w-full'>
              <div className="flex left-content justify-start">

                {showGreeting && (
                    <div className="greeting">
                        {/* Header with time of day greeting and user's first name */}
                        <h1>
                          {timeOfDayGreeting} {auth.first_name} {auth.last_name}
                        </h1>
                    </div>
                )}

                </div>

                <div className="right-content">

                  {/* Today's Date */}
                  <p className='text-lg font-semibold'>{formattedDate}</p>

                  {/* Primary Button */}
                  <SecondaryButton>Your Subscription</SecondaryButton>

                </div>
            </div>

              {(size === 'banner-photo') && showProfilePhoto && (
                <div className="banner-footer -mb-[5rem]">
                    <div className="flex left-content">
                        <ProfilePicture alt="User Profile" width={200} height={200} isUploadable={true}/>
                        
                        <div className="w-4/6 mantra-text">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quaerat et cupiditate cumque, fugiat voluptatibus dolorum pariatur tenetur?</p>
                        </div>
                    </div>
                    <div className="w-full -mb-20 justify-end pr-[10rem] right-content">
                        <ul className="flex gap-20 text-center dashboard-navlinks">
                            <li>
                                <PageButton className="disabled" icon={faListCheck} size="medium" />
                                <span className="mt-4 block">Tasks</span>
                            </li>
                            <li>
                                <PageButton href={route('projects.index')} active={route().current('projects.index')}  activeClass="active-link" icon={faProjectDiagram} size="medium" />
                                <span className="mt-4 block">Projects</span>
                            </li>
                            <li>
                                <PageButton className="disabled" icon={faComments} to="/settings" size="medium" />
                                <span className="mt-4 block">Social</span>
                            </li>
                            <li>
                                <PageButton className="disabled" icon={faMoneyCheckDollar} to="/settings" size="medium" />
                                <span className="mt-4 block">Budget</span>
                            </li>
                            <li>
                                <PageButton className="disabled" icon={faBriefcase} to="/settings" size="medium" />
                                <span className="mt-4 block">Jobs</span>
                            </li>
                        </ul>
                    </div>
                </div>
                )}

              {(size === 'small-banner-buttons' ) && (
                  <ProjectNavigation project={project}/>
              )}

              {(size === 'chapter-banner' ) && (
                  <div className="banner-footer">
                      <ProjectNavigation project={project}/>
                  </div>
              
              )}

              {(size === 'page-banner' ) && (
                <ProjectNavigation project={project}/>
              )}

          </div>

          

        </div>
      );
}

export default Banner;
