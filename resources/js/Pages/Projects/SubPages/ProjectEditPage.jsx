import React, { useState, useEffect } from 'react';
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



export default function ProjectEditPage({ 
  
  project 

}) {

  const bannerProps = {
      showTopBar: false, 
      showRightContent: false,
      size: 'page-banner',
  };

  const hasData = project;
  const toolbarTitle = project.project_name + ' : ' + 'Project Settings'; // Provide a title for the toolbar
  const toolbarCTAText = "Save Project Settings"; // Provide the button text



  const {project_name, project_stage, project_status, project_description, video_type, project_type, project_budget} = project
  const {filming_days, movie_poster, primary_genre, secondary_genre, viewer_rating} = project.video_production

  const [localProjectData, setLocalProjectData] = useState({ ...project });

  const [isCustomImage, setIsCustomImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isImageAIGenerated, setImageIsAIGenerated] = useState(false);
  const [savedProjectSettings, setSavedProjectSettings] = useState(false);

  const maxCharacters = 730;
  const [text, setText] = useState(project_description?.length.toString() || '0');
  const [emptyFields, setEmptyFields] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };



  useEffect(() => {
    // Check if there's an existing movie poster in the database
    const hasCustomImage = project.video_production.movie_poster ? true : false;
    setIsCustomImage(hasCustomImage);

    setText(project_description?.length.toString() || '0');

  }, [project]);


 
  const handleChange = (field, value) => {
    const updatedData = { ...localProjectData, [field]: value };
    setLocalProjectData(updatedData);
  };

  const handleDescriptionChange = (e) => {
    const newText = e.target.value.slice(0, maxCharacters);
    setText(newText.length.toString()); // Update character count
    handleChange('project_description', newText); // Update local project data
  };

  function handlePaste(e) {
    // Delay the processing to get the pasted text after the default paste action is completed
    setTimeout(() => {
        const currentText = localProjectData.project_description;
        let pastedText = e.target.value; // This now includes the newly pasted content

        // If the pasted content exceeds the max character limit, trim it
        if (pastedText.length > maxCharacters) {
            pastedText = pastedText.substring(0, maxCharacters);
        }

        // Replace new lines with spaces
        pastedText = pastedText.replace(/\r?\n|\r/g, ' ');

        // Update the local state
        setLocalProjectData({
            ...localProjectData,
            project_description: pastedText
        });

        // Update the remaining character count
        setText(pastedText.length.toString());
    }, 0);
}
 
  const handleSaveChanges = async () => {
    // Implement the API call to save the updated data
    try {
      // Example API call
      // await axios.post('/update-project', localProjectData);

      console.log('Project Updated:', localProjectData);
    } catch (error) {
      console.error('Error updating project:', error);
    }

    setSavedProjectSettings(true);
    setTimeout(() => {
      setSavedProjectSettings(false);

    }, 3000);
  };


  const checkRequiredFields = () => {
    const fieldsToCheck = ['project_name', 'primary_genre', 'secondary_genre', 'viewer_rating', 'project_description']; // Add other required fields here
    const newEmptyFields = {};

    fieldsToCheck.forEach(field => {
        if (!localData[field] || localData[field].trim() === '') {
            newEmptyFields[field] = true;
        }
    });

    setEmptyFields(newEmptyFields); // Update the emptyFields state to show tooltips for empty required fields
  };

  const formatCurrency = (amount) => {
    return Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const handleDeleteProject = () => {
    alert('delete');
  };

 

  return (
    <AuthenticatedLayout  project={project} bannerProps={bannerProps}>
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
                      <div className='flex flex-col gap-4 w-full max-w-[20rem]'>
                        <CardContainer  className='w-full h-full'>
                          <MoviePoster 
                              data={localProjectData.video_production}
                              isUpload='true'
                              onGeneratePoster={checkRequiredFields} 
                              onImageChange={(file) => handleChange('movie_poster', file)}
                              isCustomImage={isCustomImage}
                              setIsCustomImage={setIsCustomImage}     
                              setUploadedImage={setUploadedImage} 
                              setImageIsAIGenerated={setImageIsAIGenerated}                           
                          />
                        </CardContainer>

                        <div className='flex flex-col gap-4 h-full'>
                          <Select
                              placeholder="Project Stage"
                              name="project_stage"
                              className='shrink max-h-[3rem] !bg-white'
                              value={localProjectData.project_stage || ''} 
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
                          <Select
                              placeholder="Project Status"
                              name="project_status"
                              className='shrink max-h-[3rem] !bg-white'
                              value={localProjectData.project_status || ''} 
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
                          <CardContainer header='Movie Rating' className='h-full grow'>
                              <ViewerRating 
                                  boxClassName='justify-center flex h-full w-full'
                                  name="viewer_rating"
                                  data={localProjectData}
                                  onRatingChange={(newRating) => handleChange('viewer_rating', newRating)}
                              />
                          </CardContainer>
                          <div className='flex flex-row gap-6'>
                              <button onClick={openDeleteModal} className='w-full duration-500 bg-rose-200 hover:bg-rose-400 !text-white h-full py-2 rounded-md'>Delete Project</button>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-4'>
                        <div className='flex flex-row gap-6'>
                          <CardContainer header='Project Title'>
                            <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Project Name is Required" open={emptyFields['project_name'] || false} color="danger" placement="top" variant="outlined">
                                <input
                                    type="text"
                                    name="project_name"
                                    placeholder="Indiana Jones and Raiders of the Lost Ark"
                                    value={localProjectData.project_name}
                                    required
                                    onChange={(e) => handleChange('project_name', e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md font-bold !text-xl"
                                />
                            </Tooltip>
                          </CardContainer>

                        </div>
                        
                        <CardContainer header='Project Description' className=' !w-[50rem] h-[17rem]'>
                          <Textarea 
                              minRows={8} 
                              maxRows={8}
                              name="project_description"
                              placeholder="Epic tale in which an intrepid archaeologist..."
                              value={localProjectData.project_description}
                              onChange={handleDescriptionChange}
                              maxLength={maxCharacters}
                              className='!text-slate-500'
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
                            <p className='text-center font-bold text-5xl text-emerald-500'>
                                ${formatCurrency(project_budget)}
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

