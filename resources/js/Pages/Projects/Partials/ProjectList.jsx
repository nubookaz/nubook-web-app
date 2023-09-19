import React, { useEffect } from 'react';
import NavLink from '@/Components/Navigations/NavLink';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import ActiveCard from '@/Components/ActiveCard';





function ProjectList({ projects }) {





  return (


    <div className='flex flex-row gap-4'> 
    

      {projects.map(project => (

      <ActiveCard
        status={project.projectStage}
        cardType="project"
        href={
          project.projectStage === 'Estimate'
            ? route('projects.estimate', { id: project.id }) // Redirect to a different URL if projectStage is "Estimate"
            : route('projects.edit', { id: project.id }) // Default URL for other project stages
        }
        key={project.id}
        cardTitle={project.projectName}
        projectType={project.projectType}
        progressValue={75}
      />




      ))}


      
  </div>


  );
}



export default ProjectList;
