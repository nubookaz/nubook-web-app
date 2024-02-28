import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';
import ApplicationName from "@/Components/Branding/ApplicationName";

import PrivacyPolicy from '@/Pages/Auth/Legal/PrivacyPolicy';
import Modal from '@/Components/Modals/Modal';

export default function Guest({ 
    
    children, 
    greeting,
    status,
    imgUrl = '/images/background_images/bg_image_4.jpg',
    isModalOpen,
    closeModal,

}) {
    const [fadeIn, setFadeIn] = useState(false);
    const [fadeInDelay, setFadeInDelay] = useState(false);
  

    useEffect(() => {
        setFadeIn(true); 
        setFadeInDelay(true);  
    }, []);







    return (


        <div className="min-h-screen">
           <div className='absolute z-50'>
                <Modal
                    isOpen = {isModalOpen}
                    // onClose={handleCloseClick}
                    shouldShowCloseButton={true}
                    className='p-10 max-w-[65rem]'
                >

                    <PrivacyPolicy />
                    
                </Modal>

                {children.surface}
           </div>
           <div className={`fade-in ${fadeIn ? 'opacity-1' : 'opacity-0'} absolute inset-0 bg-cover bg-center z-0`} style={{ backgroundImage: 'url("/images/background_images/bg_image_14.jpg")' }}>

                <div className="absolute h-full w-full z-40 bg-black/25 backdrop-blur-sm "></div>

                <div className={`fade-in-delay ${fadeInDelay ? 'opacity-1' : 'opacity-0'} shadow-xl relative z-50 flex justify-center items-center m-auto  h-full w-full`}>

                        <div className=' h-full rounded-xl overflow-hidden max-h-[50rem] w-full max-w-[85rem] flex flex-row'>
                            <ImageContainer 
                                backgroundImage={imgUrl}
                                overlayOpacity='25'
                                childrenClass='flex flex-row w-full items-center p-[6rem] justify-end'
                                className='h-full w-full rounded-none'
                            >
                                <h2 className='text-[6rem] drop-shadow-lg--md text-white text-right font-extralight'>{greeting}</h2>
                            </ImageContainer>
                            <CardContainer childrenClass='gap-8' className='p-[2rem] h-full justify-between rounded-none w-full max-w-[30rem]'>

                                <ApplicationName className='text-left'/>

                                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                                
                                <div className='px-2 h-full'>
                                    {children.body}
                                </div>

                            </CardContainer>
                        </div>
                       

                </div>
            </div>
        </div>


    );
}
