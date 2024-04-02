import React from 'react';
import { faProjectDiagram, faInfo, faFeatherPointed, faClapperboard, faBarsStaggered, faPaperPlane, faAddressCard, faHandHoldingDollar, faPhotoFilm, faFolderTree, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@/Components/Buttons/IconButton'; 
import Tooltip from '@mui/joy/Tooltip';

function ProjectNavigation({ project }) {
 

   return (
    <div className="flex flex-row w-full">
      <div className="left-content w-full">
        <h1 className='w-full'>{project.project_name}</h1>
        <p className='light-color text-md font-base'>
          {project.video_type}
          {project.video_production?.primary_genre &&
            project.video_production?.secondary_genre && ' :: '}
          {project.video_production?.primary_genre}
          {project.video_production?.secondary_genre && ` ${project.video_production.secondary_genre}`}
        </p>

      </div>
      <div className="right-content justify-end w-full pr-[2rem]">
          <div className='flex flex-row dashboard-navlinks gap-4'>
              <Tooltip
                  placement="top"
                  title="Project Overview"
                  variant="plain"
                >
                  <div>
                    <IconButton href={route('project.details', { projectId: project.id })} active={route().current('project.details')}  activeClass="active-link" icon={faInfo} size="small" />
                  </div>
              </Tooltip>

  
              <IconButton className="disabled" icon={faProjectDiagram} size="small" />
  
              <IconButton className="disabled" icon={faFeatherPointed} size="small" />
  
              <IconButton className="disabled" icon={faClapperboard} size="small" />
  
              <IconButton className="disabled" icon={faBarsStaggered} size="small" />
  
              <Tooltip
                  placement="top"
                  title="Call Sheets"
                  variant="plain"
              >
                <div>
                  <IconButton href={route('projects.callSheets.index', { projectId: project.id })} active={route().current('projects.callSheets.*')}  activeClass="active-link" icon={faPaperPlane} size="small" />
                </div>
              </Tooltip>
  
              <IconButton className="disabled" icon={faAddressCard} size="small" />
  
              <IconButton className="disabled" icon={faHandHoldingDollar} size="small" />
  
              <IconButton className="disabled" icon={faBriefcase} size="small" />
  
              <IconButton className="disabled" icon={faPhotoFilm} size="small" />
      
              <IconButton className="disabled" icon={faFolderTree} size="small" />
          </div>
      </div>
    </div>
  );
}




export default ProjectNavigation;
