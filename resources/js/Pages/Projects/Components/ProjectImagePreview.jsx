import { useProject } from '@/Components/Contexts/ProjectContext';
import React, { useState, useEffect } from 'react';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import ImageContainer from '@/Components/Containers/ImageContainer';
 

export default function ProjectImagePreview({

    data,

}){
    const [imageData, setImageData] = useState({
        url: null,
        dimensions: null,
        size: null,
    });

    useEffect(() => {
        if (data?.media?.length > 0) {
            const firstMedia = data.media[0];
            const mediaDimensions = JSON.parse(firstMedia.dimensions || "{}");
            setImageData({
                url: `${firstMedia.media_path}`,
                dimensions: `${mediaDimensions.width} x ${mediaDimensions.height}`,
                size: firstMedia.size,
            });
        }
    }, [data]);

    function formatFileSize(bytes, decimals = 2) {
        if (!bytes) return 'N/A';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <div className='h-full w-full pb-4'>
            <ImageContainer 
                className='h-[54rem] w-[35rem] mb-8 mx-auto scale-[1.04]' 
                backgroundImage={`/storage/${imageData.url}`}
                backgroundSize='contain'
                overlayOpacity='0'
            ></ImageContainer>
                
            <div className='flex flex-row gap-4 justify-center'>
                <p><span className='font-bold'>Dimensions: </span>{imageData.dimensions || 'N/A'}</p>
                <p><span className='font-bold'>File Size: </span>{formatFileSize(imageData.size)}</p>
            </div>
            {imageData.url && (
                <a href={`/storage/${imageData.url}`} download className='block duration-500 bg-emerald-200 hover:bg-emerald-500 text-emerald-700 hover:text-white py-2 rounded-md max-w-[12rem] text-center my-[1rem] mx-auto'>
                    Download Image
                </a>
            )}
        </div>
    );
}