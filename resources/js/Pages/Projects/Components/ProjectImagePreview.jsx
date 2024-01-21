import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import ImageContainer from '@/Components/Containers/ImageContainer';
import React, { useState, useEffect } from 'react';
 

export default function ProjectImagePreview({

    data,

}){
    
    const image = data?.url || data;
    const fileSize = data?.size;
    const dimensions = data?.dimensions;


    function formatFileSize(bytes, decimals = 2) {
        if (!bytes) return 'N/A';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    return (
        <div className='h-full w-full mt-[5rem]'>
            <ImageContainer 
                className='h-[54rem] w-[35rem] mb-2 rounded-lg mx-auto' 
                backgroundImage={image}
                backgroundSize='contain'
                overlayOpacity='0'
            ></ImageContainer>
                
            <div className='flex flex-row gap-4 justify-center'>
                <p><span className='font-bold'>Dimensions: </span>{dimensions || 'N/A'}</p>
                <p><span className='font-bold'>File Size: </span>{formatFileSize(fileSize)}</p>
            </div>
            <a href={image} download className='block duration-500 bg-emerald-200 hover:bg-emerald-500 text-emerald-700 hover:text-white py-2 rounded-md max-w-[12rem] text-center my-[1rem] mx-auto'>
                    Download Image
            </a>
        </div>
        

    );

}