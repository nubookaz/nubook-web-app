import { usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PortalLayout from '@/Layouts/Partials/PortalLayout';

import ProjectList from '@/Pages/Projects/Components/ProjectList';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';



export default function ProjectListPage( ) {

    const { props } = usePage();
    const projects = props.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    const [projectView, setProjectView] = useState("View All");


    return (

        <PortalLayout 
            breadcrumbs={[
                { label: 'Overview', url: route('projects.index') },
                { label: 'Project List', url: '' },
            ]}
         >
                {{
                    body: (
                        <ProjectList projects={projects} view={projectView} />
                    ),
                }}
        </PortalLayout>

    );
}