import { useClients } from '@/Components/Contexts/ClientContext';

import React, {  useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';

const ProjectSummary = ({ 
    
    projectType, 
    selectedCreativeType, 
    videoProjectDetails, 
    additionalVideoDetails, 
    selectedClientIds 

}) => {

    const { clients } = useClients();
    const [selectedClients, setSelectedClients] = useState([]);

    useEffect(() => {
        const filteredClients = clients.filter(client => selectedClientIds.includes(client.id));
        setSelectedClients(filteredClients);
    }, [clients, selectedClientIds]);
 
    const renderClients = () => {
        return selectedClients.map(client => (
            <div key={client.id} className='flex flex-row gap-2 bg-slate-50 px-4 py-2 rounded-md items-center'>
                <div className='rounded-full shadow-sm w-[3rem] h-[3rem] bg-white my-auto'><span className='font-light text-lg flex justify-center items-center text-center h-full'>JD</span></div>
                <p>{client.first_name}</p>
                <p>{client.last_name}</p>
             </div>
        ));
    };

    const renderCreativeDetails = () => {
        return (
            <div className='h-full flex flex-col gap-4'>
                <CardContainer className='w-full h-full max-h-[24rem]' >
                    <div className='flex flex-row gap-6 w-full h-full'>
                        <ImageContainer
                                backgroundImage={`${videoProjectDetails.media_path ? videoProjectDetails.media_path : 'images/movie_posters/coming_soon_poster.jpg'}`}
                                className='cursor-pointer w-full max-w-[15rem] h-full'
                                overlayOpacity='0'
                                enableHover={true}
                                // onClick={handleProjectImagePreviewClick}
                            >
                        </ImageContainer>
                        <div className='flex flex-col gap-4 h-full w-full justify-between max-h-[20rem] my-auto'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row gap-2'>
                                    <span className='text-xs py-1 px-4 text-slate-400  bg-slate-100 rounded-md'>{additionalVideoDetails.project_status}</span>
                                    <span className='text-xs py-1 px-4 text-slate-400  bg-slate-100 rounded-md'>{additionalVideoDetails.project_stage}</span>
                                </div>
                                <div className='flex flex-row gap-6'>
                                    <h2 className='text-[2.5rem] text-slate-600'>{videoProjectDetails.project_name}</h2>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    {videoProjectDetails.primaryGenre ? (
                                        <>
                                            <span className='text-sm'>{videoProjectDetails.primaryGenre}</span>
                                            <FontAwesomeIcon icon={faCircle} className='text-[.5rem] my-auto'/>
                                        </>
                                    ):null}
                                    {videoProjectDetails.secondaryGenre ? (
                                        <>
                                            <span className='text-sm'>{videoProjectDetails.secondaryGenre}</span>
                                            <FontAwesomeIcon icon={faCircle} className='text-[.5rem] my-auto'/>
                                        </>
                                    ):null}
                                    <span className='text-sm'>{selectedCreativeType}</span>
                                </div>
                            </div>

                            <div className='text-sm h-full w-full'>
                                {videoProjectDetails.projectDescription ? (
                                    <p className='text-[1rem] leading-7 text-slate-400 h-full w-full'>{videoProjectDetails.projectDescription}</p>
                                ):(
                                    <p className='bg-slate-50 text-slate-300 h-full w-full rounded-md px-4 py-10 items-center flex justify-center'>This project does not have a decription.</p>
                                )}
                            </div>

                            <div className='flex flex-row gap-4 w-full justify-between'>
                                <div className='flex flex-row gap-10'>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-xs text-slate-400 font-bold'>Movie Rating</span>
                                        <p className='text-xl font-bold text-center'>{videoProjectDetails.viewerRating ? videoProjectDetails.viewerRating : 'NR' }</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <span className='text-xs text-slate-400 font-bold'>RMNG Filming Days</span>
                                        <p className='text-xl font-bold text-center'>{additionalVideoDetails.filmingDays}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 justify-end shrink'>
                                    <span className='text-xs text-slate-400 font-bold text-center'>Project Budget</span>
                                    {additionalVideoDetails.projectBudget ? (
                                        <p className='text-xl font-bold text-center text-emerald-500'>{additionalVideoDetails.currencySymbol}{additionalVideoDetails.projectBudget}</p>
                                    ):(
                                        <p className='text-sm font-semibold text-center text-slate-400'>Budget Not Set</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContainer>
                <CardContainer header={`Clients`} className=''>
                    <div className='flex flex-row gap-2'>
                        {renderClients()}  
                    </div>
                </CardContainer>
            </div>
            
        );
    };

    const renderDetailsForType = () => {
        switch (projectType) {
            case 'Creative & Entertainment':
                return renderCreativeDetails();
            default:
                return null;
        }
    };

    return (
        <div className="h-full">
            {renderDetailsForType()}                
        </div>
    );
};

export default ProjectSummary;
