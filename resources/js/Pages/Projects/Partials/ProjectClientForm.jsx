import React, { useState } from 'react';

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';

function ProjectClientForm() {
    const [clientType, setClientType] = useState('');

    return (

      <div className='new-project-form'>
        <div className="form-group mb-8">
            <Checkbox label="This is a brand new client" />
        </div> 
        <div className='form-group mb-8'>
            <Input className="mb-4" placeholder="Company Name" />
        </div>
        <div className='form-group mb-8'>
            <h3 className='mb-4 primary-color font-semibold'>Client Contact</h3>
            <div className='flex flex-row gap-2 mb-4'>
                <Input fullWidth placeholder="First Name" />
                <Input placeholder="Middel Initial" />
            </div>
                <Input sx={{ mb: 2 }} fullWidth placeholder="Last Name" />
                <Input fullWidth placeholder="Job Title" />
        </div>
        <div className='form-group mb-8'>
            <Input fullWidth sx={{ mb: 2 }} placeholder="Email Address" />
            <Input fullWidth placeholder="Phone Number" />
        </div>

      </div>
      
   
  );
}

export default ProjectClientForm;
