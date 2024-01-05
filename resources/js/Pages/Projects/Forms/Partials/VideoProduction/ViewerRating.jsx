import React, { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function ViewerRating({
    boxClassName,
    onRatingChange,
    name,
    data,
 }) {

     const [selected, setSelected] = useState(data.viewer_rating || '');

    const project_type = data.project_type;

    useEffect(() => {
        // Update only if viewer_rating changes
        if (data.viewer_rating !== selected) {
            setSelected(data.viewer_rating);
        }
    }, [data.viewer_rating, selected]);

    const handleRatingChange = (event) => {
        const newRating = event.target.value;
        setSelected(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    // Define movie and TV ratings
    const movieRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Not Rated'];
    const tvRatings = ['TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'];

    // Determine which set of ratings to use based on project type
    const ratings = project_type === 'TV Show' ? tvRatings : movieRatings;

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} className={boxClassName}>
            <RadioGroup
                name={name}
                aria-labelledby="viewer_rating"
                value={selected}
                onChange={handleRatingChange}
                orientation="horizontal"
                sx={{ flexWrap: 'wrap', gap: 1 }}
            >
                {ratings.map((rating, index) => (
                    <Chip
                        key={rating}
                        variant="plain"
                        color={selected === rating ? 'primary' : 'neutral'}
                        className={selected === rating ? '!bg-emerald-200' : ''}
                        startDecorator={selected === rating && <CheckIcon className='!text-emerald-500' sx={{ zIndex: 1, pointerEvents: 'none' }} />}
                    >
                        <Radio
                            id={`viewer_rating_${index}`}
                            value={rating}
                            disableIcon
                            overlay
                            label={rating}
                            sx={{ fontSize: '.75rem', color: 'rgba(0,0,0,.5)' }}
                        />
                    </Chip>
                ))}
            </RadioGroup>
        </Box>
    );
}
