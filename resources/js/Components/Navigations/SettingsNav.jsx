// SettingsNav.jsx
import React from 'react';
import PageButton from '@/Components/Buttons/PageButton';

function SettingsNav({ activeContent, handleButtonClick }) {
  return (
    <div className="settings-nav">
      <ul>
      <li>
            <PageButton
                onClick={() => handleButtonClick('profile-settings')}
                className={activeContent === 'profile-settings' ? 'active-link' : ''}
                text="Profile Settings"
            >
                Profile Settings
            </PageButton>
        </li>
        <li>
            <PageButton
                onClick={() => handleButtonClick('project-settings')}
                className={activeContent === 'project-settings' ? 'active-link' : ''}
                text="Project Settings"
            >
                Project Settings
            </PageButton>
        </li>
        <li>
            <PageButton
                onClick={() => handleButtonClick('social-settings')}
                className={activeContent === 'social-settings' ? 'active-link' : ''}
                text="Social Settings"
            >
                Social Settings
            </PageButton>
        </li>
        <li>
            <PageButton
                onClick={() => handleButtonClick('budget-settings')}
                className={activeContent === 'budget-settings' ? 'active-link' : ''}
                text="Budget Settings"
            >
                Budget Settings
            </PageButton>
        </li>
        <li>
            <PageButton
                onClick={() => handleButtonClick('job-settings')}
                className={activeContent === 'job-settings' ? 'active-link' : ''}
                text="Job Settings"
            >
                Job Settings
            </PageButton>
        </li>
        <li>
            <PageButton
                onClick={() => handleButtonClick('account-settings')}
                className={activeContent === 'account-settings' ? 'active-link' : ''}
                text="Account Settings"
            >
                Account Settings
            </PageButton>
        </li>
      </ul>
    </div>
  );
}

export default SettingsNav;