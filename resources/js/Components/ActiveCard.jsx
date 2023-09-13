import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import CardContainer from '@/Components/Containers/CardContainer';
import { Link } from '@inertiajs/react';

const ActiveCard = ({ cardType, title, projectName, shootDate, projectType, progressValue, RSVPs, href }) => {


  const cardContent = (
    <div className='flex flex-col justify-between h-[12rem]'>
      {cardType === 'callSheet' && (
        <h2 className='text-xl primary-green-color'>Call Sheet Name</h2>
      )}
      {cardType === 'project' && (
        <h2 className='text-2xl primary-green-color'>{projectName}</h2>
      )}
      <div>
      {cardType === 'callSheet' && (
        <div>
          <span className='primary-color text-sm'>Shoot Date</span>
          <p className='mb-2 secondary-color text-xl'>{shootDate}</p>       
        </div>
      )}
      {cardType === 'project' && (
        <div>
          <span className='primary-color text-sm'>Project Type</span>
          <p className='mb-2 secondary-color text-xl'>{projectType}</p>
        </div>
      )}
        
        {cardType === 'callSheet' && (
          <div className='flex flex-row mt-4'>
            <CircularProgress thickness={3} color="success" determinate value={progressValue} sx={{ '--CircularProgress-size': '23px' }} />
            <p className="ml-2 primary-color">{RSVPs}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <CardContainer header={title} showButtonIcon={true} className="max-w-[18rem]">
      {href ? (
        <Link href={href}>{cardContent}</Link>
      ) : (
        cardContent
      )}
    </CardContainer>
  );
};

export default ActiveCard;
