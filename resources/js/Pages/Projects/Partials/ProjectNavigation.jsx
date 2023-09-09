import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faProjectDiagram, faComments, faMoneyCheckDollar, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import PageButton from '@/Components/Buttons/PageButton'; 

function ProjectNavigation({ projectName, projectType, projectCategory }) {
  return (
    <div className="medium-buttons banner-footer-offset">
      <div className="left-content w-full -mt-[4.3rem]">
        <h1 className='text-3xl mb-2'>{projectName}</h1>
        <h3>{projectType} :: {projectCategory}</h3>
      </div>
      <div className="right-content -mb-[1rem] justify-end w-full">
        <ul className="dashboard-navlinks text-center flex gap-8">
          <li>
            <PageButton icon={faListCheck} size="small" />
          </li>
          <li>
            <PageButton href={route('projects')} active={route().current('projects')} activeClass="active-link" icon={faProjectDiagram} size="small" />
          </li>
          <li>
            <PageButton icon={faComments} size="small" />
          </li>
          <li>
            <PageButton icon={faMoneyCheckDollar} size="small" />
          </li>
          <li>
            <PageButton icon={faBriefcase} size="small" />
          </li>
          <li>
            <PageButton icon={faBriefcase} size="small" />
          </li>
          <li>
            <PageButton icon={faBriefcase} size="small" />
          </li>
          <li>
            <PageButton icon={faBriefcase} size="small" />
          </li>
          <li>
            <PageButton icon={faBriefcase} size="small" />
          </li>
          <li>
            <PageButton icon={faBriefcase} size="small" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectNavigation;
