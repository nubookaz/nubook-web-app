import React, { useState, useEffect, useCallback, useRef } from 'react';
import { router } from '@inertiajs/react';
import { useDropzone } from 'react-dropzone';



import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faUpload, faInfoCircle  } from '@fortawesome/free-solid-svg-icons'; 

import Modal from '@/Components/Modals/Modal';







 
export default function MoviePoster({

    data,
    // setEmptyFields,
    header = 'true',
    posterPackage,
    disableRandomShuffler = false,
    saveToDatabase = false,
 
}){

    const [projectDetails, setProjectDetails] = useState({
        video_type: '',
        project_name: '',
        project_description: '',
        primary_genre: '',
        secondary_genre: '',
        viewer_rating: '',
    });
    
    useEffect(() => {
        setProjectDetails(data);
    }, [data]);
    
    const [posterAttributes, setPosterAttributes] = useState({
        url: data.movie_poster && data.movie_poster.url ? data.movie_poster.url : '',
        dimensions: '',
        fileSize: '',
        file: '',
        aiGenerated: false,
    });

    





    const [isLoading, setIsLoading] = useState(false);
    const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
    const [shuffledPosters, setShuffledPosters] = useState([]);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [aiContentInfo, setAiContentInfo] = useState({ currentCount: 0, limit: 0 });
    const [showAiGeneratedInfo, setShowAiGeneratedInfo] = useState(false);

    const [showPosterPreview, setShowPosterPreview] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [isImageUrl, setIsImageUrl] = useState('');



















 



    const openAiGeneratedInfoModal = () => {
        setIsModalOpen(true);
        setShowAiGeneratedInfo(true);
    };
    const fetchAiContentInfo = async () => {
        try {
            const response = await axios.get(route('ai-content.info')); // Adjust URL as needed
            setAiContentInfo(response.data);

         } catch (error) {
            console.error('Error fetching AI content info:', error);
        }
    };
    
    useEffect(() => {
        fetchAiContentInfo();
    }, []);







    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        // Validate file type
        if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            alert('Only JPG and PNG files are allowed');
            return;
        }

        // Validate file size (e.g., 5MB maximum)
        const maxFileSize = 25 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxFileSize) {
            alert('File is too large. Maximum size is 25MB.');
            return;
        }

        // Get image dimensions
        const reader = new FileReader();
        reader.onload = (e) => {

            const img = new Image();
            img.onload = async () => {
                const imageUrl = URL.createObjectURL(file);
                await handleImageSave(imageUrl, false);
             
                setPosterAttributes({
                    url: URL.createObjectURL(file),
                    dimensions: `${img.width}x${img.height}`,
                    fileSize: file.size,
                    file: file,
                    aiGenerated: '', // or your existing logic
                });

                await saveImageToDatabase(imageUrl);

            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        setImageUploaded(true);

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    const fileInputRef = useRef(null);

    const onFileInputChange = useCallback((event) => {
        const files = event.target.files;
        onDrop(files);
    }, [onDrop]);

    const onUploadClick = () => {
        fileInputRef.current.click();
    };












    useEffect(() => {
        shufflePosters();
    }, []);

    const shufflePosters = () => {
        const posterNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
        posterNumbers.sort(() => Math.random() - 0.5);
        setShuffledPosters(posterNumbers);
        setCurrentPosterIndex(0);
    };

    // Change poster every 10 seconds
    useEffect(() => {
        if (shuffledPosters.length === 0 || imageUploaded) return;

        if (currentPosterIndex >= shuffledPosters.length) {
            shufflePosters();
            return;
        }

        const interval = setInterval(() => {
            setCurrentPosterIndex((prevIndex) => (prevIndex + 1) % shuffledPosters.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [currentPosterIndex, shuffledPosters, imageUploaded]);

    const currentPoster = shuffledPosters[currentPosterIndex];
    const posterPath = `/images/movie_posters/movie_poster_${currentPoster}.jpg`;











    const generateAIPoster = async () => {
        const { project_name, primary_genre, secondary_genre, viewer_rating, project_description } = projectDetails;
        if (!project_name || !primary_genre || !secondary_genre || !viewer_rating || !project_description) {
            setErrorMessage('Please fill all required fields.');
            return;
        }
 
        setIsLoading(true);
        let progress = 0;
        setProgress(progress);
    
        const progressInterval = setInterval(() => {
            if (progress < 100) {
                progress += 10;
                setProgress(progress);
            } else {
                clearInterval(progressInterval);
            }
        }, 1000);
        try {
            const response = await axios.post(route('chat.gpt.movie.poster'), {
                project_name,
                primary_genre,
                secondary_genre,
                viewer_rating,
                project_description
            });
    
            if (response.status === 200 && response.data && response.data.url) {
                const imageUrl = response.data.url;
                await handleImageSave(imageUrl, true);
                setPosterAttributes({ 
                    ...posterAttributes, 
                    url: imageUrl, 
                    aiGenerated: true 
                });

                await saveImageToDatabase(imageUrl);


                setImageUploaded(true);
                await fetchImage(imageUrl);
            } else {
                throw new Error('Invalid response from the server');
            }
            setProgress(100);
        } catch (error) {
            console.error('Error generating AI poster:', error);
            setErrorMessage('We are having trouble communicating with our servers. Please try again later.');
            clearInterval(progressInterval);
            setProgress(0);
        } finally {
            setIsLoading(false);
        }
    };


    const handleGeneratePosterClick = async () => {
        // if (aiContentInfo.currentCount >= aiContentInfo.limit) {
        //     alert('Daily limit for AI generated content reached.');
        //     return;
        // } else {
        //     onGeneratePoster();
        // }

        // Continue with existing logic for generating the poster
        if (projectDetails.project_name && projectDetails.primary_genre) {
            await generateAIPoster();
 
        } else {
            console.error('Missing required data for generating the poster');
        }
    };
    
    const fetchImage = async () => {
        if (!posterAttributes.url) {
            console.error('No image URL to fetch');
            return;
        }

        try {
            const response = await fetch(`/fetch-image?url=${encodeURIComponent(posterAttributes.url)}`);

            if (!response.ok) {
                throw new Error('Failed to fetch the image');
            }

            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            // Update state or perform actions with the fetched image
        } catch (error) {
            console.error('Error fetching image:', error);
            // Handle the error appropriately
        }
    };







    const handleImageSave = async (imageUrl, isAiGenerated) => {
        if (saveToDatabase) {
            await saveImageToDatabase(posterAttributes.file, imageUrl);
        } else {
            // Send the poster attributes to the parent component
            const newPosterAttributes = {
                ...posterAttributes,
                url: imageUrl,
                aiGenerated: isAiGenerated,
            };
            setPosterAttributes(newPosterAttributes);
    
            if (posterPackage && typeof posterPackage === 'function') {
                posterPackage(newPosterAttributes);
            }
        }
    };
    

    const saveImageToDatabase = async (imageBlob, imageUrl) => {
        console.log("Saving image with URL:", imageUrl);

        if (!saveToDatabase) {
            console.log('Saving to database is disabled');
            return;
        }
        console.log(imageUrl);
        
        // Convert Blob to File
        const file = new File([imageBlob], "upload.jpg", { type: "image/jpeg" });
    
        // Prepare FormData
        const formData = new FormData();
        formData.append("image", file); // Image file
        formData.append("image_url", imageUrl); // Image URL
        formData.append("project_id", data.id); // Project ID
    
        try {
            // Update the endpoint and request method as per your backend implementation
            const uploadResponse = await router.post(route('projects.save.poster', {id: data.id}), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Check if uploadResponse and uploadResponse.status are defined
            if (uploadResponse && uploadResponse.status === 200) {
                console.log('Image saved to server');
            } else {
                console.error('Error or unexpected response saving image to server:', uploadResponse);
            }
        } catch (error) {
            console.error('Exception saving image to server:', error);
        }
    };
    
    




    const ErrorModal = ({ message, onClose }) => (
        <div className="error-modal left-[50%] top-[50%] -translate-y-2/4 -translate-x-2/4	duration-500 absolute bg-white p-8 z-50 shadow-xl rounded-md text-center flex flex-col gap-6">
            <p className='text-rose-500 font-bold text-xl'>{message}</p>
            <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </div>
    );

    return (
        <div className='relative'>
            <Modal show={isModalOpen} onClose={setIsModalOpen} dialogPanelClass="!max-w-[40rem] p-[2rem]" showCloseButton='true'>

                {showPosterPreview ? ( <ProjectImagePreview data={image} />):null}
                {showAiGeneratedInfo ? ( 

                    <div className='text-center my-8'>
                        <h2>AI generated content</h2>
                        <p className='text-lg'>AI generated content uses a lot of resources so currently the max is set to 5 daily per user regardless of the amount of projects.</p>
                        <p className='text-md text-center font-bold text-rose-500 my-6'>AI Generated Content: {aiContentInfo.currentCount}/{aiContentInfo.limit}</p>
                        <span className='text-xs italic text-center'>Note: AI generated images aren't always accurate so use at your own discretion!</span>
                    </div>

                ):null}

            </Modal>

            <div className='flex flex-col gap-2 h-full w-full rounded-md '>
                {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}

                {header ? (<h4 className='text-slate-400 text-center text-md font-semibold'>Project Image</h4>):null}

                <p className='text-sm text-center leading-4'>Click 'Generate Poster' to create an AI generated poster based on your project info or upload your own!</p>
                <p className='flex flex-row gap-4 text-sm justify-center font-bold text-rose-500'>
                    AI Generated Content: {aiContentInfo.currentCount}/{aiContentInfo.limit}
                    <FontAwesomeIcon onClick={openAiGeneratedInfoModal} className='cursor-pointer w-[1.2rem] h-[1.2rem] justify-center flex' icon={faInfoCircle} />
                </p>

                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/jpeg, image/png"
                    onChange={onFileInputChange}
                />
        
                <div {...getRootProps()} className='w-full h-[26rem] my-2 relative rounded-md overflow-hidden max-w-[17rem] mx-auto' style={{
                    backgroundImage: posterAttributes.url ? `url(${posterAttributes.url})` : (currentPoster !== undefined ? `url(${posterPath})` : ''),
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    border: isDragActive ? '2px dashed #ccc' : 'none',
                }}>
                    <input {...getInputProps()} />
                    {isLoading && (
                        <div className='rounded-md flex justify-center items-center h-full bg-slate-500/75 backdrop-blur-sm'>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                                <CircularProgress determinate value={progress} />
                            </Box>
                        </div>
                    )}
                    <div className='absolute inset-0 flex flex-col gap-8 items-center justify-center bg-black bg-opacity-[65%] opacity-0 hover:opacity-100 transition-opacity duration-500'>
                        <div className='flex flex-row gap-4 '>
                            <div className='cursor-pointer text-sm p-4 border-2 border-slate-300 group hover:bg-slate-300 rounded-full duration-500 ease-in-out'>
                                <FontAwesomeIcon className='w-[1.2rem] h-[1.2rem] group-hover:text-slate-500 justify-center flex text-slate-300  ' icon={faEye} />
                            </div>
                            <div className='cursor-pointer text-sm p-4 border-2 bg-transparent border-slate-300 hover:bg-slate-300 group rounded-full duration-500 ease-in-out' onClick={onUploadClick}>
                                <FontAwesomeIcon className='w-[1.2rem] h-[1.2rem] justify-center flex text-slate-300 group-hover:text-slate-500 ' icon={faUpload} />
                            </div>
                        </div>
                        <p className='text-white text-center px-4'>
                            Drag and drop your own image here or click to upload.
                        </p>
                    </div>
                </div>
        
                <div className='flex flex-row gap-2 justify-center'>
                    <SecondaryButton className='text-xs' onClick={handleGeneratePosterClick}>Generate AI Poster</SecondaryButton>
                    <SecondaryButton className='!bg-slate-200 !text-slate-400 text-xs !hover:bg-slate-500' onClick={onUploadClick}>Upload an Image</SecondaryButton>
                </div>
            </div>
        </div>
        
    );
    
    
}