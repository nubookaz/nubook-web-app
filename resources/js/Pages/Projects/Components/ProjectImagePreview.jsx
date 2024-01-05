import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import React, { useState, useEffect } from 'react';
 

export default function ProjectImagePreview({

    data,

}){
    

    const image = data?.url;
    const fileSize = data?.size;
    const dimensions = data?.dimensions;


    function formatFileSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }



    return (
        <div className='my-[3rem]'>
            <div className='h-[40rem] w-full max-w-[27rem] mb-2 rounded-lg mx-auto' 
                style={{ 
                    backgroundImage: `url(${image})`, 
                    backgroundPosition: 'center center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                
            </div>
            <div className='flex flex-row gap-4 justify-center'>
                <p><span className='font-bold'>Dimensions: </span>{dimensions}</p>
                <p><span className='font-bold'>File Size: </span>{formatFileSize(fileSize)}</p>
            </div>
            <a href={image} download className='block duration-500 bg-emerald-200 hover:bg-emerald-500 text-emerald-700 hover:text-white py-2 rounded-md max-w-[12rem] text-center my-[1rem] mx-auto'>
                    Download Image
            </a>
        </div>
        

    );

}