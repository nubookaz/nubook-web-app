import { useAuth } from '@/Components/Contexts/AuthContext';
import { useModal } from '@/Components/Contexts/ModalContext';
import { useProject } from '@/Components/Contexts/ProjectContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import CardContainer from '@/Components/Containers/CardContainer';
import PortalLayout from '@/Layouts/Partials/PortalLayout';
 
import ImageContainer from '@/Components/Containers/ImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCircle } from '@fortawesome/free-solid-svg-icons';
 


export default function ProjectDetailsPage({ 
  
  project,

}) {
    const { toggleModal } = useModal();
    const { setCurrentProject, toggleFavorite } = useProject();

    const handleProjectImagePreviewClick = () => {
      toggleModal({ type: 'projectImage', imageUrl: project });
    };
 
    const [isFavorite, setIsFavorite] = useState(project.is_favorite);

    const handleToggleFavorite = () => {
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      toggleFavorite(project.id, newFavoriteStatus);
  };

  useEffect(() => {
    if (project && project.id) {
        setCurrentProject(project.id);
    }
}, [project, setCurrentProject]);
    
    const [projectData, setProjectData] = useState({
      id: '',
      is_favorite: '',
      project_type: '',
      category_type: '',
      project_name: '',
      project_description: '',
      primary_genre: '',
      secondary_genre: '',
      viewer_rating: '',
      project_stage: '',
      project_status: '',
      filming_days: '',
      project_budget: '',
  });

  useEffect(() => {
    if (project) {
        const details = JSON.parse(project.project_details || '{}');
        const moviePoster = project.media.length > 0 ? `/storage/${project.media[0].media_path}` : '/images/movie_posters/coming_soon_poster.jpg';

        setProjectData({ 
            ...project,
            primary_genre: details.primaryGenre || '',
            secondary_genre: details.secondaryGenre || '',
            viewer_rating: details.viewerRating || 'NR',
            filming_days: details.filmingDays || '0',
            project_budget: project.project_budget || '0.00',
            movie_poster: moviePoster,  // Set the movie poster URL
        });
    }
}, [project]);

  const formatCurrency = (amount) => {
      return Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };


 
  return (
    <PortalLayout 
        breadcrumbs={[
            { label: 'Overview', url: route('projects.index') },
            { label: 'Project List', url: route('projects.list') },
            { label: 'Project Details', url: '' },
        ]}
        
        project={project}
    
    >

            {{
                body:(
                    <div className="w-full h-full flex flex-row gap-4">
                        <div className='flex flex-col gap-4 h-full w-full'>
                            <CardContainer className='w-full h-full max-h-[24rem]'>
                                <div className='flex flex-row gap-6 w-full h-full'>
                                    <ImageContainer
                                          backgroundImage={`${projectData.movie_poster}`}
                                          className='cursor-pointer w-full max-w-[14rem] h-full'
                                          overlayOpacity='0'
                                          enableHover={true}
                                          onClick={handleProjectImagePreviewClick}
                                      >
                                    </ImageContainer>
                                    <div className='flex flex-col gap-2 h-full w-full justify-between my-auto'>
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
                                                  onClick={handleToggleFavorite}
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
                                              <span className='text-sm'>{projectData.category_type}</span>
                                            </div>
                                        </div>

                                        <div className='text-sm h-full max-h-[9rem] w-full'>
                                          {projectData.project_description ? (
                                            <p className='text-[1rem] leading-7 text-slate-400 h-full w-full'>{projectData.project_description}</p>
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

                            <CardContainer header='Tasks' className='h-full' >

                            </CardContainer>

                        </div>
                        
                        <div className='flex flex-col h-full w-full max-w-[28rem] gap-4'>
                          <CardContainer header='Budget' >
                              <div className='flex flex-col text-center py-[3rem]'>
                                  <span className='text-slate-400 font-semibold'>Project Budget</span>
                                  <span className='text-[2rem] text-emerald-500 font-bold'>${formatCurrency(projectData.project_budget)}</span>
                              </div>
                              <div className='flex flex-row gap-2 justify-between'>
                                  <div className='flex flex-col gap-2 text-center bg-slate-100 rounded-md p-4 w-full'>
                                      <span className='text-slate-400 font-semibold'>Total Expenses</span>
                                      <span className='text-[1rem] text-rose-500 font-bold'>${formatCurrency(projectData.project_budget)}</span>
                                  </div>
                                  <div className='flex flex-col gap-2 text-center bg-slate-100 rounded-md p-4 w-full'>
                                      <span className='text-slate-400 font-semibold'>Remaining Budget</span>
                                      <span className='text-[1rem] text-emerald-500 font-bold'>${formatCurrency(projectData.project_budget)}</span>
                                  </div>
                              </div>
                              
                          </CardContainer>
                          <CardContainer header='Activity' className='h-full'>

                          </CardContainer>
                        </div>

                    </div>
                ),
            }}

       

    </PortalLayout>

  );
}

