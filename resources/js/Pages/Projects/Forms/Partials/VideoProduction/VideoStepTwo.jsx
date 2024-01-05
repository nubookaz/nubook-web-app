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
        setText(newText.length.toString()); // Convert to string for display
        handleChange('project_description', newText);
    };

    const handleChange = (field, value) => {
        const updatedData = { ...localData, [field]: value };
        setLocalData(updatedData);
    
        // Call the onDataChange prop to update the parent component's state
        onDataChange(updatedData);
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
    

 
    return (
        <div className='flex flex-row gap-6 h-full'>
            <div className='w-full h-full'>
                <MoviePoster 
                    data={localData} 
                    onGeneratePoster={checkRequiredFields} 
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
                                    handleChange('primary_genre', newPrimaryGenre);
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
                                <Option value="Drama">Drama</Option>
                                <Option value="Comedy">Comedy</Option>
                                <Option value="Thriller">Thriller</Option>
                                <Option value="Romance">Romance</Option>
                                <Option value="Action">Action</Option>
                                <Option value="Horror">Horror</Option>
                                <Option value="Sci-Fi">Sci-Fi</Option>
                                <Option value="Fantasy">Fantasy</Option>
                                <Option value="Documentary">Documentary</Option>
                                <Option value="Adventure">Adventure</Option>
                                <Option value="Animation">Animation</Option>
                                <Option value="Mystery">Mystery</Option>
                                <Option value="Musical">Musical</Option>
                                <Option value="Historical">Historical</Option>
                                <Option value="Biographical">Biographical</Option>
                                {/* Add more genres as needed */}
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
                                <Option value="Drama">Drama</Option>
                                <Option value="Comedy">Comedy</Option>
                                <Option value="Thriller">Thriller</Option>
                                <Option value="Romance">Romance</Option>
                                <Option value="Action">Action</Option>
                                <Option value="Horror">Horror</Option>
                                <Option value="Sci-Fi">Sci-Fi</Option>
                                <Option value="Fantasy">Fantasy</Option>
                                <Option value="Documentary">Documentary</Option>
                                <Option value="Adventure">Adventure</Option>
                                <Option value="Animation">Animation</Option>
                                <Option value="Mystery">Mystery</Option>
                                <Option value="Musical">Musical</Option>
                                <Option value="Historical">Historical</Option>
                                <Option value="Biographical">Biographical</Option>
                                {/* Add more genres as needed */}
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
                            endDecorator={
                                <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                    {text}/{maxCharacters} Characters Remaining
                                </Typography>
                            }
                            
                        />   
                    </Tooltip>
                </div>
            </div>
        </div>
        
    );
}

 