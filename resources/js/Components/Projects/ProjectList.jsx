import ActiveCard from '@/Components/Containers/ActiveCard';
import {
  estimateColor,
  creativeDevelopmentColor,
  preProductionColor,
  productionColor,
  postProductionColor,
  completedColor,
} from '@/Components/Scripts/ProjectColors';




function ProjectList({ projects, className, cols = 4, view }) {
  const containerClasses = `grid grid-cols-${cols} gap-6 h-full ${className}`;


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
        statusOrder: statusOrder[project.projectStage],
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
  const filteredProjects = view === "View All" ? projects : projects.filter(project => project.projectStage === view);
  const sortedProjects = sortProjects(filteredProjects);


  return (
    <div className={containerClasses}>
      
      {sortedProjects.map(project => {
        let projectColor = '';
        let textColor = '';
        if (project.projectStage === 'Estimate') {
          projectColor = estimateColor;
        } else if (project.projectStage === 'Creative Development') {
          projectColor = creativeDevelopmentColor;
        } else if (project.projectStage === 'Pre-Production') {
          projectColor = preProductionColor;
        } else if (project.projectStage === 'Production') {
          projectColor = productionColor;
        } else if (project.projectStage === 'Post-Production') {
          projectColor = postProductionColor;
        } else if (project.projectStage === 'Completed') {
          projectColor = completedColor;
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
            headerColor={projectColor}
          />

        );
      })}
    </div>
  );




  
}


export default ProjectList;
