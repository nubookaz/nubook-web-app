import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import TertiaryButton from '@/Components/Buttons/TertiaryButton';


export default function ProductionSchedule({

    data,
    onClick

}) {

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        if (data && data.schedule) {
            setSchedules(data.schedule);
        }
    }, [data]);


    const formatTime = (time) => {
        // Remove leading zero from time string
        return time.replace(/^0+/, '');
    };

    
    console.log(data);
    return (
        <CardContainer className="h-full" header="Production Schedule" showButtonIcon={true} onClickButton={onClick} >

          {schedules.length > 0 ? (
                <>
                    <div className='flex flex-row text-xs font-semibold justify-between px-3 gap-2 secondary-color'>
                        <div className='shrink-0'>Start Time</div>
                        <div className='grow justify-start flex flex-row gap-3'>
                            <div>INT/EXT</div>
                            <div>Scene Location</div>
                        </div>
                        <div className='shrink-0'>Duration</div>
                    </div>
                    <ul className='h-full justify-start flex flex-col gap-2'>
                        {schedules.map((schedule, index) => {
                            
                            if (schedule.type === 'scene' && !schedule.sceneData) {
                                schedule.sceneData = {
                                    setting: 'N/A', 
                                    ampm: 'AM', 
                                    combinedClass: 'bg-slate-100', 
                                    description: 'Default Description', 
                                    durationHour: '0', 
                                    durationMinute: '00', 
                                    hour: '12', 
                                    lightColorClass: 'Default Light Color Class', 
                                    minute: '00', 
                                    scene: 'Default Scene', 
                                    sceneLocation: 'N/A', 
                                    shootLocation: 'Default Shoot Location', 
                                    timeslot: 'Default Timeslot'
                                };
                            }
                            
                            return (
                                <li key={schedule.id} className="schedule-item">
                                    {schedule.type === 'scene' && (
                                        <div className={`${schedule.sceneData.combinedClass} rounded-md scene-data flex flex-row justify-between gap-2 py-2 px-3`}>
                                            <div className={` ${schedule.sceneData.lightColorClass} font-bold text-sm shrink-0`}>{`${schedule.sceneData.hour}:${schedule.sceneData.minute} ${schedule.sceneData.ampm}`}</div>
                                            <div className='justify-start flex flex-row gap-2 grow'>
                                                <div className={` ${schedule.sceneData.lightColorClass} font-bold text-xs my-auto mx-[.85rem]`}>{schedule.sceneData.setting}</div>
                                                <div className='font-bold text-xs my-auto'>{schedule.sceneData.sceneLocation}</div>
                                            </div>
                                            <div className='font-bold text-xs my-auto justify-end shrink-0'>
                                                {schedule.sceneData.durationHour !== '0' && `${schedule.sceneData.durationHour} `}
                                                {schedule.sceneData.durationMinute !== '0' && `${schedule.sceneData.durationMinute}`}
                                            </div>                                   
                                        </div>
                                    )}
                                    {schedule.type === 'break' && (
                                        <div className={` ${schedule.sceneData.combinedClass} bg-slate-400 rounded-md scene-data flex flex-row justify-between gap-2 py-2 px-3`}>
                                            <div className='primary-color font-bold text-sm shrink-0'>{schedule.sceneData.hour}:{schedule.sceneData.minute} {schedule.sceneData.ampm}</div>
                                            <div className='font-bold text-xs my-auto mx-2 justify-start flex'>{schedule.type}</div>
                                            <div className='font-bold text-xs my-auto justify-end shrink-0'>
                                                {schedule.sceneData.durationHour !== '0' && `${schedule.sceneData.durationHour} `}
                                                {schedule.sceneData.durationMinute !== '0' && `${schedule.sceneData.durationMinute}`}
                                            </div>                                    
                                        </div>
                                    )}
                                    {/* Additional conditions for other types can be added here */}
                                </li>
                            );
                            
                        })}

                        <TertiaryButton onClick={onClick} className='bg-slate-50 !py-2 !px-6 max-w-[16rem] mt-4 mx-auto !text-slate-400 hover:bg-slate-200 hover:text-slate-50'>Edit Production Schedule</TertiaryButton>

                    </ul>
                </>
            ) : (
                <div className='text-center m-auto flex flex-col gap-4'>
                    <p className='secondary-color text-lg w-2/3 mx-auto'>You have not entered a production schedule yet. Click here to add a schedule for your production</p>
                    <SecondaryButton className="mx-auto" onClick={onClick}>Add a production schedule</SecondaryButton>
                </div>
            )}
        </CardContainer>
    );
}