import React from 'react';
import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLocationArrow, faMapPin } from '@fortawesome/free-solid-svg-icons';





export default function LocationDetails({ location, header, showButtonIcon, menuItems }) {

  return (

    <CardContainer className="mt-2" header={header} showButtonIcon={showButtonIcon} menuItems={menuItems}>
      <div>
          <h3 className='mb-4 text-2xl'>
              <FontAwesomeIcon icon={faLocationArrow} className='mr-4 primary-green-color text-xl' />
              {location.name}
          </h3>
          <div className='street_address flex flex-row'>
              <FontAwesomeIcon icon={faMapPin} className='mr-4 my-auto primary-green-color text-xl' />
              <p className='text-xl font-semibold'>
              {location.street_address}<br />
              {location.city}, {location.state}</p>
          </div>

      </div>
    </CardContainer>
  );


}



