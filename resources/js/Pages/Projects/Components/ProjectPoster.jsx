import React, { useState, useEffect, useCallback } from 'react';
import { useMediaContext } from '@/Components/Contexts/MediaContext';
import { router } from '@inertiajs/react'; 

const ProjectPoster = ({ videoProjectDetails, setPosterImage, setSelectionError, posterImagePreview, handlePosterImageChange }) => {
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
                setPosterImage({
                    poster: file,
                    dimensions: { width: image.width, height: image.height },
                    media_type: file.type,
                    size: file.size,
                    ai_generated: false,
                    media_path: fileUrl, 
                });
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
        setImagePreview(`/storage/${data.media_path}`); 

        setPosterImage({
            poster: data.media_path, 
            dimensions: { width: data.width, height: data.height },
            media_type: data.type,
            size: data.size,
            ai_generated: true,
            media_path: `/storage/${data.media_path}`, 
        });
      } else {
        throw new Error('Failed to generate AI poster');
      }
    } catch (error) {
      console.error('Error generating AI poster:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [createMedia, setImagePreview, setPosterImage, videoProjectDetails]);

  const handleGenerateAiImage = useCallback(() => {
      const { project_name, primaryGenre, secondaryGenre, viewerRating, projectDescription } = videoProjectDetails;
      if (!project_name || !primaryGenre || !viewerRating || !projectDescription || (secondaryGenre === undefined)) {
          setErrorMessage('Please fill out the entire form before generating the AI image.');
          return;
      }

      setErrorMessage('');
      let promptText = `Create an image for '${project_name}', a ${primaryGenre} ${secondaryGenre} movie rated ${viewerRating}. Description: ${projectDescription}.`;

      if (promptText.length > 1000) {
        promptText = promptText.substring(0, 1000);
      }

      generateAiPoster(promptText);
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
      <div className="mt-4 mb-6 h-[26rem] w-[18rem] shadow-md mx-auto relative cursor-pointer" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick}>
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
          className="w-full h-auto h-full  object-cover rounded-md  border-4 border-white"
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
