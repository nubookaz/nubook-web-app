import { useAuth } from '@/Components/Contexts/AuthContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import { useProject } from '@/Components/Contexts/ProjectContext';
import { useProfile } from '@/Components/Contexts/UserProfileContext';

import React, { useState } from 'react';

import ProjectList from '@/Pages/Projects/Components/ProjectList';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
import CardContainer from '@/Components/Containers/CardContainer';

 import WeekCalendar from '@/Components/Calendars/WeekCalendar';
import Tasks from './Tasks/Tasks';
import ClientForm from './Clients/Form/CreateClient';
   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

 


export default function Projects({ auth }) {
    const { userData } = useAuth();
    const { darkModeSetting } = useProfile();
    const { projects } = useProject();
    const { toggleModal } = useModal();

    // Set initial state to show the tableView as the default view
    const [currentView, setCurrentView] = useState('tableView');
    // Set the initial color states where faTableCellsLarge is the active icon
    const [iconColorChart, setIconColorChart] = useState('text-slate-300');
    const [iconColorTable, setIconColorTable] = useState('text-emerald-500');

    const handleChartIconClick = () => {
        setCurrentView('chartView');
        setIconColorChart('text-emerald-500');
        setIconColorTable('text-slate-300');
    };

    const handleTableIconClick = () => {
        setCurrentView('tableView');
        setIconColorTable('text-emerald-500');
        setIconColorChart('text-slate-300');
    };

    const handleNewProjectClick = () => {
        toggleModal({ type: 'projectForm' });
    };

    const mostRecentProject = projects
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 1);

 
    const renderBody = () => {
        switch (currentView) {
            case 'chartView':
                return (
                    <div className='flex flex-col gap-4 w-full h-full'>
                        
                    </div>
                );
            case 'tableView':
            default:
                return (
                    <div className='flex flex-col gap-4 w-full h-full'>
                        <div className='flex flex-row gap-4 w-full h-full max-h-[26rem]'>
                            <CardContainer header="Recent Project" className='h-full w-full max-w-[18rem]'>
                                {mostRecentProject.length > 0 ? (
                                    <ProjectList bannerClassName='!bg-slate-600 !text-slate-00' bannerTextColor='text-white' projects={mostRecentProject} showNewProject={false} view="View All" className='w-full !grid-cols-1 !grid-rows-1 !gap-0'/>
                                ) : (
                                    <div onClick={handleNewProjectClick} className={`cursor-pointer hover:bg-slate-100 duration-500 transition-all flex justify-center items-center p-8 text-center text-slate-400 h-full w-full ${darkModeSetting === 'light' ? 'bg-slate-50 border-slate-300':'bg-slate-800 border-slate-500'}  border-2 border-dashed rounded-lg`}>
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
                            <CardContainer header="Clients" className='h-full w-full'>
                                <ClientForm />
                            </CardContainer>
                        </div>
                    </div>
                );
        }
    };
        

    return (
        <PortalLayout breadcrumbs={[{ label: 'Projects Overview', url: '' }]}>
            {{
                toolbar: (
                    <div className='h-full flex flex-row '>
                        <div className='flex flex-row gap-8 justify-center items-center h-full my-auto'>
                            <FontAwesomeIcon 
                                className={`text-xl duration-500 cursor-pointer ${iconColorTable}`} 
                                icon={faTableCellsLarge} 
                                onClick={handleTableIconClick} 
                            />
                            <FontAwesomeIcon 
                                className={`text-xl duration-500 cursor-pointer rotate-180 ${iconColorChart}`} 
                                icon={faChartSimple} 
                                onClick={handleChartIconClick} 
                            />
                        </div>
                        <button className={`text-sm font-light text-slate-400 ml-8 opacity-0 hover:text-rose-500`}>Save View</button>
                    </div>
                ),
                body: renderBody(),
            }}
        </PortalLayout>
    );
}