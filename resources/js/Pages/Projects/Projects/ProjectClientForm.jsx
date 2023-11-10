import React, { useState } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import CompanyEIN from '@/Components/Profile/CompanyEIN';
import AutoCompleteList from '@/Components/Clients/AutoCompleteList';

function ProjectClientForm(props) {
  
    // const [newOption, setNewOption] = useState(null);

    const handleNewOptionAdded = (newOptionValue) => {
      // Handle the new option as needed, e.g., store it in state
      setNewOption(newOptionValue);
    }

    // Function to handle changes to the EIN input value
    const handleEINChange = (formattedEIN) => {
      setEinNumber(formattedEIN);
      // Call your checkFormStatus or any other logic here as needed
      checkFormStatus();
    };

    
    const {
        auth,
        newOption,
        setNewOption,
        clientFirstName,
        setClientFirstName,
        clientMiddleInitial,
        setClientMiddleInitial,
        clientLastName,
        setClientLastName,
        clientJobTitle,
        setClientJobTitle,
        clientEmailAddress,
        setClientEmailAddress,
        clientPhoneNumber,
        setClientPhoneNumber,
        checkFormStatus,
    } = props;

      

    return (
        <div className='new-project-form'>
            <div className='mb-8 form-group'>
                 <AutoCompleteList auth={auth} onNewOptionAdded={setNewOption}  />
            </div>

            {newOption && (      

                <div className='mb-8 form-group'>
                    <h3 className='mb-4 font-semibold primary-color'>Client Contact</h3>
                    <div className='flex flex-row gap-2 mb-4'>
                        <input
                            placeholder="First Name"
                            value={clientFirstName}
                            onChange={(e) => {
                                const newClientFirstName = e.target.value;
                                setClientFirstName(newClientFirstName);
                                const isFormFilled = checkFormStatus();
                            }}
                        />
                        <input
                            placeholder="Middle Initial"
                            value={clientMiddleInitial}
                            onChange={(e) => {
                                const newClientMiddleInitial = e.target.value;
                                setClientMiddleInitial(newClientMiddleInitial);
                                const isFormFilled = checkFormStatus();
                            }}
                        />
                    </div>
                    <input
                        sx={{ mb: 2 }}
                        placeholder="Last Name"
                        value={clientLastName}
                        onChange={(e) => {
                            const newClientLastName = e.target.value;
                            setClientLastName(newClientLastName);
                            const isFormFilled = checkFormStatus();
                        }}
                    />
                    <input
                        placeholder="Job Title"
                        value={clientJobTitle}
                        onChange={(e) => {
                            const newClientJobTitle = e.target.value;
                            setClientJobTitle(newClientJobTitle);
                            const isFormFilled = checkFormStatus();
                        }}
                    />

                    <input
                        sx={{ mb: 2 }}
                        placeholder="Email Address"
                        value={clientEmailAddress}
                        onChange={(e) => {
                            const newClientEmailAddress = e.target.value;
                            setClientEmailAddress(newClientEmailAddress);
                            const isFormFilled = checkFormStatus();
                        }}
                    />
                    <input
                        placeholder="Phone Number"
                        value={clientPhoneNumber}
                        onChange={(e) => {
                            const newClientPhoneNumber = e.target.value;
                            setClientPhoneNumber(newClientPhoneNumber);
                            const isFormFilled = checkFormStatus();
                        }}
                    />
                </div>

            )}

        </div>
    );
}

export default ProjectClientForm;
