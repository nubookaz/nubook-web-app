import { useModal } from '@/Components/Contexts/ModalContext';

import React from 'react';
import CardContainer from '@/Components/Containers/CardContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLocationArrow, faMapPin } from '@fortawesome/free-solid-svg-icons';
import EmptyContent from '@/Components/Layouts/EmptyContent'





export default function LocationDetails({ location, header, showButtonIcon, menuItems }) {

  const { toggleModal } = useModal();
  const handleLocationFormClick = () => {
      toggleModal({type: 'locationForm' });  
  };


  return (

    <CardContainer header='Location Details' className='h-full'>
        <EmptyContent
            className='saturate-0'
            imageUrl='/images/svg_images/location.svg'
            buttonText='Add a Location'
            onClick={handleLocationFormClick}
        >
          {{
            description: (
              <p className='text-slate-300'>Add a location to your project</p>
            )
          }}
          
        </EmptyContent>
    </CardContainer>
  );


}



