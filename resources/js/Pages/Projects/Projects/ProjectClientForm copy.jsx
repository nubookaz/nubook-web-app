import React, { useState } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import CompanyEIN from '@/Components/Profile/CompanyEIN';
import AutoCompleteList from '@/Components/Clients/AutoCompleteList';

function ProjectClientForm(props) {
  
    const [newOption, setNewOption] = useState(null);

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

    console.log(newOption);
    const {
        auth,
        companyName,
        setCompanyName,
        setEinNumber,
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
        nextButtonClicked,
        checkFormStatus,
        companyTypeChecked,
        companyOwnerChecked,
    } = props;

      

    return (
        <div className='new-project-form'>
            <div className='mb-8 form-group'>
                 <AutoCompleteList auth={auth} onNewOptionAdded={handleNewOptionAdded}  />
            </div>

            {/* <div className='mb-8 form-group'>
                <Checkbox
                    label="This is a brand new client"
                    checked={props.companyTypeChecked}  
                    onChange={(event) => {
                        const isChecked = event.target.checked;
                        props.handleCompanyTypeCheckedChange(isChecked); 
                        console.log(isChecked);
                    }}
                />

            </div> */}

            {/* <div className='mb-8 form-group'>
                    {companyTypeChecked ? (
                        <input
                            className="mb-4"
                            placeholder="Company Name"
                            value={companyName}
                            required
                            onChange={(e) => {
                                const newCompanyName = e.target.value;
                                setCompanyName(newCompanyName);
                                const isFormFilled = checkFormStatus();
                            }}
                        />
                    ) : (
                        <input
                            className="mb-4"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => {
                                const newCompanyName = e.target.value;
                                setCompanyName(newCompanyName);
                                const isFormFilled = checkFormStatus();
                            }}
                        />
                    )}
            </div> */}

            {/* {companyName && (
                <div className='mb-8 form-group'>

                    <Checkbox
                        label="Are you the owner of the company?"
                        checked={companyOwnerChecked} 
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            props.handleCompanyOwnerCheckedChange(isChecked); 
                            console.log(isChecked);
                        }}
                    />

                </div>
            )}
 */}

                {/* <div className='mb-8 form-group'>


                {companyOwnerChecked ? (
                    <div>
                        <CompanyEIN onEINChange={handleEINChange} checkFormStatus={checkFormStatus} />
                        <p className='secondary-color'>
                            The system will review the EIN and verify if the business is either verified or unverified.
                        </p>
                    </div>
                        
                        ) : (

                         <div></div>

                    )}
                </div> */}

                
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
            </div>
            <div className='mb-8 form-group'>
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
        </div>
    );
}

export default ProjectClientForm;
