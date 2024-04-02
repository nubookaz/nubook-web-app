import { useModal } from '@/Components/Contexts/ModalContext';
import { useProject } from '@/Components/Contexts/ProjectContext';
import { useDarkMode } from '@/Components/Contexts/DarkModeContext';

import { router } from '@inertiajs/react'; 
import { faBookmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 

function ProjectList({ 
  
  className, 
  view, 
  maxProjects = 16,
  showNewProject = true,
  bannerClassName,
  bannerTextColor
 
}) {
  const { darkModeSetting } = useDarkMode();

  const { projects, setCurrentProject } = useProject();

  const { toggleModal } = useModal();
  const handleNewProjectClick = () => {
    toggleModal({type: 'projectForm'});  
  };

  const handleNavigate = (projectId, project_stage) => {
    setCurrentProject(projectId);
  
    const url = project_stage === 'Estimate'
      ? route('projects.estimate', { id: projectId })
      : route('project.details', { id: projectId });
  
    router.visit(url);
  };

  const containerClasses = `grid grid-cols-7 grid-rows-3 gap-6 h-full ${className}`;

 
  const sortProjects = (projects) => {

      const statusOrder = {
        "Production": 1,
        "Post-Production": 2,
        "Pre-Production": 3,
        "Creative Developement": 4,
        "Estimate": 5,
        "Completed": 6,
      };

      const projectsWithOrder = projects.map((project) => ({
        ...project,
        statusOrder: statusOrder[project.project_stage],
      }));

      projectsWithOrder.sort((a, b) => {
        if (a.statusOrder !== b.statusOrder) {
          return a.statusOrder - b.statusOrder;
        }
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      return projectsWithOrder;
  };

  const filteredProjects = view === "View All" ? projects : projects.filter(project => project.project_stage === view);
  const sortedProjects = sortProjects(filteredProjects);
  const limitedProjects = sortedProjects.slice(0, maxProjects);
 

  return (
    <div className={containerClasses}>
      {showNewProject ? (
          <div onClick={handleNewProjectClick} className=' shadow-sm duration-500 bg-slate-50 cursor-pointer px-[4rem] text-center text-lg font-light text-slate-400 rounded-lg h-full w-full flex justify-center items-center m-auto hover:text-slate-500 hover:shadow-lg hover:bg-white'>
              Click here to start a new project!
          </div>
      ):null}

      {limitedProjects.map(project => {

          const {
              id,
              project_name,
              project_stage,
              project_status,
              project_description,
              category_type,
              media,
              is_favorite,
              project_details, // Database
              selectedCreativeType, // Async
              secondaryGenre, // Async
              viewerRating, // Async
          } = project;

          const details = project_details ? JSON.parse(project_details) : {};
          const primaryGenre = details.primaryGenre || secondaryGenre;  
          const genre = category_type || selectedCreativeType;  
          const rating = details.viewerRating || viewerRating; 

          const moviePosterPath = media?.length > 0 ? `/storage/${media[0].media_path}` : '/images/movie_posters/coming_soon_poster.jpg';

          return (
              <div key={id} className="card">
                  <div className="poster">
                      <img src={moviePosterPath} alt={`${project_name} Poster`} />
                  </div>
                  <div className={` ${bannerClassName} absolute top-0 w-full flex flex-col text-center shadow-lg bg-white py-2 uppercase`}>
                      {is_favorite ? (
                        <FontAwesomeIcon className='absolute top-0 left-[1.5rem] h-[4rem] w-[2rem] scale-y-[1.75] text-rose-500' icon={faBookmark} />
                      ) : null}             
                      <span className={` ${bannerTextColor || 'text-slate-400'} text-[.65rem]`}>{genre}</span>  
                      <span className={` ${bannerTextColor || 'text-slate-400'} text-xs font-bold`}>{project_stage}</span>
                  </div>
                  <div className='edit-icon mt-[3rem]' onClick={() => handleNavigate(id, project_stage)}>
                      <FontAwesomeIcon className=' text-white text-xs' icon={faPencil} />
                  </div>

                  <div className="details">
                      <div className='flex flex-row gap-2'>
                          <span className='block font-normal mb-2 text-[.70rem] text-white bg-slate-600 px-4 py-1 rounded w-fit'>{project_status}</span>
                      </div>

                      <a className='font-bold text-lg hover:text-emerald-500 duration-500' href={project_stage === 'Estimate' ? route('projects.estimate', { id }) : route('project.details', { id })}>{project_name}</a>
                      <h2 className='text-white text-sm'>2023 • {rating} • 1hr 38min</h2>

                      <div className="tags">
                          {primaryGenre && (<span className="tag text-xs">{primaryGenre}</span>)}
                          {secondaryGenre && (<span className="tag text-xs">{secondaryGenre}</span>)}
                      </div>

                      <div className='my-4'>
                          {project_description ? (
                            <p className='text-white text-sm py-2'>
                              {project_description.length > 100 ? `${project_description.slice(0, 200)}...` : project_description}
                            </p>
                          ) : (
                            <p className='text-center py-[2rem] text-xs px-4 bg-slate-500 rounded-md text-black'>
                              No Project Description Added
                            </p>
                          )}
                      </div>
                  </div>
              </div>
          );
        })}

    </div>

  );
  
}

export default ProjectList;