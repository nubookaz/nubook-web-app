import { useAuth } from '@/Components/Contexts/AuthContext';
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';


import React, { useEffect } from 'react';
import { router } from '@inertiajs/react'; 
import { usePage } from '@inertiajs/react';
 
import PortalLayout from '@/Layouts/Partials/PortalLayout';
 
import Bulletin from './Components/Bulletin';
import ProductionDetails from './Components/ProductionDetails';
import GeneralCallTime from './Components/GeneralCallTime';
import ProductionCompany from './Components/ProductionCompany';
 
import WeatherContainer from './Components/WeatherContainer';
import ProductionSchedule from './Components/ProductionSchedule';
import RecipientList from './Recipients/RecipientList';
 
import LocationDetails from './Locations/LocationDetails';
import CallSheetActionDetails from './ActionDrawer/CallSheetActionDetails';
 
export default function CallSheetDetailsPage() {
    const { user } = useAuth();
    const { project, roles } = usePage().props;
    const { currentCallSheet, isLoading } = useCallSheet();
    console.log(currentCallSheet);
    if (!isLoading || !currentCallSheet) {
        return <div>Loading call sheet details...</div>; // Loading state or placeholder
    }

    return (
        <PortalLayout
            breadcrumbs={[
                { label: 'Project Details', url: route('projects.details', {projectId: project.id}) },
                { label: 'Call Sheets', url: route('projects.callSheets.index', {projectId: project.id}) },
                { label: 'Call Sheets Details', url: '' },
            ]}
            user={user}
            project={project}
            callSheet={currentCallSheet}
            roles={roles}
        >

            {{
                body: (
                     <div className='flex flex-row gap-4 w-full h-full'>
                        <div className='w-full flex flex-col gap-4  h-full'>
                            <ProductionDetails project={project} callSheet={currentCallSheet} className='w-full' />
                            <LocationDetails project={project} callSheet={currentCallSheet} />
                         </div>
                        <div className='w-[155rem] flex flex-col gap-4 h-full'>
                            <div className='flex flex-row gap-4 '>
                                <ProductionCompany user={user} data={currentCallSheet} className='w-full' />
                                <GeneralCallTime callSheet={currentCallSheet} className='w-full' />
                            </div>
                            <div className='flex flex-col gap-4 h-full'>
                                {/* <Bulletin callSheet={currentCallSheet} isSave={true} /> */}
                                {/* <RecipientList callSheet={currentCallSheet}  className='shrink h-full overflow-scroll max-h-[100vh]' /> */}
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-4 h-full'>
                            <WeatherContainer project={project} callSheet={currentCallSheet} className='w-full bg-orange-200 text-white'/>
                            <ProductionSchedule project={project} callSheet={currentCallSheet} className='h-full' />
                        </div>
                    </div>
                ),
                action: (
                    <CallSheetActionDetails project={project} callSheet={currentCallSheet} />
                ),
            }}
        </PortalLayout>

    );

}
 