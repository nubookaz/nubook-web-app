import React, { useState, useEffect } from 'react';

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
