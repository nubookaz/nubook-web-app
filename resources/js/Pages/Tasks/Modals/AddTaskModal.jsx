import React, { useState } from 'react';
import { useTasks } from '@/Components/Contexts/TaskContext'; 
import { useProject } from '@/Components/Contexts/ProjectContext'; 
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';

const AddTaskModal = ({ onClose }) => {
    const { addTask } = useTasks();
    const { projects } = useProject();
    const { callSheetRecipients } = useCallSheet();

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedCallSheet, setSelectedCallSheet] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        addTask({ name: taskName, description, project_id: selectedProject, call_sheet_id: selectedCallSheet });
        onClose(); // Close modal after adding task
    };

    return (
        <div className='p-8 w-[65rem]'>
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-2">
                    <label className="block mb-1">Task Name</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    ></textarea>
                </div>
            

                <div className="mb-2">
                    {/* Project Dropdown */}
                    <label className="block mb-1">Project</label>
                    <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select a Project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>{project.project_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    {/* Call Sheet Dropdown (if applicable) */}
                    <label className="block mb-1">Call Sheet</label>
                    <select
                        value={selectedCallSheet}
                        onChange={(e) => setSelectedCallSheet(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select a Call Sheet</option>
                        {callSheetRecipients.map((recipient) => (
                            <option key={recipient.pivot.call_sheet_id} value={recipient.pivot.call_sheet_id}>
                                {recipient.pivot.call_sheet_id} - {recipient.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 border rounded bg-blue-500 text-white">
                        Add Task
                    </button>
                </div>

            </form>
         </div>
    );
};

export default AddTaskModal;
