import { useAuth } from '@/Components/Contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'; 
import { usePage } from '@inertiajs/react';
import DrawerPanel from '@/Components/Layouts/DrawerPanel';
import ScheduleContainer from '@/Components/Schedule/ScheduleContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddButton from '@/Components/Schedule/AddButton';
import EmptyContent from '@/Components/Layouts/EmptyContent';




export default function CallSheetProductionSchedule({

    callSheet, 
    ...props

}){
    const { updateCurrentProductionSchedule } = useAuth();


    const [schedules, setSchedules] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);


    useEffect(() => {
        // Update scheduleData whenever schedules change
        const updatedScheduleData = schedules.map((schedule, index) => ({
            ...schedule,  // Spread the schedule data
            order: index  // Add the order
        }));
        setScheduleData(updatedScheduleData);
    }, [schedules]);


    useEffect(() => {
        // Function to handle saving schedule data
        const saveScheduleData = async () => {
            try {
                const scheduleJson = JSON.stringify(scheduleData);
                const routeUrl = route('callSheets.schedule.store', { id: callSheet.project.id, callSheetId: callSheet.id });
                const response = await axios.post(routeUrl, { schedule: scheduleJson });
                updateCurrentProductionSchedule(response.data.callSheet);

                console.log('response', response);
            } catch (error) {
                console.error('Error saving schedule:', error);
            }
        };

        if (scheduleData.length > 0) {
            saveScheduleData();
        }
    }, [scheduleData]);
    

    useEffect(() => {
        const fetchScheduleData = async () => {
            // Construct the URL using the 'route' method
            const url = route('callSheets.schedule.get', { id: callSheet.project_id, callSheetId: callSheet.id });
    
            axios.get(url)
                .then(response => {
                    if (response.data) {
                        setSchedules(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching schedule:', error);
                });
        };
    
        fetchScheduleData();
    }, [callSheet]); // Re-run the effect if project.id or callSheet.id changes
    


    const handleSceneUpdate = (updatedSceneData, sceneId) => {
        // Update the specific schedule in the state
        const updatedSchedules = schedules.map(schedule => 
            schedule.id === sceneId ? { ...schedule, sceneData: updatedSceneData } : schedule
        );
        setSchedules(updatedSchedules);
    
    };

 

    const onDragEnd = (result) => {
        const { source, destination } = result;
      
        // Dropped outside the list or the item wasn't moved
        if (!destination || source.index === destination.index) return;
      
        // Copy the current schedules array excluding EOD
        const draggableItems = schedules.filter(schedule => schedule.type !== 'eod');
      
        // Reordering logic
        const [reorderedItem] = draggableItems.splice(source.index, 1);
        draggableItems.splice(destination.index, 0, reorderedItem);
      
        // Re-insert EOD at the end if it exists
        const eodSchedule = schedules.find(schedule => schedule.type === 'eod');
        if (eodSchedule) {
          draggableItems.push(eodSchedule);
        }
      
        setSchedules(draggableItems);
    };
      
      
    
      const handleAddSchedule = (type) => {

        // If EOD is already at the end and the user is trying to add another EOD, show an alert
        if (type === 'eod' && schedules.some(schedule => schedule.type === 'eod')) {
            alert('EOD can only be added as the last schedule and there can only be one EOD.');
            return;
        }
    
        // Create a new schedule item
        const newSchedule = {
            id: uuidv4(),
            type,
            component: <ScheduleContainer key={uuidv4()} type={type} />
        };
    
        // If there's an existing EOD, temporarily remove it
        const tempSchedules = schedules.filter(schedule => schedule.type !== 'eod');
    
        // Add the new schedule
        tempSchedules.push(newSchedule);
    
        // Re-add the EOD at the end if it was removed
        const eodSchedule = schedules.find(schedule => schedule.type === 'eod');
        if (eodSchedule) {
            tempSchedules.push(eodSchedule);
        }
    
        // Update the schedules state
        setSchedules(tempSchedules);
    };
    

    const handleDeleteSchedule = (id) => {
        const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
        setSchedules(updatedSchedules);
    
        // Update the backend after deletion
        updateScheduleOnBackend(updatedSchedules);
    };
    
    const updateScheduleOnBackend = (updatedSchedules) => {
        const url = route('callSheets.schedule.update', { id: data.project_id, callSheetId: data.id });
        axios.put(url, { schedule: JSON.stringify(updatedSchedules) })
            .then(response => {
                console.log('Schedule updated after deletion');
            })
            .catch(error => {
                console.error('Error updating schedule:', error);
            });
    };
    
    

    return (
        <div className='w-full h-full relatve flex flex-col'>
 

 
                    <div className='relatve flex flex-col gap-4 h-full'>
                            {schedules.length > 0 ? (
                                <>

                                    <div className='w-full flex flex-col gap-2 items-center justify-center'>
                                        <h3 className='text-2xl font-bold text-slate-500'>Call Sheet: {callSheet.call_sheet_name}</h3>
                                        <p className='text-lg'>Production Schedule</p>
                                    </div>
                                    
                                    <AddButton onAddSchedule={handleAddSchedule} />

 
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId="schedules">
                                            {(provided) => (
                                                <div 
                                                    className='flex flex-col gap-2' 
                                                    {...provided.droppableProps} 
                                                    ref={provided.innerRef}
                                                >
                                                    {schedules.map((schedule, index) => (
                                                        <Draggable 
                                                            key={schedule.id} 
                                                            draggableId={schedule.id.toString()} 
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div 
                                                                    ref={provided.innerRef} 
                                                                    {...provided.draggableProps} 
                                                                    style={provided.draggableProps.style}
                                                                >
                                                                    <ScheduleContainer
                                                                        data={callSheet}
                                                                        dragHandleProps={provided.dragHandleProps}
                                                                        type={schedule.type}
                                                                        onDelete={() => handleDeleteSchedule(schedule.id)}
                                                                        onUpdateInfo={(updatedData) => handleSceneUpdate(updatedData, schedule.id)}
                                                                        scheduleSceneData={schedule.sceneData}
                                                                        scheduleBreakData={schedule.sceneData}
                                                                    />
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>

                                    {schedules.length > 0 && (
                                        <AddButton onAddSchedule={handleAddSchedule} containerClass='relatve left-0 bottom-0 py-4' />
                                    )}
                                </>
                            ) : (
                                <EmptyContent 
                                    customSvgPath='/images/svg_images/undraw_movie_night.svg'
                                    buttonText='Add a Scene'
                                    onButtonClick={() => handleAddSchedule('scene')}
                                    containerClasses=''
                                    svgWidth='!w-[30rem]'
                                >
                                    <h3 className='mb-4 text-xl text-slate-300'>Add a Production Schedule</h3>
                                    <p className='mb-8 text-sm w-[40rem]'>
                                        Streamline your shoot with our Film Production Scheduler. Drag and drop scenes, breaks, and moves to efficiently plan your day on set, ensuring a smooth and well-organized production.
                                    </p>
                                </EmptyContent>
                            )
                        }
                    </div>
 
        </div>
    );
    
}