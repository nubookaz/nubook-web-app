import React, { useState, useEffect } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { faCcVisa } from '@fortawesome/fontawesome-free-brands'; 
import CardContainer from '@/Components/Containers/CardContainer';

import SettingsNav from '@/Components/Navigations/SettingsNav';

import ProfileSettings from './ProfileSettings';
import ProjectSettings from './Partials/ProjectSettings';
import SocialSettings from './Partials/SocialSettings';
import BudgetSettings from './Partials/BudgetSettings';
import JobSettings from './Partials/JobSettings';
import SubscriptionSettings from './Partials/SubscriptionSettings';
import AccountSettings from './Partials/AccountSettings';
import ImageContainer from '@/Components/Containers/ImageContainer';

import Snackbar from '@mui/joy/Snackbar';
import PrivacyPolicy from '@/Pages/Auth/Legal/PrivacyPolicy';

import Modal from '@/Components/Modals/Modal';




import PortalLayout from '@/Layouts/Partials/PortalLayout';



export default function SettingsPage({ 
    
    auth 

}) {

 
    return (
        <PortalLayout 
            breadcrumbs={[
                { label: 'Settings', url: '' },
            ]}
        >
                    
            {{
                body:(
                    <></>
                ),
            }}

        </PortalLayout>
    );
}
