import React from 'react';

import CircularProgress from '@mui/joy/CircularProgress';

import CardContainer from '@/Components/Containers/CardContainer';

const CallSheetCard = () => {

  return (

    <CardContainer header="Active" showButtonIcon={true} className="max-w-[18rem]">
      <div className='flex flex-col justify-between h-[12rem]'>
          <h2 className='text-xl primary-green-color ='>Call Sheet Name</h2>
          <div>
            <span className='primary-color text-sm'>Shoot Date</span>
            <p className='mb-2 secondary-color'>Sun, Jan 25th 2024</p>
            <div className='flex flex-row mt-4'>
              <CircularProgress thickness={3} color="success" determinate value={75} sx={{ '--CircularProgress-size': '23px' }}>
              </CircularProgress>
              <p className="ml-2 primary-color">24/25 RSVP's</p>
            </div>
          </div>
      </div>
    </CardContainer>
    
  );
};

export default CallSheetCard;
