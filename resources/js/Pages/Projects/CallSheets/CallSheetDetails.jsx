import { useAuth } from '@/Components/Contexts/AuthContext';
 

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
import RecipientList from './Components/RecipientList';
 
import LocationDetails from './Locations/LocationDetails';
import CallSheetActionDetails from './ActionDrawer/CallSheetActionDetails';
 
export default function CallSheetDetails() {
    const { user } = useAuth();
    const { project, callSheet, roles } = usePage().props;

    console.log(project);
   return (
 
        <PortalLayout
            breadcrumbs={[
                { label: 'Project Details', url: route('projects.details', {id: project.id}) },
                { label: 'Call Sheets', url: route('projects.callSheets.index', {id: project.id}) },
                { label: 'Call Sheets Details', url: '' },
            ]}
            user={user}
            project={project}
            callSheet={callSheet}
            roles={roles}
         >

            {{
                body: (
                     <div className='flex flex-row gap-4 w-full h-full'>
                        <div className='w-full flex flex-col gap-4  h-full'>
                            <ProductionDetails project={project} callSheet={callSheet} className='w-full' />
                            <LocationDetails project={project} callSheet={callSheet} />
                         </div>
                        <div className='w-[155rem] flex flex-col gap-4 h-full'>
                            <div className='flex flex-row gap-4 '>
                                <ProductionCompany user={user} data={callSheet} className='w-full' />
                                <GeneralCallTime callSheet={callSheet} className='w-full' />
                            </div>
                            <div className='flex flex-col gap-4 h-full'>
                                <Bulletin callSheet={callSheet} isSave={true} />
                                <RecipientList callSheet={callSheet}  className='shrink h-full overflow-scroll max-h-[100vh]' />
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-4 h-full'>
                            <WeatherContainer project={project} callSheet={callSheet} className='w-full bg-orange-200 text-white'/>
                            <ProductionSchedule project={project} callSheet={callSheet} className='h-full' />
                        </div>
                    </div>
                ),
                action: (
                    <CallSheetActionDetails project={project} callSheet={callSheet} />
                ),
            }}
        </PortalLayout>

    );

}
 