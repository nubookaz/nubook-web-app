import React, { useEffect } from 'react';
import NavLink from '@/Components/Navigations/NavLink';
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import ActiveCard from '@/Components/Containers/ActiveCard';
import {
  estimateBackgroundColor,
  creativeDevelopmentBackgroundColor,
  preProductionBackgroundColor,
  productionBackgroundColor,
  postProductionBackgroundColor,
  completedBackgroundColor,
} from '@/Components/Projects/ProjectBgColors';




function ProjectList({ projects, className }) {
  const containerClasses = `grid grid-cols-4 grids-rows-2 gap-6 h-full ${className}`;
  
  // const estimateBackgroundColor = '!bg-gray-400';
  // const creativeDevelopmentBackgroundColor = '!bg-purple-600';
  // const preProductionBackgroundColor = '!bg-amber-600';
  // const productionBackgroundColor = '!bg-yellow-400';
  // const postProductionBackgroundColor = '!bg-sky-600';
  // const completedBackgroundColor = '!bg-green-600';


  return (
    <div className={containerClasses}>
      {projects.map(project => {
        let bgColor = '';
        let textColor = '';
        if (project.projectStage === 'Estimate') {
          bgColor = estimateBackgroundColor;
          textColor = '!text-white';
        } else if (project.projectStage === 'Creative Development') {
          bgColor = creativeDevelopmentBackgroundColor;
          textColor = '!text-white';
        } else if (project.projectStage === 'Pre-Production') {
          bgColor = preProductionBackgroundColor;
          textColor = '!text-white';
        } else if (project.projectStage === 'Production') {
          bgColor = productionBackgroundColor;
          textColor = '!text-white';
        } else if (project.projectStage === 'Post-Production') {
          bgColor = postProductionBackgroundColor;
          textColor = '!text-white';
        } else if (project.projectStage === 'Completed') {
          bgColor = completedBackgroundColor;
          textColor = '!text-white';
        }  

        return (
          <ActiveCard
            status={project.projectStage}
            cardType="project"
            href={
              project.projectStage === 'Estimate'
                ? route('projects.estimate', { id: project.id })
                : route('projects.edit', { id: project.id })
            }
            key={project.id}
            cardTitle={project.projectName}
            projectType={project.projectType}
            progressValue={75}
            bgColor={bgColor}
            textColor={textColor}
          />
        );
      })}
    </div>
  );
}


export default ProjectList;



// import React, { useEffect } from 'react';
 
// import ActiveCard from '@/Components/Containers/ActiveCard';
// import ProjectBgColors from '@/Components/Projects/ProjectBgColors';





// function ProjectList({ projects, className }) {
//   const containerClasses = `grid grid-cols-4 grids-rows-2 gap-6 h-full ${className}`;

//   return (
//     <div className='h-full'>
//       <ProjectBgColors containerClasses={containerClasses} projects={projects}>
//         {(project, bgColor, textColor) => (
//           <ActiveCard
//             status={project.projectStage}
//             cardType="project"
//             href={
//               project.projectStage === 'Estimate'
//                 ? route('projects.estimate', { id: project.id })
//                 : route('projects.edit', { id: project.id })
//             }
//             key={project.id}
//             cardTitle={project.projectName}
//             projectType={project.projectType}
//             progressValue={75}
//             bgColor={bgColor}
//             textColor={textColor}
//           />
//         )}
//       </ProjectBgColors>
//     </div>
//   );
// }

// export default ProjectList;