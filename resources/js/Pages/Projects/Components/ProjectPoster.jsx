import React, { useState, useEffect, useCallback } from 'react';
import { useMediaContext } from '@/Components/Contexts/MediaContext';
import { router } from '@inertiajs/react'; 

const ProjectPoster = ({ videoProjectDetails, setPosterImage, setSelectionError, updateProjectAssets, posterImagePreview, handlePosterImageChange }) => {
  const { createMedia } = useMediaContext(); 

  const [imagePreview, setImagePreview] = useState(posterImagePreview);
  const [isHovering, setIsHovering] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [defaultImageIndex, setDefaultImageIndex] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0); 
  const [errorMessage, setErrorMessage] = useState('');  
  const totalDefaultImages = 10;  

  useEffect(() => {
      const interval = setInterval(() => {
          setDefaultImageIndex((prevIndex) => (prevIndex + 1) % totalDefaultImages);
      }, 5000);  

      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingPercentage(oldPercentage => {
          if (oldPercentage < 100) {
            return oldPercentage + 1;
          }
          clearInterval(interval);
          return 100;
        });
      }, 100); 
    } else {
      setLoadingPercentage(0); 
    }
    return () => interval && clearInterval(interval);
  }, [isGenerating]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileUrl = URL.createObjectURL(file);
        setImagePreview(fileUrl);
        handlePosterImageChange(fileUrl); 

        const formData = new FormData();
        formData.append('media', file);

        if (videoProjectDetails.id) {
            formData.append('project_id', videoProjectDetails.id);
        }

        const image = new Image();
        image.onload = async () => {
            formData.append('dimensions', JSON.stringify({ width: image.width, height: image.height }));
            formData.append('media_type', file.type);
            formData.append('size', file.size);
            formData.append('ai_generated', false);

            try {
                const newMedia = await createMedia(formData);
                setPosterImage({
                    poster: file,
                    dimensions: { width: image.width, height: image.height },
                    media_type: file.type,
                    size: file.size,
                    ai_generated: false,
                    media_path: newMedia.media_path, 
                });
                updateProjectAssets(newMedia.media_path);
            } catch (error) {
                console.error('Error while uploading the image: ', error);
            }
        };
        image.src = fileUrl;
    }
  };


  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const generateAiPoster = useCallback(async (prompt) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/media/generateAiImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (response.ok) {
        const data = await response.json();
        const mediaData = {
            project_id: videoProjectDetails.id,
            media_path: data.url,  
            media_type: data.type,  
            size: data.size,       
            dimensions: JSON.stringify({ width: data.width, height: data.height }),  
            ai_generated: true,
        };
        setImagePreview(`/storage/${data.media_path}`); // Update to use the /storage prefix

        // Update the poster image state and project assets as needed
        setPosterImage({
            poster: data.media_path, // Assuming `poster` should hold the image URL.
            dimensions: { width: data.width, height: data.height },
            media_type: data.type,
            size: data.size,
            ai_generated: true,
            media_path: `/storage/${data.media_path}`, 
        });
        updateProjectAssets(`/storage/${data.media_path}`);
      } else {
        throw new Error('Failed to generate AI poster');
      }
    } catch (error) {
      console.error('Error generating AI poster:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [createMedia, setImagePreview, setPosterImage, updateProjectAssets, videoProjectDetails]);

  const handleGenerateAiImage = useCallback(() => {
    const { projectName, primaryGenre, secondaryGenre, viewerRating, projectDescription } = videoProjectDetails;
    if (!projectName || !primaryGenre || !viewerRating || !projectDescription || (secondaryGenre === undefined)) {
        setErrorMessage('Please fill out the entire form before generating the AI image.');
        return;
    }
  
    setErrorMessage('');
    const prompt = `Create an image for '${projectName}', a ${primaryGenre} ${secondaryGenre} movie rated ${viewerRating}. Description: ${projectDescription}.`;
  
    if (prompt.length > 1000) {
      prompt = prompt.substring(0, 1000);
    }
  
    generateAiPoster( prompt );
  }, [generateAiPoster, videoProjectDetails]);
  
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (posterImagePreview) {
      setImagePreview(posterImagePreview);
    }
  }, [posterImagePreview]);
  
  
  const defaultImagePath = `/images/movie_posters/movie_poster_${defaultImageIndex + 1}.jpg`;

  return (
    <div className='relative w-full' >
      <input
        type="file"
        id="fileInput"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label className="block text-gray-700 text-sm text-center w-full font-bold mb-2" htmlFor="projectDescription">Project Poster</label>
      <div className="mt-4 mb-6 w-full h-auto max-w-[14rem] mx-auto relative cursor-pointer" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
        {isHovering && (
          <div className='absolute text-center m-auto h-full duration-500 transition-all w-full'>
            <div className='w-full h-full bg-slate-700/75 absolute z-30'></div>
            <p className='absolute z-40 text-white top-[50%] -translate-y-2/4 px-6'>Click here to upload or drag and drop an image</p>
          </div>
        )}
        {isGenerating && (
            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                <div>{loadingPercentage}% Loading... </div>
            </div>
        )}        
        <img 
          src={imagePreview || defaultImagePath} 
          alt="Preview" 
          className="w-full h-auto h-full max-h-[26rem] rounded-md w-[14rem]"
        />
      </div>
      {errorMessage && <p className="text-red-500 mt-2 text-center">{errorMessage}</p>}
      <div className='items-center justify-center w-full flex flex-row gap-4'>
        <button onClick={handleClick} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Upload Image
        </button>
        <button onClick={handleGenerateAiImage} disabled={isGenerating} className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded">
            {isGenerating ? `${loadingPercentage}% Generating...` : `Generate AI Image`}
        </button>
      </div>
    </div>
  );
};

export default ProjectPoster;
