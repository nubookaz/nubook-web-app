import React, { useState } from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';
import Tooltip from '@mui/joy/Tooltip';

function ProjectClientForm(props) {
    const {
        companyName,
        einNumber,
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
                <Tooltip
                    title={companyTypeChecked ? "Company Name is required" : ""}
                    open={nextButtonClicked && companyTypeChecked && !companyName}
                    placement="top"
                    arrow
                >
                    {companyTypeChecked ? (
                        <Input
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
                        <Input
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
                </Tooltip>
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

                    <Tooltip
                        title={companyOwnerChecked ? "Please provide a registered EIN number" : ""}
                        open={nextButtonClicked && companyOwnerChecked}
                        placement="top"
                        arrow
                    >

                {companyOwnerChecked ? (
                    <div>
                        <Input
                            className="mb-4"
                            placeholder="EIN Number"
                            value={einNumber}
                            onChange={(e) => {
                                const newEinNumber = e.target.value;
                                setEinNumber(newEinNumber);
                                const isFormFilled = checkFormStatus();
                            }}
                        />
                        <p className='secondary-color'>
                            The system will review the EIN and verify if the business is either verified or unverified.
                        </p>
                    </div>
                        
                        ) : (

                         <div></div>

                    )}
                        </Tooltip>
                </div>

                
            <div className='mb-8 form-group'>
                <h3 className='mb-4 font-semibold primary-color'>Client Contact</h3>
                <div className='flex flex-row gap-2 mb-4'>
                    <Input
                        fullWidth
                        placeholder="First Name"
                        value={clientFirstName}
                        onChange={(e) => {
                            const newClientFirstName = e.target.value;
                            setClientFirstName(newClientFirstName);
                            const isFormFilled = checkFormStatus();
                        }}
                    />
                    <Input
                        placeholder="Middle Initial"
                        value={clientMiddleInitial}
                        onChange={(e) => {
                            const newClientMiddleInitial = e.target.value;
                            setClientMiddleInitial(newClientMiddleInitial);
                            const isFormFilled = checkFormStatus();
                        }}
                    />
                </div>
                <Input
                    sx={{ mb: 2 }}
                    fullWidth
                    placeholder="Last Name"
                    value={clientLastName}
                    onChange={(e) => {
                        const newClientLastName = e.target.value;
                        setClientLastName(newClientLastName);
                        const isFormFilled = checkFormStatus();
                    }}
                />
                <Input
                    fullWidth
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
                <Input
                    fullWidth
                    sx={{ mb: 2 }}
                    placeholder="Email Address"
                    value={clientEmailAddress}
                    onChange={(e) => {
                        const newClientEmailAddress = e.target.value;
                        setClientEmailAddress(newClientEmailAddress);
                        const isFormFilled = checkFormStatus();
                    }}
                />
                <Input
                    fullWidth
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
