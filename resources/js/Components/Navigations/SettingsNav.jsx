// SettingsNav.jsx
import React from 'react';
import PageButton from '@/Components/Buttons/IconButton';

function SettingsNav({ activeContent, handleButtonClick }) {
  return (
    <div className="settings-nav flex flex-col gap-6">
            <PageButton
                onClick={() => handleButtonClick('profile-settings')}
                className={`py-4 px-10 !justify-start ${activeContent === 'profile-settings' ? 'active-link' : ''}`}
                inText="Profile Settings"
            >
            </PageButton>

            <PageButton
                onClick={() => handleButtonClick('project-settings')}
                className={`py-4 px-10 !justify-start ${activeContent === 'project-settings' ? 'active-link' : 'disabled'}`}
                inText="Project Settings"
            >
            </PageButton>

            <PageButton
                onClick={() => handleButtonClick('social-settings')}
                className={`py-4 px-10 !justify-start ${activeContent === 'social-settings' ? 'active-link' : 'disabled'}`}
                inText="Social Settings"
            >
            </PageButton>

            <PageButton
                onClick={() => handleButtonClick('budget-settings')}
                className={`py-4 px-10 !justify-start ${activeContent === 'budget-settings' ? 'active-link' : 'disabled'}`}
                inText="Budget Settings"
            >
            </PageButton>

            <PageButton
                onClick={() => handleButtonClick('job-settings')}
                className={`py-4 px-10 !justify-start ${activeContent === 'job-settings' ? 'active-link' : 'disabled'}`}
                inText="Job Settings"
            >
            </PageButton>

            <PageButton
                onClick={() => handleButtonClick('subscription-settings')}
                className={`py-4 px-10 !justify-start ${activeContent === 'subscription-settings' ? 'active-link' : ''}`}
                inText="Subscription Settings"
            >
            </PageButton>

            <PageButton
                onClick={() => handleButtonClick('account-settings')}
                className={`py-4 px-10 !justify-start ${activeContent === 'account-settings' ? 'active-link' : ''}`}
                inText="Account Settings"
            >
            </PageButton>
    </div>
  );
}

export default SettingsNav;