import { useAuth } from '@/Components/Contexts/AuthContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import { useProject } from '@/Components/Contexts/ProjectContext';
 
import React from 'react';

import ProjectList from '@/Pages/Projects/Components/ProjectList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import CardContainer from '@/Components/Containers/CardContainer';

 import WeekCalendar from '@/Components/Calendars/WeekCalendar';
import Tasks from './Tasks/Tasks';
   
export default function Projects({ auth }) {
    const { user } = useAuth();
    const { projects } = useProject();
    const { toggleModal } = useModal();
    const handleNewProjectClick = () => {
        toggleModal({type: 'projectForm'});  
    };

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

                      <div className='flex flex-row gap-4 w-full h-full max-h-[26rem]'>

                          <CardContainer header="Recent Updated Project" className='h-full w-full max-w-[18rem]'>
                            {mostRecentProject.length > 0 ? (
                                <ProjectList bannerClassName='!bg-slate-600 !text-slate-00' bannerTextColor='text-white' projects={mostRecentProject} showNewProject={false} view="View All" className='w-full !grid-cols-1 !grid-rows-1'/>
                            ):(
                                <div onClick={handleNewProjectClick} className='cursor-pointer hover:bg-slate-100 duration-500 transition-all flex justify-center items-center p-8 text-center text-slate-400 h-full w-full bg-slate-50 border-2 border-dashed rounded-lg'>
                                    No projects available. Start a new project now!
                                </div>
                            )}
                          </CardContainer>

                          <CardContainer header="Project Calendar" className='h-full w-full'>
                              <WeekCalendar />
                          </CardContainer>

                      </div>
                        
                      <div className='flex flex-row gap-4 h-full'>
                        <Tasks />
                        <CardContainer header="" className='h-full w-full'>

                        </CardContainer>
                      </div>
                      
                  </div>
                ),
            }}
 
        </PortalLayout>
 
    );
}
 
