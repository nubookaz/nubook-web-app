import React, { useState } from 'react';
import { useTasks } from '@/Components/Contexts/TaskContext';
import { useProject } from '@/Components/Contexts/ProjectContext';
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useUsers } from '@/Components/Contexts/UserContext';
import { useAuth } from '@/Components/Contexts/AuthContext'; // Import useAuth

const AddTaskModal = ({ onClose }) => {
    const { addTask } = useTasks();
    const { projects } = useProject();
    const { callSheetRecipients } = useCallSheet();
    const { users } = useUsers();
    const { user: currentUser } = useAuth(); // Destructure to get currentUser

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedCallSheet, setSelectedCallSheet] = useState('');
    const [assignedUser, setAssignedUser] = useState('');  

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask({
            name: taskName,
            description,
            status,
            project_id: selectedProject,
            call_sheet_id: selectedCallSheet,
            user_id: assignedUser || currentUser?.id // Fallback to currentUser id if not selected
        });
        
        // Clear form fields after successful task addition
        setTaskName('');
        setDescription('');
        setStatus('');
        setSelectedProject('');
        setSelectedCallSheet('');
        setAssignedUser('');  
    
        onClose(); // Close the modal if you're using a modal
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
            
                <div className="mb-4">
                    <label className="block mb-1">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Select a Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
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

                <div className="mb-4">
                    <label className="block mb-1">Assign To</label>
                    <select
                        value={assignedUser}
                        onChange={(e) => setAssignedUser(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value={currentUser?.id}>{currentUser?.first_name} {currentUser?.last_name}</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
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
