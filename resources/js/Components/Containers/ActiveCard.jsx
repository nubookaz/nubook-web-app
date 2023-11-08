import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import CardContainer from '@/Components/Containers/CardContainer';
import { Link } from '@inertiajs/react';

const ActiveCard = ({ cardType, bgColor, textColor, menuItems, handleButtonClick, status, showButtonIcon, cardTitle, projectName, shootDate, projectType, progressValue, progressBar, RSVPs, href }) => {

  const cardContent = (
    <div className='flex flex-col justify-between h-full w-[12rem]'>
      <h2 className={`text-xl primary-green-color ${textColor}`}>{cardTitle}</h2>
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
            <p className={`secondary-color text-xl ${textColor}`}>{projectType}</p>
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
    <CardContainer bgColor={bgColor} textColor={textColor} header={status} menuItems={menuItems} showButtonIcon={showButtonIcon} handleButtonClick={handleButtonClick} className="w-full h-full max-h-[19rem]">
      {href ? (
        <Link className='h-full' href={href}>{cardContent}</Link>
      ) : (
        cardContent
      )}
    </CardContainer>
  );
};

export default ActiveCard;
