import React, { useState } from 'react';
import { useTasks } from '@/Components/Contexts/TaskContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import EmptyContent from '@/Components/Layouts/EmptyContent';
import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function Tasks() {
    const { tasks, removeTask } = useTasks(); // Assuming removeTask is available in useTasks
    const { toggleModal } = useModal();
    const [selectedTasks, setSelectedTasks] = useState([]);

    const handleSelectTask = taskId => {
        setSelectedTasks(prevSelectedTasks =>
            prevSelectedTasks.includes(taskId)
                ? prevSelectedTasks.filter(id => id !== taskId)
                : [...prevSelectedTasks, taskId]
        );
    };

    const handleSoftDeleteSelected = async () => {
        await Promise.all(selectedTasks.map(taskId => removeTask(taskId)));
        setSelectedTasks([]);
    };

    const handleAddTaskClick = () => {
        toggleModal({ type: 'addTask' });
    };

    return (
        <CardContainer header="Task List" className={`h-full w-full ${tasks.length > 0 ? 'bg-slate-200' : ''}`} onClick={handleAddTaskClick}>
                <div className="flex justify-between items-center p-4 mb-4 text-lg text-white h-[3rem]">
                  {selectedTasks.length > 0 && (
                    <div>
                        <button onClick={handleSoftDeleteSelected} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            <FontAwesomeIcon className='text-sm' icon={faTrashAlt} /> 
                        </button>
                    </div>
                  )}
                </div>

            {tasks.length > 0 ? (
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs uppercase dark:text-gray-400'>
                            <tr>
                                <th scope="col" className='px-6 py-3'><input type="checkbox" disabled /></th>
                                <th scope="col" className='px-6 py-3'>Task Name</th>
                                <th scope="col" className='px-6 py-3'>Description</th>
                                <th scope="col" className='px-6 py-3'>Status</th>
                                <th scope="col" className='text-right px-6 py-3'>Assigned To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id} className=' dark:bg-gray-800 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                                    <td className='px-6 py-4'>
                                        <input
                                            type="checkbox"
                                            checked={selectedTasks.includes(task.id)}
                                            onChange={() => handleSelectTask(task.id)}
                                        />
                                    </td>
                                    <td className='px-6 py-4 font-bold'>{task.name}</td>
                                    <td className='px-6 py-4'>{task.description}</td>
                                    <td className='px-6 py-4'>{task.status}</td>
                                    <td className='text-right px-6 py-4'>{task.user ? task.user.name : 'Unassigned'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <EmptyContent
                    buttonText="Add New Task"
                    onClick={handleAddTaskClick}
                    svgClass="svg-class-names"
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
