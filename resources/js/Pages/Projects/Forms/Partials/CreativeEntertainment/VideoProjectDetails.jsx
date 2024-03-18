
import React, { useCallback, useState } from 'react';
import ProjectPoster from '@/Pages/Projects/Components/ProjectPoster';
import Chip from '@mui/joy/Chip';

const VideoProjectDetails = ({ videoProjectDetails, setVideoProjectDetails, setSelectionError, updateProjectAssets, posterImagePreview, handlePosterImageChange }) => {
    const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"];
    const ratings = ["G", "PG", "PG-13", "R", "NC-17"];

    const [charCount, setCharCount] = useState(videoProjectDetails.projectDescription ? videoProjectDetails.projectDescription.length : 0);

    const handleChange = (e, rating) => {
        if (rating) {
            setVideoProjectDetails(prev => ({
                ...prev,
                viewerRating: rating
            }));
        } else {
            const { name, value } = e.target;
            if (name === 'projectDescription' && value.length > 600) {
                // If the value exceeds 600 characters, trim it and update the state
                const trimmedValue = value.substring(0, 600);
                setVideoProjectDetails(prev => ({
                    ...prev,
                    [name]: trimmedValue
                }));
                setCharCount(trimmedValue.length);
            } else {
                setVideoProjectDetails(prev => ({
                    ...prev,
                    [name]: value
                }));
                if (name === 'projectDescription') {
                    setCharCount(value.length);
                }
            }
        }
    };
    
    const handlePosterChange = useCallback((posterDetails) => {
        setVideoProjectDetails(prev => ({ ...prev, ...posterDetails }));
    }, [setVideoProjectDetails]);
    
    const handlePaste = (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text').substring(0, 500);
        const processedText = text.replace(/\r?\n|\r/g, ' '); // Replace all newlines with a space
        setVideoProjectDetails(prev => ({
            ...prev,
            projectDescription: processedText
        }));
        setCharCount(processedText.length); // Update character count after paste
    };
    
    return (
        <div className="flex flex-row gap-6 mx-auto w-[70rem] h-full">
                <div className='w-1/2 my-auto'>
                    <ProjectPoster 
                        setPosterImage={handlePosterChange} 
                        videoProjectDetails={videoProjectDetails}
                        setSelectionError={setSelectionError} 
                        updateProjectAssets={updateProjectAssets}
                        posterImagePreview={posterImagePreview}  
                        handlePosterImageChange={handlePosterImageChange}
                    />
                </div>
                
                 <div className="grid grid-cols-1 gap-4 w-1/2 py-[4rem]">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">Project Name <span className='text-rose-500'>*</span></label>
                        <input
                            type="text"
                            name="projectName"
                            id="projectName"
                            placeholder="Project Name"
                            value={videoProjectDetails.projectName || ''}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDescription">Project Description</label>
                        <textarea
                            name="projectDescription"
                            id="projectDescription"
                            placeholder="Project Description"
                            value={videoProjectDetails.projectDescription || ''}
                            onChange={handleChange}
                            onPaste={handlePaste}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                            required
                            rows={6}
                            maxLength={500} // Set the maxLength for textarea
                            className="resize-none w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <span className="block text-gray-600 text-sm mt-1">
                            {500 - charCount} characters remaining
                        </span>
                    </div>
                    <div className='flex flex-row gap-4 w-full'>
                        <div className='w-full'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="primaryGenre">Primary Genre</label>
                            <select
                                name="primaryGenre"
                                id="primaryGenre"
                                value={videoProjectDetails.primaryGenre || ''}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Primary Genre</option>
                                {genres.map(genre => (
                                    <option key={genre} value={genre} disabled={genre === videoProjectDetails.secondaryGenre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secondaryGenre">Secondary Genre (Optional)</label>
                            <select
                                name="secondaryGenre"
                                id="secondaryGenre"
                                value={videoProjectDetails.secondaryGenre || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Secondary Genre</option>
                                {genres.map(genre => (
                                    <option key={genre} value={genre} disabled={genre === videoProjectDetails.primaryGenre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Viewer Rating</label>
                        <div>
                            {ratings.map(rating => (
                                <Chip
                                    key={rating}
                                    variant={videoProjectDetails.viewerRating === rating ? 'solid' : 'outlined'}
                                    onClick={() => handleChange(null, rating)}
                                    sx={{
                                        marginRight: 1,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: videoProjectDetails.viewerRating === rating ? '' : '#e0e0e0',
                                        },
                                    }}
                                >
                                    {rating}
                                </Chip>
                            ))}
                        </div>
                    </div>
                </div>
         </div>
    );
};

export default VideoProjectDetails;
