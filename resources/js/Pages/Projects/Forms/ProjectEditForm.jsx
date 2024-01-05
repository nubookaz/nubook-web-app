import React, { useState, useEffect } from 'react';
import ImageContainer from '@/Components/Containers/ImageContainer';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';

import MovieRating from '@/Pages/Projects/Forms/Partials/VideoProduction/ViewerRating';

export default function ProjectEditForm({

    data

}){

    const [emptyFields, setEmptyFields] = useState({});
      
    const maxCharacters = 730;
    const [text, setText] = useState(data.project_description.length.toString() || '0');
  
    const handleDescriptionChange = (e) => {
      const newText = e.target.value.slice(0, maxCharacters);
      setText(newText.length.toString()); // Convert to string for display
      handleChange('project_description', newText);
    };
  
    const handleChange = (field, value) => {
      const updatedData = { ...project, [field]: value };
      setData(updatedData);
    };

    


    return(

        <div className='h-full flex flex-col gap-8'>
                            
            <div className='text-center'>
                <h2>Movie Poster</h2>
                <p>Edit or upload an AI-generated image, or drag and drop an image here to replace it.</p>
            </div>
            
            <div className='flex flex-row gap-8 h-full w-full'>

                <div className='flex flex-col gap-4 h-full w-full max-w-[36%]'>
                    <ImageContainer backgroundImage={data.video_production.movie_poster} className='cursor-pointer h-full '>
                    
                    </ImageContainer>
                    <div className='flex flex-row gap-2 justify-center'>
                        <SecondaryButton className='text-xs' >Generate AI Poster</SecondaryButton>
                        <SecondaryButton className='!bg-slate-200 !text-slate-400 text-xs'  >Upload an Image</SecondaryButton>
                    </div>
                </div>

                <div className='flex flex-col gap-2 h-full w-full'>
                    <div className='flex flex-col gap-2'>
                            <label htmlFor="project_name" className='text-gray-400 text-sm'> Project Name * </label>
                            <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Project Name is Required" open={emptyFields['project_name'] || false} color="danger" placement="top" variant="outlined">
                                <input
                                    type="text"
                                    name="project_name"
                                    placeholder="Indiana Jones and Raiders of the Lost Ark"
                                    value={data.project_name}
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
                                    value={data.primary_genre || ''}
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
                                    value={data.secondary_genre || ''}
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
                            <MovieRating 
                                boxClassName='pl-2'
                                name="viewer_rating"
                                data={data}
                                onRatingChange={(newRating) => handleChange('viewer_rating', newRating)}
                            />
                        {/* </Tooltip> */}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="project_description" value="project_description" className='text-gray-400 text-sm'> Project Description </label>
                        <Tooltip arrow sx={{ fontSize: '.75rem' }} title="Project Description is Required" open={emptyFields['project_description'] || false} color="danger" placement="top" variant="outlined">
                            <Textarea 
                                minRows={11} 
                                maxRows={11}
                                name="project_description"
                                placeholder="Epic tale in which an intrepid archaeologist..."
                                value={data.project_description}
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
                    {/* <div className='flex flex-col gap-2'>
                        <label htmlFor="additional_keywords" value="additional_keywords" className='text-gray-400 text-sm'> Additional Keywords </label>
                            <Textarea 
                                minRows={11} 
                                maxRows={11}
                                name="additional_keywords"
                                placeholder=""
                                // value={additional_keywords}
                                onChange={handleDescriptionChange}
                                maxLength={maxCharacters}
                                endDecorator={
                                    <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                        {text}/{maxCharacters} Characters Remaining
                                    </Typography>
                                }
                                
                            />   
                        </div> */}
                </div>

            </div>
        </div>

    );

}