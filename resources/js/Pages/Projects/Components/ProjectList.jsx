import {
  estimateColor,
  creativeDevelopmentColor,
  preProductionColor,
  productionColor,
  postProductionColor,
  completedColor,
} from '@/Components/Scripts/ProjectColors';
import { faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from '@inertiajs/react';



function ProjectList({ cardHeight, projects, className, cols = 4, rows = '', view, maxProjects = 16 }) {
  const containerClasses = `grid grid-cols-${cols} !grid-rows-${rows} gap-6 h-full w-full ${className}`;

  console.log();

  const sortProjects = (projects) => {
      // Define the desired status order
      const statusOrder = {
        "Production": 1,
        "Post-Production": 2,
        "Pre-Production": 3,
        "Creative Developement": 4,
        "Estimate": 5,
        "Completed": 6,
      };

      // Create an array to store call sheets with status order information
      const projectsWithOrder = projects.map((project) => ({
        ...project,
        statusOrder: statusOrder[project.project_stage],
      }));

      // Sort call sheets by status order (most recent first)
      projectsWithOrder.sort((a, b) => {
        // Sort by status order first
        if (a.statusOrder !== b.statusOrder) {
          return a.statusOrder - b.statusOrder;
        }
        // If status order is the same, sort by last updated time (most recent first)
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      return projectsWithOrder;
  };



  // Get the filtered and sorted call sheets based on the selected view
  const filteredProjects = view === "View All" ? projects : projects.filter(project => project.project_stage === view);
  const sortedProjects = sortProjects(filteredProjects);

  const limitedProjects = sortedProjects.slice(0, maxProjects);


  return (
    <div className={containerClasses}>
      
      {limitedProjects.map(project => {
        let projectColor = '';
        let textColor = '';
        if (project.project_stage === 'Estimate') {
          projectColor = estimateColor;
        } else if (project.project_stage === 'Creative Development') {
          projectColor = creativeDevelopmentColor;
        } else if (project.project_stage === 'Pre-Production') {
          projectColor = preProductionColor;
        } else if (project.project_stage === 'Production') {
          projectColor = productionColor;
        } else if (project.project_stage === 'Post-Production') {
          projectColor = postProductionColor;
        } else if (project.project_stage === 'Completed') {
          projectColor = completedColor;
        }  

        return (


          <div key={project.id} className="card">
		        <div className="poster"><img src="https://i.postimg.cc/jjBSrfnQ/poster1-img.jpg" alt="Location Unknown"/></div>
            <Link className='edit-icon' href={project.project_stage === 'Estimate' ? route('projects.estimate', { id: project.id }) : route('projects.edit', { id: project.id })}><FontAwesomeIcon className='text-white' icon={faPencil} /></Link>
            <div className="details">
              <div className='flex flex-row gap-2'>
                <span className='block font-normal mb-2 text-xs text-white bg-slate-600 px-4 py-1 rounded w-fit'>{project.project_status}</span>
                <span className='block font-normal mb-2 text-xs text-white bg-slate-600 px-4 py-1 rounded w-fit'>{project.category_type}</span>
              </div>

              <h1>{project.project_name}</h1>
              <h2 className='text-white'>2023 • PG • 1hr 38min</h2>
              <div className="rating">
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <span>4.2/5</span>
              </div>
              <div className="tags">
                <span className="tag text-xs">Italian</span>
                <span className="tag text-xs">Drama</span>
                <span className="tag text-xs">Indie</span>
              </div>
              <p className="desc bg-gray-500 text-black rounded-md text-center py-[2rem] px-4">
                No Project Description Added
              </p>
              <div className="cast">
                <h3 className='text-white'>Cast</h3>
                <ul>
                  <li><img src="https://i.postimg.cc/jqgkqhSb/cast-11.jpg" alt="Marco Andrews" title="Marco Andrews"/></li>
                  <li><img src="https://i.postimg.cc/8P7X7r7r/cast-12.jpg" alt="Rebecca Floyd" title="Rebecca Floyd"/></li>
                  <li><img src="https://i.postimg.cc/2SvHwRFk/cast-13.jpg" alt="Antonio Herrera" title="Antonio Herrera"/></li>
                </ul>
              </div>
            </div>
	        </div>

        );
      })}

    </div>

  );

 
  
}


export default ProjectList;
