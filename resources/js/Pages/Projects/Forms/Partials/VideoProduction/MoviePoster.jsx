import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';


export default function MoviePoster({

    data

}){

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const defaultImage = '/images/movie_posters/default_poster_1.jpg'; // URL to your default image

    useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
            }, 800);
        }
        return () => {
            clearInterval(timer);
        };
    }, [isLoading]);



    const { project_name, primary_genre, secondary_genre, movie_rating, project_description } = data;

    const [posterContent, setPosterContent] = useState({
        backgroundImage: defaultImage,
        // Other poster-related states
    });
    
    const generatePosterContent = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(route('chat.gpt.movie.poster'), {
                project_name,
                primary_genre,
                secondary_genre,
                movie_rating,
                project_description
            });

            const imageUrl = response.data.data[0].url;

            setPosterContent({ 
                ...posterContent, 
                backgroundImage: imageUrl
                // Add other properties or modifications as needed
            });

            setProgress(100);
        } catch (error) {
            console.error('Error generating poster content:', error);
            setPosterContent({ 
                ...posterContent, 
                backgroundImage: defaultImage
                // Set default values for other properties here
            });
        } finally {
            setIsLoading(false);
            setProgress(0);

        }
    };

    const handleGeneratePosterClick = async () => {
        if (project_name && primary_genre) {
            await generatePosterContent();
        } else {
            console.error('Missing required data for generating the poster');
        }
    };

    return (
        <div className='flex flex-col gap-2 h-full w-full rounded-md overflow-hidden'>
            <h4 className='text-gray-400 text-sm font-normal'>Project Image</h4>
            <p className='text-sm'>Click 'Generate Poster' to create an AI generated poster based on your project info or upload your own!</p>
            <div className='w-full h-[23.5rem] rounded-md' style={{
                backgroundImage: `url(${posterContent.backgroundImage})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}>
                {isLoading && (
                    <div className='rounded-md flex justify-center items-center h-full bg-slate-500/75 backdrop-blur-sm'>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                            <CircularProgress determinate value={progress} />
                        </Box>
                    </div>
                )}
            </div>
            <span className='text-xs italic text-center'>Note: AI generated images aren't always accurate so use at your own discretion!</span>

            <SecondaryButton onClick={handleGeneratePosterClick}>Generate Poster</SecondaryButton>
        </div>
    );

}