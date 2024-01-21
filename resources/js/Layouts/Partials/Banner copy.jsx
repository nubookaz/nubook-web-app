import React from 'react';
import { useAuth } from '@/Components/Contexts/AuthContext';
import { useEffect } from 'react';

import { faListCheck, faProjectDiagram, faMoneyCheckDollar, faComments, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import UploadableProfilePicture from '@/Pages/Profile/Partials/UploadableProfilePicture'; 
import IconButton from '@/Components/Buttons/IconButton';
import ProjectNavigation from '@/Components/Navigations/ProjectNavigation';
import { imageUrl } from '@/Components/Scripts/BannerImage';
import { formattedDate } from '@/Components/Scripts/Date';
 
import MovieQuotes from '@/Components/Layouts/MovieQuotes';

function Banner({  project, backgroundImage, size, showGreeting, showTopBar = true, showProfilePhoto, showRightContent = true, showProjectName = false }) {
  const { user, currentProject } = useAuth();

  const defaultProject = {
    project_id: '',
    project_name: '',
    project_type: '',
    project_description: '',
    project_budget: 0,
    category_type: '',
    project_stage: '',
    project_days: 0,
    project_months: 0,
    project_years: 0,
    // Add any other properties that are used in the Banner component
  };

  const localData = currentProject || defaultProject;


  // Destructure properties from project object with default values
  const {
    project_id = '',
    project_name = '',
    project_type = '',
    project_description = '',
    project_budget = 0,
    category_type = '',
    project_stage = '',
    project_days = 0,
    project_months = 0,
    project_years = 0,
    // Add any other properties that are used in the Banner component
  } = localData || {};


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
        <div className={`banner relative ${size}-height`} style={{ backgroundImage: `url(${imageUrl || backgroundImage})` }}>
           <div className="overlay"></div>
    
          <div className="banner-content flex flex-col h-full" style={contentStyle}>
            {showTopBar && (
              <div className='top-bar flex flex-row justify-between w-full'>
              <div className="flex left-content justify-start">

                {showGreeting && (
                    <div className="greeting">
                         <h1>
                          {timeOfDayGreeting} {user.first_name} {user.middle_initial ? (user.middle_initial) : ''} {user.last_name}
                        </h1>
                    </div>
                )}

                {showProjectName && (
                    <div className="greeting">
                         <h1 className='text-4xl'>
                          {project_name}
                        </h1>
                    </div>
                )}

                </div>

                {showRightContent && (
                  <div className="right-content">

                    <p className='text-lg font-semibold text-white'>{formattedDate}</p>
                    <SecondaryButton href={route('profile.edit') + '#subscription-settings'}>Your Subscription</SecondaryButton>
                  </div>
                )}

            </div>

            )}
            

              {(size === 'banner-photo') && showProfilePhoto && (
                <div className="banner-footer flex flex-row justify-between gap-8 -mb-[5rem] mt-4">
                    <div className="flex flex-row left-content">
                      <div className='w-[10rem] h-[10rem] min-w-[10rem]'>
                        <UploadableProfilePicture alt="User Profile" width={200} height={200} className="border-red-500" isUploadable={true} />
                      </div>
                      
                      <div className="max-w-[35rem] mantra-text">
                          <MovieQuotes />
                      </div>

                    </div>
                    <div className="flex justify-end pt-[5rem] pr-[7rem]">
                      <div className="flex flex-row gap-12 text-center">
                          <IconButton className="disabled bg-white" icon={faListCheck} size="medium"> Tasks </IconButton>
                          <IconButton className='bg-white' href={route('projects.index')} active={route().current('projects.index')}  activeClass="active-link" icon={faProjectDiagram} size="medium">
                            Projects
                          </IconButton>
                          <IconButton className="disabled bg-white" icon={faComments} to="/settings" size="medium" >
                            Social
                          </IconButton>
                          <IconButton className="disabled bg-white" icon={faMoneyCheckDollar} to="/settings" size="medium" >
                            Budget
                          </IconButton>
                          <IconButton className="disabled bg-white" icon={faBriefcase} to="/settings" size="medium" >
                            Jobs
                          </IconButton>
                      </div>
                    </div>
                </div>
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
