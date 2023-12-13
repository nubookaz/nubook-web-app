import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import ImageContainer from '@/Components/Containers/ImageContainer';
import { Link } from '@inertiajs/react';

const ActiveCard = ({ data, cardHeight, cardType, shootDate, className, indicator, absoluteHeader, headerColor, textColor, menuItems, handleButtonClick, status, showButtonIcon, cardTitle, projectType, progressValue, progressBar, RSVPs, href }) => {

  const cardContent = (
    <div className='flex flex-col justify-between h-full '>

      <div className='justify-center flex flex-col text-left h-full'>
        <h2 className={`text-[1.2rem] text-white ${data.length <= 4 ? 'text-[1.75rem]' : '' }`}>{cardTitle}</h2>
        {cardType === 'project' && (
            <p className={`secondary-color text-white text- ${textColor}`}>{projectType}</p>
        )}
      </div>

 
        {cardType === 'callSheet' && (
          <div>
            <span className={`primary-color text-sm ${textColor}`}>Shoot Date</span>
            <p className={`mb-1 secondary-color text-xl ${textColor}`}>{shootDate}</p>       
          </div>
        )}



        {progressBar && progressValue && RSVPs && (
          <div className='flex flex-row mt-4'>
            <CircularProgress thickness={3} color="success" determinate value={progressValue} sx={{ '--CircularProgress-size': '23px' }} />
            <p className={`ml-2 primary-color ${textColor}`}>{RSVPs}</p>
          </div>
        )}

     </div>
  );

  const cardContainerClasses = `active-card-container w-full h-full transition hover:shadow-2xl duration-500 ${cardHeight} ${className}`;
  const cardContentClasses = `h-full w-full  ${absoluteHeader ? 'pt-10 px-4 pb-3' : ' '}`;

  const dynamicStyles = `

 
  `;


  return (
    <ImageContainer   
      backgroundImage="/images/background_images/bg_image_2.jpg"
      overlay={true}
      className={cardContainerClasses} 
      absoluteHeader={absoluteHeader} 
      textColor={textColor} 
      indicator={indicator} 
      headerColor={headerColor} 
      header={status} 
      menuItems={menuItems} 
      showButtonIcon={showButtonIcon} 
      handleButtonClick={handleButtonClick}
      >
      <style>{dynamicStyles}</style>

      {href ? (
        <Link className={cardContentClasses} href={href}>{cardContent}</Link>
      ) : (
        {cardContent}
      )}
      
    </ImageContainer>
  );
};

export default ActiveCard;
