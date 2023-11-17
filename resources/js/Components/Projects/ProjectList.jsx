import ActiveCard from '@/Components/Containers/ActiveCard';
import {
  estimateColor,
  creativeDevelopmentColor,
  preProductionColor,
  productionColor,
  postProductionColor,
  completedColor,
} from '@/Components/Scripts/ProjectColors';




function ProjectList({ cardHeight, projects, className, cols = 4, rows = '', view, maxProjects = 16 }) {
  const containerClasses = `grid grid-cols-${cols} !grid-rows-${rows} gap-6 h-full grid-flow-row auto-rows-auto ${className}`;


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
          
          <ActiveCard
            indicator={true}
            cardHeight={cardHeight}
            status={project.project_stage}
            cardType="project"
            href={
              project.project_stage === 'Estimate'
                ? route('projects.estimate', { id: project.id })
                : route('projects.edit', { id: project.id })
            }
            key={project.id}
            cardTitle={project.project_name}
            projectType={project.project_type}
            progressValue={75}
            headerColor={projectColor}
          />

        );
      })}
    </div>
  );




  
}


export default ProjectList;
