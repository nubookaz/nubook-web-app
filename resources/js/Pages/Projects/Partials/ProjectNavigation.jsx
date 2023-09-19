import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faInfo, faFeatherPointed, faClapperboard, faBarsStaggered, faPaperPlane, faAddressCard, faHandHoldingDollar, faPhotoFilm, faFolderTree, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import PageButton from '@/Components/Buttons/PageButton'; 
import Tooltip from '@mui/joy/Tooltip';

function ProjectNavigation({ projectData }) {

  const {
    projectID = '',
    projectName = '',
    projectType = '',
    projectDescription = '',
    projectBudget = 0,
    categoryType = '',
    projectStage = '',
    projectDays = 0,
    projectMonths = 0,
    projectYears = 0,
  } = projectData || {}; 

  return (
    <div className="flex flex-row w-full">
      <div className="left-content w-full">
        <h1 className='text-3xl mb-2'>{projectName}</h1>
        <h3>{projectType} :: {categoryType}</h3>
      </div>
      <div className="right-content justify-end w-full">
        <ul className="dashboard-navlinks text-center flex gap-8">
          <li>
            <Tooltip
              placement="top"
              variant="plain"
            >
              <PageButton href={route('projects.edit', { id: projectID })} active={route().current('projects.edit')}  activeClass="active-link" icon={faInfo} size="small" />
            </Tooltip>
          </li>
          <li>
            <PageButton className="disabled" icon={faProjectDiagram} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faFeatherPointed} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faClapperboard} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faBarsStaggered} size="small" />
          </li>
          <li>
            <PageButton href={route('projects.callSheets.index', { id: projectID })} active={route().current('projects.callSheets.index')}  activeClass="active-link" icon={faPaperPlane} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faAddressCard} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faHandHoldingDollar} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faBriefcase} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faPhotoFilm} size="small" />
          </li>
          <li>
            <PageButton className="disabled" icon={faFolderTree} size="small" />
          </li>
        </ul>
      </div>
    </div>
  );
}




export default ProjectNavigation;
