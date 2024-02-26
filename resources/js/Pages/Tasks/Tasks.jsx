import { useTasks } from '@/Components/Contexts/TaskContext';
import { useModal } from '@/Components/Contexts/ModalContext';

import React from 'react';
import EmptyContent from '@/Components/Layouts/EmptyContent';
import CardContainer from '@/Components/Containers/CardContainer';


export default function Tasks(){
    const { tasks } = useTasks();
    const { toggleModal } = useModal();
    const handleAddTaskClick = () => {
        toggleModal({type: 'addTask'});  
    };


    return(
        <CardContainer header="Task List" className='h-full w-full' onClick={handleAddTaskClick}>
            {tasks.length > 0 ? (
                <div className='flex flex-col p-4'>
                    <div className='font-bold text-lg mb-2'>Tasks</div>
                    <ul className='list-disc pl-5'>
                        {tasks.map(task => (
                            <li key={task.id}>{task.name} - {task.description}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <EmptyContent
                    buttonText="Add New Task"
                    onClick={handleAddTaskClick}
                    svgClass="svg-class-names" // Optional: Add any class names you need for the SVG
                    imageUrl={`undraw_tasks.svg`}
                >
                    {{
                        header: <>No Tasks Found</>,
                        description: <>Add your first task to get started!</>,
                    }}
                </EmptyContent>
            )}
        </CardContainer>
    );

}