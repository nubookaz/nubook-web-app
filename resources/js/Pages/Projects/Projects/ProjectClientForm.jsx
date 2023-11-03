import React, { useState } from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';
import CompanyEIN from '@/Components/CompanyEIN';

function ProjectClientForm(props) {
  
    // Function to handle changes to the EIN input value
    const handleEINChange = (formattedEIN) => {
      setEinNumber(formattedEIN);
      // Call your checkFormStatus or any other logic here as needed
      checkFormStatus();
    };


    const {
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

    // const [clientType, setClientType] = React.useState({
    //     companyTypeChecked: false,
    // });

    // const [isOwner, setIsOwner] = React.useState({
    //     checkboxChecked: false,
    // });

      

    return (
        <div className='new-project-form'>
            <div className='mb-8 form-group'>
                <Checkbox
                    label="This is a brand new client"
                    checked={props.companyTypeChecked} // Use the prop here
                    onChange={(event) => {
                        const isChecked = event.target.checked;
                        props.handleCompanyTypeCheckedChange(isChecked); // Call the function with the value
                        console.log(isChecked);
                    }}
                />

            </div>

            <div className='mb-8 form-group'>
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
            </div>

            {companyName && (
                <div className='mb-8 form-group'>

                    <Checkbox
                        label="Are you the owner of the company?"
                        checked={companyOwnerChecked} // Use the prop here
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            props.handleCompanyOwnerCheckedChange(isChecked); // Call the function with the value
                            console.log(isChecked);
                        }}
                    />

                </div>
            )}


                <div className='mb-8 form-group'>


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
                </div>

                
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
