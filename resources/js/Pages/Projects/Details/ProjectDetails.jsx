import React, { useState, useEffect } from 'react';

import ImageContainer from '@/Components/Containers/ImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCircle } from '@fortawesome/free-solid-svg-icons';
 
export default function ProjectDetails(){

    return(

        <CardContainer className='w-full h-full max-h-[24rem]' onClick={toggleFavorite}>
            <div className='flex flex-row gap-6 w-full h-full'>
                <ImageContainer
                        backgroundImage={projectData.movie_poster.url ? projectData.movie_poster.url : '/images/movie_posters/coming_soon_poster.jpg'}
                        className='cursor-pointer w-full max-w-[15rem] h-full'
                        overlayOpacity='0'
                        enableHover={true}
                        onClick={handleProjectImagePreviewClick}
                    >
                </ImageContainer>
                <div className='flex flex-col gap-2 h-full w-full justify-between max-h-[20rem] my-auto'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row gap-2'>
                            <span className='text-xs py-1 px-4 text-slate-400  bg-slate-100 rounded-md'>{projectData.project_status}</span>
                            <span className='text-xs py-1 px-4 text-slate-400  bg-slate-100 rounded-md'>{projectData.project_stage}</span>
                        </div>
                        <div className='flex flex-row gap-6'>
                            <h2 className='text-[2.5rem] text-slate-600'>{projectData.project_name}</h2>
                            <FontAwesomeIcon
                                icon={faBookmark} 
                                className={`text-2xl my-auto cursor-pointer duration-500 ${isFavorite ? 'text-red-500 drop-shadow-[0_1px_3px_rgba(253,164,175,0.75)]' : 'text-gray-300'}`}
                                onClick={toggleFavorite}
                            />                                
                        </div>
                        <div className='flex flex-row gap-4'>
                            {projectData.primary_genre ? (
                            <>
                                <span className='text-sm'>{projectData.primary_genre}</span>
                                <FontAwesomeIcon icon={faCircle} className='text-[.5rem] my-auto'/>
                            </>
                            ):null}
                            {projectData.secondary_genre ? (
                            <>
                                <span className='text-sm'>{projectData.secondary_genre}</span>
                                <FontAwesomeIcon icon={faCircle} className='text-[.5rem] my-auto'/>
                            </>
                            ):null}
                            <span className='text-sm'>{projectData.video_type}</span>
                        </div>
                    </div>

                    <div className='text-sm h-full w-full'>
                        {projectData.project_description ? (
                        <p className=' text-slate-400 h-full w-full'>{projectData.project_description}</p>
                        ):(
                        <p className='bg-slate-50 text-slate-300 h-full w-full rounded-md p-4 items-center flex justify-center'>This project does not have a decription.</p>
                        )}
                    </div>
                    <div className='flex flex-row gap-4'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xs text-slate-400 font-bold'>Movie Rating</span>
                            <p className='text-2xl font-bold text-center'>{projectData.viewer_rating ? projectData.viewer_rating : 'NR' }</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xs text-slate-400 font-bold'>RMNG Filming Days</span>
                            <p className='text-2xl font-bold text-center'>{projectData.filming_days}</p>
                        </div>
                    </div>
                </div>
            </div>
        </CardContainer>

    );

}