import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardContainer from '@/Components/Containers/CardContainer';
 import PortalLayout from '@/Layouts/Partials/PortalLayout';

 
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';
 
import MoviePoster from '@/Pages/Projects/Forms/Partials/VideoProduction/MoviePoster';
import ViewerRating from '@/Pages/Projects/Forms/Partials/VideoProduction/ViewerRating';

 
import Modal from '@/Components/Modals/Modal';
import Snackbar from '@mui/joy/Snackbar';

import Chip from '@mui/joy/Chip';

import ImageContainer from '@/Components/Containers/ImageContainer';
 


export default function ProjectDetailsPage({ 
  
  project,

}) {


  const { updateCurrentProject } = useAuth();

  const bannerProps = {
      showTopBar: false, 
      showRightContent: false,
      size: 'page-banner',
  };

  const hasData = project;
  // const toolbarTitle = project.project_name + ' : ' + 'Project Settings'; // Provide a title for the toolbar
  const toolbarCTAText = "Save Project Settings"; // Provide the button text





  const [projectData, setProjectData] = useState({
    id: '',
    project_type: '',
    video_type: '',
    project_name: '',
    project_description: '',
    primary_genre: '',
    secondary_genre: '',
    viewer_rating: '',
    movie_poster: '',

    project_stage: '',
    project_status: '',
    filming_days: '',
    project_budget: '',
});




  const [toolbarTitle, setToolbarTitle] = useState(
    project?.project_name ? `${project.project_name} : Project Settings` : 'Project Settings'
  );

  const [isCustomImage, setIsCustomImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [savedProjectSettings, setSavedProjectSettings] = useState(false);
  const [posterSize, setPosterSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [primaryGenre, setPrimaryGenre] = useState('');

  const handlePrimaryGenreChange = (newPrimaryGenre) => {
    setPrimaryGenre(newPrimaryGenre);
    handleChange('primary_genre', newPrimaryGenre);
};


  const maxCharacters = 730;
  const [text, setText] = useState(projectData.project_description?.length.toString() || '0');
  const [emptyFields, setEmptyFields] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
 

useEffect(() => {
  if (project) {
    setProjectData({
      id: project.id || '',
      project_type: project.project_type || '',
      video_type: project.video_type || '',
      project_name: project.project_name || '',
      project_description: project.project_description || '',
      primary_genre: project.video_production.primary_genre || '',
      secondary_genre: project.video_production.secondary_genre || '',
      viewer_rating: project.video_production.viewer_rating || '',
      movie_poster: project.video_production.movie_poster || '',
      project_stage: project.project_stage || '',
      project_status: project.project_status || '',
      filming_days: project.video_production.filming_days || '',
      project_budget: project.project_budget || '',
    });

    setIsLoading(false);
    setToolbarTitle(`${project.project_name} : Project Settings`);

  }
}, [project]);



  console.log(projectData);

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };



  useEffect(() => {
    // Check if there's an existing movie poster in the database
    const hasCustomImage = project.video_production.movie_poster ? true : false;
    setIsCustomImage(hasCustomImage);

    setText(projectData.project_description?.length.toString() || '0');

  }, [project]);


  const handlePosterSizeChange = (size) => {
    setPosterSize(size);
};

  const handleChange = (field, value) => {
    const updatedData = { ...projectData, [field]: value };
    setProjectData(updatedData);
  };

  const handleDescriptionChange = (e) => {
    const newText = e.target.value.slice(0, maxCharacters);
    setText(newText.length.toString()); // Update character count
    handleChange('project_description', newText); // Update local project data
  };

  function handlePaste(e) {
      // Delay the processing to get the pasted text after the default paste action is completed
      setTimeout(() => {
          const currentText = projectData.project_description;
          let pastedText = e.target.value; // This now includes the newly pasted content

          // If the pasted content exceeds the max character limit, trim it
          if (pastedText.length > maxCharacters) {
              pastedText = pastedText.substring(0, maxCharacters);
          }

          // Replace new lines with spaces
          pastedText = pastedText.replace(/\r?\n|\r/g, ' ');

          // Update the local state
          setProjectData({
              ...projectData,
              project_description: pastedText
          });

          // Update the remaining character count
          setText(pastedText.length.toString());
      }, 0);
  }
      
    const handleSaveChanges = async () => {
      // Create a new FormData instance
      let formData = new FormData();

      Object.keys(projectData).forEach(key => {
        if (key !== 'movie_poster') { // Exclude the movie_poster field
            formData.append(key, projectData[key]);
        }
      });

      // Append poster size
      formData.append('poster_width', posterSize.width);
      formData.append('poster_height', posterSize.height);

      // Append the image file only if it exists and has been changed
      if (uploadedImage) {
          formData.append('uploadedImage', uploadedImage);
      }

      try {
          // Make sure to include the appropriate headers for multipart/form-data
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };

          const response = await axios.post(route('projects.update', { id: project.id }), formData, config);
          console.log("Project data received from save:", response.data);

          setToolbarTitle(`${projectData.project_name} : Project Settings`);
          updateCurrentProject(response.data.project);

          // Update UI based on success
          setSavedProjectSettings(true);
          setTimeout(() => {
              setSavedProjectSettings(false);
          }, 3000);
      } catch (error) {
          console.error('Error updating project:', error);
          // Handle error, e.g., show error message
      }
    };




  const checkRequiredFields = () => {
    const fieldsToCheck = ['project_name', 'primary_genre', 'secondary_genre', 'viewer_rating', 'project_description']; // Add other required fields here
    const newEmptyFields = {};

    fieldsToCheck.forEach(field => {
        if (!projectData[field] || projectData[field].trim() === '') {
            newEmptyFields[field] = true;
        }
    });

    setEmptyFields(newEmptyFields); // Update the emptyFields state to show tooltips for empty required fields
  };

  const formatCurrency = (amount) => {
    return Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const handleDeleteProject = async () => {
      if (!project.id) {
          console.error('No project ID available for deletion');
          return;
      }

      try {
          // Assuming the route function generates the correct endpoint URL including the project ID
          const deleteUrl = route('projects.delete', { id: project.id });

          const response = await axios.delete(deleteUrl);
          
          console.log('Delete response:', response);

          // Handle the response, e.g., show a success message or redirect
          // Example: Redirect to another page after successful deletion
          window.location.href = '/projects';
      } catch (error) {
          console.error('Error deleting project:', error);
          // Handle error, e.g., show error message
      }
  };

 console.log(projectData);

  return (
    <AuthenticatedLayout  project={project} showBanner={true} bannerProps={bannerProps}>
      {{

        surface: (
        
          <div className="relative z-50 w-full h-full">
            
              <Snackbar
                  color="success"
                  size="lg"
                  variant="solid"
                  open={savedProjectSettings}
                  className="w-full max-w-[30rem]"
              >
                  Saved! Project Settings Saved!
              </Snackbar>

              <Modal
                  show={isModalOpen}
                  maxWidth='100%'
                  dialogPanelClass='!max-w-[30rem]'
                  onClose={setIsModalOpen}
                  showCloseButton='true'
              >

  
                  <div className="p-8 text-center h-full flex flex-col justify-center my-auto">
                        <h3 className="text-xl font-bold mb-4">Delete Project</h3>
                        <p className="mb-6">
                          Are you sure you want to delete this project? <br/> This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-4">

                            <button
                              onClick={() => setIsModalOpen(false)}
                              className="bg-slate-200 duration-500 hover:bg-slate-500 hover:text-white text-slate-500 py-2 px-4 rounded"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={handleDeleteProject}
                              className="bg-rose-200 duration-500 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete Project
                            </button>

                        </div>
                    </div>

              </Modal>

          </div>

        ),
 
        portalBody: (
          
          <div className='w-full h-full'>

              <PortalLayout
                hasData={hasData}
                toolbarTitle={toolbarTitle}
                toolbarCTAText={toolbarCTAText}
                onPrimaryToolbarButtonClick={handleSaveChanges}
                pageType="Call Sheets"
              >

                {{
                  content: (
 
                      <div className="w-full h-full flex flex-row gap-4">

                        <div className='flex flex-col gap-4 w-full h-full max-w-[18rem]'>
                            {/* <CardContainer  className='w-full h-full'> */}
                            {/* {isLoading ? (
                              <div>Loading...</div> // You can replace this with a spinner or any loading indicator
                            ) : (

                              <MoviePoster 
                                  data={projectData}
                                  setEmptyFields=''
                                  posterPackage=''
                                  disableRandomShuffler='true' 
                                  saveToDatabase = 'true'
                                  onImageChange={(file) => handleChange('movie_poster', file)}               
                              />

                            )} */}
                            {/* </CardContainer> */}



                            {/* <CardContainer header='Viewer Rating' className='w-full flex justify-center'>
                                  <div className='py-2 font-bold text-slate-500 bg-slate-100 rounded-md h-full flex justify-center items-center'>{projectData.viewer_rating}</div>
                            </CardContainer> */}


    
                              {/* <div className='flex flex-col gap-4 w-full'>
                                <div className='flex flex-col gap-2 w-full'>
                                  <h4 className='text-sm'>Project Stage</h4>
                                  <Select
                                    placeholder="Project Stage"
                                    name="project_stage"
                                    className='shrink max-h-[3rem] !bg-white !text-xs'
                                    value={projectData.project_stage || ''} 
                                    required
                                    onChange={(e, newProjectStage) => {
                                        handleChange('project_stage', newProjectStage);
                                    }}
                                >
                                    <Option value="Estimate" disabled>Estimate -- Coming Soon!</Option>
                                    <Option value="Creative Development">Creative Development</Option>
                                    <Option value="Pre-Production">Pre-Production</Option>
                                    <Option value="Production">Production</Option>
                                    <Option value="Post-Production">Post-Production</Option>
                                    <Option value="Distribution">Distribution</Option>
                                    <Option value="Completed">Completed</Option>
                                </Select>
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                  <h4 className='text-sm'>Project Status</h4>
                                  <Select
                                    placeholder="Project Status"
                                    name="project_status"
                                    className='shrink max-h-[3rem] !bg-white !text-xs'
                                    value={projectData.project_status || ''} 
                                    required
                                    onChange={(e, newProjectStatus) => {
                                        handleChange('project_status', newProjectStatus);
                                    }}
                                >
                                    <Option value="Not Started">Not Started</Option>
                                    <Option value="In Progress">In Progress</Option>
                                    <Option value="On Hold">On Hold</Option>
                                    <Option value="Completed">Completed</Option>
                                    <Option value="Cancelled">Cancelled</Option>
                                    <Option value="Delayed">Delayed</Option>
                                    <Option value="Under Review">Under Review</Option>
                                    <Option value="Awaiting Approval">Awaiting Approval</Option>
                                    <Option value="Testing">Testing</Option>
                                    <Option value="Deployed">Deployed</Option>
                                </Select>
                                </div>
                              </div> */}



                              {/* <div className='flex flex-row gap-6'>
                                  <button onClick={openDeleteModal} className='w-full duration-500 bg-rose-200 hover:bg-rose-400 !text-white h-full py-2 rounded-md'>Delete Project</button>
                              </div> */}
                        </div>
                        <div className='flex flex-col gap-4 w-[185rem]'>
                            <div className='flex flex-row gap-4'>
                              <CardContainer header='Project Title' showButtonIcon={true}>
                                <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Project Name is Required" open={emptyFields['project_name'] || false} color="danger" placement="top" variant="outlined">
                                    <input
                                        type="text"
                                        name="project_name"
                                        placeholder="Indiana Jones and Raiders of the Lost Ark"
                                        value={projectData.project_name}
                                        required
                                        onChange={(e) => handleChange('project_name', e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md font-bold !text-lg"
                                    />
                                </Tooltip>
                              </CardContainer>
                            </div>

                          <CardContainer header='Project Description' className=''>
                              <Textarea 
                                  minRows={7} 
                                  maxRows={7}
                                  name="project_description"
                                  placeholder="Epic tale in which an intrepid archaeologist..."
                                  value={projectData.project_description || ''}
                                  onChange={handleDescriptionChange}
                                  maxLength={maxCharacters}
                                  className='!text-slate-500 !bg-slate-100'
                                  onPaste={handlePaste}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                  }}
                                  endDecorator={
                                      <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                          {text}/{maxCharacters} Characters Remaining
                                      </Typography>
                                  }
                                  sx={{
                                    fontSize: '.90rem',
                                  }}
                                  
                              />   
                          </CardContainer>
                        
                        
                          <CardContainer header='Tasks' className='h-full'></CardContainer>
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <CardContainer header='Budget'>
                                <div className='my-8'>
                                    <h2 className='text-center !text-sm'>Total Budget</h2>
                                    <p className='text-center font-bold text-4xl text-emerald-500'>
                                        ${formatCurrency(projectData.project_budget)}
                                    </p>
                                </div>
                              
                                <div className='flex flex-row gap-4 justify-between w-full text-center bg-slate-50 py-8'>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <span className='text-sm text-slate-400'>Total Expenses</span>
                                        <p className='text-2xl font-bold text-slate-600'>$500000</p>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <span className='text-sm text-slate-400'>Remaining Budget</span>
                                        <p className='text-2xl font-bold text-rose-400'>-$500000</p>
                                    </div>
                                  
                                </div>
                            </CardContainer>
                            <CardContainer header='Activity' className='h-full'>
                              
                            </CardContainer>
                        </div>
                      
                      </div>
    
                  )  
                }}
                
              </PortalLayout>

          </div>

        ),
      }}
    </AuthenticatedLayout>
  );
}

