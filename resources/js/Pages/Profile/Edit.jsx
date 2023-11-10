import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { faCcVisa } from '@fortawesome/fontawesome-free-brands'; 
import CardContainer from '@/Components/Containers/CardContainer';

import SettingsNav from '@/Components/Navigations/SettingsNav';
import ProfileSettings from './PofileSettings';
import ProjectSettings from './Partials/ProjectSettings';
import SocialSettings from './Partials/SocialSettings';
import BudgetSettings from './Partials/BudgetSettings';
import JobSettings from './Partials/JobSettings';
import AccountSettings from './Partials/AccountSettings';
import ImageContainer from '@/Components/Containers/ImageContainer';

import Snackbar from '@mui/joy/Snackbar';








export default function Edit({ auth }) {

    const [activeContent, setActiveContent] = useState('profile-settings');
    const [savedProfileSettings, setSavedProfileSettings] = useState(false);
    
    const handleSavedClick = () => {
        setSavedProfileSettings(true);
    
        // Set a timeout to reset the state after 1000 milliseconds (1 second)
        setTimeout(() => {
          setSavedProfileSettings(false);
        }, 3000);
      };
    
      // Optional: If you want to reset the state when the component unmounts
      useEffect(() => {
        return () => {
          clearTimeout(); // Clear the timeout to avoid state updates on unmounted components
        };
      }, []);
    
    const handleButtonClick = (content) => {
        setActiveContent(content);
    };

    const bannerProps = {
        showGreeting: true, // Customize these props based on your conditions
      };

    return (
        <AuthenticatedLayout
            user={auth.user}
            bannerProps={bannerProps}
        >
            {{

                
                surface:(
                    <div className="relative z-50 w-full h-full">
                        <Snackbar
                            color="success"
                            size="lg"
                            variant="solid"
                            open={savedProfileSettings}
                            className="w-full max-w-[30rem]"
                        >
                            Profile Settings Saved!
                        </Snackbar>
                    </div>
                ),
                portalBody: (
                    <div className="h-full w-full flex gap-4 mx-auto max-w-[95rem]">
                        {/* Left Column */}
                        <div className="w-full max-w-[15rem]">
                            <SettingsNav className="mt-4" activeContent={activeContent} handleButtonClick={handleButtonClick} />
                        </div>

                        {/* Middle Column (Wider) */}
                        <div className="w-full max-w-[60rem]">
                            <div className="app-settings h-full">
                                {activeContent === 'profile-settings' && (
                                    <CardContainer className="h-full overflow-hidden !p-0">
                                        <ProfileSettings auth={auth} saved={handleSavedClick}/>
                                    </CardContainer>
                                )}
                                {activeContent === 'project-settings' && (
                                    <ProjectSettings />
                                )}
                                {activeContent === 'social-settings' && (
                                    <SocialSettings />
                                )}
                                {activeContent === 'budget-settings' && (
                                    <BudgetSettings />
                                )}
                                {activeContent === 'job-settings' && (
                                    <JobSettings />
                                )}
                                {activeContent === 'account-settings' && (
                                    <AccountSettings />
                                )}
                            </div>
                        </div>

                        {/* Right Column (Second Widest) */}
                        <div className="w-full max-w-[25rem]">
                            <div className="settings-info flex flex-col gap-4">
                                <ImageContainer
                                    isPoster={false}
                                    overlay={true} 
                                    className="subscription-info !h-[23rem]"
                                    backgroundImage="./images/cartoon_images/female_hollywood_filmmaker.png"
                                    header="Subscription Type"
                                    >
                                    <h2 className='text-white text-[3rem]'>Hollywood Filmmaker</h2>
                                </ImageContainer>

                                <h3 className='text-lg font-medium secondary-color'>Payment Settings</h3>
                                <ImageContainer 
                                    overlay={true} 
                                    className="payment-info !h-[16rem]" 
                                    backgroundImage="./images/background_images/bg_image_10.jpg"
                                    icon={faCcVisa}
                                    header="Chase"
                                    >
                                    <div className='text-white text-[1rem]'>
                                        <p>XXXX-XXXX-XXXX-3415</p>
                                        <div className='flex flex-row justify-between w-full'>
                                            <p className='uppercase'>Levi Elizaga</p> 
                                            <p className=''>04/25</p>
                                        </div>
                                    </div>
                                </ImageContainer>
                            </div>
                        </div>
                    </div>

                ),
            }}
        </AuthenticatedLayout>
    );
}
