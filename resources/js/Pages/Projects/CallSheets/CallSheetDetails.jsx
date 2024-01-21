import { useAuth } from '@/Components/Contexts/AuthContext';


import React, { useState } from 'react';
import { router } from '@inertiajs/react'; 
import { usePage } from '@inertiajs/react';
 
import CardContainer from '@/Components/Containers/CardContainer';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
 
import Bulletin from './Components/Bulletin';
import ProductionDetails from './Components/ProductionDetails';
import GeneralCallTime from './Components/GeneralCallTime';
import ProductionCompany from './Components/ProductionCompany';
import Locations from './Components/Locations';

import WeatherContainer from './Components/WeatherContainer';
import ProductionSchedule from './Components/ProductionSchedule';
import RecipientList from './Components/RecipientList';
 
import LocationDetails from './Locations/LocationDetails';

export default function CallSheetDetails() {
    const { user } = useAuth();


 

    const { project, callSheet } = usePage().props;
    const [newData, setNewData] = useState('');
    const newCallSheetData = newData ? newData : callSheet;
     
 
 
 
 

  return (
 
        <PortalLayout
            breadcrumbs={[
                { label: 'Project Details', url: route('projects.details', {id: project.id}) },
                { label: 'Call Sheets', url: route('projects.callSheets.index', {id: project.id}) },
                { label: 'Call Sheets Details', url: '' },
            ]}
            project={project}
            callSheet={callSheet}
        >

            {{
                body: (
                     <div className='flex flex-row gap-4 w-full h-full'>
                        <div className='w-full flex flex-col gap-4  '>
                            <ProductionDetails project={project} callSheet={callSheet} className='w-full' />
                            <LocationDetails />
                        </div>
                        <div className='w-[155rem] flex flex-col gap-4 h-full'>
                            <div className='flex flex-row gap-4 '>
                                <ProductionCompany user={user} data={callSheet} className='w-full' />
                                <GeneralCallTime callSheet={callSheet} className='w-full' />
                            </div>
                            <div className='flex flex-col gap-4 h-full'>
                                <Bulletin callSheet={callSheet} isSave={true} />
                                <RecipientList className='bg-slate-300 text-white' />
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-4 h-full'>
                            <WeatherContainer data={callSheet} newData={newData} className='w-full bg-orange-200 text-white'/>
                            <ProductionSchedule data={callSheet} className='h-full' />
                        </div>
                    </div>
                ),
            }}
               

        </PortalLayout>

    );

}
 