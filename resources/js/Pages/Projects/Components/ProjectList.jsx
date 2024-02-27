import { useModal } from '@/Components/Contexts/ModalContext';
import { useProject } from '@/Components/Contexts/ProjectContext';
import { router } from '@inertiajs/react'; 

import {
  estimateColor,
  creativeDevelopmentColor,
  preProductionColor,
  productionColor,
  postProductionColor,
  completedColor,
} from '@/Components/Scripts/ProjectColors';
import { faBookmark, faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 

function ProjectList({ 
  
  className, 
  view, 
  maxProjects = 16,
  showNewProject = true,
  bannerClassName,
  bannerTextColor
 
}) {

  const { projects, setCurrentProject } = useProject();
  const handleSelectProject = (projectId) => {
    setCurrentProject(projectId);
  };

  const { toggleModal } = useModal();
  const handleNewProjectClick = () => {
    toggleModal({type: 'projectForm'});  
  };


  const handleNavigate = (projectId, projectStage) => {
    setCurrentProject(projectId);
  
    const url = projectStage === 'Estimate'
      ? route('projects.estimate', { id: projectId })
      : route('projects.details', { id: projectId });
  
    router.visit(url);
  };

  const containerClasses = `grid grid-cols-6 grid-rows-2 gap-4 h-full ${className}`;

 
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

            const {project_name, project_stage, project_status, project_description, video_type, project_type, project_budget, is_favorite} = project
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

                  <div key={project.id} className="card">
                        
                        <div className="poster">
                            <img src={movie_poster?.url || '/images/movie_posters/coming_soon_poster.jpg'} alt="Location Unknown"/>
                        </div>
                        <div className='overlay'></div>
                        <div className={` ${bannerClassName} absolute top-0 w-full flex flex-col text-center shadow-lg bg-white py-2 uppercase`}>
                              {is_favorite ? (
                                  <FontAwesomeIcon className='absolute top-0 left-[1.5rem] h-[4rem] w-[2rem] scale-y-[1.75] text-rose-500' icon={faBookmark} />
                              ) : null}                            
                              <span className={` ${bannerTextColor || 'text-slate-400'} text-[.65rem]`}>{video_type}</span>  
                              <span className={` ${bannerTextColor || 'text-slate-400'} text-xs font-bold`}>{project_stage ? (project_stage) : null}</span>
                        </div>
                        <div className='edit-icon mt-[3rem]' 
                            onClick={() => handleNavigate(project.id, project.project_stage)}>
                            <FontAwesomeIcon className=' text-white text-xs' icon={faPencil} />
                        </div>

                        <div className="details">
                              <div className='flex flex-row gap-2'>
                                  <span className='block font-normal mb-2 text-[.70rem] text-white bg-slate-600 px-4 py-1 rounded w-fit'>{project_status}</span>
                                  <span className='block font-normal mb-2 text-xs text-white bg-slate-600 px-4 py-1 rounded w-fit'>{project_type}</span>
                              </div>

                              <a className='font-bold text-lg hover:text-emerald-500 duration-500' href={project_stage === 'Estimate' ? route('projects.estimate', { id: project.id }) : route('projects.details', { id: project.id })}>{project_name}</a>
                              <h2 className='text-white text-sm'>2023 • {viewer_rating ? ( viewer_rating + ' •' ):null} 1hr 38min</h2>

                              <div className="tags">
                                  {primary_genre ? (<span className="tag text-xs">{primary_genre}</span>):null}
                                  {secondary_genre ? (<span className="tag text-xs">{secondary_genre}</span>):null}
                              </div>

                              <div className='my-4'>
                                  {project_description ? (
                                    <p className='text-white text-sm py-2'>
                                      {project_description.length > 100 ? (
                                        `${project_description.slice(0, 200)}...`  
                                      ) : (
                                        project_description
                                      )}
                                    </p>
                                  ) : (
                                    <p className='text-center py-[2rem] text-xs px-4 bg-slate-500 rounded-md  text-black'>
                                      No Project Description Added
                                    </p>
                                  )}
                              </div>
                           
                        </div>
                  </div>         

              );
            })}
          {showNewProject ? (
              <div onClick={handleNewProjectClick} className='border-4 border-dashed border-slate-300 duration-500 bg-slate-200 cursor-pointer px-[4rem] text-center text-xl text-slate-300 rounded-lg h-full w-full flex justify-center items-center m-auto hover:bg-slate-300 hover:text-slate-400'>
                  Click here to start a new project!
              </div>
          ):null}

    </div>

  );

 
  
}


export default ProjectList;
