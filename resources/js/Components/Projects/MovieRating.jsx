import React, { useState, useEffect } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
 
export default function MovieRating({

    boxClassName,
    onRatingChange

}){

    const [selected, setSelected] = React.useState('');

    const handleRatingChange = (rating) => {
        setSelected(rating);
        if (onRatingChange) {
            onRatingChange(rating); // Pass the new rating to the parent component
        }
    };

    return(

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} className={boxClassName}>
            <div>
                <RadioGroup
                name="movie-rating"
                aria-labelledby="movie-rating"
                orientation="horizontal"
                sx={{ flexWrap: 'wrap', gap: 1 }}
                >
                {['G', 'PG', 'PG-13', 'R', 'NC-17'].map((rating) => {
                    const checked = selected === rating;
                    return (
                        <Chip
                            key={rating}
                            variant="plain"
                            color={checked ? 'primary' : 'neutral'}
                            startDecorator={
                            checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                            }
                        >
                            <Radio
                                variant="outlined"
                                color={checked ? 'primary' : 'neutral'}
                                disableIcon
                                overlay
                                label={rating}
                                value={rating}
                                checked={checked}
                                onChange={() => handleRatingChange(rating)}
                                sx={{
                                    fontSize: '.75rem',
                                    color: 'rgba(0,0,0,.5)'
                                }}
                            />
                        </Chip>
                    );
                })}
                </RadioGroup>
            </div>
        </Box>

    );

}
