// StepOne.js
import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/joy/Tooltip';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';

import MovieRating from '@/Components/Projects/MovieRating';
import MoviePoster from './MoviePoster';

export default function VideoStepTwo({ onDataChange, emptyFields }) {

    const [videoProductionData, setVideoProductionData] = useState({
        project_name: '',
        primary_genre: '',
        secondary_genre: '',
        movie_rating: '',
        project_description: '',
     });
     const [text, setText] = React.useState('');
     const maxCharacters = 395;

     const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        if (newDescription.length <= maxCharacters) {
            setText(newDescription); // Update the text state for character count
            handleChange('project_description', newDescription); // Update the videoProductionData state
        }
    };


    // Update handleChange to handle changes in form fields
    const handleChange = (field, value) => {
        const updatedData = { ...videoProductionData, [field]: value };
        setVideoProductionData(updatedData);

        // Call the onDataChange prop to update the parent component's state
        onDataChange(updatedData);
    };

 
    return (
        <div className='flex flex-row gap-6 h-full'>
            <div className='max-w-[17.5rem] w-full h-full'>
                <MoviePoster data={videoProductionData}/>
            </div>

            <div className='flex flex-col gap-6 w-full mx-auto'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="project_name" className='text-gray-400 text-sm'> Project Name * </label>
                    <Tooltip arrow title="Project Name is Required" open={emptyFields['project_name'] || false} color="danger" placement="top" variant="outlined">
                        <input
                            type="text"
                            name="project_name"
                            placeholder="Indiana Jones and Raiders of the Lost Ark"
                            value={videoProductionData.project_name}
                            required
                            onChange={(e) => handleChange('project_name', e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </Tooltip>
                </div>
                
                 <div className='flex flex-row gap-2 w-full'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="primary_genre" value="primary_genre" className='text-gray-400 text-sm'> Primary Genre </label>
                        <Select
                            placeholder="Choose a Primary Genre"
                            value={videoProductionData.primary_genre || ''}
                            className="w-full"
                            name="primary_genre"
                            onChange={(e, newPrimaryGenre) => {
                                handleChange('primary_genre', newPrimaryGenre);
                            }}
                        >
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
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="secondary_genre" value="secondary_genre" className='text-gray-400 text-sm'> Secondary Genre </label>
                        <Select
                            placeholder="Comedy"
                            value={videoProductionData.secondary_genre || ''}
                            className="w-full !placeholder:text-sm"
                            name="secondary_genre"
                            onChange={(e, newSecondaryGenre) => {
                                handleChange('secondary_genre', newSecondaryGenre);
                            }}
                        >
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

                    </div>
                 </div>
                

                <div className='flex flex-col gap-2'>
                    <label htmlFor="movie_rating" className='text-gray-400 text-sm'>Movie Rating</label>
                    <MovieRating 
                        boxClassName='pl-2'
                        onRatingChange={(newRating) => handleChange('movie_rating', newRating)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="project_description" value="project_description" className='text-gray-400 text-sm'> Project Description </label>
                    <Textarea 
                        minRows={7} 
                        maxRows={7}
                        name="project_description"
                        placeholder="Epic tale in which an intrepid archaeologist tries to beat a band of Nazis to a unique religious relic..."
                        value={videoProductionData.project_description}
                        onChange={handleDescriptionChange}
                        maxLength={maxCharacters}

                        endDecorator={
                            <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                {text.length}/{maxCharacters} character(s)
                            </Typography>
                        }
                    />   
                </div>
            </div>
        </div>
        
    );
}

 