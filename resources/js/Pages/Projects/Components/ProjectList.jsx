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


function ProjectList({ cardHeight, projects, className, cols = '', rows = '', view, maxProjects = 16 }) {

  const containerClasses = `flex flex-row gap-4 h-full w-full ${className}`;

 
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

      const {project_name, project_stage, project_status, project_description, video_type, project_type, project_budget} = project
      const {filming_days, movie_poster, primary_genre, secondary_genre, viewer_rating} = project.video_production


        let projectColor = '';
        let textColor = '';
        if (project_stage === 'Estimate') {
          projectColor = estimateColor;
        } else if (project_stage === 'Creative Development') {
          projectColor = creativeDevelopmentColor;
        } else if (project_stage === 'Pre-Production') {
          projectColor = preProductionColor;
        } else if (project_stage === 'Production') {
          projectColor = productionColor;
        } else if (project_stage === 'Post-Production') {
          projectColor = postProductionColor;
        } else if (project_stage === 'Completed') {
          projectColor = completedColor;
        }  

        return (


          <div key={project.id} className="card w-full">
            
		        <div className="poster">
                <img src={movie_poster?.url || '/images/movie_posters/coming_soon_poster.jpg'} alt="Location Unknown"/>
            </div>
            <div className='overlay'></div>
            <div className='absolute top-0 w-full text-center text-xs bg-slate-700 bg-opacity-90 py-2 font-bold uppercase'>
                  {video_type} {project_stage ? ( ' : ' + project_stage) : null} 
            </div>
            <Link className='edit-icon mt-8' 
              href={project_stage === 'Estimate' ? route('projects.estimate', { id: project.id }) : route('projects.edit', { id: project.id })}
            >
                <FontAwesomeIcon className='text-white' icon={faPencil} />
            </Link>

            <div className="details">
                <div className='flex flex-row gap-2'>
                    <span className='block font-normal mb-2 text-xs text-white bg-slate-600 px-4 py-1 rounded w-fit'>{project_status}</span>
                    <span className='block font-normal mb-2 text-xs text-white bg-slate-600 px-4 py-1 rounded w-fit'>{project_type}</span>
                </div>

                <a className='font-bold text-2xl' href={project_stage === 'Estimate' ? route('projects.estimate', { id: project.id }) : route('projects.edit', { id: project.id })}>{project_name}</a>
                <h2 className='text-white'>2023 • {viewer_rating ? ( viewer_rating + ' •' ):null} 1hr 38min</h2>

                <div className="tags">
                  {primary_genre ? (<span className="tag text-xs">{primary_genre}</span>):null}
                  {secondary_genre ? (<span className="tag text-xs">{secondary_genre}</span>):null}
                </div>

                <div className='my-4'>
                  {project_description ? (
                    <p className='text-white py-2'>
                      {project_description.length > 100 ? (
                        `${project_description.slice(0, 250)}...` // Display the first 100 characters and add ellipsis
                      ) : (
                        project_description
                      )}
                    </p>
                  ) : (
                    <p className='text-center py-[2rem] px-4 bg-slate-500 rounded-md  text-black'>
                      No Project Description Added
                    </p>
                  )}
                </div>

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
