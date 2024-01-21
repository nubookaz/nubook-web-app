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
                        <div className='col-1 w-full h-full flex flex-col gap-4'>
                            <ProductionDetails callSheet={callSheet}  />
                            <Locations data={callSheet} newData={newData}  />
                        </div>
                        <div className='col-2 w-[155rem]  enter-col-content flex flex-col gap-4 h-full'>
                            <div className='flex flex-row gap-4 w-full'>
                                <ProductionCompany user={user} data={callSheet} />
                                <GeneralCallTime data={callSheet} newData={newData}  />
                            </div>
                            <Bulletin data={callSheet}   />
                            <RecipientList />
                        </div>
                        <div className='col-3 w-full right-col-content flex flex-col gap-4 h-full'>
                            <div className='flex flex-col gap-4 h-full'>
                                <WeatherContainer data={callSheet} newData={newData} />
                                <ProductionSchedule data={callSheet} />
                            </div>

                        </div>
                    </div>
                ),
            }}
               

        </PortalLayout>

    );

}
 