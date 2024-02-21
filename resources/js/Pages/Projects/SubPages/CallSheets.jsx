import { useAuth } from '@/Components/Contexts/AuthContext';
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';

import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import CallSheetList from '@/Pages/Projects/CallSheets/Components/CallSheetList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
 





export default function CallSheets() {
    
    const { user } = useAuth();
    const { currentCallSheet } = useCallSheet();

    const { props } = usePage();
    const project = props.projects || []; 
    const callSheet = props.callSheets || [];  
    const roles = props.roles || [];
    const [callSheetView, setCallSheetView] = useState("View All");

    return (
        <PortalLayout
            breadcrumbs={[
                { label: 'Project List', url: route('projects.list') },
                { label: 'Project Details', url: route('projects.details', {id: project.id}) },
                { label: 'Call Sheets', url: '' },
            ]}
            user={user}
            project={project}
            roles={roles}
        >
            {{
                body:(
                    <CallSheetList currentCallSheet={currentCallSheet} project={project} callSheets={callSheet} view={callSheetView} ></CallSheetList>
                ),
            }}
        </PortalLayout>
    );
    
}

 