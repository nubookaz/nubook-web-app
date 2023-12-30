import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';
import PortalLayout from '@/Layouts/Partials/PortalLayout';

 
import MovieRating from '@/Components/Projects/MovieRating';

export default function ProjectEditPage({ project }) {

  const bannerProps = {
    showTopBar: false, 
    showRightContent: false,
    size: 'page-banner',
};

console.log(project);
const hasData = project;
const toolbarTitle = project.project_name + ' : ' + 'Project Settings'; // Provide a title for the toolbar
const toolbarCTAText = "Save Project Settings"; // Provide the button text
 
 





  return (
    <AuthenticatedLayout  project={project} bannerProps={bannerProps}>
      {{
        portalBody: (
          
          <div className='w-full h-full'>

              <PortalLayout
                hasData={hasData}
                toolbarTitle={toolbarTitle}
                toolbarCTAText={toolbarCTAText}
                pageType="Call Sheets"
              >

                {{
                  content: (
                    <div className="w-full h-full flex flex-row gap-2">
                      <div className='flex flex-col gap-2 w-full max-w-[21rem]'>
                        <ImageContainer backgroundImage='/images/movie_posters/movie_poster_1.jpg' className='h-full max-h-[31rem]'>

                        </ImageContainer>
                        <CardContainer>
                            <MovieRating />
                        </CardContainer>
                      </div>
                      <CardContainer>Project Content Col</CardContainer>
                      <CardContainer>Col 2</CardContainer>
                    </div>
                  )  
                }}
                
              </PortalLayout>

          </div>

        ),
      }}
    </AuthenticatedLayout>
  );
}

