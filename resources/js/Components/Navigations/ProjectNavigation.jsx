import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faInfo, faFeatherPointed, faClapperboard, faBarsStaggered, faPaperPlane, faAddressCard, faHandHoldingDollar, faPhotoFilm, faFolderTree, faBriefcase, faSliders } from '@fortawesome/free-solid-svg-icons';
import PageButton from '@/Components/Buttons/IconButton'; 
import Tooltip from '@mui/joy/Tooltip';

function ProjectNavigation({ project }) {

  const handleSettingsClick = () => {
    console.log('Button clicked in child component');
  };

  return (
    <div className="flex flex-row w-full">
      <div className="left-content w-full">
        <h1 className='w-full'>{project.project_name}</h1>
        <p className='light-color text-md font-base'>{project.project_type} :: {project.category_type}</p>
      </div>
      <div className="right-content justify-end w-full pr-[2rem]">
        <ul className="dashboard-navlinks text-center flex gap-6">
          <li>
            <Tooltip
              placement="top"
              title="Project Overview"
              variant="plain"
            >
              <div>
                <PageButton href={route('projects.edit', { id: project.id })} active={route().current('projects.edit')}  activeClass="active-link" icon={faInfo} size="small" />
              </div>
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
            <Tooltip
                placement="top"
                title="Call Sheets"
                variant="plain"
            >
              <div>
                <PageButton href={route('projects.callSheets.index', { id: project.id })} active={route().current('projects.callSheets.*')}  activeClass="active-link" icon={faPaperPlane} size="small" />
              </div>
            </Tooltip>
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
