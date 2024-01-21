import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CallSheetForm from '@/Pages/Projects/CallSheets/Forms/CallSheetForm';
import CallSheetList from '@/Pages/Projects/CallSheets/Partials/CallSheetList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';





export default function CallSheets() {
    const { props } = usePage();
    const project = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const callSheet = props.callSheets || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const [callSheetView, setCallSheetView] = useState("View All");

 
    return (
        <PortalLayout
            breadcrumbs={[
                { label: 'Project List', url: route('projects.list') },
                { label: 'Project Details', url: route('projects.details', {id: project.id}) },
                { label: 'Call Sheets', url: '' },
            ]}
            project={project}
        >
            {{
                body:(
                    <CallSheetList project={project} callSheets={callSheet} view={callSheetView} ></CallSheetList>
                ),
            }}
        </PortalLayout>
    );
    
}

 