import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import CardContainer from '@/Components/Containers/CardContainer';
import { Link } from '@inertiajs/react';

const ActiveCard = ({ cardType, className, headerColor, textColor, menuItems, handleButtonClick, status, showButtonIcon, cardTitle, shootDate, projectType, progressValue, progressBar, RSVPs, href }) => {

  const cardContent = (
    <div className='flex flex-col justify-between h-full'>
      <h2 className='text-xl primary-green-color' style={{ color: headerColor }}>{cardTitle}</h2>
      <div>

        {cardType === 'callSheet' && (
          <div>
            <span className={`primary-color text-sm ${textColor}`}>Shoot Date</span>
            <p className={`mb-1 secondary-color text-xl ${textColor}`}>{shootDate}</p>       
          </div>
        )}

        {cardType === 'project' && (
          <div>
            <span className={`primary-color text-sm font-bold ${textColor}`}>Project Type</span>
            <p className={`secondary-color text- ${textColor}`}>{projectType}</p>
          </div>
        )}

        {progressBar && progressValue && RSVPs && (
          <div className='flex flex-row mt-4'>
            <CircularProgress thickness={3} color="success" determinate value={progressValue} sx={{ '--CircularProgress-size': '23px' }} />
            <p className={`ml-2 primary-color ${textColor}`}>{RSVPs}</p>
          </div>
        )}

      </div>
    </div>
  );

  return (
    <CardContainer textColor={textColor} header={status} menuItems={menuItems} showButtonIcon={showButtonIcon} handleButtonClick={handleButtonClick} className={`w-full h-full ${className}`}>
      {href ? (
        <Link className='h-full' href={href}>{cardContent}</Link>
      ) : (
        cardContent
      )}
    </CardContainer>
  );
};

export default ActiveCard;
