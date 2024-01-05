import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faPencil  } from '@fortawesome/free-solid-svg-icons'; 

import Modal from '@/Components/Modals/Modal';
import ProjectImagePreview from '@/Pages/Projects/Components/ProjectImagePreview';

export default function MoviePoster({

    data,
    isUpload = 'false',
    header = 'true',
    onGeneratePoster,
    onImageChange,
    isCustomImage,
    setIsCustomImage,
    setUploadedImage,
    setImageIsAIGenerated,
    onPosterSizeChange

}){

    const { movie_poster, project_name, primary_genre, secondary_genre, movie_rating, project_description } = data;


    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [aiContentInfo, setAiContentInfo] = useState({ currentCount: 0, limit: 0 });
     const [image, setImage] = useState(movie_poster?.url || '/images/movie_posters/movie_poster_1.jpg');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
 

    const openPosterPreviewModal = () => {
        setIsModalOpen(true);
      };
    

    const [posterContent, setPosterContent] = useState({
        backgroundImage: image,
        // Other poster-related states
    });
 
 
 
    useEffect(() => {
        // Skip this effect if a custom image is set
        if (isCustomImage) return;
    
        // Function to shuffle an array
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
    
        // Initialize and shuffle the poster numbers
        let posterNumbers = shuffleArray(Array.from({ length: 10 }, (_, i) => i + 1));
        let currentIndex = 0;
    
        const updateImageWithRandomPoster = () => {
            setImage(`/images/movie_posters/movie_poster_${posterNumbers[currentIndex]}.jpg`);
            currentIndex++;
    
            // Reshuffle and reset the index if we've used all numbers
            if (currentIndex >= posterNumbers.length) {
                posterNumbers = shuffleArray(posterNumbers);
                currentIndex = 0;
            }
        };
    
        const interval = setInterval(updateImageWithRandomPoster, 10000); // Update every 10 seconds
        return () => clearInterval(interval);
    
    }, [isCustomImage]); // Add isCustomImage to the dependency array
    
    
    

    useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
            }, 800);
        }
        return () => clearInterval(timer);
    }, [isLoading]);


    const updateImage = (newImageUrl) => {
        setImage(newImageUrl); // Update local state
        onImageChange(newImageUrl); // Pass the new image URL up to the parent component
    };



    const handleImageUpload = (event) => {
        if (isUpload) { // Check if upload is allowed
            const file = event.target.files[0];
            if (file) {
                const fileUrl = URL.createObjectURL(file);

                const img = new Image();
                img.onload = () => {
                    const size = { width: img.width, height: img.height };
                    onPosterSizeChange(size); // Call the callback with the image size
                };
                img.src = fileUrl;

                setImage(fileUrl);
                setUploadedImage(file);
                onImageChange(fileUrl);
                setIsCustomImage(true);
            }
        }
    };

    

      const handleDragOver = (event) => {
        event.preventDefault();
        // Add styles or effects when dragging over the target
      };
    
      const handleDrop = (event) => {
        event.preventDefault();
        handleImageUpload(event);
      };
    
      const handleImageClick = () => {
        document.getElementById('imageUpload').click();
      };
 

      const generatePosterContent = async () => {
        // if (!isUpload) return;

    
        if (aiContentInfo.currentCount >= aiContentInfo.limit) {
            alert('Daily limit for AI generated content reached.');
            return;
        }
    
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
    
            // Fetch the image from your server-side proxy
            const imageResponse = await axios.get(`/fetch-image?url=${encodeURIComponent(imageUrl)}`, {
                responseType: 'blob', // Handle binary data
            });

            const imageBlob = new Blob([imageResponse.data], { type: 'image/png' });
            const imageObjectUrl = URL.createObjectURL(imageBlob);
       
            const img = new Image();
            img.onload = () => {
                const size = { width: img.width, height: img.height };
                onPosterSizeChange(size); // Call the callback with the image size
            };
            img.src = fileUrl;

            setImage(imageObjectUrl); // Update image state with generated image URL
            setUploadedImage(imageBlob); // Update uploaded image state
            onImageChange(imageObjectUrl); // Notify parent component about the new image
            setIsCustomImage(true);
 
            setPosterContent({ 
                ...posterContent, 
                backgroundImage: imageObjectUrl 
            });
 
            setProgress(100);
            setImageIsAIGenerated(true);

            await fetchAiContentInfo();

        } catch (error) {
            console.error('Error generating poster content:', error);
            let message = 'Failed to generate poster. Please try again later.';
            if (error.response) {
                // Check for specific status codes
                switch (error.response.status) {
                    case 400:
                        message = 'Bad request. Please check the input data.';
                        break;
                    case 500:
                        message = 'Server error. Please try again later.';
                        break;
                    // Add more cases as needed
                    default:
                        message = 'An unexpected error occurred.';
                }
            }
            setErrorMessage(message);

            setPosterContent({ 
                ...posterContent, 
                backgroundImage: image 
            });
        } finally {
            setIsLoading(false);
            setProgress(0);
        }
        setIsCustomImage(true);
    };
    
    const fetchAiContentInfo = async () => {
        try {
            const response = await axios.get(route('ai-content.info')); // Adjust URL as needed
            setAiContentInfo(response.data);

            console.log(response);
        } catch (error) {
            console.error('Error fetching AI content info:', error);
        }
    };
    
    useEffect(() => {
        fetchAiContentInfo();
    }, []);


    const ErrorModal = ({ message, onClose }) => (
        <div className="error-modal left-[50%] top-[50%] -translate-y-2/4 -translate-x-2/4	duration-500 absolute bg-white p-8 z-50 shadow-xl rounded-md text-center flex flex-col gap-6">
            <p className='text-rose-500 font-bold text-xl'>{message}</p>
            <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </div>
    );

    
    const handleGeneratePosterClick = async () => {
        if (aiContentInfo.currentCount >= aiContentInfo.limit) {
            alert('Daily limit for AI generated content reached.');
            return;
        } else {
            onGeneratePoster();
        }

        // Continue with existing logic for generating the poster
        if (project_name && primary_genre) {
            await generatePosterContent();
        }
    };

      
    return (
        <div className='flex flex-col gap-2 h-full w-full rounded-md '>

            <Modal show={isModalOpen} onClose={setIsModalOpen} dialogPanelClass="!max-w-[40rem] p-[2rem]" showCloseButton='true'>

                <ProjectImagePreview data={movie_poster} />
                
            </Modal>

            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}

            {header ? (<h4 className='text-slate-400 text-center text-md font-semibold'>Project Image</h4>):null}

            <p className='text-sm text-center leading-4'>Click 'Generate Poster' to create an AI generated poster based on your project info or upload your own! AI generated content uses a lot of resources so currently the max is set to 5 daily.</p>
            <p className='text-sm text-center font-bold text-rose-500'>AI Generated Content: {aiContentInfo.currentCount}/{aiContentInfo.limit}</p>

            <input
                type="file"
                id="imageUpload"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                accept="image/*"
            />
                    
            <div className='w-full h-[26rem] my-2 relative rounded-md overflow-hidden max-w-[17rem] mx-auto' style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                 }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {isLoading && (
                    <div className='rounded-md flex justify-center items-center h-full bg-slate-500/75 backdrop-blur-sm'>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                            <CircularProgress determinate value={progress} />
                        </Box>
                    </div>
                )}
                <div className='absolute inset-0 flex flex-col gap-8 items-center justify-center bg-black bg-opacity-[65%] opacity-0 hover:opacity-100 transition-opacity duration-500'>
                    <div className='flex flex-row gap-4 '>
                        <div onClick={openPosterPreviewModal} className='cursor-pointer text-sm p-4 border-2 border-slate-300 group hover:bg-slate-300 rounded-full duration-500 in-ease-out'>
                            <FontAwesomeIcon className='w-[1.2rem] h-[1.2rem] group-hover:text-slate-500 justify-center flex text-slate-300  ' icon={faEye} />
                        </div>
                        <div onClick={handleImageClick} className='cursor-pointer text-sm p-4 border-2 bg-transparent border-slate-300 hover:bg-slate-300 group rounded-full duration-500 in-ease-out'>
                            <FontAwesomeIcon className='w-[1.2rem] h-[1.2rem] justify-center flex text-slate-300 group-hover:text-slate-500 ' icon={faPencil} />
                        </div>
                    </div>
                    <p className='text-white text-center px-4'>
                        Drag and drop your own image here or click the "Generate AI Poster" to create one.
                    </p>
                </div>
            </div>
            <span className='text-xs italic text-center'>Note: AI generated images aren't always accurate so use at your own discretion!</span>

            <div className='flex flex-row gap-2 justify-center'>
                <SecondaryButton className='text-xs' onClick={handleGeneratePosterClick}>Generate AI Poster</SecondaryButton>
                <SecondaryButton className='!bg-slate-200 !text-slate-400 text-xs' onClick={handleImageClick}>Upload an Image</SecondaryButton>
            </div>
        </div>
    );
}