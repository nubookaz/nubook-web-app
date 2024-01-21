// StepOne.js
import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/joy/Tooltip';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';

import ViewerRating from '@/Pages/Projects/Forms/Partials/VideoProduction/ViewerRating';
import MoviePoster from './MoviePoster';

export default function VideoStepTwo({ 
    
    data, 
    projectData,
    onDataChange,
    emptyFields, 
    setEmptyFields,
    isCustomImage,
    setIsCustomImage,
    setUploadedImage,
    setImageIsAIGenerated,
    onPosterSizeChange

}) {

    const [localData, setLocalData] = useState({ ...data });
    const [primaryGenre, setPrimaryGenre] = useState('');


    const maxCharacters = 730;
    const [text, setText] = useState(localData.project_description.length.toString() || '0');

    useEffect(() => {
        // Update the local state when the data prop changes
        setLocalData({ ...data });

        // Set the character count for the description
        setText(data.project_description?.length.toString() || '0');
    }, [data]);

    const handleDescriptionChange = (e) => {
        const newText = e.target.value.slice(0, maxCharacters);
        setText(newText.length.toString()); // Update character count
        handleChange('project_description', newText); // Update local project data
    };
    function handlePaste(e) {
        // Delay the processing to get the pasted text after the default paste action is completed
        setTimeout(() => {
            const currentText = localData.project_description;
            let pastedText = e.target.value; // This now includes the newly pasted content
  
            // If the pasted content exceeds the max character limit, trim it
            if (pastedText.length > maxCharacters) {
                pastedText = pastedText.substring(0, maxCharacters);
            }
  
            // Replace new lines with spaces
            pastedText = pastedText.replace(/\r?\n|\r/g, ' ');
  
            // Update the local state
            setLocalData({
                ...localData,
                project_description: pastedText
            });
  
            // Update the remaining character count
            setText(pastedText.length.toString());
        }, 0);
    }

    const handleChange = (field, value) => {
        const updatedData = { ...localData, [field]: value };
        setLocalData(updatedData);
    
        // Call the onDataChange prop to update the parent component's state
        onDataChange(updatedData);
    };
    

    const handlePrimaryGenreChange = (newPrimaryGenre) => {
        setPrimaryGenre(newPrimaryGenre);
        handleChange('primary_genre', newPrimaryGenre);
    };


    console.log(emptyFields);

    

 
    return (
        <div className='flex flex-row gap-6 h-full'>
            <div className='w-full h-full'>
                <MoviePoster 
                    data={localData} 
                    projectData={projectData}
                    setEmptyFields={setEmptyFields}
                    onImageChange={(file) => handleChange('movie_poster', file)}
                    isCustomImage={isCustomImage}
                    setIsCustomImage={setIsCustomImage}     
                    setUploadedImage={setUploadedImage} 
                    setImageIsAIGenerated={setImageIsAIGenerated}       
                    onPosterSizeChange={onPosterSizeChange}                    
                />
            </div>

            <div className='flex flex-col gap-6 w-full mx-auto'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="project_name" className='text-gray-400 text-sm'> Project Name * </label>
                    <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Project Name is Required" open={emptyFields['project_name'] || false} color="danger" placement="top" variant="outlined">
                        <input
                            type="text"
                            name="project_name"
                            placeholder="Indiana Jones and Raiders of the Lost Ark"
                            value={localData.project_name}
                            required
                            onChange={(e) => handleChange('project_name', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </Tooltip>
                </div>
                
                 <div className='flex flex-row gap-2 w-full'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="primary_genre" value="primary_genre" className='text-gray-400 text-sm'> Primary Genre </label>
                        <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Primary Genre is Required" open={emptyFields['primary_genre'] || false} color="danger" placement="top" variant="outlined">
                            <Select
                                value={localData.primary_genre || ''}
                                className="w-full"
                                name="primary_genre"
                                onChange={(e, newPrimaryGenre) => {
                                    handlePrimaryGenreChange(newPrimaryGenre);
                                }}
                                
                                sx={{
                                    color: 'rgba(0,0,0,.8)',
                                    fontSize: '.75rem',
                                    SelectOptionsDropDown: {
                                         "& label": {  
                                           color: 'rgba(0,0,0,.4)',
                                        },
                                     },
 
                                }}
                            >
                                <Option value="" disabled default>Choose a Primary Genre</Option>
                                {['Drama', 'Comedy', 'Thriller', 'Romance', 'Action', 'Horror', 'Sci-Fi', 'Fantasy', 'Documentary', 'Adventure', 'Animation', 'Mystery', 'Musical', 'Historical', 'Biographical'].map(genre => (
                                    <Option key={genre} value={genre}>{genre}</Option>
                                ))}                            
                            </Select>

                        </Tooltip>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="secondary_genre" value="secondary_genre" className='text-gray-400 text-sm'> Secondary Genre </label>
                        <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Secondary Genre is Required" open={emptyFields['secondary_genre'] || false} color="danger" placement="top" variant="outlined">
                            <Select
                                value={localData.secondary_genre || ''}
                                className="w-full"
                                name="secondary_genre"
                                onChange={(e, newSecondaryGenre) => {
                                    handleChange('secondary_genre', newSecondaryGenre);
                                }}
                                sx={{
                                    color: 'rgba(0,0,0,.8)',
                                    fontSize: '.75rem',
                                 }}
                            >
                                <Option value="" disabled default>Choose a Secondary Genre</Option>
                                {['Drama', 'Comedy', 'Thriller', 'Romance', 'Action', 'Horror', 'Sci-Fi', 'Fantasy', 'Documentary', 'Adventure', 'Animation', 'Mystery', 'Musical', 'Historical', 'Biographical'].map(genre => (
                                    <Option key={genre} value={genre} disabled={genre === primaryGenre}>{genre}</Option>
                                ))}
                            </Select>
                        </Tooltip>
                    </div>
                 </div>
                

                <div className='flex flex-col gap-2'>
                    <label htmlFor="viewer_rating" className='text-gray-400 text-sm'>Movie Rating</label>
                    {/* <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Movie Rating is Required" open={emptyFields['viewer_rating'] || false} color="danger" placement="top" variant="outlined"> */}
                        <ViewerRating 
                            boxClassName='pl-2'
                            name="viewer_rating"
                            data={localData}
                            onRatingChange={(newRating) => handleChange('viewer_rating', newRating)}
                        />
                    {/* </Tooltip> */}
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="project_description" value="project_description" className='text-gray-400 text-sm'> Project Description </label>
                    <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Project Description is Required" open={emptyFields['project_description'] || false} color="danger" placement="top" variant="outlined">
                        <Textarea 
                            minRows={11.6} 
                            maxRows={11.6}
                              name="project_description"
                              placeholder="Epic tale in which an intrepid archaeologist..."
                              value={localData.project_description}
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
                    </Tooltip>
                </div>
            </div>
        </div>
        
    );
}

 