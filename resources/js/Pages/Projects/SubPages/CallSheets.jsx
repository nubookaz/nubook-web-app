import { useAuth } from '@/Components/Contexts/AuthContext';
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useProject } from '@/Components/Contexts/ProjectContext'; 

import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import CallSheetList from '@/Pages/Projects/CallSheets/Components/CallSheetList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
 





export default function CallSheets() {
    
    const { userData } = useAuth();
    const { currentProjectId } = useProject();

    const { currentCallSheet, setCurrentCallSheetId } = useCallSheet();

    const { props } = usePage();
    const project = props.projects || []; 
    const callSheet = props.callSheets || [];  
    const roles = props.roles || [];

 
 
    return (
        <PortalLayout
            breadcrumbs={[
                { label: 'Project List', url: route('projects.list') },
                { label: 'Project Details', url: route('project.details', {projectId: project.id}) },
                { label: 'Call Sheets', url: '' },
            ]}
            project={project}
            roles={roles}
        >
            {{
                body:(
                    <CallSheetList currentCallSheet={currentCallSheet} project={project} callSheets={callSheet} ></CallSheetList>
                ),
            }}
        </PortalLayout>
    );
    
}

 