import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectForm from '@/Pages/Projects/Forms/ProjectForm';
import ProjectList from '@/Pages/Projects/Components/ProjectList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import CardContainer from '@/Components/Containers/CardContainer';

import Overview from '@/Components/Projects/Overview';
import Budget from '@/Components/Projects/Budget';
import TertiaryButton from '@/Components/Buttons/TertiaryButton';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'; 

import Modal from '@/Components/Modals/Modal';
import WeekCalendar from '@/Components/Calendars/WeekCalendar';
   
export default function Projects({ auth }) {
    const { user, newProject } = useAuth();



    const projects = user && user.projects || []; // Use an empty array as a fallback if 'projects' prop is undefined
    
    const mostRecentProject = projects
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 1); 
 
    return (
      
        <PortalLayout 
            breadcrumbs={[
              { label: 'Projects Overview', url: '' },
            ]}
        >
            {{
                body:(
                  <div className='flex flex-col gap-4 w-full h-full'>

                      <div className='flex flex-row gap-4 w-full h-full'>

                          <CardContainer header="Recent Updated Project" className='h-full w-full max-w-[21rem]'>
                              <ProjectList projects={mostRecentProject} showNewProject={false} view="View All" className='w-full !grid-cols-1 !grid-rows-1'/>
                          </CardContainer>

                          <CardContainer header="Project Calendar" className='h-full w-full'>
                              <WeekCalendar />
                          </CardContainer>

                      </div>

                      <CardContainer header="" className='h-full w-full'>
                      </CardContainer>

                  </div>
                ),
            }}
 
        </PortalLayout>
 
    );
}
 
