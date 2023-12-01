import React from 'react';
import { useAuth } from '@/Components/Contexts/AuthContext';
import { useEffect } from 'react';

import { faListCheck, faProjectDiagram, faMoneyCheckDollar, faComments, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import ProfilePicture from '@/Components/Profile/ProfilePicture'; 
import PageButton from '@/Components/Buttons/PageButton';
import ProjectNavigation from '@/Components/Navigations/ProjectNavigation';
import { imageUrl } from '@/Components/Scripts/BannerImage';
import { formattedDate } from '@/Components/Scripts/Date';
 
import MovieQuotes from '@/Components/Layouts/MovieQuotes';

function Banner({  project, backgroundImage, size, showGreeting, showProfilePhoto, showProjectName = false }) {
  const { user, fetchUserData } = useAuth();

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);
  
  const {
    project_iD = '',
    project_name = '',
    project_type = '',
    project_description = '',
    project_budget = 0,
    category_type = '',
    project_stage = '',
    project_days = 0,
    project_months = 0,
    project_years = 0,
  } = project || {}; 

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
                          {project.project_name}
                        </h1>
                    </div>
                )}

                </div>

                <div className="right-content">

                  <p className='text-lg font-semibold text-white'>{formattedDate}</p>
                    <SecondaryButton href={route('profile.edit') + '#subscription-settings'}>Your Subscription</SecondaryButton>
                </div>
            </div>

              {(size === 'banner-photo') && showProfilePhoto && (
                <div className="banner-footer flex flex-row justify-between gap-8 -mb-[5rem] mt-4">
                    <div className="flex flex-row left-content">
                      <div className='w-[10rem] h-[10rem] min-w-[10rem]'>
                        <ProfilePicture alt="User Profile" width={200} height={200} isUploadable={true} />
                      </div>
                      
                      <div className="max-w-[35rem] mantra-text">
                          <MovieQuotes />
                      </div>

                    </div>
                    <div className="flex justify-end pt-[5rem] pr-[7rem]">
                      <div className="flex flex-row gap-12 text-center">
                          <PageButton className="disabled" icon={faListCheck} size="medium"> Tasks </PageButton>
                          <PageButton href={route('projects.index')} active={route().current('projects.index')}  activeClass="active-link" icon={faProjectDiagram} size="medium">
                            Projects
                          </PageButton>
                          <PageButton className="disabled" icon={faComments} to="/settings" size="medium" >
                            Social
                          </PageButton>
                          <PageButton className="disabled" icon={faMoneyCheckDollar} to="/settings" size="medium" >
                            Budget
                          </PageButton>
                          <PageButton className="disabled" icon={faBriefcase} to="/settings" size="medium" >
                            Jobs
                          </PageButton>
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
